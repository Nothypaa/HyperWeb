# 📧 Email Notification Setup Guide

Your contact form now supports automatic email notifications! Here's how to set it up:

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address

### Step 2: Get Your API Key
1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it: `hyperweb-contact-notifications`
4. Copy the API key (starts with `re_`)

### Step 3: Add API Key to Environment
**For Local Development:**
1. Update `.env.local`:re_WiMXbEA6_KyKtba3tLCDPwkj3Fsyzvk5P
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

**For Vercel Production:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_api_key_here`
   - **Environment**: Production, Preview, Development

### Step 4: Domain Verification (Optional but Recommended)
**For Free Plan (3000 emails/month):**
- You can use `notifications@resend.dev` as sender
- No domain verification needed

**For Custom Domain (Better deliverability):**
1. In Resend dashboard, go to **Domains**
2. Add your domain: `agencehyperweb.com`
3. Add the DNS records they provide
4. Wait for verification

## 📬 What You'll Get

### Email Content:
- 🔥 **Subject**: "Nouveau Contact - [Type] | [Name]"
- 📧 **Beautiful HTML email** with all contact details
- 🚀 **Direct link** to your admin panel
- 📱 **Mobile-friendly** design

### Email Details Include:
- ✅ Full name and email (clickable)
- ✅ Phone number (if provided, clickable)
- ✅ Subject/service type with badge
- ✅ Message (if provided)
- ✅ Timestamp in French format
- ✅ Direct link to admin panel

### Smart Features:
- ⚡ **Instant delivery** after form submission
- 🛡️ **Error handling** - form still works if email fails
- 📊 **Logging** - email status shown in server logs
- 🔄 **Fallback graceful** - doesn't break contact form

## 🧪 Testing

### Test Locally:
1. Start your dev server: `npm run dev`
2. Submit a test contact form
3. Check console logs for email status
4. Check your email inbox

### Check Status:
Look for these log messages:
```
📧 Sending email notification...
✅ Email notification sent successfully
```

Or if not configured:
```
⚠️ RESEND_API_KEY not configured, skipping email notification
```

## 📈 Resend Free Plan Limits:
- ✅ **3,000 emails per month**
- ✅ **100 emails per day**
- ✅ **Perfect for contact forms**
- ✅ **No credit card required**

## 🔧 Configuration

### Email Addresses (in lib/email.ts):
- **Admin Email**: `contact@agencehyperweb.com` (receives notifications)
- **From Email**: `notifications@agencehyperweb.com` (sender address)

### To Change Email Addresses:
Edit `/lib/email.ts`:
```typescript
const ADMIN_EMAIL = 'your-email@example.com'
const FROM_EMAIL = 'notifications@yourdomain.com'
```

## ✅ Production Checklist:
- [ ] Resend account created
- [ ] API key obtained
- [ ] Environment variable added to Vercel
- [ ] Test email sent successfully
- [ ] Domain verification (optional)

## 🎯 Next Steps:
1. **Set up your Resend account** (5 minutes)
2. **Add the API key** to your environment
3. **Deploy to Vercel** 
4. **Test with a real contact submission**
5. **Enjoy instant email notifications!** 🎉

---
**You'll now receive an email notification instantly whenever someone submits your contact form!**