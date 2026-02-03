export interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    responsibilities: string[];
    technologies: string[];
    logo?: string;
}

export const experiences: Experience[] = [
    {
        id: "1",
        company: "Clerisy Solutions Private Limited",
        role: "Full Stack Developer",
        duration: "Present",
        startDate: "Oct 2025",
        endDate: "Present",
        location: "Mohali, India",
        description: "Working on production-grade web applications with scalable and modular architecture.",
        responsibilities: [
            "Developing backend services using Laravel (PHP) and RESTful APIs",
            "Building frontend features using React and Angular for dashboards and internal tools",
            "Using Docker for consistent development and deployment workflows",
            "Collaborating with cross-functional teams to deliver stable and maintainable software",
        ],
        technologies: ["Laravel", "PHP", "React", "Angular", "Docker", "REST APIs"],
    },
    {
        id: "2",
        company: "Clerisy Solutions Private Limited",
        role: "Full Stack Developer Trainee",
        duration: "3 months",
        startDate: "Jul 2025",
        endDate: "Sep 2025",
        location: "Mohali, India",
        description: "Trained in full-stack software development with hands-on production exposure.",
        responsibilities: [
            "Assisted in Laravel backend development and frontend integration using React and Angular",
            "Worked with APIs, debugging tools, and containerized environments",
        ],
        technologies: ["Laravel", "React", "Angular", "Docker"],
    },
    {
        id: "3",
        company: "SSH Softtech Solution",
        role: "Full Stack Developer Intern (Flutter + Backend)",
        duration: "6 months",
        startDate: "Feb 2025",
        endDate: "Jul 2025",
        location: "Remote",
        description: "Developed Flutter mobile applications using Dart with clean architecture and reusable widgets.",
        responsibilities: [
            "Implemented BLoC for scalable state management and predictable UI updates",
            "Integrated REST APIs and persistent WebSocket connections for real-time communication",
            "Built AirSpeak, a smart-device control app similar to Google Home",
            "Handled real-time device state updates, background sync, and connection lifecycle management",
        ],
        technologies: ["Flutter", "Dart", "BLoC", "REST APIs", "WebSocket"],
    },
    {
        id: "4",
        company: "Geoptech Solutions Private Limited",
        role: "Flutter Developer Intern",
        duration: "3 months",
        startDate: "Dec 2024",
        endDate: "Feb 2025",
        location: "Remote",
        description: "Developed cross-platform Flutter features with focus on UI consistency and responsiveness.",
        responsibilities: [
            "Integrated Firebase Authentication and session handling",
            "Worked on third-party SDK and payment-related integrations",
        ],
        technologies: ["Flutter", "Dart", "Firebase", "Payment SDKs"],
    },
    {
        id: "5",
        company: "Cosyugma Company",
        role: "Flutter & Django Developer Intern",
        duration: "4 months",
        startDate: "Apr 2024",
        endDate: "Jul 2024",
        location: "Remote",
        description: "Implemented authentication flows and developed REST APIs for mobile applications.",
        responsibilities: [
            "Implemented OTP and JWT-based authentication flows in Flutter applications",
            "Refactored Flutter codebase using BLoC, improving performance and maintainability",
            "Developed REST APIs using Django to support mobile app features",
        ],
        technologies: ["Flutter", "Dart", "Django", "Python", "BLoC", "JWT"],
    },
];
