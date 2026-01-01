const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const galleryRoutes = require("./routes/galleryRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files (images/resumes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* -----------------------------------------
   RESUME UPLOAD
----------------------------------------- */

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads/resumes");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "resume-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const BRANCH_EMAILS = {
  kothrud: "Littlelearningsskothrud@gmail.com",
  warje: "Littlelearningsswarje@gmail.com",
};

const BRANCH_CREDENTIALS = {
  kothrud: {
    user: process.env.KOTHRUD_EMAIL || "Littlelearningsskothrud@gmail.com",
    pass: process.env.KOTHRUD_PASSWORD || process.env.EMAIL_PASS,
  },
  warje: {
    user: process.env.WARJE_EMAIL || "Littlelearningsswarje@gmail.com",
    pass: process.env.WARJE_PASSWORD || process.env.SCHOOL_PASSWORD,
  },
};

/* -----------------------------------------
   CONTACT EMAIL API
----------------------------------------- */

app.post("/send-email", async (req, res) => {
  const { name, email, phone, message, program, branch, formType } = req.body;
  
  try {
    // Validate branch selection
    const branchKey = String(branch || "").toLowerCase();
    if (!branchKey || !BRANCH_EMAILS[branchKey]) {
      return res.status(400).json({ 
        success: false, 
        message: "Please select a valid branch." 
      });
    }

    const toEmail = BRANCH_EMAILS[branchKey];
    const branchCreds = BRANCH_CREDENTIALS[branchKey];

    // Create transporter with branch-specific credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: branchCreds.user,
        pass: branchCreds.pass,
      },
    });

    const mailOptions = {
      from: branchCreds.user,
      to: toEmail,
      replyTo: email,
      subject: `New ${formType || "Contact"} Inquiry - Little Learningss (${branch})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #8b5cf6; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">New Inquiry Received</h2>
          <table style="width: 100%; margin-top: 20px;">
            <tr><td style="padding: 8px 0;"><strong>Form Type:</strong></td><td>${formType || "Contact"}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Branch:</strong></td><td>${branch}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>${phone}</td></tr>
            ${program ? `<tr><td style="padding: 8px 0;"><strong>Program:</strong></td><td>${program}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; vertical-align: top;"><strong>Message:</strong></td><td>${message}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 5px;">
            <p style="margin: 0; color: #6b7280; font-size: 12px;">This email was sent from your website contact form.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent to ${branch} branch: ${toEmail}`);
    
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).json({ success: false, message: "Email failed", error: error.message });
  }
});

/* -----------------------------------------
   CAREER FORM + RESUME UPLOAD
----------------------------------------- */

app.post(
  "/send-career-application",
  uploadResume.single("resume"),
  async (req, res) => {
    try {
      const { fullName, email, phone, position, location, education, cover, branch } = req.body;
      const resumeFile = req.file;

      // Validate branch selection
      const branchKey = String(branch || "").toLowerCase();
      if (!branchKey || !BRANCH_EMAILS[branchKey]) {
        return res.status(400).json({ 
          success: false, 
          message: "Please select a valid branch." 
        });
      }

      const toEmail = BRANCH_EMAILS[branchKey];
      const branchCreds = BRANCH_CREDENTIALS[branchKey];

      // Create transporter with branch-specific credentials
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: branchCreds.user,
          pass: branchCreds.pass,
        },
      });

      const mailOptionsToAdmin = {
        from: branchCreds.user,
        to: toEmail,
        replyTo: email,
        subject: `New Career Application - ${position || "General Position"} (${branch})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #8b5cf6; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">New Career Application Received</h2>
            <table style="width: 100%; margin-top: 20px;">
              <tr><td style="padding: 8px 0;"><strong>Form Type:</strong></td><td>Career Application</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Branch:</strong></td><td>${branch}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Name:</strong></td><td>${fullName}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>${phone}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Position:</strong></td><td>${position}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Location:</strong></td><td>${location}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Education:</strong></td><td>${education}</td></tr>
              <tr><td style="padding: 8px 0; vertical-align: top;"><strong>Cover Letter:</strong></td><td>${cover}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 5px;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">Resume attached. This email was sent from your careers page.</p>
            </div>
          </div>
        `,
        attachments: resumeFile ? [{ filename: resumeFile.originalname, path: resumeFile.path }] : [],
      };

      await transporter.sendMail(mailOptionsToAdmin);

      // Send confirmation to applicant
      await transporter.sendMail({
        from: branchCreds.user,
        to: email,
        subject: `Application Received - Little Learningss ${branch}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #8b5cf6;">Thank you for applying, ${fullName}!</h2>
            <p>We have received your application for the position of <strong>${position}</strong> at our <strong>${branch}</strong> branch.</p>
            <p>Our team will review your application and get back to you soon.</p>
            <p style="margin-top: 30px;">Best regards,<br/>Little Learningss Team</p>
          </div>
        `,
      });

      console.log(`✅ Career application sent to ${branch} branch: ${toEmail}`);

      res.status(200).json({ message: "Application submitted successfully!" });
    } catch (error) {
      console.error("❌ Career Application Error:", error);
      res.status(500).json({ message: "Failed to submit application", error: error.message });
    }
  }
);

/* -----------------------------------------
   GALLERY ROUTES
----------------------------------------- */

app.use("/api/gallery", galleryRoutes);

/* -----------------------------------------
   START SERVER
----------------------------------------- */

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
