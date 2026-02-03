import { Github, Linkedin, Code2, Instagram, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { personalInfo } from "@/data/personal";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted/30 border-t border-border/40">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                            Ajay Kumar
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            Software Engineer passionate about building scalable applications and beautiful user experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Quick Links</h4>
                        <nav className="flex flex-col gap-2">
                            <a href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Home
                            </a>
                            <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Projects
                            </a>
                            <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Experience
                            </a>
                            <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Skills
                            </a>
                            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Contact
                            </a>
                        </nav>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Connect</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                            <Button variant="outline" size="icon" asChild>
                                <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                                    <Github className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                    <Linkedin className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" title="LeetCode">
                                    <Code2 className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                                    <Instagram className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {currentYear} Ajay Kumar. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using Next.js & Tailwind
                    </p>
                </div>
            </div>
        </footer>
    );
}
