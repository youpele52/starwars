import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Planet } from "@/utils/types";
import router, { useRouter } from "next/router";
import { GiWorld } from "react-icons/gi";
import { extractIdfromStarWarsApiUrl, fetchPlanetData } from "@/utils/helpers";
import { MdOutlineRocketLaunch } from "react-icons/md";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { PLANETS_BASE_URL, SEARCH_QUERY } from "@/utils/constants";

export default function Planet() {
  const { query } = useRouter();
  const search_query = query[SEARCH_QUERY] as string | undefined;
  const planetUrl = `${PLANETS_BASE_URL}${search_query}/`;

  const [planet, setPlanet] = useState<Planet>();

  useEffect(() => {
    if (search_query) {
      fetchPlanetData(planetUrl, setPlanet);
    }
  }, [planetUrl, search_query]);
  if (planet)
    return (
      <>
        <Head>
          <title>Star Wars | Planet | {planet.name}</title>
          <meta name="description" content="Star Wars" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main id="detail">
          <section>
            <h1>{planet.name}</h1>
            <div className="info">
              <p>Climate: {planet.climate}</p>
              <p>Diamater: {planet.diameter}</p>

              <p>
                People:{" "}
                {planet.residents?.map((person, i) => {
                  return (
                    <button key={i}>
                      <Link
                        href={`/people?${SEARCH_QUERY}=${extractIdfromStarWarsApiUrl(
                          person
                        )}`}
                      >
                        <FiUser />
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
