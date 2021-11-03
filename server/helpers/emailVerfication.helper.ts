import crypto from 'crypto';

export const msg = () => {
  const emailToken = crypto.randomBytes(64).toString('hex');
  const email = {
    from: 'noreplay@example.com',
    subject: `Thank you for registering to our site.`,
    text: `
      Thank you for registering to our site.
      Please copy and paste the address below to verify your account,
      http://localhost:5000/users/verifi-email?token=${emailToken}
    `,
    html: `
      <h1>Hello,</h1>
      <p>Thank you for registering to our site.</p>
      <p>Please click the link below to verify your account</p>
      <a href="http://localhost:5000/users/verifi-email?token=${emailToken}">Verify your account</a>
    `
  }
  return email
}