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
        id: "languages",
        name: "Languages",
        skills: [
            { name: "Rust", level: 90 },
            { name: "Dart", level: 95 },
            { name: "JavaScript", level: 90 },
            { name: "TypeScript", level: 90 },
            { name: "Python", level: 85 },
            { name: "C/C++", level: 80 },
        ],
    },
    {
        id: "frontend",
        name: "Frontend & Mobile",
        skills: [
            { name: "Flutter", level: 95 },
            { name: "BLoC", level: 95 },
            { name: "React", level: 85 },
            { name: "Angular", level: 80 },
            { name: "HTML/CSS", level: 95 },
            { name: "Tailwind CSS", level: 90 },
        ],
    },
    {
        id: "backend",
        name: "Backend & APIs",
        skills: [
            { name: "Node.js", level: 90 },
            { name: "Django", level: 85 },
            { name: "Express.js", level: 90 },
            { name: "Laravel", level: 85 },
            { name: "REST APIs", level: 95 },
        ],
    },
    {
        id: "tools",
        name: "Tools & Platforms",
        skills: [
            { name: "Docker", level: 85 },
            { name: "Firebase", level: 90 },
            { name: "MySQL", level: 85 },
            { name: "SQLite", level: 85 },
            { name: "AWS (S3, EC2)", level: 75 },
            { name: "Postman", level: 90 },
        ],
    },
];
