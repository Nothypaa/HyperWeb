# 🚀 Vercel Deployment Instructions

## Environment Variables Setup

When deploying to Vercel, you **MUST** set these environment variables in your Vercel dashboard:

### Required Environment Variables:

```bash
# Supabase Configuration (CRITICAL)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Email Notifications (OPTIONAL - for contact form notifications)
RESEND_API_KEY=your_resend_api_key_here

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