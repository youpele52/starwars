import React from "react";
import { People, SearchedData } from "@/utils/types";
import Card from "./Card";
import { FiUser } from "react-icons/fi";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import Link from "next/link";
import { SEARCH_QUERY } from "@/utils/constants";
import { extractIdfromStarWarsApiUrl } from "@/utils/helpers";

interface Props {
  people: SearchedData<People>;
}
export default function People({ people }: Props) {
  return (
    <div id="searchable-fields">
      <h2>People</h2>
      <div className="cards">
        {people.results.map((person) => {
          return (
            <Card
              key={person.name}
              icon={<FiUser />}
              url={`/people?${SEARCH_QUERY}=${person.url.split("/")[5]}`}
              data={
                <div id="info">
                  <p className="name">
                    Name: <span>{person.name}</span>
                  </p>
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
                    Starships:{" "}
                    {person.starships.map((ship, i) => {
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
              }
            />
          );
        })}
      </div>
      <div className="buttons"></div>
    </div>
  );
}
