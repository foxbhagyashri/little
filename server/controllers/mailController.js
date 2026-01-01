const transporter = require("../config/mailer");
const processEnvUser = process.env.EMAIL_USER || "";
const MAIL_FROM = process.env.EMAIL_FROM || processEnvUser;

const BRANCH_EMAILS = {
  kothrud: "Littlelearningsskothrud@gmail.com",
  warje: "Littlelearningsswarje@gmail.com",
};

function addRow(label, value) {
  return value
    ? `
      <tr>
        <td style="padding:10px 0;color:#555;width:140px;"><strong>${label}</strong></td>
        <td style="padding:10px 0;color:#111;">${value}</td>
      </tr>
    `
    : "";
}

exports.sendMail = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      city,
      program,
      message,
      fromForm,
      branch,
    } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    const formType = fromForm || "Website Form";
    const toEmail =
      (branch && BRANCH_EMAILS[String(branch).toLowerCase()]) ||
      process.env.ADMIN_EMAIL ||
      processEnvUser;

    const mailOptions = {
      from: `"Website Enquiry" <${process.env.EMAIL_FROM || MAIL_FROM}>`,
      to: toEmail,
      subject: `📩 New Submission – ${fromForm || "Website Form"}${branch ? ` (${branch})` : ""}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:30px 15px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#2563eb,#1e40af);padding:20px 30px;color:#fff;">
            <h2 style="margin:0;font-size:22px;">New Form Submission</h2>
            ${fromForm ? `<p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Source: ${fromForm}</p>` : ""}
            ${branch ? `<p style="margin:6px 0 0;font-size:13px;opacity:0.9;">Branch: ${branch}</p>` : ""}
          </td>
        </tr>
        <tr>
          <td style="padding:30px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${addRow("Form Type", formType)}
              ${addRow("Name", name)}
              ${addRow("Email", email)}
              ${addRow("Phone", phone)}
              ${addRow("City", city)}
              ${addRow("Program", program)}
              ${addRow("Branch", branch)}
              ${addRow("Message", message)}
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:15px 30px;text-align:center;color:#6b7280;font-size:12px;">
            This email was automatically generated from your website.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);

    // optionally send a confirmation to the user (uncomment if desired)
    // await transporter.sendMail({
    //   from: process.env.EMAIL_FROM || processEnvUser,
    //   to: email,
    //   subject: "We received your message",
    //   text: `Hi ${name},\n\nThanks for contacting us. We received your message and will respond soon.\n\n— Team`
    // });

    res.status(200).json({ success: true, message: "Mail Sent Successfully!" });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ success: false, message: "Mail Failed!" });
  }
};
