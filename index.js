const nodeMailer = require('nodemailer');
const cors = require('cors')({
  origin: true,
});

/**
 * Responds only to OPTIONS or POST requests.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.sendMail = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    cors(req, res, () => {
      if (req.method !== 'POST') {
        return;
      }

      const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_ADDRESS,
          serviceClient: process.env.CLIENT_ID,
          privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
      });
      const mailOptions = {
        from: req.body.from || process.env.MAIL_FROM,
        to: req.body.to || process.env.MAIL_TO,
        bcc: req.body.bcc || process.env.MAIL_BCC,
        subject: req.body.subject,
        text: req.body.text,
      };
      return transporter
        .sendMail(mailOptions)
        .then(() => {
          res.status(200).send({
            code: 200,
            message: 'success',
          });
        })
        .catch((e) => {
          res.status(500).send({
            code: 500,
            message: 'fail',
            error: e.toString(),
          });
        });
    });
  }
};
