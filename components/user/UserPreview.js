import Image from "next/image";
import Link from "next/link";

export default function UserPreview({ profile }) {
  return (
    <Link href={`/${profile.username}`}>
      <a className="flex flex-col gap-x-6 rounded md:rounded-full md:flex-row border-2 border-gray-200 hover:border-gray-500 p-4 my-2">
        <div className="flex items-center gap-5">
          <div className="min-w-[5rem]">
            <Image
              src={profile.avatar}
              alt={`Profile picture of ${profile.name}`}
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <h3 className="text-2xl font-bold md:hidden">{profile.name}</h3>
        </div>
        <div>
          <h3 className="hidden md:block text-2xl font-bold">{profile.name}</h3>
          <p>{profile.bio}</p>
        </div>
      </a>
    </Link>
  );
}
