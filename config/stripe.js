import Stripe from "stripe";

import { serverEnv } from "@config/schemas/serverSchema";

const stripe = () => {
  const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  return stripe;
};

export default stripe();
