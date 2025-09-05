# Admin Panel Access

## 🔐 Secure Admin Panel

Your admin panel is now password protected! 

### **How to Access:**

1. **Visit:** `http://localhost:3001/admin` (or your domain/admin in production)
2. **Password:** `Hyper135784?`

### **Security Features:**
- ✅ **Password Protection** - Only you can access submissions
- ✅ **Session Management** - Stays logged in during browser session
- ✅ **Auto Logout** - Logs out when browser closes
- ✅ **Logout Button** - Manual logout option
- ✅ **Error Handling** - Clear feedback on wrong password

### **Change Password:**
Edit the password in `.env.local`:
```
ADMIN_PASSWORD=YourNewSecurePassword123!
```

### **Production Security:**
- Use a strong, unique password (20+ characters)
- Consider adding 2FA in the future
- Regularly check access logs
- Keep backups of contact data

**Your contact form submissions are now secure!** 🔒