import Router from "next/router";
import { useEffect, useMemo, useState } from "react";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { clientEnv } from "@config/schemas/clientSchema";
import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Button from "@components/Button";
import Navigation from "@components/account/manage/Navigation";
import { getMilestoneApi } from "pages/api/account/manage/milestone/[[...data]]";
import Input from "@components/form/Input";
import UserMilestone from "@components/user/UserMilestone";
import Toggle from "@components/form/Toggle";
import Notification from "@components/Notification";
import Link from "@components/Link";
import ConfirmDialog from "@components/ConfirmDialog";
import { PROJECT_NAME } from "@constants/index";
import IconSearch from "@components/IconSearch";
import Textarea from "@components/form/Textarea";
import Select from "@components/form/Select";

let options = [
  {
    value: "dd/mm/yyyy",
    label: "dd/mm/yyyy",
  },
  {
    value: "month/year",
    label: "month/year",
  },
  {
    value: "year",
    label: "year",
  },
];

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const username = session.username;
  const id = context.query.data ? context.query.data[0] : undefined;

  let milestone = {};
  if (id) {
    try {
      milestone = await getMilestoneApi(username, id);
    } catch (e) {
      logger.error(e, `milestone failed for username: ${username}`);
    }
  }

  return {
    props: { milestone, BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL },
  };
}

export default function ManageMilestone({ BASE_URL, milestone }) {
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState({
    show: false,
    type: "",
    message: "",
    additionalMessage: "",
  });

  const onSubmit = async (data) => {
    let alert = "created";
    let apiUrl = `${BASE_URL}/api/account/manage/milestone/`;
    let putMilestone = data;
    if (milestone._id) {
      alert = "updated";
      putMilestone = { ...putMilestone, _id: milestone._id };
      apiUrl = `${BASE_URL}/api/account/manage/milestone/${milestone._id}`;
    }
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putMilestone),
    });
    const update = await res.json();
    if (update.message) {
      return setShowNotification({
        show: true,
        type: "error",
        message: "Milestone update failed",
        additionalMessage: `Please check the fields: ${Object.keys(
          update.message,
        ).join(", ")}`,
      });
    }

    Router.push(`${BASE_URL}/account/manage/milestones?alert=${alert}`);
  };

  const deleteItem = async () => {
    const res = await fetch(
      `${BASE_URL}/api/account/manage/milestone/${milestone._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const update = await res.json();

    if (update.error || update.message) {
      return setShowNotification({
        show: true,
        type: "error",
        message: "Milestone delete failed",
        additionalMessage: update.error || update.message,
      });
    }

    return Router.push(`${BASE_URL}/account/manage/milestones?alert=deleted`);
  };

  const mileStoneClientSchema = z.object({
    url: z.string().optional(),
    date: z.string().optional(),
    dateFormat: z.string().default("dd/mm/yyyy"),
    isGoal: z.boolean().optional(),
    title: z.string().min(2).max(256),
    icon: z.string().min(2).max(32).optional(),
    description: z.string().min(2).max(512),

  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    watch
  } = useForm({
    resolver: zodResolver(mileStoneClientSchema),
    defaultValues: useMemo(() => ({
      title: milestone.title || "",
      description: milestone.description || "",
      url: milestone.url || "",
      icon: milestone.icon || "",
      date: milestone.date || "",
      isGoal: milestone.isGoal || false,
      dateFormat: milestone.dateFormat || options[0].value
    }), [milestone])
  })

  const milestoneWatch = watch(['title', 'description', 'url', 'icon', 'date', 'isGoal', 'dateFormat']);

  useEffect(() => {
    const parse = Date.parse(getValues("date"));
    if (!isNaN(parse)) {
      setValue("date", new Date(parse).toISOString().split("T")[0]);
    }
  }, [getValues("data"), milestone.date]);

  return (
    <>
      <PageHead
        title="Manage Milestone"
        description={`Here you can manage your ${PROJECT_NAME} milestone`}
      />
      <Page>
        <Navigation />
        <Notification
          show={showNotification.show}
          type={showNotification.type}
          onClose={() =>
            setShowNotification({ ...showNotification, show: false })
          }
          message={showNotification.message}
          additionalMessage={showNotification.additionalMessage}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
          <form
            className="space-y-8 divide-y divide-primary-low-medium/30"
            onSubmit={handleSubmit(onSubmit)}
            def
          >
            <div className="space-y-8 divide-y divide-primary-low-medium/30 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-primary-high">
                    What Milestones would you like to appear on your Profile?
                  </h3>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-primary-low-medium/30 sm:pt-5">
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      {...register("title")
                      }
                      name="title"
                      label="Milestone Title"
                      placeholder="Title of your Milestone"
                    />
                    {errors.title && <p className=" text-red-500 ">{errors.title.message}</p>}
                    <p className="text-sm text-primary-low-medium">
                      For example: <i>GitHub Star</i>
                    </p>
                  </div>

                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Textarea
                      {...register("description")
                      }
                      name="description"
                      placeholder="Description of your Milestone"
                    />
                    {errors.description && <p className=" text-red-500 ">{errors.description.message}</p>}
                    <p className="text-sm text-primary-low-medium">
                      Describe this Milestone
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      {...register("url")
                      }
                      name="url"
                      label="URL"
                      placeholder="https://www.example.com"
                    />
                    {errors.url && <p className=" text-red-500 ">{errors.url.message}</p>}
                    <p className="text-sm text-primary-low-medium">
                      Link to more information (optional)
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      {...register("date")}
                      type="date"
                      name="date"
                      label="Date"
                      min="1970-01-01"
                    />
                    {errors.date && <p className=" text-red-500 ">{errors.date.message}</p>}
                    <p className="text-sm text-primary-low-medium">
                      For example: <i>DD / MM / YYYY</i>
                    </p>
                    <Select
                      {...register("dateFormat")
                      }
                      name="layout"
                      label="Select format"
                      options={options}
                    />
                    {errors.dateFormat && <p className=" text-red-500 ">{errors.dateFormat.message}</p>}
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Controller
                      name="icon"
                      control={control}
                      render={({ field }) => (
                        <IconSearch
                          handleSelectedIcon={field.onChange}
                          selectedIcon={field.value}
                        />
                      )}
                    />
                    {errors.icon && <p className=" text-red-500 ">{errors.icon.message}</p>}
                    <p className="text-sm text-primary-low-medium">
                      Search for available{" "}
                      <Link href="/icons" target="_blank">
                        Icons
                      </Link>
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Controller
                      name="isGoal"
                      control={control}
                      render={({ field }) => (
                        <Toggle
                          text1="Is this a future goal?"
                          text2="Future Milestone"
                          enabled={field.value}
                          setEnabled={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  {milestone._id && (
                    <Button type="button" onClick={() => setOpen(true)}>
                      DELETE
                    </Button>
                  )}
                  <Button type="submit" primary={true}>
                    SAVE
                  </Button>
                </div>
              </div>
            </div>
          </form>
          <div>

            <UserMilestone
              milestone={{
                title: milestoneWatch[0],
                description: milestoneWatch[1],
                url: milestoneWatch[2],
                icon: milestoneWatch[3],
                date: milestoneWatch[4],
                isGoal: milestoneWatch[5] || false,
                dateFormat: milestoneWatch[6] || options[0].value
              }}
            />
          </div>
        </div>
      </Page>
      <ConfirmDialog
        open={open}
        action={deleteItem}
        setOpen={setOpen}
        title="Delete milestone"
        description="Are you sure?"
      />
    </>
  );
}
