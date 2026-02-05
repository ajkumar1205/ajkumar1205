export interface Skill {
    name: string;
    icon?: string;
    level: number; // 1-100
}

export interface SkillCategory {
    id: string;
    name: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        id: "backend",
        name: "Backend & APIs",
        skills: [
            { name: "Laravel", level: 90 },
            { name: "PHP", level: 90 },
            { name: "Eloquent ORM", level: 88 },
            { name: "REST APIs", level: 95 },
            { name: "Node.js", level: 85 },
            { name: "Django", level: 85 },
        ],
    },
    {
        id: "languages",
        name: "Languages",
        skills: [
            { name: "PHP", level: 90 },
            { name: "JavaScript", level: 90 },
            { name: "TypeScript", level: 90 },
            { name: "Python", level: 85 },
            { name: "Dart", level: 90 },
            { name: "Rust", level: 85 },
        ],
    },
    {
        id: "tools",
        name: "Database & DevOps",
        skills: [
            { name: "PostgreSQL", level: 85 },
            { name: "Docker", level: 85 },
            { name: "Redis", level: 80 },
            { name: "AWS (S3, EC2)", level: 75 },
            { name: "Git", level: 90 },
        ],
    },
    {
        id: "frontend",
        name: "Frontend & Mobile",
        skills: [
            { name: "React", level: 85 },
            { name: "Angular", level: 80 },
            { name: "Flutter", level: 90 },
            { name: "HTML/CSS", level: 90 },
            { name: "Tailwind CSS", level: 85 },
            { name: "Blade", level: 85 },
        ],
    },
];
