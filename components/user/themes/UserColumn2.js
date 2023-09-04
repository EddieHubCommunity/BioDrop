import UserEvents from "../UserEvents";
import UserLinks from "../UserLinks";
import UserMilestones from "../UserMilestones";
import UserRepos from "../UserRepos";
import UserTestimonials from "../UserTestimonials";

export default function UserColumn2({ data, BASE_URL }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {data.links?.length > 0 && (
        <div>
          <h2 className="mt-12 text-2xl font-medium leading-6 dark:text-primary-low text-primary-high">
            Links
          </h2>
          <UserLinks
            links={data.links}
            username={data.username}
            BASE_URL={BASE_URL}
          />
        </div>
      )}

      {data.repos?.length > 0 && (
        <div>
          <h2 className="mt-12 text-2xl font-medium leading-6 dark:text-primary-low text-primary-high">
            Repos
          </h2>
          <UserRepos repos={data.repos} />
        </div>
      )}

      {data.milestones?.length > 0 && (
        <div>
          <h2 className="mt-12 text-2xl font-medium leading-6 dark:text-primary-low text-primary-high">
            Milestones
          </h2>
          <UserMilestones milestones={data.milestones} />
        </div>
      )}

      {data.testimonials?.length > 0 && (
        <div>
          <h2 className="mt-12 text-2xl font-medium leading-6 dark:text-primary-low text-primary-high">
            Testimonials
          </h2>
          <UserTestimonials
            testimonials={data.testimonials}
            BASE_URL={BASE_URL}
          />
        </div>
      )}

      {data.events?.length > 0 && (
        <div>
          <h2 className="mt-12 text-2xl font-medium leading-6 dark:text-primary-low text-primary-high">
            Events
          </h2>
          <UserEvents events={data.events} />
        </div>
      )}
    </div>
  );
}
