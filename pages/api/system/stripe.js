import logger from "@config/logger";
import { User } from "@models/index";

/**
 * To test stripe webhooks locally, use the following steps:
 * 1. stripe listen --forward-to localhost:3000/api/system/stripe
 * 2a. stripe trigger payment_intent.succeeded --add payment_intent:customer=cus_OPbkTYcj0NBk7g
 * 2b. stripe trigger payment_intent.payment_failed --add payment_intent:customer=cus_OPbkTYcj0NBk7g
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "POST requests only" });
  }

  // TODO: verify stripe signature

  const event = req.body;
  logger.info(`stripe: ${event.type}`);
  switch (event.type) {
    case "payment_intent.succeeded":
      // successful payment
      await User.findOneAndUpdate(
        { stripeCustomerId: event.data.object.customer },
        { type: "premium" }
      );
      break;
    case "payment_intent.payment_failed":
    case "customer.subscription.deleted":
      await User.findOneAndUpdate(
        { stripeCustomerId: event.data.object.customer },
        { type: "free" }
      );
      break;
    default:
      logger.error(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return res.status(200).json({ received: true });
}
