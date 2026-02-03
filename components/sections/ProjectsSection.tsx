import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

export function ProjectsSection() {
    return (
        <section id="projects" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 rounded-full">
                        <FolderGit2 className="h-4 w-4 text-violet-500" />
                        <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                            My Work
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Featured{" "}
                        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Here are some of my recent projects that showcase my skills and passion for building
                        great digital experiences.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className="group bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Project Image */}
                            <div className="aspect-video bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 relative overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-center"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    {project.liveUrl && (
                                        <Button variant="secondary" size="sm" asChild>
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                Live
                                            </a>
                                        </Button>
                                    )}
                                    {project.githubUrl && (
                                        <Button variant="secondary" size="sm" asChild>
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <Github className="h-4 w-4 mr-2" />
                                                Code
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <CardHeader>
                                <CardTitle className="text-lg group-hover:text-violet-500 transition-colors">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 4).map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="secondary"
                                            className="text-xs bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/20"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{project.technologies.length - 4}
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
