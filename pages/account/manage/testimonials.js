import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useState } from "react";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/navigation";
import { getTestimonialsApi } from "pages/api/account/manage/testimonials";
import Toggle from "@components/form/Toggle";
import Notification from "@components/Notification";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const username = session.username;

  let testimonials = [];
  try {
    testimonials = await getTestimonialsApi(username);
  } catch (e) {
    logger.error(e, `profile loading failed links for username: ${username}`);
  }

  return {
    props: {
      testimonials,
      BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
  };
}

export default function ManageTestimonials({ BASE_URL, testimonials }) {
  const [showNotification, setShowNotification] = useState(false);
  const [testimonialList, setTestimonialList] = useState(testimonials || []);

  const toggle = async (_id) => {
    const res = await fetch(`${BASE_URL}/api/account/manage/testimonials`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        isPinned: !testimonialList.find((t) => t._id === _id).isPinned,
      }),
    });
    const updatedTestimonials = await res.json();
    setTestimonialList(updatedTestimonials);
    setShowNotification(true);
  };
  return (
    <>
      <PageHead
        title="Manage Testimonials"
        description="Here you can manage your LinkFree testimonials"
      />

      <Page>
        <Navigation />

        <Notification
          show={showNotification}
          type="success"
          onClose={() => setShowNotification(false)}
          message="Testimonial saved"
          additionalMessage="Your profile information has been saved successfully."
        />

        <div>
          <h3 className="text-lg font-medium leading-6 text-primary-high">
            Testimonials you have received, toggle to show on your Profile
          </h3>
        </div>

        <div>
          <ul role="list" className="divide-y divide-primary-low">
            {testimonialList.map((testimonial) => (
              <li
                key={testimonial._id}
                className="flex items-center justify-between gap-x-6 py-5"
              >
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-primary-high">
                      {testimonial.username}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-primary-low-medium">
                    <p className="whitespace-normal">
                      {testimonial.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  <Toggle
                    enabled={testimonial.isPinned}
                    setEnabled={() => toggle(testimonial._id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Page>
    </>
  );
}
