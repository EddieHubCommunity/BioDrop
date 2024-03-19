import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import Bars2Icon from "@heroicons/react/24/outline/Bars2Icon";

import { clientEnv } from "@config/schemas/clientSchema";
import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/Navigation";
import { getTestimonialsApi } from "pages/api/account/manage/testimonials";
import Toggle from "@components/form/Toggle";
import Notification from "@components/Notification";
import Button from "@components/Button";
import Alert from "@components/Alert";
import { PROJECT_NAME } from "@constants/index";
import { classNames } from "@services/utils/classNames";
import FallbackImage from "@components/FallbackImage";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
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
      BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL,
    },
  };
}

export default function ManageTestimonials({ BASE_URL, testimonials }) {
  const [reorder, setReorder] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [testimonialList, setTestimonialList] = useState(testimonials || []);
  const [testimonialListPrevious, setTestimonialListPrevious] = useState(
    testimonials || [],
  );

  const toggle = async (_id) => {
    const res = await fetch(`${BASE_URL}/api/account/manage/testimonials`, {
      method: "PATCH",
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

  const saveOrder = async () => {
    const res = await fetch(`${BASE_URL}/api/account/manage/testimonials`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testimonialList),
    });
    const updatedTestimonials = await res.json();
    setTestimonialList(updatedTestimonials);
    setTestimonialListPrevious(updatedTestimonials);
    setShowNotification(true);
    setReorder(false);
  };

  return (
    <>
      <PageHead
        title="Manage Testimonials"
        description={`Here you can manage your ${PROJECT_NAME} testimonials`}
      />

      <Page>
        <Navigation />

        <Notification
          show={showNotification}
          type="success"
          onClose={() => setShowNotification(false)}
          message="Testimonials updated"
          additionalMessage="Your profile information has been saved successfully."
        />

        <div>
          <h3 className="text-lg font-medium leading-6 text-primary-high mb-4">
            Testimonials you have received, toggle to show on your Profile
          </h3>
        </div>

        {!testimonialList?.length && (
          <Alert type="info" message="No Testimonials found" />
        )}

        {testimonialList?.length > 0 && (
          <div>
            <div className="flex gap-4">
              {!reorder && (
                <Button onClick={() => setReorder(true)}>
                  <ArrowPathIcon className="h-5 w-5 m-2" />
                  REORDER
                </Button>
              )}
              {reorder && (
                <Button
                  onClick={() => {
                    setReorder(false);
                    setTestimonialList(testimonialListPrevious);
                  }}
                >
                  CANCEL
                </Button>
              )}
              {reorder && (
                <Button primary={true} onClick={() => saveOrder()}>
                  SAVE
                </Button>
              )}
            </div>
            <ReactSortable
              tag="ul"
              list={testimonialList}
              setList={setTestimonialList}
              disabled={!reorder}
              ghostClass="border-2"
              chosenClass="border-dashed"
              dragClass="border-red-500"
              className="divide-y divide-primary-low"
            >
              {testimonialList.map((testimonial) => (
                <li
                  key={testimonial._id}
                  className={classNames(
                    reorder && "motion-safe:animate-pulse",
                    "flex items-center justify-between gap-x-6 py-5",
                  )}
                >
                  <div className="flex gap-2 items-start">
                    {reorder && <Bars2Icon className="h-8 w-8 " />}
                    <div className="min-w-0">
                      <div className="flex items-start gap-x-3">
                        <p className="text-sm font-semibold leading-6 text-primary-high dark:text-primary-low">
                          {testimonial.username}
                        </p>
                      </div>
                      <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-primary-medium-low dark:text-primary-low-high">
                        <div className="flex">
                          <div className="w-12">
                            <FallbackImage
                              width={100}
                              height={100}
                              src={`https://github.com/${testimonial.username}.png`}
                              fallback={testimonial.username}
                              alt={testimonial.username}
                              className="rounded-full bg-primary-low"
                            />
                          </div>
                        </div>
                        <p className="whitespace-normal">
                          {testimonial.description}
                        </p>
                      </div>
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
            </ReactSortable>
          </div>
        )}
      </Page>
    </>
  );
}
