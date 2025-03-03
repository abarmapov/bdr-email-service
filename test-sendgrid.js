const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "ari@foundationsconsulting.ca",  // Change this to the email you want to test with
  from: "ari@foundationsconsulting.ca",  // MUST be a verified sender
  subject: "Testing SendGrid",
  text: "Hello, this is a test email sent using SendGrid.",
  html: "<strong>Hello, this is a test email sent using SendGrid.</strong>",
};

sgMail
  .send(msg)
  .then(() => console.log("Email sent successfully!"))
  .catch((error) => console.error("Error sending email:", error));

