"use client";

import { Mail, MapPin, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { personalInfo } from "@/data/personal";

export function ContactSection() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Form submission logic will be added later
        console.log("Form submitted");
    };

    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 rounded-full">
                        <MessageSquare className="h-4 w-4 text-violet-500" />
                        <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                            Get In Touch
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Let's Work{" "}
                        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                            Together
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                        Drop me a message and let's create something amazing.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg text-white">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Email</h3>
                                        <a
                                            href={`mailto:${personalInfo.email}`}
                                            className="text-muted-foreground hover:text-violet-500 transition-colors"
                                        >
                                            {personalInfo.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg text-white">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Location</h3>
                                        <p className="text-muted-foreground">{personalInfo.location}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Decorative Card */}
                        <Card className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border-violet-500/20">
                            <CardContent className="p-6">
                                <p className="text-muted-foreground italic">
                                    "The best way to predict the future is to create it."
                                </p>
                                <p className="text-sm text-violet-500 mt-2">— Peter Drucker</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">
                                            Name
                                        </label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            className="bg-background/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className="bg-background/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">
                                        Subject
                                    </label>
                                    <Input
                                        id="subject"
                                        placeholder="Project Inquiry"
                                        className="bg-background/50"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell me about your project..."
                                        className="bg-background/50 min-h-[120px]"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white shadow-lg shadow-violet-500/25"
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
