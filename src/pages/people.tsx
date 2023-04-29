import Head from "next/head";
import React, { useEffect, useState } from "react";
import { People } from "@/utils/types";
import router, { useRouter } from "next/router";
import { GiWorld } from "react-icons/gi";
import { extractIdfromStarWarsApiUrl, fetchPersonData } from "@/utils/helpers";
import { MdOutlineRocketLaunch } from "react-icons/md";
import Link from "next/link";
import { PEOPLE_BASE_URL, SEARCH_QUERY } from "@/utils/constants";

export default function People() {
  const { query } = useRouter();
  const search_query = query[SEARCH_QUERY] as string | undefined;
  const [person, setPerson] = useState<People>();
  const personUrl = `${PEOPLE_BASE_URL}${search_query}/`;

  useEffect(() => {
    if (search_query) {
      fetchPersonData(personUrl, setPerson);
    }
  }, [personUrl, search_query]);

  if (person)
    return (
      <>
        <Head>
          <title>Star Wars | People | {person.name}</title>
          <meta name="description" content="Star Wars" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main id="detail">
          <section>
            <h1>{person.name}</h1>
            <div className="info">
              <p>Birth: {person.birth_year}</p>
              <p>Height: {person.height}</p>
              <p>
                Planet:
                <button>
                  <Link
                    href={`/planet?${SEARCH_QUERY}=${extractIdfromStarWarsApiUrl(
                      person.homeworld
                    )}`}
                  >
                    <GiWorld size={15} />
                  </Link>
                </button>
              </p>
              <p>
                Starships:
                {person.starships &&
                  person.starships.length > 0 &&
                  person.starships.map((ship, i) => {
                    return (
                      <button key={i}>
                        <Link
                          href={`/planet?${SEARCH_QUERY}=${extractIdfromStarWarsApiUrl(
                            ship
                          )}`}
                        >
                          <MdOutlineRocketLaunch />
                        </Link>
                      </button>
                    );
                  })}
              </p>
            </div>
          </section>
          <div className="image-wrapper">
            <button>
              <Link href="/">Home</Link>
            </button>
          </div>
        </main>
      </>
    );
}
