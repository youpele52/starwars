import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Starship } from "@/utils/types";
import router, { useRouter } from "next/router";
import { GiWorld } from "react-icons/gi";
import {
  extractIdfromStarWarsApiUrl,
  fetchStarshipData,
} from "@/utils/helpers";
import { MdOutlineRocketLaunch } from "react-icons/md";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { SEARCH_QUERY, STARSHIP_BASE_URL } from "@/utils/constants";

export default function Starships() {
  const { query } = useRouter();
  const search_query = query[SEARCH_QUERY] as string | undefined;
  const [starship, setStarship] = useState<Starship>();
  const starshipUrl = `${STARSHIP_BASE_URL}${search_query}/`;

  useEffect(() => {
    if (search_query) {
      fetchStarshipData(starshipUrl, setStarship);
    }
  }, [starshipUrl, search_query]);

  if (starship)
    return (
      <>
        <Head>
          <title>Star Wars | Starships | {starship.name}</title>
          <meta name="description" content="Star Wars" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main id="detail">
          <section>
            <h1>{starship.name}</h1>
            <div className="info">
              <p>Model: {starship.model}</p>
              <p>Cargo capacity: {starship.cargo_capacity}</p>

              <p>
                Pilots:{" "}
                {starship.pilots?.map((person, i) => {
                  return (
                    <button key={i}>
                      <Link
                        href={`/people?${SEARCH_QUERY}=${extractIdfromStarWarsApiUrl(
                          person
                        )}`}
                      >
                        {" "}
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
