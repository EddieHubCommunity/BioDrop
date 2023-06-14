const z = require("zod");

const usernameSchema = z.string().min(3).max(25);

const basicProfileSchema = z.object({
  name: z.string().min(3).max(25),
  bio: z.string().min(10).max(250),
  links: z.array(
    z.object({
      name: z.string().min(5).max(50),
      url: z.string().url(),
      icon: z.string().min(4).max(15),
    })
  ),
});

const extendedProfileSchema = basicProfileSchema.extend({
  tags: z.array(z.string().min(3).max(25)),
  socials: z.array(
    z.object({
      icon: z.string().min(4).max(15),
      url: z.string().url(),
    })
  ),
  testimonials: z.array(z.string().min(3).max(25)),
  milestones: z.array(
    z.object({
      title: z.string().min(3).max(25),
      date: z.string().min(3).max(25),
      icon: z.string().min(4).max(15),
      color: z.string().min(4).max(15),
      description: z.string().min(10).max(250),
      url: z.string().url(),
    })
  ),
});

module.exports = {
  usernameSchema,
  basicProfileSchema,
  extendedProfileSchema,
};
