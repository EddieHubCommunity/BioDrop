import requestIp from "request-ip";
import Cors from "micro-cors";
import { buffer } from "micro";

import connectMongo from "@config/mongo";
import stripe from "@config/stripe";
import { serverEnv } from "@config/schemas/serverSchema";
import logger from "@config/logger";
import { User } from "@models/index";
import logChange from "@models/middlewares/logChange";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

/**
 * To test stripe webhooks locally, use the following steps:
 * 1. stripe listen --forward-to localhost:3000/api/system/stripe
 * 2a. stripe trigger payment_intent.succeeded --add payment_intent:customer=cus_OPbkTYcj0NBk7g
 * 2b. stripe trigger payment_intent.payment_failed --add payment_intent:customer=cus_OPbkTYcj0NBk7g
 */

const stripeIps = [
  "3.18.12.63",
  "3.130.192.231",
  "13.235.14.237",
  "13.235.122.149",
  "18.211.135.69",
  "35.154.171.200",
  "52.15.183.38",
  "54.88.130.119",
  "54.88.130.237",
  "54.187.174.169",
  "54.187.205.235",
  "54.187.216.72",
];

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function webhookHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "POST requests only" });
  }

  // verify stripe ip
  const requestingIp = requestIp.getClientIp(req);
  if (
    serverEnv.NODE_ENV !== "development" &&
    ["preview", "production"].includes(serverEnv.NEXT_PUBLIC_VERCEL_ENV) &&
    !stripeIps.includes(requestingIp)
  ) {
    logger.error(`Invalid Stripe IP: ${requestingIp}`);
    return res.status(401).json({ error: "Invalid IP" });
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  // verify signature
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      serverEnv.STRIPE_WEBHOOK_SECRET,
    );
  } catch (e) {
    logger.error(e, "Webhook Secret failed");
    return res
      .status(401)
      .send({ error: `Webhook Secret failed: ${e.message}` });
  }

  await connectMongo();
  logger.info(`stripe: ${event.type}`);

  /**
   * Stripe events not used
   *
   * account.application.authorized
   * account.application.deauthorized
   * account.external_account.created
   * account.external_account.updated
   * account.updated
   * application_fee.created
   * application_fee.refund.updated
   * application_fee.refunded
   * balance.available
   * billing_portal.configuration.created
   * billing_portal.configuration.updated
   * billing_portal.session.created
   * capability.updated
   * cash_balance.funds_available
   * charge.captured
   * charge.dispute.closed
   * charge.dispute.created
   * charge.dispute.funds_reinstated
   * charge.dispute.funds_withdrawn
   * charge.dispute.updated
   * charge.expired
   * charge.pending
   * charge.refund.updated
   * charge.refunded
   * charge.updated
   * checkout.session.completed
   * checkout.session.expired
   * coupon.created
   * coupon.deleted
   * coupon.updated
   * credit_note.created
   * credit_note.updated
   * credit_note.voided
   * customer_cash_balance_transaction.created
   * customer.created
   * customer.discount.created
   * customer.discount.updated
   * customer.source.created
   * customer.source.deleted
   * customer.source.expiring
   * customer.source.updated
   * customer.subscription.pending_update_applied
   * customer.subscription.pending_update_expired
   * customer.subscription.trial_will_end * TODO: show alert
   * customer.subscription.updated * TODO: ???
   * customer.tax_id.created
   * customer.tax_id.deleted
   * customer.tax_id.updated
   * customer.updated
   * file.created
   * financial_connections.account.created
   * financial_connections.account.deactivated
   * financial_connections.account.disconnected
   * financial_connections.account.reactivated
   * financial_connections.account.refreshed_balance
   * identity.verification_session.canceled
   * identity.verification_session.created
   * identity.verification_session.processing
   * identity.verification_session.redacted
   * identity.verification_session.requires_input
   * identity.verification_session.verified
   * invoice.created
   * invoice.deleted
   * invoice.finalization_failed
   * invoice.finalized
   * invoice.marked_uncollectible
   * invoice.payment_action_required
   * invoice.payment_failed
   * invoice.sent
   * invoice.upcoming
   * invoice.updated
   * invoice.voided
   * invoiceitem.created
   * invoiceitem.deleted
   * invoiceitem.updated
   * issuing_authorization.created
   * issuing_authorization.request
   * issuing_authorization.updated
   * issuing_card.created
   * issuing_card.updated
   * issuing_cardholder.created
   * issuing_cardholder.updated
   * issuing_dispute.closed
   * issuing_dispute.created
   * issuing_dispute.funds_reinstated
   * issuing_dispute.submitted
   * issuing_dispute.updated
   * issuing_transaction.created
   * issuing_transaction.updated
   * mandate.updated
   * payment_intent.amount_capturable_updated
   * payment_intent.canceled
   * payment_intent.created
   * payment_intent.partially_funded
   * payment_intent.processing
   * payment_intent.requires_action
   * payment_link.created
   * payment_link.updated
   * payment_method.attached
   * payment_method.automatically_updated
   * payment_method.detached
   * payment_method.updated
   * payout.canceled
   * payout.created
   * payout.failed
   * payout.paid
   * payout.reconciliation_completed
   * payout.updated
   * person.created
   * person.deleted
   * person.updated
   * plan.created
   * plan.deleted
   * plan.updated
   * price.created
   * price.deleted
   * price.updated
   * product.created
   * product.deleted
   * product.updated
   * promotion_code.created
   * promotion_code.updated
   * quote.accepted
   * quote.canceled
   * quote.created
   * quote.finalized
   * radar.early_fraud_warning.created
   * radar.early_fraud_warning.updated
   * recipient.created
   * recipient.deleted
   * recipient.updated
   * refund.created
   * refund.updated
   * reporting.report_run.failed
   * reporting.report_run.succeeded
   * reporting.report_type.updated
   * review.closed
   * review.opened
   * setup_intent.canceled
   * setup_intent.created
   * setup_intent.requires_action
   * setup_intent.setup_failed
   * setup_intent.succeeded
   * sigma.scheduled_query_run.created
   * sku.created
   * sku.deleted
   * sku.updated
   * source.canceled
   * source.chargeable
   * source.failed
   * source.mandate_notification
   * source.refund_attributes_required
   * source.transaction.created
   * source.transaction.updated
   * subscription_schedule.aborted
   * subscription_schedule.canceled
   * subscription_schedule.completed
   * subscription_schedule.created
   * subscription_schedule.expiring
   * subscription_schedule.updated
   * tax_rate.created
   * tax_rate.updated
   * tax.settings.updated
   * terminal.reader.action_failed
   * terminal.reader.action_succeeded
   * topup.canceled
   * topup.created
   * topup.failed
   * topup.reversed
   * topup.succeeded
   * transfer.created
   * transfer.reversed
   * transfer.updated
   */

  switch (event.type) {
    case "payment_intent.succeeded":
    case "customer.subscription.created":
    case "charge.succeeded":
    case "checkout.session.async_payment_succeeded":
    case "checkout.session.completed":
    case "customer.subscription.resumed":
    case "invoice.paid":
    case "invoice.payment_succeeded":
      {
        const update = { type: "premium" };
        logger.info(
          `Attempting to upgrade stripeCustomerId: ${event.data.object.customer}`,
        );
        // check if they already had a trial
        let user = {};
        try {
          user = await User.findOne({
            stripeCustomerId: event.data.object.customer,
          });
          if (!user.premiumTrialStartDate) {
            update.premiumTrialStartDate = new Date();
          }

          logger.info(
            `Found user "${user.email}" by stripeCustomerId: ${event.data.object.customer}`,
          );
        } catch (e) {
          logger.error(
            e,
            `Cannot find user with stripeCustomerId: ${event.data.object.customer} to upgrade`,
          );
        }

        // successful payment upgrade account
        let userUpdate = {};
        try {
          userUpdate = await User.findOneAndUpdate(
            { stripeCustomerId: event.data.object.customer },
            update,
            { new: true },
          );
        } catch (e) {
          logger.error(
            `Failed to upgrade user "${user.email}" by stripeCustomerId: ${event.data.object.customer}`,
          );
          return res.status(500).json({ received: false });
        }

        logger.info(
          `Upgraded user "${user.email}" by stripeCustomerId: ${
            event.data.object.customer
          } to ${update.premiumTrialStartDate ? "trial" : "premium"}}`,
        );

        logChange(
          { user: { id: user._id } },
          {
            model: "User",
            changesBefore: JSON.parse(JSON.stringify(user)),
            changesAfter: JSON.parse(JSON.stringify(userUpdate)),
          },
        );
      }
      break;
    case "payment_intent.payment_failed":
    case "customer.subscription.deleted":
    case "account.external_account.deleted":
    case "charge.failed":
    case "checkout.session.async_payment_failed":
    case "customer.deleted":
    case "customer.discount.deleted":
    case "customer.subscription.paused":
    case "invoice.payment_failed":
    case "subscription_schedule.released":
      {
        // failed payment
        let userBefore = {};
        try {
          userBefore = await User.findOne({
            stripeCustomerId: event.data.object.customer,
          });
          logger.info(
            `Found user "${userBefore.email}" by stripeCustomerId: ${event.data.object.customer}`,
          );
        } catch (e) {
          logger.error(
            e,
            `Cannot find user with stripeCustomerId: ${event.data.object.customer} to downgrade`,
          );
        }

        let user = {};
        try {
          user = await User.findOneAndUpdate(
            { stripeCustomerId: event.data.object.customer },
            { type: "free" },
            { new: true },
          );

          logger.info(
            `Downgrading user "${user.email}" by stripeCustomerId: ${event.data.object.customer}`,
          );
        } catch (e) {
          logger.error(
            e,
            `Cannot downgrade user with stripeCustomerId: ${event.data.object.customer}`,
          );
          return res.status(500).json({ received: false });
        }

        logChange(
          { user: { id: user._id } },
          {
            model: "User",
            changesBefore: JSON.parse(JSON.stringify(userBefore)),
            changesAfter: JSON.parse(JSON.stringify(user)),
          },
        );
      }
      break;
    default:
      logger.error(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return res.status(200).json({ received: true });
}

export default cors(webhookHandler);
