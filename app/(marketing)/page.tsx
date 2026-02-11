'use client'

import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react"
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Sparkles, Target, Trophy, Users, ArrowRight, CheckCircle2, Heart, Star, Book, Zap, Loader } from "lucide-react"

export default function Home() {


  const features = [
    {
      icon: Target,
      title: "Bite-sized Lessons",
      description: "Learn civic responsibility in 5-minute daily lessons designed to fit your schedule",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Trophy,
      title: "Gamified Progress",
      description: "Earn badges, compete on leaderboards, and maintain your learning streak",
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: Heart,
      title: "Real Impact",
      description: "Apply what you learn to make a difference in your community today",
      color: "from-emerald-500 to-green-600"
    },
  ]

  const topics = [
    "Voting Rights", "Environmental Care", "Community Service",
    "Traffic Rules", "Public Etiquette", "Civic Duties",
    "Local Governance", "Social Responsibility"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs - More subtle */}
        <motion.div
          className="absolute top-20 -left-32 w-[400px] h-[400px] bg-gradient-to-br from-green-300/20 to-emerald-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-gradient-to-br from-teal-300/15 to-cyan-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Floating Icons - Reduced and more subtle */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-40"
            style={{
              left: `${15 + (i * 15) % 70}%`,
              top: `${10 + (i * 18) % 70}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {['🏛️', '🌍', '🤝', '♻️', '🚦', '📚'][i]}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-16 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full px-4 py-2 mb-6 shadow-sm"
              >
                <Zap className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-gray-700">Learn civic sense in just 5 minutes a day</span>
              </motion.div>

              <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Be the Change
                </span>
                <br />
                <span className="text-gray-800">Your Community Needs</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                Master civic responsibility through fun, bite-sized lessons. Join thousands learning how to be better citizens — one lesson at a time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <ClerkLoading>
                  <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>

                <ClerkLoaded>
                  <SignedOut>
                    <SignUpButton
                      mode="modal"
                      forceRedirectUrl="/learn"
                    >
                      <Button size="lg" variant="secondary">
                        Start Learning Free
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </SignUpButton>

                    <SignInButton
                      mode="modal"
                      forceRedirectUrl="/learn"
                    >
                      <Button size="lg" variant="primary-outline">
                        I already have an account
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </SignInButton>
                  </SignedOut>

                  <SignedIn>
                    <Button size="lg" onClick={() => window.location.href = "/learn"}>
                      Go to Dashboard
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </SignedIn>
                </ClerkLoaded>



              </div>


            </motion.div>

            {/* Right - App Preview */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative"
            >
              {/* Phone Mockup */}
              <div className="relative mx-auto w-[320px] h-[640px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Mock App Content */}
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 h-48 relative flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Trophy className="w-20 h-20 text-white" />
                    </motion.div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-bold">
                      🔥 7 day streak
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg">Daily Quest</h3>
                      <span className="text-sm text-gray-500">5 min</span>
                    </div>
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4 flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">Lesson {i}</div>
                          <div className="text-xs text-gray-500">Completed</div>
                        </div>
                        <div className="text-2xl">{'⭐'.repeat(i)}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Achievement Cards */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-2xl p-4 border-2 border-green-200"
              >
                <Trophy className="w-8 h-8 text-green-500 mb-2" />
                <div className="text-sm font-bold text-gray-800">New Badge!</div>
              </motion.div>

              <motion.div
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.4, type: "spring" }}
                className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-2xl p-4 border-2 border-emerald-200"
              >
                <Star className="w-8 h-8 text-emerald-500 mb-2" />
                <div className="text-sm font-bold text-gray-800">100 XP Earned</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-24">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Why Learners Love Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learning civic sense has never been this engaging and effective
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white hover:shadow-2xl transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Topics Grid */}
        <section className="container mx-auto px-6 py-24">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-black mb-4 text-gray-800">
              What You'll Master
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive civic education, one topic at a time
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-green-100 hover:border-green-300 transition-all cursor-pointer shadow-lg hover:shadow-xl"
              >
                <Book className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <div className="font-bold text-gray-800">{topic}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-24">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
            </div>

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-16 h-16 text-yellow-300" />
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
                Join over 50,000 learners building better communities through civic education
              </p>
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 rounded-full px-10 py-7 text-xl font-bold shadow-2xl hover:shadow-white/50 hover:-translate-y-1 transition-all"
              >
                Get Started — It's Free
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}