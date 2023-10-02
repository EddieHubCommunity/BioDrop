import * as z from "zod";

const usernameSchema = z.string().min(3).max(128);

const socialSchema = z.object({
  icon: z.string(),
  url: z.string().url(),
});

const linkSchema = z.object({
  group: z.string().optional(),
  name: z.string(),
  url: z.string().url(),
  icon: z.string().optional(),
});

const milestoneSchema = z.object({
  isGoal: z.boolean().optional(),
  title: z.string(),
  date: z.coerce.date(),
  icon: z.string().optional(),
  description: z.string(),
  url: z.string().url().optional(),
});

const profileSchema = z.object({
  name: z.string(),
  bio: z.string(),
  tags: z.array(z.string()).optional(),
  socials: z.array(socialSchema).optional(),
  links: z.array(linkSchema).optional(),
  testimonials: z.array(z.string()).optional(),
  milestones: z.array(milestoneSchema).optional(),
});

module.exports = {
  usernameSchema,
  profileSchema,
};
