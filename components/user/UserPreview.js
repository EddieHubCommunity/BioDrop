import Image from "next/image";

export default function UserPreview({ profile }) {
  return (
    <a
      href={`/${profile.username}`}
      className="flex gap-x-6 rounded-full border-2 border-gray-200 hover:border-gray-500 p-4 my-2"
    >
      <Image
        src={profile.avatar}
        alt={`Profile picture of ${profile.name}`}
        width={80}
        height={80}
        className="rounded-full"
      />
      <div>
        <h3 className="text-2xl font-bold">{profile.name}</h3>
        <p>{profile.bio}</p>
      </div>
    </a>
  );
}
