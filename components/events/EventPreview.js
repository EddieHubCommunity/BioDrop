import Link from "next/link";

export default function EventPreview({ event, username }) {
    return (
    <div>
        <div className="w-[90vw] min-w-[300px] h-max border-2 border-gray-700 mt-4 mx-auto px-4 py-8">
            <p className="md:block text-4xl font-bold">{event.name}</p>
            <p className="md:block text-1xl font-bold">{event.description}</p>
            <p className="md:block text-1xl font-bold">Date: {event.date}</p>
            <p className="md:block text-1xl font-bold italic">Type: {event.type}</p>
            <p  className="w-[20%] min-w-[240px] max-h-[60px] text-center text-white bg-black rounded-3xl p-4 my-4 mx-auto">
                <Link href={event.link}>
                    <a>Join {username} at this Event</a>
            </Link></p>
        </div>
    </div>
    );
}
