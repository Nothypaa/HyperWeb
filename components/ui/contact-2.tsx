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
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
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
    <section id="contact" className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a href={web.url} target="_blank" className="underline">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto flex max-w-screen-xl flex-col gap-6 rounded-3xl border p-12">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="fullname">Full Name <span className="text-red-500">*</span></Label>
                <Input 
                  type="text" 
                  id="fullname" 
                  placeholder="Jean Dupont"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                />
              </div>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showPhoneField 
                ? 'max-h-20 opacity-100 transform translate-y-0' 
                : 'max-h-0 opacity-0 transform -translate-y-2'
            }`}>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  type="tel" 
                  id="phone" 
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-development">Web Development Project</SelectItem>
                  <SelectItem value="web-design">Web Design & UX/UI</SelectItem>
                  <SelectItem value="consultation">Free Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea placeholder="Hello! I'm interested in developing a modern website for my business. Could we schedule a consultation to discuss my project requirements and timeline?" id="message" />
            </div>
            <Button className="w-full">Send Message</Button>
          </div>
        </div>
      </div>
    </section>
  );
};