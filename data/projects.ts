export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        id: "1",
        title: "Oyetime - Social Media App",
        description: "A Twitter-like mobile application with posts, reposts, comments, profiles, and notifications. Features complex feed rendering and nested interactions.",
        image: "/projects/oyetime.png",
        technologies: ["Flutter", "Dart", "BLoC", "Firebase"],
        githubUrl: "https://github.com/ajkumar1205/oyetime",
        featured: true,
    },
    {
        id: "2",
        title: "API Gateway",
        description: "A lightweight and fast API Gateway written in Rust for microservices architecture.",
        image: "/projects/apigw.png",
        technologies: ["Rust", "Tokio", "Hyper", "Docker"],
        githubUrl: "https://github.com/ajkumar1205/apigw",
        featured: true,
    },
    {
        id: "3",
        title: "Brainfuck Compiler",
        description: "A Brainfuck programming language compiler and interpreter written in Rust.",
        image: "/projects/bf.png",
        technologies: ["Rust"],
        githubUrl: "https://github.com/ajkumar1205/brainfuck",
        featured: true,
    },
    {
        id: "4",
        title: "Firebase Auth Token",
        description: "A library for Firebase Auth Token validation for backend services.",
        image: "/projects/fire-auth.png",
        technologies: ["Rust", "Firebase", "JWT", "Authentication"],
        githubUrl: "https://github.com/ajkumar1205/fire-auth-token",
        featured: false,
    },
    // {
    //     id: "5",
    //     title: "OnCampus",
    //     description: "A campus networking and community platform for students and faculty.",
    //     image: "/projects/oncampus.png",
    //     technologies: ["Flutter", "Node.js", "MongoDB", "Socket.io"],
    //     githubUrl: "https://github.com/ajkumar1205/oncampus",
    //     featured: false,
    // },
];
