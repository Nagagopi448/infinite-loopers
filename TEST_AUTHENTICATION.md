# Real Database Authentication - Testing Guide

## ✅ What's Changed

All demo/offline modes have been removed. The application now ONLY uses real database authentication.

## 🔧 System Requirements

1. **MongoDB** - Must be running (already verified ✓)
2. **Backend Server** - Running on http://localhost:5000 (already verified ✓)
3. **Frontend** - Running on http://localhost:3000

## 📝 How Authentication Works Now

### Registration Flow:
1. User fills out the registration form with:
   - Full Name
   - Email (must be unique)
   - Password (minimum 6 characters)
   - Role (Student or Teacher)
2. Data is sent to backend: `POST /api/auth/register`
3. Backend validates and stores user in MongoDB database
4. User receives a JWT token
5. User is automatically logged in and redirected to dashboard

### Login Flow:
1. User enters email and password
2. Data is sent to backend: `POST /api/auth/login`
3. Backend checks MongoDB database for matching credentials
4. Password is verified using bcrypt
5. If valid, user receives a JWT token
6. User is logged in and redirected to dashboard

## 🧪 Testing the System

### Test Case 1: Register a New User

1. Go to http://localhost:3000/register
2. Fill in the form:
   ```
   Name: John Doe
   Email: john@example.com
   Password: Test123
   Confirm Password: Test123
   Role: Student
   ```
3. Click "Create Account"
4. You should be automatically logged in and see the dashboard

### Test Case 2: Login with Registered User

1. Logout if you're logged in
2. Go to http://localhost:3000/login
3. Enter credentials:
   ```
   Email: john@example.com
   Password: Test123
   ```
4. Click "Sign In"
5. You should see the dashboard

### Test Case 3: Register Another User (Teacher)

1. Register a new teacher account:
   ```
   Name: Jane Teacher
   Email: jane.teacher@example.com
   Password: Teacher123
   Role: Teacher
   ```
2. Login with these credentials

## 🗄️ Database Verification

To verify users are being stored in MongoDB, you can check the database:

```bash
# Connect to MongoDB
mongosh

# Switch to the database
use eduflow_lms

# View all users (passwords are hashed)
db.users.find().pretty()

# Count users
db.users.countDocuments()
```

## ❌ What Was Removed

1. ❌ Demo login buttons (Student Demo / Teacher Demo)
2. ❌ Quick register buttons
3. ❌ Offline mode fallback
4. ❌ Mock users (student@example.com / teacher@example.com with password "password")

## ✅ What Was Added

1. ✅ Real MongoDB database integration
2. ✅ Proper validation for email and password
3. ✅ Unique email constraint (can't register same email twice)
4. ✅ Password hashing with bcrypt
5. ✅ JWT token authentication
6. ✅ Persistent login sessions

## 🔐 Security Features

- Passwords are hashed using bcrypt before storing
- JWT tokens are used for authentication
- Email uniqueness is enforced
- Password minimum length requirement (6 characters)
- Email format validation
- Protected routes require valid JWT token

## 🐛 Troubleshooting

### "Cannot connect to server" error
- Make sure backend is running: Check if http://localhost:5000 is accessible
- Make sure MongoDB is running: Check service status

### "User already exists" error
- The email is already registered in the database
- Try a different email or login with existing credentials

### "Invalid email or password" error
- Double check your email and password
- Passwords are case-sensitive
- Make sure you're using the credentials you registered with

## 📊 Current Status

- ✅ Backend Server: Running on port 5000
- ✅ MongoDB: Running and connected
- ✅ Frontend: Running on port 3000
- ✅ Authentication: Real database integration active
- ❌ Demo Mode: Completely removed

## 🎯 Next Steps

1. Register a new account
2. Login with your account
3. Your data is now stored in MongoDB
4. You can register multiple users with different emails
5. Each user has their own dashboard and data

---

**Note**: The application is now using REAL DATABASE AUTHENTICATION. Every registration creates an actual database record, and login verifies against stored credentials.
