# EngiLearn Login + OTP Auth Setup

## Run The Project

1. Backend:
   ```bash
   cd backend
   npm install
   npm start
   ```
   The API runs at `http://localhost:5021/api` when `PORT=5021`.

2. Frontend:
   Open `http://localhost:5021/index.html` or any auth page:
   - `http://localhost:5021/signup.html`
   - `http://localhost:5021/verify-otp.html`
   - `http://localhost:5021/login.html`
   - `http://localhost:5021/login-otp.html`
   - `http://localhost:5021/forgot-password.html`
   - `http://localhost:5021/reset-password.html`

## MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user with a strong password.
3. Add your IP address in Network Access, or use `0.0.0.0/0` only for temporary testing.
4. Copy the Node.js connection string.
5. Put it in `backend/.env` as `MONGO_URI=...`.

The app mirrors the local JSON store to MongoDB when Atlas is connected, so existing LMS data still works.

## Email OTP

Set these in `backend/.env`:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=EngiLearn <your-email@gmail.com>
```

For Gmail, use an App Password, not your normal account password. If email settings are empty, the backend prints the OTP to the server console for local development.

## Optional Twilio SMS OTP

```env
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
```

SMS sends only when all Twilio values and a user mobile number are present.

## Postman Examples

Signup OTP request:
`POST http://localhost:5021/api/auth/request-signup-otp`
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "mobile": "",
  "role": "Student"
}
```

Use email or mobile. Use `"role": "Teacher"` for a teacher account request.

Complete signup after OTP:
`POST http://localhost:5021/api/auth/complete-signup`
```json
{
  "email": "test@example.com",
  "role": "Student",
  "otp": "123456",
  "password": "Strong@1234"
}
```

After OTP + password creation, the account is sent to admin approval.

Verify signup OTP:
`POST http://localhost:5021/api/auth/verify-signup-otp`
```json
{
  "email": "test@example.com",
  "otp": "123456"
}
```

After signup OTP verification, the account is not allowed to login yet. The admin must approve it from the LMS admin dashboard Requests tab.

Admin approval requests:
`GET http://localhost:5021/api/admin/requests`

Approve account:
`PATCH http://localhost:5021/api/admin/users/:id/approve`

Reject account request:
`DELETE http://localhost:5021/api/admin/users/:id/reject`

Delete student or teacher account:
`DELETE http://localhost:5021/api/admin/users/:id`

Login:
`POST http://localhost:5021/api/auth/login`
```json
{
  "identifier": "admin@engilearn.com",
  "password": "admin123",
  "role": "Admin"
}
```

Refresh token:
`POST http://localhost:5021/api/auth/refresh-token`

Postman must keep cookies enabled. The refresh token is stored in the `engilearn_refresh` HTTP-only cookie.

Forgot password:
`POST http://localhost:5021/api/auth/forgot-password`
```json
{
  "identifier": "test@example.com",
  "role": "Student"
}
```

Verify reset OTP:
`POST http://localhost:5021/api/auth/verify-reset-otp`
```json
{
  "identifier": "test@example.com",
  "otp": "123456"
}
```

Reset password:
`POST http://localhost:5021/api/auth/reset-password`
```json
{
  "identifier": "test@example.com",
  "newPassword": "NewStrong@123"
}
```

## Security Notes

- Passwords, OTPs, and refresh tokens are never stored as plain text.
- Access tokens are short-lived.
- Refresh tokens rotate on login and refresh.
- The refresh token is sent as an HTTP-only cookie.
- Signup, login, OTP, and password reset flows are rate limited.
- New self-signup accounts must verify OTP and then wait for admin approval before login.
- Accounts lock after repeated failed password attempts.
- OTP expires after 5 minutes and is cleared after successful verification.
- Password reset verification is cleared after password change.
- Secrets stay in `.env`, never in frontend JavaScript.
