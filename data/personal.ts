export interface PersonalInfo {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    resumeUrl?: string;
    avatar?: string;
    education: {
        degree: string;
        university: string;
        duration: string;
        cgpa: string;
    };
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        leetcode?: string;
        instagram?: string;
    };
}

export const personalInfo: PersonalInfo = {
    name: "Ajay Kumar",
    title: "Software Engineer",
    tagline: "Building scalable applications & crafting beautiful experiences",
    bio: "I'm a passionate Software Engineer with expertise in building modern web and mobile applications. I specialize in Flutter, React, Node.js, and Django. I love solving complex problems and creating elegant solutions that scale.",
    email: "iajkumar1205@gmail.com",
    phone: "+91 7082951852",
    location: "Mohali, India",
    resumeUrl: "https://drive.google.com/file/d/1WwqH6l0Ulde4Egn6Ls_9RjQg8OAEky5P/view?usp=sharing",
    avatar: "/avatar.jpg",
    education: {
        degree: "Bachelor of Technology in Computer Science and Engineering",
        university: "Deenbandhu Chhotu Ram University of Science and Technology",
        duration: "Dec 2021 - June 2025",
        cgpa: "7.42",
    },
    social: {
        github: "https://github.com/ajkumar1205",
        linkedin: "https://linkedin.com/in/ajkumar1205",
        twitter: "https://twitter.com/ajkumar1205",
        leetcode: "https://leetcode.com/ajkumar1205",
        instagram: "https://instagram.com/unleashed.ajay",
    },
};
