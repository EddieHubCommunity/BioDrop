import UserProfile from "@components/user/UserProfile";
import UserLinks from "@components/user/UserLinks";
import UserMilestones from "@components/user/UserMilestones";
import UserTestimonials from "./UserTestimonials";
import UserEvents from "./UserEvents";

export default function UserPage({ data, BASE_URL }) {

  return (
    <>
      <UserProfile data={data} BASE_URL={BASE_URL} />

      <div className="flex justify-between space-x-8">
        <div className="hidden sm:block">
          <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
            My Links ({data.links.length})
          </div>
          <UserLinks data={data} BASE_URL={BASE_URL} />
        </div>

        <div className="hidden sm:block">
          <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
            Milestones ({data.milestones.length})
          </div>
          <UserMilestones data={data} />
        </div>      
      </div>

      <div className="flex justify-between space-x-8">
        <div className="hidden sm:block">
          <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
            Testimonials ({data.testimonials.length})
          </div>
          <UserTestimonials testimonials={data.testimonials} />
        </div>
      
        <div className="hidden sm:block">
          <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
            Events ({data.events.length})
          </div>
          <UserEvents data={data} />
        </div>
      </div>

      
      <div className="sm:hidden">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          My Links ({data.links.length})
        </div>
        <UserLinks data={data} BASE_URL={BASE_URL} />        
      </div>

      
      <div className="sm:hidden">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          Milestones ({data.milestones.length})
        </div>          
        <UserMilestones data={data} />
      </div>

      
      <div className="sm:hidden">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          Events ({data.events.length})
        </div>
        <UserEvents data={data} />
      </div>
      
      <div className="sm:hidden">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          Testimonials ({data.testimonials.length})
        </div>
        <UserTestimonials testimonials={data.testimonials} />
      </div>
    </>
  );
}
