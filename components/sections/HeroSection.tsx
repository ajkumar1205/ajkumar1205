import { ArrowDown, ExternalLink, Github, Linkedin, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/personal";

export function HeroSection() {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 dark:from-violet-500/5 dark:to-fuchsia-500/5" />

            {/* Animated Background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Greeting */}
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full border border-violet-500/20">
                        <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                            👋 Welcome to my portfolio
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        Hi, I'm{" "}
                        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                            {personalInfo.name}
                        </span>
                    </h1>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground">
                        {personalInfo.title}
                    </h2>

                    {/* Tagline */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {personalInfo.tagline}. I craft beautiful, performant, and accessible
                        web & mobile experiences that users love.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
                            asChild
                        >
                            <a href="#projects">
                                View My Work
                                <ArrowDown className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a href={personalInfo.resumeUrl || "#"} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Resume
                            </a>
                        </Button>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-4 pt-8">
                        <Button variant="ghost" size="icon" className="hover:text-violet-500" asChild>
                            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                                <Github className="h-6 w-6" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:text-violet-500" asChild>
                            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:text-violet-500" asChild>
                            <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" title="LeetCode">
                                <Code2 className="h-6 w-6" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowDown className="h-6 w-6" />
                </a>
            </div>
        </section>
    );
}
