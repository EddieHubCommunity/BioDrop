import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center mt-auto mb-4 md:mt-auto md:mb-8 italic">
      <Link href="https://github.com/EddieHubCommunity/LinkFree">
        Powered by EddieHub
      </Link>
    </footer>
  );
}
