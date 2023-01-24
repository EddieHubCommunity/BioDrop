export default function Events({ events }) {
    let categorisedEvents = {
        all: events,
        virtual: events.filter((event) => event.isVirtual === true),
        inPerson: events.filter((event) => event.isInPerson === true),
        cfpOpen: events.filter((event) =>
            event.date.cfpClose ? new Date(event.date.cfpClose) > new Date() : false
        ),
    };
    const filters = [{
            title: "Show all",
            description: "List all events with no filters",
            key: "all",
            icon: FaListUl,
            total: categorisedEvents.all.length,
        },
        {
            title: "CFP open",
            description: "You can submit a talk to this conference",
            key: "cfpOpen",
            icon: FaMicrophoneAlt,
            total: categorisedEvents.cfpOpen.length,
        },
        {
            title: "In person",
            description: "These are in person events",
            key: "inPerson",
            icon: MdOutlinePeople,
            total: categorisedEvents.inPerson.length,
        },
        {
            title: "Virtual",
            description: "Held virtually online event",
            key: "virtual",
            icon: MdOutlineOnlinePrediction,
            total: categorisedEvents.virtual.length,
        },
    ];

    const [tabs, setTabs] = useState(filters);
    const [eventType, setEventType] = useState("all");
}