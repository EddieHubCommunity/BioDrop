import UserEvents from "../UserEvents";
import UserLinks from "../UserLinks";
import UserMilestones from "../UserMilestones";
import UserRepos from "../UserRepos";
import UserTestimonials from "../UserTestimonials";

export default function UserInline({ data, BASE_URL }) {
  return (
    <>
      {data.links?.length > 0 && (
        <UserLinks
          links={data.links}
          username={data.username}
          BASE_URL={BASE_URL}
        />
      )}
      {data.repos?.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-medium leading-6 dark:text-primary-low text-primary-high">
            Repos
          </h2>
          <UserRepos repos={data.repos} />
        </>
      )}
      {data.milestones?.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-medium leading-6 dark:text-primary-low text-primary-high">
            Milestones
          </h2>
          <UserMilestones milestones={data.milestones} />
        </>
      )}
      {data.testimonials?.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-medium leading-6 dark:text-primary-low text-primary-high">
            Testimonials
          </h2>
          <UserTestimonials
            testimonials={data.testimonials}
            BASE_URL={BASE_URL}
          />
        </>
      )}
      {data.events?.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-medium leading-6 dark:text-primary-low text-primary-high">
            Events
          </h2>
          <UserEvents events={data.events} />
        </>
      )}
    </>
  );
}
