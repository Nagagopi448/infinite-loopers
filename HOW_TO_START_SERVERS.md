# 🚀 How to Start the Application

## ❌ What Went Wrong

**Error**: "Cannot connect to server" during registration

**Cause**: You typed `np start` instead of `npm start`
- `np` is not a valid command
- This prevented the frontend from starting properly
- Frontend couldn't connect to backend

## ✅ How to Start Properly

### Step 1: Start Backend Server

```bash
# Navigate to backend folder
cd mybackend

# Start backend server
npm start
```

**Expected Output:**
```
✅ MongoDB connected to EduFlow LMS
💾 Database: Local MongoDB
🚀 EduFlow LMS Backend running on http://localhost:5000
🌐 CORS enabled for: http://localhost:3000
```

### Step 2: Start Frontend Server

**Open a NEW terminal** (keep backend running in first terminal)

```bash
# Navigate to frontend folder
cd frontend

# Start frontend server (NOTE: npm not np!)
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.117:3000
```

### Step 3: Open Browser

Go to: **http://localhost:3000**

## 🔧 If You Get "Cannot Connect to Server" Error

### Check if Backend is Running:
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000
```

If nothing shows up, backend is NOT running. Start it with:
```bash
cd mybackend
npm start
```

### Check if Frontend is Running:
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000
```

If nothing shows up, frontend is NOT running. Start it with:
```bash
cd frontend
npm start
```

### Check if MongoDB is Running:
```bash
# Check MongoDB service
Get-Service -Name MongoDB
```

Status should be: **Running**

If not running:
```bash
# Start MongoDB service
net start MongoDB
```

## 📝 Common Commands

### Start Both Servers (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd C:\Users\NAGA GOPI\OneDrive\Desktop\Hackathon\mybackend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd C:\Users\NAGA GOPI\OneDrive\Desktop\Hackathon\frontend
npm start
```

### Stop Servers

Press `Ctrl + C` in each terminal to stop the server

### Verify Everything is Working

```bash
# Test backend
curl http://localhost:5000

# Test MongoDB connection
cd mybackend
node verify-auth.js

# Open frontend
start http://localhost:3000
```

## ✅ Current Status (Now Fixed!)

- ✅ Backend: Running on port 5000
- ✅ Frontend: Running on port 3000  
- ✅ MongoDB: Connected
- ✅ Ready for registration!

## 🎯 Test Registration Now

1. **Open Browser**: http://localhost:3000
2. **Click**: "Create account"
3. **Fill Form**:
   - Name: Your Name
   - Email: your.email@example.com
   - Password: YourPassword123
   - Role: Student or Teacher
4. **Submit**: Click "Create Account"
5. **Success**: You should be logged in to dashboard!

## 🐛 Troubleshooting

### "npm: command not found"
- Node.js is not installed or not in PATH
- Install Node.js from: https://nodejs.org

### "Port 3000 is already in use"
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill that process (replace PID)
taskkill /F /PID <PID_NUMBER>

# Then start frontend again
npm start
```

### "Port 5000 is already in use"
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill that process (replace PID)
taskkill /F /PID <PID_NUMBER>

# Then start backend again
npm start
```

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
Get-Service -Name MongoDB

# Start MongoDB if stopped
net start MongoDB

# Verify in backend .env file:
MONGO_URI=mongodb://127.0.0.1:27017/eduflow_lms
```

## 💡 Pro Tips

1. **Always use `npm` not `np`** - Common typo!
2. **Keep both terminals open** - Don't close them while using the app
3. **Use Ctrl+C to stop** - Don't force close terminals
4. **Check logs** - If something breaks, read the error messages
5. **MongoDB must be running** - Backend won't work without it

## 📊 Quick Health Check

Run these commands to verify everything:

```bash
# Check all services
Get-Service -Name MongoDB
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# All should show:
# MongoDB: Running
# Port 5000: LISTENING (backend)
# Port 3000: LISTENING (frontend)
```

---

**🎉 You're All Set!**

Both servers are now running. Open http://localhost:3000 and register your account!

Remember: **`npm start`** not **`np start`** ! 😊
