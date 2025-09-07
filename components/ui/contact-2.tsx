"use client"

import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from '@/components/animate-ui/headless/checkbox';
import { Field, Label as HeadlessLabel } from '@headlessui/react';

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

export const Contact2 = ({
  title = "Nous contacter",
  description = "Nous sommes disponibles pour vos questions, commentaires ou opportunités de collaboration. Dites-nous comment nous pouvons vous aider !",
  phone = "(33) 7 67 56 39 26",
  email = "contact@agencehyperweb.com",
  web = { label: "agencehyperweb.com", url: "https://agencehyperweb.com" },
}: Contact2Props) => {
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Spam protection
  const [rgpdConsent, setRgpdConsent] = useState(false); // RGPD consent
  const [showPhoneField, setShowPhoneField] = useState(false);
  const [showRgpdConsent, setShowRgpdConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [animationProgress, setAnimationProgress] = useState(377); // Full circle circumference
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    // Show phone field when both name and email have content
    if (fullName.trim().length > 0 && userEmail.trim().length > 0) {
      setShowPhoneField(true);
    } else {
      setShowPhoneField(false);
    }
  }, [fullName, userEmail]);

  useEffect(() => {
    // Show RGPD consent when user starts typing message
    if (message.trim().length > 0) {
      setShowRgpdConsent(true);
    } else {
      setShowRgpdConsent(false);
    }
  }, [message]);

  const resetForm = () => {
    setSubmitStatus('idle');
    setAnimationProgress(377);
    setShowCheckmark(false);
    setIsSubmitting(false);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Validate RGPD consent
    if (!rgpdConsent) {
      setErrorMessage('Veuillez accepter notre politique de confidentialité pour continuer.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email: userEmail,
          phone: userPhone,
          subject,
          message,
          honeypot
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
        
        // Start circle animation
        setTimeout(() => {
          setAnimationProgress(0); // Complete the circle
        }, 100);
        
        // Show checkmark after circle completes
        setTimeout(() => {
          setShowCheckmark(true);
        }, 1200);
        
        // Reset form after animation
        setTimeout(() => {
          setFullName('');
          setUserEmail('');
          setUserPhone('');
          setSubject('');
          setMessage('');
          setHoneypot('');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-16 md:py-32 lg:py-40 scroll-mt-offset">
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black tracking-tighter mt-5 mb-2 lg:mb-1">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0 hidden lg:block lg:-mt-4">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Coordonnées
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Téléphone : </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">E-mail : </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Site web : </span>
                  <a href={web.url} target="_blank" className="underline">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-none sm:max-w-md lg:max-w-xl flex-col gap-6 md:gap-8 rounded-3xl border p-6 md:p-16">
            {/* Smooth transition wrapper */}
            <div className="relative min-h-[400px]">
              {/* Animated Success State */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center space-y-6 transition-all duration-700 transform-gpu ${
                submitStatus === 'success' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-105 pointer-events-none'
              }`}>
                {/* Animated Circle with Checkmark */}
                <div className="relative">
                  {/* Background circle */}
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      className="text-gray-200"
                    />
                    {/* Animated progress circle */}
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      className="text-black transition-all duration-1000 ease-out"
                      style={{
                        strokeDasharray: 377,
                        strokeDashoffset: animationProgress
                      }}
                    />
                  </svg>
                  
                  {/* Checkmark icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg 
                      className={`w-16 h-16 text-black transition-all duration-500 ${
                        showCheckmark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Success text */}
                <div className={`text-center space-y-2 transition-all duration-700 delay-1000 ${
                  showCheckmark ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <h3 className="text-2xl font-bold text-gray-900">Message envoyé!</h3>
                  <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais</p>
                </div>
                
                {/* Reset button */}
                <button 
                  onClick={resetForm}
                  className={`text-blue-600 hover:text-blue-700 font-medium transition-all duration-700 delay-1500 ${
                    showCheckmark ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  Envoyer un autre message →
                </button>
              </div>
              
              {/* Form State with smooth transition */}
              <div className={`transition-all duration-700 transform-gpu ${
                submitStatus === 'success' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
              }`}>
                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-red-800 font-medium">Erreur lors de l'envoi</p>
                    </div>
                    <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                  </div>
                )}
            
                
                {/* Honeypot field - hidden from users */}
                <input 
                  type="text" 
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="fullname">Nom complet <span className="text-red-500">*</span></Label>
                <Input 
                  type="text" 
                  id="fullname" 
                  placeholder="Jean Dupont"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 md:h-14 text-base"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="dupont@gmail.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="h-12 md:h-14 text-base"
                />
              </div>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showPhoneField 
                ? 'max-h-28 md:max-h-28 opacity-100 transform translate-y-0' 
                : 'max-h-0 opacity-0 transform -translate-y-2'
            }`}>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input 
                  type="tel" 
                  id="phone" 
                  placeholder="+33 6 12 34 56 78"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="h-12 md:h-14 text-base"
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Sujet <span className="text-red-500">*</span></Label>
              <Select value={subject} onValueChange={setSubject} required>
                <SelectTrigger className="h-12 md:h-14 text-base">
                  <SelectValue placeholder="Sélectionnez un service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-development">Projet de développement web</SelectItem>
                  <SelectItem value="web-design">Design web et UX/UI</SelectItem>
                  <SelectItem value="consultation">Consultation gratuite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                placeholder="Bonjour ! J'aimerais développer un site web pour mon entreprise. Pouvons-nous programmer une consultation ?" 
                id="message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[150px] md:min-h-[200px] text-base p-3 md:p-4"
              />
            </div>
            
            {/* RGPD Consent */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showRgpdConsent 
                ? 'max-h-32 md:max-h-28 opacity-100 transform translate-y-0' 
                : 'max-h-0 opacity-0 transform -translate-y-2'
            }`}>
              <Field className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Checkbox
                  id="rgpd-consent"
                  checked={rgpdConsent}
                  onChange={setRgpdConsent}
                  className="mt-1"
                />
                <HeadlessLabel htmlFor="rgpd-consent" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="text-red-500">*</span> J'accepte que mes données personnelles soient traitées selon la{' '}
                  <a 
                    href="/politique-confidentialite" 
                    target="_blank"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    politique de confidentialité
                  </a>
                  {' '}de HyperWeb. Mes données ne seront utilisées que pour répondre à ma demande.
                </HeadlessLabel>
              </Field>
            </div>
            
            <Button 
              type="submit"
              disabled={isSubmitting || !fullName || !userEmail || !subject || !rgpdConsent}
              className="w-full h-12 md:h-14 text-base font-bold bg-black text-white dark:bg-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  Envoi en cours...
                </div>
              ) : (
                'Envoyer le message'
              )}
            </Button>
            </form>
              </div>
            </div>
          </div>
          <div className="mx-auto w-fit lg:mx-0 lg:hidden">
            <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
              Coordonnées
            </h3>
            <ul className="ml-4 list-disc">
              <li>
                <span className="font-bold">Téléphone : </span>
                {phone}
              </li>
              <li>
                <span className="font-bold">E-mail : </span>
                <a href={`mailto:${email}`} className="underline">
                  {email}
                </a>
              </li>
              <li>
                <span className="font-bold">Site web : </span>
                <a href={web.url} target="_blank" className="underline">
                  {web.label}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};