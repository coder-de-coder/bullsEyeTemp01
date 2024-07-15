export const otpEmailTemplate = (firstName: string, otp: number) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.5;
      background-color: #f2f2f2;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }
    .otp {
      text-align: center;
      font-size: 24px;
      color: #333;
      margin: 20px 0;
    }
    .message {
      margin-bottom: 20px;
    }
    .footer {
      border-top: 1px solid #ddd;
      margin-top: 20px;
      padding-top: 20px;
      font-size: 12px;
      color: #777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>OTP Verification</h1>
    </div>
    <div class="message">
      <p>Dear ${firstName},</p>
      <p>We received a request to access your account using this email address. Your One-Time Password (OTP) to complete the verification is:</p>
      <h2 class="otp">${otp}</h2>
      <p>Please enter this code in the verification screen to proceed.</p>
      <p>If you did not request this verification, please ignore this email.</p>
      <p>Thank you,</p>
      <p>The bullsEYE Team</p>
    </div>
    <hr>
    <div class="footer">
      <p>If you have any questions, feel free to contact our support team.</p>
    </div>
  </div>
</body>
</html>
`;
