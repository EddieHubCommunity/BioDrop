import UserTestimonials from "../../../components/user/UserTestimonials";
import testimonial from "../../../data/EddieHubCommunity/testimonials/eddiejaoude.json";

export default {
  component: UserTestimonials,
};

export const Basic = {
  args: {
    data: {
      testimonials: [
        {
          username: 'eddiejaoude',
          url: 'https://linkfree.eddiehub.io/eddiejaoude',
          ...testimonial
        }
      ]
    }
  }
};
