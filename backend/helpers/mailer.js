const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth_link = 'https://developers.google.com/oauthplayground/';
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH } = process.env;
const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVerificationMail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: 'Facebook email verification',
    html: `<table style="width:100%;max-width:600px;margin:0 auto;font-family:sans-serif;font-size:16px;line-height:1.4;color:#333"><tbody><tr><td style="text-align:center;padding-top:20px;padding-bottom:20px"><img src="../assets/images/Facebook_logo_(square).png" alt="Facebook Logo" style="max-width:200px"></td></tr><tr><td style="padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px"><h1 style="font-size:24px;margin-top:0">Facebook Email Verification</h1><p>Dear ${name},</p><p>Please click the following link to verify your email address:</p><p style="text-align:center"><a href=${url} style="background-color:#4267b2;border-radius:5px;color:#fff;display:inline-block;font-size:18px;font-weight:700;padding:12px 16px;text-decoration:none">Verify Email</a></p><p>Thank you for using our service.</p></td></tr></tbody></table>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
