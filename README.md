# google-cloudfunctions-sendmail

🎉 When I created the email sending function with gcp cloud functions, I got help from the open source code, and I'm distributing it as a new project by reflecting my modifications.

## Installation

```
$ yarn install
```

## The gist

```yaml
steps:
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - functions
      - deploy
      - [FUNCTION_NAME]
      - --source=.
      - --trigger-http
      - --region=[FUNCTION_REGION]
      - --runtime=nodejs10
      - --allow-unauthenticated

  }
```

You can set [FUNCTION_NAME] and [FUNCTION_REGION] in the cloudbuild.yaml file above according to your environment.

```js
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
```

In the index.js file above, you need to add the process.env environment variable to the cloud functions variable.
