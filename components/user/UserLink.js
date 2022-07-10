export default function UserLink({ link, username }) {
  const clickLink = () => {
    console.log("click", username, link);
    // TODO: 1. increment link counter
    // TODO: 2. visit link
  };

  return (
    <button
      onClick={() => clickLink()}
      className="rounded-full border-2 border-gray-200 hover:border-gray-500 hover:shadow-xl p-4 my-2 w-full content-start"
    >
      {link.name} {link.clicks && <span>({link.clicks})</span>}
    </button>
  );
}
