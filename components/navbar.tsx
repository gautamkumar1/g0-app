"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Navbar() {
  return (
    <header className="w-full bg-black border-b border-zinc-800/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

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

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 mx-auto">
          <NavItem href="#" hasChevron>
            Features
          </NavItem>
          <NavItem href="#">Pricing</NavItem>
          <NavItem href="#">Testimonials</NavItem>
          <NavItem href="#">About</NavItem>
          <NavItem href="#">FAQ</NavItem>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="rounded-full bg-white px-5 text-sm font-medium text-black hover:bg-white/90"
          >
            Log in
          </Button>

          <Button
            className="rounded-full bg-zinc-800 px-5 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </header>
  )
}

function NavItem({
  href,
  children,
  hasChevron = false,
}: {
  href: string
  children: React.ReactNode
  hasChevron?: boolean
}) {  
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-1 text-sm uppercase tracking-wide text-zinc-400 transition-colors hover:text-white"
    >
      <span className="relative">
        {children}
        <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
      </span>
    </Link>
  )
}
