# Contact Form Backend - SQLite Implementation

## Overview
Your website now has a fully functional self-hosted backend that captures and stores contact form submissions using SQLite database.

## What's Been Implemented

### 🗄️ **Database System** (`lib/db.ts`)
- SQLite database with two tables:
  - `contacts` - Stores form submissions
  - `rate_limits` - Prevents spam (max 5 submissions per IP per hour)
- Automatic database initialization
- Data validation and sanitization

### 🚀 **API Endpoint** (`app/api/contact/route.ts`)
- Handles POST requests from contact form
- Input validation (email format, phone format, required fields)
- Rate limiting (5 submissions per hour per IP)
- Honeypot spam protection
- Returns JSON responses with success/error status

### 📝 **Updated Contact Form** (`components/ui/contact-2.tsx`)
- Form now submits to `/api/contact`
- Loading states during submission
- Success/error message display
- Form resets after successful submission
- Disabled button until required fields are filled

### 👨‍💼 **Admin Interface** (`/admin`)
- View all contact submissions
- Responsive design
- Shows submission details, timestamps, and IP addresses
- Access via: `http://localhost:3001/admin`

### 🔧 **Configuration** (`.env.local`)
```
DATABASE_PATH=./data/contacts.db
RATE_LIMIT_PER_HOUR=5
```

## File Structure
```
├── app/
│   ├── api/
│   │   ├── contact/route.ts          # Main API endpoint
│   │   └── admin/contacts/route.ts   # Admin API
│   └── admin/page.tsx                # Admin interface
├── lib/db.ts                         # Database operations
├── data/contacts.db                  # SQLite database (auto-created)
├── components/ui/contact-2.tsx       # Updated form component
└── .env.local                        # Configuration
```

## Database Schema

### Contacts Table
| Field      | Type     | Description                    |
|------------|----------|--------------------------------|
| id         | INTEGER  | Auto-increment primary key     |
| full_name  | TEXT     | Contact's full name            |
| email      | TEXT     | Contact's email address        |
| phone      | TEXT     | Phone number (optional)        |
| subject    | TEXT     | Selected service type          |
| message    | TEXT     | Message content (optional)     |
| created_at | DATETIME | Timestamp of submission        |
| ip_address | TEXT     | Client IP (for rate limiting)  |

## Features

### ✅ **Security Features**
- **Rate Limiting**: Max 5 submissions per IP per hour
- **Input Validation**: Email format, phone format, field length limits
- **Honeypot Protection**: Hidden field to catch bots
- **SQL Injection Prevention**: Uses prepared statements
- **Input Sanitization**: Trims and limits input length

### ✅ **User Experience**
- **Loading States**: Shows spinner during submission
- **Success Messages**: Green success notification
- **Error Handling**: Red error messages with details
- **Form Reset**: Clears form after successful submission
- **Progressive Fields**: Phone field appears after name/email

### ✅ **Admin Features**
- **View All Submissions**: Complete list with details
- **Responsive Design**: Works on all devices
- **Formatted Timestamps**: French locale formatting
- **Subject Translation**: Shows French labels for service types

## How to Use

### 1. **Start Development Server**
```bash
npm run dev
```
Your site will be available at `http://localhost:3001`

### 2. **Test the Contact Form**
1. Go to `http://localhost:3001` 
2. Scroll to contact section
3. Fill out the form and submit
4. Check for success message

### 3. **View Submissions**
Visit `http://localhost:3001/admin` to see all contact submissions

### 4. **Database Location**
The SQLite database file is created at: `./data/contacts.db`

### 5. **Rate Limiting**
- Each IP address can submit max 5 forms per hour
- Counter resets every hour
- Rate limit exceeded returns 429 error

## Production Deployment

### Environment Variables
Make sure to set these in production:
- `DATABASE_PATH` - Path to SQLite file
- `RATE_LIMIT_PER_HOUR` - Submissions per hour per IP

### Security Recommendations
1. **Add Authentication** to `/admin` route
2. **Use HTTPS** in production
3. **Regular Backups** of `contacts.db` file
4. **Monitor Rate Limits** and adjust as needed

### Database Backup
```bash
# Backup database
cp ./data/contacts.db ./backups/contacts-$(date +%Y%m%d).db

# Or export to SQL
sqlite3 ./data/contacts.db .dump > backup.sql
```

## Troubleshooting

### Common Issues
1. **Port 3000 in use**: App automatically uses 3001
2. **Database permissions**: Ensure `data/` directory is writable
3. **Missing dependencies**: Run `npm install` if needed

### Debug Mode
Check browser console and terminal for error messages during form submission.

## Next Steps (Optional Enhancements)

1. **Email Notifications**: Add SMTP to send emails on form submission
2. **Export to CSV**: Add export functionality to admin panel  
3. **Authentication**: Secure admin panel with login
4. **Analytics**: Track submission patterns and conversion rates

Your contact form is now fully functional with SQLite backend! 🎉