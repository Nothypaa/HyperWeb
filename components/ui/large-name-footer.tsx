"use client";
import Link from "next/link";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <footer className=" py-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="icon-class w-8" />
              <h2 className="text-lg font-bold">HyperWeb</h2>
            </Link>

            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()} HyperWeb. Tous droits réservés.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Pages</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Réseaux Sociaux</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://www.instagram.com/agencehyperweb/?utm_source=ig_web_button_share_sheet" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/agencehyperweb" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/agencehyperweb" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    X
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Politique de Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/tos" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Conditions d'Utilisation
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" w-full flex mt-4 items-center justify-center   ">
          <h1 className="text-center text-2xl sm:text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-50 dark:from-neutral-700 dark:to-neutral-900 select-none">
            HyperWeb
          </h1>
        </div>
      
      </div>
    </footer>
  );
}

export { Footer };
