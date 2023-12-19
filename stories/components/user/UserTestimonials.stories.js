import UserTestimonials from "@components/user/UserTestimonials";
import profile from "./profile.json";

export default {
  component: UserTestimonials,
};

export const Basic = {
  args: {
    testimonials: profile.testimonials,
    BASE_URL: "https://biodrop.io",
  },
};
