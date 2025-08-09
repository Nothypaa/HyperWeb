"use client"

import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [showPhoneField, setShowPhoneField] = useState(false);

  useEffect(() => {
    // Show phone field when both name and email have content
    if (fullName.trim().length > 0 && userEmail.trim().length > 0) {
      setShowPhoneField(true);
    } else {
      setShowPhoneField(false);
    }
  }, [fullName, userEmail]);
  return (
    <section id="contact" className="py-16 md:py-32 lg:py-40 scroll-mt-offset">
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter mt-5 mb-2 lg:mb-1">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0 hidden lg:block">
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
                ? 'max-h-20 md:max-h-20 opacity-100 transform translate-y-0' 
                : 'max-h-0 opacity-0 transform -translate-y-2'
            }`}>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input 
                  type="tel" 
                  id="phone" 
                  placeholder="+33 6 12 34 56 78"
                  className="h-12 md:h-14 text-base"
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Sujet <span className="text-red-500">*</span></Label>
              <Select>
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
                className="min-h-[150px] md:min-h-[200px] text-base p-3 md:p-4"
              />
            </div>
            <Button className="w-full h-12 md:h-14 text-base font-semibold">Envoyer le message</Button>
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