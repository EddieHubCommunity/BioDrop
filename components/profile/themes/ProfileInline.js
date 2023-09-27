import ProfileEvents from "../ProfileEvents";
import ProfileLinks from "../ProfileLinks";
import ProfileMilestones from "../ProfileMilestones";
import ProfileRepos from "../ProfileRepos";
import ProfileTestimonials from "../ProfileTestimonials";

export default function ProfileInline({ data, BASE_URL }) {
  return (
    <>
      {data.links?.length > 0 && (
        <ProfileLinks
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
          <ProfileRepos repos={data.repos} />
        </>
      )}
      {data.milestones?.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-medium leading-6 dark:text-primary-low text-primary-high">
            Milestones
          </h2>
          <ProfileMilestones milestones={data.milestones} />
        </>
      )}
      {data.testimonials?.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-medium leading-6 dark:text-primary-low text-primary-high">
            Testimonials
          </h2>
          <ProfileTestimonials
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
          <ProfileEvents events={data.events} />
        </>
      )}
    </>
  );
}
