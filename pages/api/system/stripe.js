import logger from "@config/logger";

/**
 * To test strip webhooks:
 * 1. stripe listen --forward-to localhost:3000/api/system/stripe
 * 2. stripe trigger payment_intent.succeeded
 */

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "POST requests only" });
  }

  const event = req.body;
  logger.info(`stripe: ${event.type}`);
  console.log("EVENT:===== ", event);
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      // successful payment
      // Q. which account?
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      logger.error(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return res.status(200).json({ received: true });
}
