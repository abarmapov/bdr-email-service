import sgMail from "@sendgrid/mail";

export default async function handler(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, pdfData } = req.body;

  const msg = {
    to: email,
    from: "your-email@foundationsconsulting.ca", // Use your verified SendGrid sender email
    subject: "Your BDR Compensation Report",
    text: "Here is your requested BDR Compensation Report.",
    attachments: [
      {
        content: pdfData,
        filename: "BDR_Compensation_Report.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error sending email" });
  }
}
