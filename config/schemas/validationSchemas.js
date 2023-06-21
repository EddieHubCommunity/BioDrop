const z = require("zod");

const usernameSchema = z.string().min(3).max(25).optional().nullish();

const basicProfileSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  links: z
    .array(
      z.object({
        name: z.string().optional(),
        url: z.union([z.string().url().optional(), z.optional()]),
        username: z.string().optional(),
        icon: z.string().optional(),
      })
    )
    .optional(),
});

const socialSchema = z.object({
  icon: z.string().optional(),
  url: z.string().url().optional(),
});

const linkSchema = z.object({
  group: z.string().optional(),
  name: z.string().optional(),
  url: z.string().url().optional(),
  icon: z.string().optional(),
  isPinned: z.boolean().optional(),
});

const testimonialSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  username: z.string().optional(),
  isPinned: z.boolean().optional(),
});

const milestoneSchema = z.object({
  isGoal: z.boolean().optional(),
  title: z.string().optional(),
  date: z.string().optional(),
  icon: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
});

const extendedProfileSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  tags: z.array(z.string()).optional(),
  socials: z.array(socialSchema).optional(),
  links: z.array(linkSchema).optional(),
  testimonials: z.array(testimonialSchema).optional(),
  milestones: z.array(milestoneSchema).optional(),
});

module.exports = {
  usernameSchema,
  basicProfileSchema,
  extendedProfileSchema,
};
