"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { GithubIcon } from "@/components/icons/github"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu05Icon } from "@hugeicons/core-free-icons"
import { SignInButton } from "./sign-button"
import { SignUpButton } from "./signup-button"

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="w-full bg-black border-b border-zinc-800/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-white">
          <motion.div
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 18,
            }}
            className="rounded-md shadow-sm shadow-zinc-900/40"
          >
            <Image
              src="/g0-logo.png"
              alt="G0 logo"
              width={60}
              height={60}
              className="rounded-md"
            />
          </motion.div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-7 mx-auto text-xs">
          <NavItem href="#">Features</NavItem>
          <NavItem href="#">Pricing</NavItem>
          <NavItem href="#">Testimonials</NavItem>
          <NavItem href="#">About</NavItem>
          <NavItem href="#">FAQ</NavItem>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-5">
        <SignUpButton />
        <SignInButton />
        <GithubIcon className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
        
        
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-zinc-300 hover:text-white hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <HugeiconsIcon icon={Menu05Icon} strokeWidth={2} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-800/70 bg-black/95 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-sm">
            <NavItem href="#">Features</NavItem>
            <NavItem href="#">Pricing</NavItem>
            <NavItem href="#">Testimonials</NavItem>
            <NavItem href="#">About</NavItem>
            <NavItem href="#">FAQ</NavItem>
            <SignUpButton />
              <SignInButton />
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-zinc-800/70 pt-4">
              <Link
                href="#"
                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <GithubIcon className="h-5 w-5" />
                <span className="font-mono uppercase tracking-[0.18em]">
                  Github
                </span>
              </Link>
              
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {  
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-1 text-xs tracking-wide text-zinc-400 transition-colors hover:text-white"
    >
      <span className="relative">
        {children}
        <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
      </span>
    </Link>
  )
}
