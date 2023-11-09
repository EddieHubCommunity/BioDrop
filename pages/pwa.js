import { useRouter } from "next/router";

export default function Pwa() {
  const router = useRouter();
  const installedFrom = localStorage["installedFrom"];
  if (typeof window !== "undefined" && window.localStorage) {
    if (installedFrom) {
      router.push(`/${installedFrom}`);
    } else {
      router.push("/");
    }
  }
}
