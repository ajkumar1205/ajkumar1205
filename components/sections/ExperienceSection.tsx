import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
    return (
        <section id="experience" className="py-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 rounded-full">
                        <Briefcase className="h-4 w-4 text-violet-500" />
                        <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                            Career Journey
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Work{" "}
                        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                            Experience
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        My professional journey and the amazing teams I've had the pleasure to work with.
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-violet-500 to-fuchsia-500" />

                        {experiences.map((exp, index) => (
                            <div
                                key={exp.id}
                                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-violet-500 rounded-full border-4 border-background shadow-lg shadow-violet-500/50" />

                                {/* Content */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300">
                                        <CardContent className="p-6 space-y-4">
                                            {/* Company & Role */}
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                                                <p className="text-lg font-medium text-violet-500">{exp.company}</p>
                                            </div>

                                            {/* Date & Duration & Location */}
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{exp.startDate} - {exp.endDate}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{exp.location}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-muted-foreground">{exp.description}</p>

                                            {/* Responsibilities */}
                                            <ul className="space-y-2">
                                                {exp.responsibilities.map((resp, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                                                        {resp}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Technologies */}
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {exp.technologies.map((tech) => (
                                                    <Badge
                                                        key={tech}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
