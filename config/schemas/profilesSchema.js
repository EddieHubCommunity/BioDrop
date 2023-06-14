const fs = require("fs");
const path = require("path");
const z = require("zod");

const profileSchema = z.object({
    name: z.string().min(3).max(25),
    bio: z.string().min(10).max(250),
    tags: z.array(z.string().min(3).max(25)),
    socials: z.array(z.object({
        icon: z.string().min(4).max(15),
        url: z.string().url(),
    })),
    testimonials: z.array(z.string().min(3).max(25)),
    links: z.array(z.object({
        group: z.string().min(5).max(25),
        name: z.string().min(5).max(50),
        url: z.string().url(),
        icon: z.string().min(4).max(15),
    })),
    milestones: z.array(z.object({
        title: z.string().min(3).max(25),
        date: z.string().min(3).max(25),
        icon: z.string().min(4).max(15),
        color: z.string().min(4).max(15),
        description: z.string().min(10).max(250),
        url: z.string().url(),
    })),
});

const directoryPath = path.join(__dirname, "../../data");

fs.readdir(directoryPath, (err, files) => {
    console.log(files);
});