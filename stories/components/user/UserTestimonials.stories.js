import ProfileTestimonials from "@components/profile/ProfileTestimonials";
import profile from "./profile.json";

export default {
  component: ProfileTestimonials,
};

export const Basic = {
  args: {
    testimonials: profile.testimonials,
    BASE_URL: "https://biodrop.io",
  },
};
