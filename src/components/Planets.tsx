import React from "react";
import { Planet, SearchedData } from "@/utils/types";
import Card from "./Card";
import { FiUser } from "react-icons/fi";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { extractIdfromStarWarsApiUrl } from "@/utils/helpers";
import Link from "next/link";
import { SEARCH_QUERY } from "@/utils/constants";

interface Props {
  planets: SearchedData<Planet>;
}
export default function Planets({ planets }: Props) {
  return (
    <div id="searchable-fields">
      <h2>Planets</h2>
      <div className="cards">
        {planets.results.map((planet) => {
          return (
            <Card
              key={planet.name}
              icon={<GiWorld />}
              url={`/planet?${SEARCH_QUERY}=${extractIdfromStarWarsApiUrl(
                planet.url
              )}`}
              data={
                <div id="info">
                  <p className="name">
                    Name: <span>{planet.name}</span>
                  </p>
                  <p>Climate: {planet.climate}</p>
                  <p>Diamater: {planet.diameter}</p>

                  <p>
                    People:{" "}
                    {planet.residents.map((person, i) => {
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
