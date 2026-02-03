import { Sparkles, Code, Database, Server, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillCategories } from "@/data/skills";

const categoryIcons: Record<string, React.ReactNode> = {
    frontend: <Code className="h-5 w-5" />,
    backend: <Server className="h-5 w-5" />,
    database: <Database className="h-5 w-5" />,
    devops: <Wrench className="h-5 w-5" />,
};

export function SkillsSection() {
    return (
        <section id="skills" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 rounded-full">
                        <Sparkles className="h-4 w-4 text-violet-500" />
                        <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                            Technical Expertise
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Skills &{" "}
                        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                            Technologies
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        The tools and technologies I use to bring ideas to life.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {skillCategories.map((category) => (
                        <Card
                            key={category.id}
                            className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
                        >
                            <CardHeader className="flex flex-row items-center gap-3 pb-4">
                                <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg text-white">
                                    {categoryIcons[category.id] || <Code className="h-5 w-5" />}
                                </div>
                                <CardTitle className="text-xl">{category.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {category.skills.map((skill) => (
                                    <div key={skill.name} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">{skill.name}</span>
                                            <span className="text-xs text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
