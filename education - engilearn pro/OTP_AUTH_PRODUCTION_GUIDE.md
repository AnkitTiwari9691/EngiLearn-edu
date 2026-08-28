# EngiLearn Production OTP Authentication Guide

This project now uses one working OTP authentication flow for email or mobile login/signup/password reset. OTPs are hashed before storage, expire in 5 minutes, can only be resent after 60 seconds, and are cleared after successful verification.

## Folder Structure

```text
backend/
  .env
  .env.example
  package.json
  server.js
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
    server.js
frontend/
  login.html
  login-otp.html
  signup.html
  forgot-password.html
  reset-password.html
  pages/
  css/
  js/
  assets/js/api.js
```

## Security Features

- Passwords are stored with bcrypt hashes.
- OTPs are stored with bcrypt hashes, never as plain text.
- OTP expiry is 5 minutes.
- OTP resend cooldown is 60 seconds.
- Wrong OTP attempts are limited to 5.
- JWT access token is short lived.
- Refresh token is stored in a secure HTTP-only cookie and hashed in backend data.
- Logout blacklists the active token.
- Login is blocked until student/teacher signup is OTP verified and approved by admin.
- Rate limiting, Helmet, CORS, and cookie-parser are enabled.
- OTP is never returned in the API response.

## Main API Routes

```text
POST /api/auth/request-signup-otp
POST /api/auth/complete-signup
POST /api/auth/login
POST /api/auth/send-login-otp
POST /api/auth/verify-login-otp
POST /api/auth/forgot-password
POST /api/auth/verify-reset-otp
POST /api/auth/reset-password
POST /api/auth/resend-otp
POST /api/auth/refresh-token
POST /api/auth/logout
GET  /api/auth/verify
GET  /api/health
GET  /api/admin/users
GET  /api/admin/requests
PATCH /api/admin/users/:id/approve
PATCH /api/admin/users/:id/status
DELETE /api/admin/users/:id
```

## MongoDB Schema Shape

User data is stored in MongoDB as part of the app snapshot and mirrored collections. Auth fields include:

```js
{
  name,
  email,
  mobile,
  passwordHash,
  role,
  status,
  isVerified,
  isApproved,
  approvalStatus,
  otpHash,
  otpPurpose,
  otpExpiresAt,
  otpAttempts,
  otpResendCount,
  otpLastSentAt,
  failedLoginAttempts,
  lockUntil,
  refreshTokenHash,
  passwordResetVerified,
  createdAt,
  updatedAt
}
```

## Required `.env`

```env
PORT=5021
NODE_ENV=development
JWT_SECRET=replace-with-long-random-secret
REFRESH_TOKEN_SECRET=replace-with-another-long-random-secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_DAYS=7

MONGO_URI=mongodb+srv://db_user:db_password@cluster0.example.mongodb.net/engilearn?retryWrites=true&w=majority&appName=Cluster0
REQUIRE_MONGO=true

CORS_ORIGINS=http://localhost:5021,http://127.0.0.1:5021

ADMIN001_EMAIL=ankitboss9691@gmail.com
ADMIN001_MOBILE=9691044918
ADMIN001_PASSWORD=admin123

OTP_EXPIRES_MINUTES=5
OTP_MAX_ATTEMPTS=5
OTP_MAX_RESENDS=3
OTP_RESEND_COOLDOWN_SECONDS=60
REQUIRE_REAL_OTP=true

EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-gmail-app-password
EMAIL_FROM="EngiLearn <your-email@gmail.com>"

TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=+1234567890

# Or use Fast2SMS for India.
# FAST2SMS_API_KEY=your-fast2sms-api-key
```

For local testing without real provider keys, keep `EMAIL_PROVIDER=mock` and `SMS_PROVIDER=mock`. The OTP is logged only in the backend terminal and is not exposed to frontend or API responses.

## Provider Ready Architecture

Delivery providers are isolated in backend services:

```text
backend/backend/services/emailService.js
backend/backend/services/smsService.js
backend/backend/services/otpService.js
backend/backend/services/tokenService.js
```

Use these provider switches:

```env
EMAIL_PROVIDER=mock      # mock, gmail, smtp, sendgrid, brevo
SMS_PROVIDER=mock        # mock, twilio, fast2sms, msg91
```

Mock mode is for development. It prints:

```text
[MOCK EMAIL OTP] signup for user@example.com: 123456
[MOCK SMS OTP] signup for +919876543210: 123456
```

The frontend and API response never receive the OTP.

## Gmail OTP Setup

1. Open your Google account security settings.
2. Enable 2-Step Verification.
3. Create an App Password for Mail.
4. Put that 16-character app password in `EMAIL_PASS`.
5. Restart the backend.

## SMS OTP Setup

Use Twilio, Fast2SMS, or MSG91:

- Twilio: fill `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_FROM_NUMBER`.
- Fast2SMS: fill `FAST2SMS_API_KEY`.
- MSG91: fill `MSG91_AUTH_KEY`.

Restart the backend after changing `.env`.

## Switch From Mock To Real Provider

Gmail:

```env
EMAIL_PROVIDER=gmail
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM="EngiLearn <your-gmail@gmail.com>"
```

SMTP:

```env
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

SendGrid:

```env
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=verified-sender@example.com
```

Brevo:

```env
EMAIL_PROVIDER=brevo
BREVO_API_KEY=your-brevo-api-key
EMAIL_FROM=verified-sender@example.com
```

Fast2SMS:

```env
SMS_PROVIDER=fast2sms
FAST2SMS_API_KEY=your-fast2sms-api-key
```

Twilio:

```env
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890
```

MSG91:

```env
SMS_PROVIDER=msg91
MSG91_AUTH_KEY=your-msg91-auth-key
```

## Run The Project

```bash
cd "C:\Users\Lenovo\Desktop\project\education - Copy\backend"
npm install
npm start
```

Open:

```text
http://localhost:5021/login.html
```

## Postman Test Flow

1. Health:
   `GET http://localhost:5021/api/health`

2. Signup OTP:
   `POST http://localhost:5021/api/auth/request-signup-otp`
   ```json
   {
     "name": "Demo Student",
     "email": "demo@example.com",
     "mobile": "9691044918",
     "role": "Student"
   }
   ```

3. Complete Signup:
   `POST http://localhost:5021/api/auth/complete-signup`
   ```json
   {
     "email": "demo@example.com",
     "role": "Student",
     "otp": "123456",
     "password": "Demo@12345"
   }
   ```

4. Admin Login:
   `POST http://localhost:5021/api/auth/login`
   ```json
   {
     "identifier": "ankitboss9691@gmail.com",
     "password": "admin123",
     "role": "Admin"
   }
   ```

5. Approve Student:
   `PATCH http://localhost:5021/api/admin/users/:id/approve`

6. Student Login:
   `POST http://localhost:5021/api/auth/login`

7. Forgot Password:
   `POST http://localhost:5021/api/auth/forgot-password`

8. Verify Reset OTP:
   `POST http://localhost:5021/api/auth/verify-reset-otp`

9. Reset Password:
   `POST http://localhost:5021/api/auth/reset-password`

## Common Errors And Fixes

- `Database not connected`: check MongoDB Atlas DB user, password, and Network Access IP.
- `Real OTP is enabled... provider is not configured`: add Gmail, Twilio, or Fast2SMS keys, or set `REQUIRE_REAL_OTP=false` for local testing.
- `Please wait X seconds`: resend cooldown is working. Wait until the countdown ends.
- `Invalid OTP`: wrong code. After 5 wrong attempts, request a new OTP.
- `Your account is waiting for admin approval`: login is blocked until admin approves the student/teacher.
- `CORS origin not allowed`: add your frontend URL to `CORS_ORIGINS`.
