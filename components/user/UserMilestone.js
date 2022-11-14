import Icon from "../Icon";
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import Image from "next/image";

export default function UserMilestone({ milestone }) {
  return (
    <VerticalTimelineElement
      date={milestone.date}
      icon={<Icon name={milestone.icon} />}
      iconStyle={{
        background: ((milestone.icon === 'github')? 'black': milestone.color),
        color: 'white',
      }}
    >
      <h1 className="mb-1 text-2xl">
        {milestone.title}
      </h1>
      {milestone.image && (
        <Image 
          className="rounded-sm mb-2 ml-1" 
          src={milestone.image} 
          width={100}
          height={100}
          alt="Milestone Image"
        />
      )}
      {milestone.description && (
        <h5 className="mb-2 text-gray-500 ml-1">{milestone.description}</h5>
      )}
      {milestone.url && (
        <button className="bg-red-500 hover:bg-white hover:text-red-500 border-2 border-red-500
            text-white font-normal py-1.5 px-2 ml-1 rounded duration-500 ease-in-out"
        >
          <a href={milestone.url}>Learn More</a>
        </button>
      )}
    </VerticalTimelineElement>
  );
}