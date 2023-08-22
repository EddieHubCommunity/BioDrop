import Image from "next/image";

import Link from "@components/Link";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { BASE_GITHUB_PROJECT_URL } from "@constants/index";

export default function Maintainers() {
  const current = [
    {
      name: "Eddie Jaoude",
      role: "Founder of BioDrop",
      imageUrl: "https://github.com/eddiejaoude.png",
      link: "https://github.com/eddiejaoude",
    },
    {
      name: "Sara Jaoude",
      role: "Maintainer",
      imageUrl: "https://github.com/sarajaoude.png",
      link: "https://github.com/SaraJaoude",
    },
    {
      name: "Dan",
      role: "Maintainer",
      imageUrl: "https://github.com/dan-mba.png",
      link: "https://github.com/dan-mba",
    },
    {
      name: "Pradumna Saraf",
      role: "Maintainer",
      imageUrl: "https://github.com/Pradumnasaraf.png",
      link: "https://github.com/Pradumnasaraf",
    },
    {
      name: "Priyanshu kumawat",
      role: "Maintainer",
      imageUrl: "https://github.com/kumarsonsoff3.png",
      link: "https://github.com/kumarsonsoff3",
    },
    {
      name: "Amanda Martin",
      role: "Maintainer",
      imageUrl: "https://github.com/amandamartin-dev.png",
      link: "https://github.com/amandamartin-dev",
    },
    {
      name: "Chinmay ",
      role: "Maintainer",
      imageUrl: "https://github.com/ChinmayMhatre.png",
      link: "https://github.com/ChinmayMhatre",
    },
  ];
  const previous = [
    {
      name: "Tom Schmelzer",
      role: "Maintainer",
      imageUrl: "https://github.com/schmelto.png",
      link: "https://github.com/schmelto",
    },
    {
      name: "Cahl lagerfeld",
      role: "Maintainer",
      imageUrl: "https://github.com/Cahllagerfeld.png",
      link: "https://github.com/Cahllagerfeld",
    },
    {
      name: "David Leal",
      role: "Maintainer",
      imageUrl: "https://github.com/Panquesito7.png",
      link: "https://github.com/Panquesito7",
    },
    {
      name: "Emma Dawson",
      role: "Maintainer",
      imageUrl: "https://github.com/EmmaDawsonDev.png",
      link: "https://github.com/EmmaDawsonDev",
    },
    {
      name: "Naomi Carrigan",
      role: "Maintainer",
      imageUrl: "https://github.com/naomi-lgbt.png",
      link: "https://github.com/naomi-lgbt",
    },
  ];

  const personItem = (person) => (
    <li key={person.name}>
      <Link href={person.link}>
        <Image
          className="mx-auto h-24 w-24 rounded-full"
          src={person.imageUrl}
          alt={person.name}
          width={100}
          height={100}
        />
      </Link>
      <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-primary-high dark:text-primary-low">
        {person.name}
      </h3>
      <p className="text-sm leading-6 text-primary-medium dark:text-primary-medium-low">
        {person.role}
      </p>
    </li>
  );

  return (
    <>
      <PageHead
        title="BioDrop Open Source Maintainers"
        description="BioDrop is 100% Open Source and has amazing maintainers"
      />
      <Page>
        <h1 className="text-4xl mb-4 font-bold">BioDrop Maintainers</h1>

        <p className="mt-6 text-lg leading-8 text-primary-high dark:text-primary-low">
          BioDrop would not be possible without these AMAZING maintainers! Also
          with great help from the{" "}
          <Link href={BASE_GITHUB_PROJECT_URL + "/graphs/contributors"}>
            community contributors
          </Link>
          . Learn more about being a{" "}
          <Link href="/docs/maintainers">maintainer</Link>.
        </p>

        <p className="mt-6 text-lg leading-8 text-primary-high dark:text-primary-low">
          Go check out their GitHub profiles by clicking on their faces below
          👇!
        </p>

        <div className="my-8">
          <h2 className="text-2xl mb-6 font-bold">Current</h2>
          <ul
            role="list"
            className="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
          >
            {current.map((person) => personItem(person))}
          </ul>
        </div>

        <div className="my-8">
          <h2 className="text-2xl mb-6 font-bold">Previous</h2>
          <ul
            role="list"
            className="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
          >
            {previous.map((person) => personItem(person))}
          </ul>
        </div>
      </Page>
    </>
  );
}
