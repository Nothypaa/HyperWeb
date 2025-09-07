import { NextRequest, NextResponse } from 'next/server';

// Input validation and security functions
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return request.ip || 'unknown';
}

// Rate limiting - simple in-memory store (consider Redis for production)
const rateLimits = new Map<string, { count: number; resetTime: number }>();

function checkChatRateLimit(ip: string, maxRequests: number = 10): boolean {
  const now = Date.now();
  const windowMs = 60000; // 1 minute window
  
  const current = rateLimits.get(ip) || { count: 0, resetTime: now + windowMs };
  
  if (now > current.resetTime) {
    current.count = 1;
    current.resetTime = now + windowMs;
  } else {
    current.count++;
  }
  
  rateLimits.set(ip, current);
  return current.count <= maxRequests;
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 2000); // Limit message length
}

// AI consultation logic
function generateClaudePrompt(userMessage: string, conversationHistory: any[]): string {
  const context = `Tu es un conseiller digital expert pour une agence web française basée à Montpellier. 

TON RÔLE:
- Aider les clients à déterminer quel type de site web convient le mieux à leur entreprise
- Recommander parmi 3 offres: Essentiel (450€), Premium (750€), ou Sur Mesure (sur devis)
- Parler en français, être professionnel mais accessible
- Poser des questions pertinentes pour bien cerner leurs besoins

OFFRES À RECOMMANDER:

ESSENTIEL (450€) - Pour:
- Petites entreprises, artisans, professions libérales
- Besoin d'une présence web simple
- 5 pages maximum, formulaire de contact, SEO de base

PREMIUM (750€) - Pour:
- Entreprises en croissance
- Besoin de vendre en ligne ou fonctionnalités avancées
- 9 pages, e-commerce, CMS, animations, optimisations performances

SUR MESURE - Pour:
- Applications web complexes
- Besoins très spécifiques
- Tableau de bord, authentification, intégrations API

QUESTIONS À POSER:
- Type d'entreprise et secteur d'activité
- Objectifs principaux du site (vitrine, vente, génération de leads)
- Public cible et zone géographique
- Besoin de vendre en ligne
- Budget approximatif
- Fonctionnalités spécifiques souhaitées

STYLE DE RÉPONSE:
- Phrases courtes et claires
- Utilise des exemples concrets
- Pose UNE question à la fois
- Mentionne les avantages spécifiques à Montpellier/région si pertinent
- Termine toujours par une question pour continuer la conversation

Message de l'utilisateur: "${userMessage}"

${conversationHistory.length > 0 ? `Historique de la conversation: ${JSON.stringify(conversationHistory.slice(-4))}` : ''}`;

  return context;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIp = getClientIp(request);

    // Rate limiting
    if (!checkChatRateLimit(clientIp, 10)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Trop de messages envoyés. Veuillez patienter une minute.' 
        },
        { status: 429 }
      );
    }

    const { message, conversationHistory = [] } = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message requis' },
        { status: 400 }
      );
    }

    const sanitizedMessage = sanitizeInput(message);
    
    if (sanitizedMessage.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message vide' },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Service temporairement indisponible' 
        },
        { status: 500 }
      );
    }

    // Call Claude API
    const prompt = generateClaudePrompt(sanitizedMessage, conversationHistory);
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      console.error('Claude API error:', response.status, response.statusText);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Désolé, je rencontre une difficulté technique. Pouvez-vous réessayer ?' 
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse = data.content[0]?.text || 'Désolé, je n\'ai pas pu traiter votre demande.';

    // Log for analytics (optional)
    console.log(`Chat interaction - IP: ${clientIp}, Message length: ${sanitizedMessage.length}`);

    return NextResponse.json({
      success: true,
      response: aiResponse
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Une erreur inattendue s\'est produite. Veuillez réessayer.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  );
}