 
const express = require("express");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
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
                disposition: "attachment"
            }
        ]
    };

    try {
        await sgMail.send(msg);
        res.status(200).send("Email sent successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
