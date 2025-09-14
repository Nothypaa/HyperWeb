# 🚀 Vercel Deployment Instructions

## Environment Variables Setup

When deploying to Vercel, you **MUST** set these environment variables in your Vercel dashboard:

### Required Environment Variables:

```bash
# Supabase Configuration (CRITICAL)
NEXT_PUBLIC_SUPABASE_URL=https://bfksghkgtjnimmoetour.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJma3NnaGtndGpuaW1tb2V0b3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MzYyOTIsImV4cCI6MjA3MzExMjI5Mn0.UE0lhPsDvPyybT9YTQxGnphYEaDFUEIIwBoT9Lqy2J8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJma3NnaGtndGpuaW1tb2V0b3VyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzUzNjI5MiwiZXhwIjoyMDczMTEyMjkyfQ.K5vJzK4EKjJ9VWqGTDSdDNE0orVRvtoU6_iFlrazRyE

# Email Notifications (OPTIONAL - for contact form notifications)
RESEND_API_KEY=re_FJXA86zR_8caRtf3J1eQWNmGfPLPgprpn

# All core variables listed above
# Email notifications are optional but recommended
```

## Step-by-Step Deployment:

### 1. Push to GitHub
```bash
git push origin main
```

### 2. In Vercel Dashboard:
1. **Import Project** from your GitHub repository
2. **Environment Variables**: Go to Settings → Environment Variables
3. **Add each variable** listed above (copy exactly)
4. **Deploy**

### 3. Critical Vercel Settings:
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Node.js Version**: 18.x or higher

## 🧪 Post-Deployment Testing:

### Test Contact Form:
```bash
curl -X POST https://your-vercel-url.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","subject":"web-development","message":"Deployment test"}'
```

### Test Health Endpoint:
```bash
curl https://your-vercel-url.vercel.app/api/health
```

### Test Admin Login:
```bash
curl -X POST https://your-vercel-url.vercel.app/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"contact@agencehyperweb.com","password":"your-password"}'
```

## ⚠️ Important Notes:

1. **SUPABASE_SERVICE_ROLE_KEY is CRITICAL** - Without this, your admin panel won't work on Vercel
2. **Test immediately after deployment** - Contact form and admin panel
3. **Monitor error logs** in Vercel dashboard for any issues
4. **Check Supabase logs** if contacts aren't appearing

## 🔍 Troubleshooting:

### If Contact Form Doesn't Work:
- Check Vercel environment variables are set correctly
- Check Supabase RLS policies are enabled
- Monitor Vercel function logs

### If Admin Panel Doesn't Work:
- Ensure SUPABASE_SERVICE_ROLE_KEY is set
- Check admin user exists in Supabase Auth
- Verify authentication token is being passed correctly

## ✅ Success Indicators:
- Contact form submissions appear in admin panel
- Health endpoint returns status 200
- Admin authentication works
- No 500 errors in Vercel logs

---
**Your contact system is now ready for production! 🎉**