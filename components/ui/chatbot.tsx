'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FadeUp } from '@/components/ui/fade-up'
import { X, Send, Loader2, Shield } from 'lucide-react'
import { HyperWebIcon } from '@/components/ui/hyperweb-icon'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatbotProps {
  className?: string
}

export const Chatbot: React.FC<ChatbotProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConsenting, setIsConsenting] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Show prompt bubble after 10 seconds if user hasn't interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setShowPrompt(true)
      }
    }, 10000) // 10 seconds

    return () => clearTimeout(timer)
  }, [hasInteracted, isOpen])

  const handleConsent = (accepted: boolean) => {
    if (accepted) {
      setIsConsenting(false)
      // Add welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        content: 'Bonjour ! Je suis votre conseiller digital. Je vais vous aider à déterminer le type de site web parfait pour votre entreprise. Commençons par le début : quel type d\'entreprise dirigez-vous ?',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    } else {
      setIsOpen(false)
    }
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call to Claude
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputValue, 
          conversationHistory: messages 
        })
      })

      const data = await response.json()
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: data.response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: 'Désolé, une erreur s\'est produite. Pouvez-vous réessayer ?',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleInputFocus = () => {
    setIsInputFocused(true)
  }

  const handleInputBlur = () => {
    setIsInputFocused(false)
  }

  const handleChatOpen = () => {
    setIsOpen(true)
    setHasInteracted(true)
    setShowPrompt(false)
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
    setHasInteracted(true)
  }

  // Animation variants
  const chatVariants = {
    hidden: {
      scale: 0.2,
      opacity: 0,
      x: 300,
      y: 100,
      rotate: -5,
      filter: 'blur(10px)',
      originX: 1,
      originY: 1,
    },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300,
        mass: 0.8,
      },
    },
    exit: {
      scale: 0.2,
      opacity: 0,
      x: 300,
      y: 100,
      rotate: 5,
      filter: 'blur(10px)',
      originX: 1,
      originY: 1,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 200,
        mass: 1.0,
      },
    },
  }

  const buttonVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 300,
        delay: 0.3,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      rotate: 180,
      transition: {
        duration: 0.2,
        ease: 'easeInOut' as const,
      },
    },
  }

  const promptVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 10,
      filter: 'blur(4px)',
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 300,
        duration: 0.8,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: -10,
      filter: 'blur(4px)',
      transition: {
        duration: 0.4,
      },
    },
  }

  // RGPD Consent Modal
  const ConsentModal = () => (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-sm w-full shadow-xl border">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-blue-600" />
          <h3 className="font-bold text-lg">Protection des données</h3>
        </div>
        <div className="text-sm text-muted-foreground mb-6 leading-relaxed space-y-3">
          <p>
            Notre assistant IA utilise vos messages pour vous conseiller sur nos services web. 
            Les conversations sont temporaires et traitées via Claude AI (Anthropic).
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <p className="text-xs">
              <strong>Vos droits RGPD :</strong> Accès, rectification, suppression de vos données. 
              Plus d'infos dans notre{' '}
              <a 
                href="/politique-confidentialite" 
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Politique de Confidentialité
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => handleConsent(false)}
            variant="outline" 
            className="flex-1 rounded-full"
          >
            Refuser
          </Button>
          <Button 
            onClick={() => handleConsent(true)}
            className="flex-1 rounded-full bg-black text-white hover:bg-gray-800"
          >
            Accepter
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              key="toggle-button"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ willChange: 'transform' }}
            >
              <Button
                onClick={handleChatOpen}
                className="h-14 w-14 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                size="icon"
              >
                <HyperWebIcon className="h-6 w-6" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Prompt Bubble */}
        <AnimatePresence>
          {showPrompt && !isOpen && (
            <motion.div
              key="prompt-bubble"
              variants={promptVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-24 right-6 max-w-xs"
              style={{ willChange: 'transform' }}
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 p-4 mr-2">
                {/* Speech bubble pointer */}
                <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-600 rotate-45"></div>
                
                {/* Close button */}
                <button
                  onClick={dismissPrompt}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
                
                {/* Content */}
                <div className="pr-6">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    Pour obtenir une estimation simulée ou toute question sur les sites web, vous pouvez aussi parler avec{' '}
                    <span className="font-semibold text-black dark:text-white">Hyper</span>, notre agent IA
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="chat-window"
            className={cn(
              "fixed right-6 z-50",
              isInputFocused ? "bottom-12" : "bottom-6"
            )}
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ willChange: 'transform' }}
          >
            <Card className={cn(
              "w-96 min-h-[400px] max-h-[600px] shadow-2xl border-0 bg-white dark:bg-gray-900 relative overflow-hidden flex flex-col",
              className
            )}>
              {/* Header */}
              <CardHeader className="bg-black text-white p-4 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <HyperWebIcon className="h-4 w-4 text-black dark:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Conseiller Web IA</h3>
                      <p className="text-xs text-gray-300">Trouvez votre site idéal</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-4 overflow-y-auto min-h-[200px]">
                <div className="space-y-4 h-full flex flex-col justify-end">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] p-3 rounded-2xl text-sm",
                          message.sender === 'user'
                            ? 'bg-black text-white rounded-br-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md'
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-bl-md">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Tapez votre message..."
                    className="rounded-full border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-black transition-all"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    size="icon"
                    className="rounded-full bg-black text-white hover:bg-gray-800 flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* RGPD Consent Modal */}
              {isConsenting && <ConsentModal />}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}