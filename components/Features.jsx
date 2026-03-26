"use client"

import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { 
  History, 
  Zap, 
  BrainCircuit, 
  Target, 
  Smartphone, 
  Sparkles 
} from "lucide-react";

const features = [
    {
        "title": "Saved Transcripts",
        "description": "All of your interviews are transcribed and saved for future reference.",
        "icon": <History className="w-6 h-6 text-primary" />
    },
    {
        "title": "Realtime Transcriptions",
        "description": "Our transcriptions have a latency of less than 2 seconds, keeping the AI in sync.",
        "icon": <Zap className="w-6 h-6 text-secondary" />
    },
    {
        "title": "AI Growth Engine",
        "description": "Our model learns from successful patterns to boost your 'selection' probability.",
        "icon": <BrainCircuit className="w-6 h-6 text-primary" />
    },
    {
        "title": "Role-Specific Precision",
        "description": "Interview questions are dynamically optimized for your chosen position and role.",
        "icon": <Target className="w-6 h-6 text-secondary" />
    },
    {
        "title": "Cross-Device Mastery",
        "description": "Prepare on any screen. Optimized for mobile, tablet, and desktop experiences.",
        "icon": <Smartphone className="w-6 h-6 text-primary" />
    },
    {
        "title": "Kinetic Feedback",
        "description": "Receive tactical insights and score breakdowns to refine your performance.",
        "icon": <Sparkles className="w-6 h-6 text-secondary" />
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

function Features() {
    return (
        <section id="features" className="relative px-6 py-24 sm:py-32 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/5 blur-[120px] rounded-[100%] pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-20 relative z-10">
                <div className="text-center space-y-4">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold tracking-widest text-xs uppercase"
                    >
                        Tactical Edge
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-foreground"
                    >
                        UNFAIR <span className="italic text-primary">ADVANTAGE</span>.
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-foreground/50 text-lg max-w-2xl mx-auto font-medium"
                    >
                        Don&apos;t just prepare—simulate. Our tactical engine gives you the exact tools used by elite candidates to dominate interviews.
                    </motion.p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((item, idx) => (
                        <motion.div key={idx} variants={itemVariants}>
                            <Card className="group relative bg-white/5 border-white/10 hover:border-primary/50 backdrop-blur-md transition-all duration-500 h-full overflow-hidden">
                                {/* Subtle Hover Glow */}
                                <div className="absolute -inset-2 bg-primary/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-full h-20 w-20 top-0 left-0" />
                                
                                <CardContent className="p-8 space-y-6 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-foreground/60 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                                            {item.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Features
