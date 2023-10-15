import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import logger from "@config/logger";
import stripe from "@config/stripe";
import { clientEnv } from "@config/schemas/clientSchema";
import { User } from "@models/index";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "GET requests only" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const user = await User.findOne({
    _id: session.user.id,
  });

  const subscription = {
    subscription_data: {
      trial_settings: {
        end_behavior: {
          missing_payment_method: "cancel",
        },
      },
    },
  };

  if (!user.premiumTrialStartDate) {
    subscription.subscription_data.trial_period_days = 30;
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: clientEnv.STRIPE_PREMIUM_PRICING_ID,
        quantity: 1,
      },
    ],
    mode: "subscription",
    customer: session.stripeCustomerId,
    success_url: `${clientEnv.NEXT_PUBLIC_BASE_URL}/account/onboarding?alert=premium`,
    cancel_url: `${clientEnv.NEXT_PUBLIC_BASE_URL}/account/onboarding?alert=cancel`,
    payment_method_collection: "if_required",
    allow_promotion_codes: true,
    ...subscription,
  });
  logger.info(
    `Created stripe session "${stripeSession.id}" for username: "${session.username}}"`,
  );

  if (!stripeSession.url) {
    logger.error(
      `Failed creating stripe session for username: "${session.username}}"`,
    );
    return res.status(500).json({
      error: "Could not create Stripe checkout session",
    });
  }

  return res.status(201).redirect(stripeSession.url);
}
