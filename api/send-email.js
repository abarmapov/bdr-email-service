import sgMail from "@sendgrid/mail";  // ✅ Correct way with ESM

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await sgMail.send({
      to,
      from: "your_verified_email@yourdomain.com",
      subject,
      text,
    });

    return res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("Error sending email:", error.response?.body || error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
