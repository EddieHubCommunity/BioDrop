import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center mt-8 italic">
      Powered by <Link href="https://github.com/EddieHubCommunity/LinkFree"><span>EddieHub</span></Link>
    </footer>
  );
}
