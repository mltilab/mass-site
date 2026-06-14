// Serverless contact endpoint (Vercel).
// 1. Verifies the Cloudflare Turnstile token using the SECRET key (env var, never in the repo).
// 2. If valid, forwards the message to Web3Forms for email delivery.
// The browser posts here instead of straight to Web3Forms, so spam protection is enforced for free.

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  // Vercel parses JSON and urlencoded bodies into req.body. Be defensive if it arrives as a string.
  var body = req.body || {};
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }

  // Honeypot: a filled hidden field means a bot. Return success so it doesn't retry, but send nothing.
  if (body.botcheck) {
    return res.status(200).json({ success: true });
  }

  var token = body["cf-turnstile-response"];
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Please complete the verification and try again." });
  }

  var secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return res
      .status(500)
      .json({ success: false, message: "Server misconfigured: TURNSTILE_SECRET_KEY is not set." });
  }

  // 1. Verify the Turnstile token with Cloudflare.
  try {
    var ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
    var params = new URLSearchParams({ secret: secret, response: token });
    if (ip) params.append("remoteip", ip);

    var verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      }
    );
    var verify = await verifyRes.json();
    if (!verify.success) {
      return res
        .status(403)
        .json({ success: false, message: "Verification failed. Please try again." });
    }
  } catch (e) {
    return res
      .status(502)
      .json({ success: false, message: "Could not reach the verification service. Please try again." });
  }

  // 2. Hand the message to Web3Forms (it already carries the public access_key). Strip bot-check fields.
  var payload = Object.assign({}, body);
  delete payload["cf-turnstile-response"];
  delete payload.botcheck;

  try {
    var deliverRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    var deliver = await deliverRes.json();
    if (deliver.success) {
      return res.status(200).json({ success: true });
    }
    return res
      .status(502)
      .json({ success: false, message: deliver.message || "Could not send your message." });
  } catch (e) {
    return res.status(502).json({
      success: false,
      message: "Could not send your message. Please email us at mlti.lab25@gmail.com.",
    });
  }
};
