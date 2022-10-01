import Link from "next/link";

export default function EventPreview({ event, username }) {
    return (
    <div>
        <a>
            <div
                style={{ 
                    width: '90vw', 
                    minWidth: '300px', 
                    height: 'max-content',
                    border: '1px solid gray',
                    margin: '2rem 0 0 0',
                    padding: '2rem 1rem',
                }}
            >
                <p className="md:block text-4xl font-bold">{event.name}</p>
                <p className="md:block text-1xl font-bold">{event.description}</p>
                <p className="md:block text-1xl font-bold">Date: {event.date}</p>
                <p className="md:block text-1xl font-bold italic">Type: {event.type}</p>
                <p 
                    style={{
                        width: '20%',
                        minWidth: '240px',
                        maxHeight: '60px',
                        textAlign: 'center',
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: '2rem',
                        padding: '1rem 1rem',
                        margin: '1rem auto',
                    }}
                >
                    <Link href={event.link}>
                        <a>Join {username} at this Event</a>
                </Link></p>
            </div>
        </a>
    </div>
    );
}
