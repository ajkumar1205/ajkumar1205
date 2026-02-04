"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Github, Linkedin, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { personalInfo } from "@/data/personal";

const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
    { href: "/blogs", label: "Blog", isPage: true },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
                >
                    Ajay Kumar
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        'isPage' in link && link.isPage ? (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </a>
                        )
                    ))}
                </div>

                {/* Social Links - Desktop */}
                <div className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                            <Github className="h-5 w-5" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" title="LeetCode">
                            <Code2 className="h-5 w-5" />
                        </a>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-72">
                        <div className="flex flex-col gap-6 mt-8">
                            {navLinks.map((link) => (
                                'isPage' in link && link.isPage ? (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                )
                            ))}
                            <div className="flex items-center gap-4 pt-4 border-t">
                                <Button variant="ghost" size="icon" asChild>
                                    <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="h-5 w-5" />
                                    </a>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer">
                                        <Code2 className="h-5 w-5" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
