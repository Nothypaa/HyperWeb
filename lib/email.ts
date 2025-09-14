import { Resend } from 'resend'
import type { Contact } from './supabase'

// =======================================
// EMAIL CONFIGURATION
// =======================================

const resend = new Resend(process.env.RESEND_API_KEY)

// Email settings
const ADMIN_EMAIL = 'contact@agencehyperweb.com' // Your business email
const FROM_EMAIL = 'onboarding@resend.dev' // Resend's verified domain for testing

// =======================================
// EMAIL TEMPLATES
// =======================================

function generateContactNotificationEmail(contact: Contact): {
  subject: string
  html: string
  text: string
} {
  const subjectMap = {
    'web-development': 'Développement Web',
    'web-design': 'Design Web', 
    'consultation': 'Consultation'
  }

  const subject = `🔥 Nouveau Contact - ${subjectMap[contact.subject]} | ${contact.full_name}`
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800,900&display=swap" rel="stylesheet">
        <style>
          body { 
            font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            line-height: 1.5; 
            color: hsl(222.2, 84%, 4.9%);
            background: hsl(0, 0%, 100%);
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: hsl(0, 0%, 100%);
          }
          .header { 
            background: hsl(222.2, 47.4%, 11.2%);
            color: hsl(210, 40%, 98%); 
            padding: 32px 24px; 
            text-align: center; 
            border-radius: 0.5rem 0.5rem 0 0;
          }
          .header h1 { 
            margin: 0 0 8px 0; 
            font-size: 24px; 
            font-weight: 700; 
            letter-spacing: -0.025em;
          }
          .header p { 
            margin: 0; 
            font-size: 14px; 
            color: hsl(215.4, 16.3%, 76.9%);
            font-weight: 400;
          }
          .content { 
            background: hsl(0, 0%, 100%); 
            padding: 24px; 
            border: 1px solid hsl(214.3, 31.8%, 91.4%);
            border-top: none;
            border-radius: 0 0 0.5rem 0.5rem;
          }
          .field { 
            margin-bottom: 20px; 
          }
          .field:last-child { 
            margin-bottom: 0; 
          }
          .label { 
            font-weight: 600; 
            font-size: 12px; 
            color: hsl(215.4, 16.3%, 46.9%);
            text-transform: uppercase; 
            letter-spacing: 0.05em; 
            margin-bottom: 8px;
            display: block;
          }
          .value { 
            background: hsl(0, 0%, 100%);
            border: 1px solid hsl(214.3, 31.8%, 91.4%);
            border-radius: calc(0.5rem - 2px);
            padding: 12px 16px; 
            font-size: 14px;
            font-weight: 500;
            transition: all 0.15s ease;
          }
          .value:hover {
            border-color: hsl(214.3, 31.8%, 81.4%);
          }
          .value a {
            color: hsl(222.2, 47.4%, 11.2%);
            text-decoration: none;
            font-weight: 600;
          }
          .value a:hover {
            text-decoration: underline;
          }
          .subject-badge { 
            display: inline-flex;
            align-items: center;
            background: hsl(222.2, 47.4%, 11.2%);
            color: hsl(210, 40%, 98%);
            padding: 4px 12px; 
            border-radius: calc(0.5rem - 2px);
            font-size: 12px; 
            font-weight: 600; 
            text-transform: uppercase;
            letter-spacing: 0.025em;
          }
          .cta { 
            background: hsl(222.2, 47.4%, 11.2%);
            color: hsl(210, 40%, 98%);
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: calc(0.5rem - 2px);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin: 24px 0; 
            font-weight: 600;
            font-size: 14px;
            transition: all 0.15s ease;
          }
          .cta:hover {
            background: hsl(222.2, 47.4%, 9.2%);
            text-decoration: none;
          }
          .footer { 
            text-align: center; 
            margin-top: 24px; 
            padding: 24px; 
            border-top: 1px solid hsl(214.3, 31.8%, 91.4%);
            color: hsl(215.4, 16.3%, 46.9%); 
            font-size: 13px;
          }
          .footer p {
            margin: 0 0 4px 0;
          }
          .cta-container {
            text-align: center;
            margin: 24px 0;
            padding: 20px;
            background: hsl(210, 40%, 98%);
            border-radius: calc(0.5rem - 2px);
            border: 1px solid hsl(214.3, 31.8%, 91.4%);
          }
          @media (max-width: 600px) {
            .container { margin: 16px; }
            .header, .content { padding: 20px; }
            .cta { width: 100%; justify-content: center; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nouveau Contact Reçu</h1>
            <p>Un prospect vient de soumettre votre formulaire de contact</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">👤 Nom Complet</div>
              <div class="value">${contact.full_name}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Adresse Email</div>
              <div class="value"><a href="mailto:${contact.email}">${contact.email}</a></div>
            </div>
            
            ${contact.phone ? `
            <div class="field">
              <div class="label">📱 Téléphone</div>
              <div class="value"><a href="tel:${contact.phone}">${contact.phone}</a></div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">🎯 Service Demandé</div>
              <div class="value"><span class="subject-badge">${subjectMap[contact.subject]}</span></div>
            </div>
            
            ${contact.message ? `
            <div class="field">
              <div class="label">💬 Message</div>
              <div class="value">${contact.message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">🕐 Reçu le</div>
              <div class="value">${new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</div>
            </div>
            
            <div class="cta-container">
              <a href="https://agencehyperweb.com/admin" class="cta">
                <span>🚀</span>
                <span>Ouvrir le Panel Admin</span>
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Agence HyperWeb Montpellier</strong></p>
            <p>Notification automatique • Système de gestion de contacts</p>
          </div>
        </div>
      </body>
    </html>
  `

  const text = `
🔥 NOUVEAU CONTACT - ${subjectMap[contact.subject]}

👤 Nom: ${contact.full_name}
📧 Email: ${contact.email}
${contact.phone ? `📱 Téléphone: ${contact.phone}\n` : ''}
🎯 Sujet: ${subjectMap[contact.subject]}
${contact.message ? `💬 Message: ${contact.message}\n` : ''}
🕐 Reçu: ${new Date().toLocaleDateString('fr-FR')}

🚀 Voir dans le panel admin: https://agencehyperweb.com/admin

---
Agence HyperWeb Montpellier
Notification automatique de formulaire de contact
  `

  return { subject, html, text }
}

// =======================================
// EMAIL SENDING FUNCTIONS
// =======================================

export async function sendContactNotification(contact: Contact): Promise<{
  success: boolean
  error?: string
  messageId?: string
}> {
  try {
    console.log('📧 Sending contact notification email...')
    
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ RESEND_API_KEY not configured, skipping email notification')
      return { success: false, error: 'Email service not configured' }
    }

    const { subject, html, text } = generateContactNotificationEmail(contact)
    
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject,
      html,
      text,
      tags: [
        { name: 'type', value: 'contact_notification' },
        { name: 'subject', value: contact.subject },
      ],
    })

    if (error) {
      console.error('❌ Failed to send email notification:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ Contact notification sent successfully:', data?.id)
    return { success: true, messageId: data?.id }

  } catch (error) {
    console.error('❌ Email notification error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown email error' 
    }
  }
}

// =======================================
// EMAIL VALIDATION
// =======================================

export function validateEmailConfig(): {
  configured: boolean
  issues: string[]
} {
  const issues: string[] = []
  
  if (!process.env.RESEND_API_KEY) {
    issues.push('RESEND_API_KEY environment variable missing')
  }
  
  if (!ADMIN_EMAIL.includes('@')) {
    issues.push('Invalid admin email address')
  }
  
  if (!FROM_EMAIL.includes('@')) {
    issues.push('Invalid from email address')
  }

  return {
    configured: issues.length === 0,
    issues
  }
}

// Health check for email service
export async function healthCheckEmail(): Promise<{
  status: 'operational' | 'degraded' | 'down'
  configured: boolean
  issues?: string[]
}> {
  const validation = validateEmailConfig()
  
  if (!validation.configured) {
    return {
      status: 'down',
      configured: false,
      issues: validation.issues
    }
  }

  // Could add actual API health check here if needed
  return {
    status: 'operational',
    configured: true
  }
}