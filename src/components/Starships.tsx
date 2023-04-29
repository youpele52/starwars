import React from "react";
import { SearchedData, Starship } from "@/utils/types";
import Card from "./Card";
import { FiUser } from "react-icons/fi";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { extractIdfromStarWarsApiUrl } from "@/utils/helpers";
import Link from "next/link";
import { SEARCH_QUERY } from "@/utils/constants";

interface Props {
  starship: SearchedData<Starship>;
}

export default function Starships({ starship }: Props) {
  return (
    <div id="searchable-fields">
      <h2>Starships</h2>
      <div className="cards">
        {starship.results.map((ship) => {
          return (
            <Card
              key={ship.name}
              icon={<GiWorld />}
              url={`/starship?${SEARCH_QUERY}=${ship.url.split("/")[5]}`}
              data={
                <div id="info">
                  <p className="name">
                    Name: <span>{ship.name}</span>
                  </p>
                  <p>Model: {ship.model}</p>
                  <p>Cargo capacity: {ship.cargo_capacity}</p>

                  <p>
                    Pilots:{" "}
                    {ship.pilots?.map((person, i) => {
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
              }
            />
          );
        })}
      </div>
      <div className="buttons"></div>
    </div>
  );
}
