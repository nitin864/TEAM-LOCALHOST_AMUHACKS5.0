"use client"
import { Button } from "@/components/ui/button"
import {
  ClerkLoading,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs"
import { Loader } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4 relative overflow-hidden bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
          className="absolute -top-10 -left-20 w-40 h-40 bg-gradient-to-br from-green-300/20 to-emerald-400/20 rounded-full blur-2xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-8 -right-16 w-36 h-36 bg-gradient-to-br from-teal-300/15 to-cyan-400/15 rounded-full blur-2xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Floating Icons */}
        {['🏛️', '🌍', '🤝'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-30"
            style={{
              left: `${20 + i * 30}%`,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full relative z-10">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image
            src="/mascot.svg"
            height={40}
            width={40}
            alt="Mascot"
            priority
          />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Civic Learn
          </h1>
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              forceRedirectUrl="/learn"
            >
              <Button size="lg" variant="ghost">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  )
}