import React from "react"
import { People, SearchedData } from "@/utils/types"
import Card from "./Card"
import { FiUser } from "react-icons/fi"
import { MdOutlineRocketLaunch } from "react-icons/md"
import { GiWorld } from "react-icons/gi"
import { useResultStore } from "@/store"
import {
  fetchPersonData,
  fetchPlanetData,
  fetchStarshipData,
} from "@/utils/helpers"
import Link from "next/link"

interface Props {
  people: SearchedData<People>
}
export default function People({ people }: Props) {
  const [result, setResult] = useResultStore((state) => [
    state.result,
    state.setResult,
  ])

  return (
    <div id="searchable-fields">
      <h2>People</h2>
      <div className="cards">
        {people.results.map((person) => {
          return (
            <Card
              key={person.name}
              icon={<FiUser />}
              data={
                <div id="info">
                  <p className="name">
                    Name: <span>{person.name}</span>
                  </p>
                  <p>Birth: {person.birth_year}</p>
                  <p>Height: {person.height}</p>
                  <p>
                    Planet:
                    <button
                      onClick={() =>
                        fetchPlanetData(person.homeworld, setResult)
                      }
                    >
                      <Link href="/planet">
                        <GiWorld size={15} />
                      </Link>
                    </button>
                  </p>
                  <p>
                    Starships:{" "}
                    {person.starships.map((ship, i) => {
                      return (
                        <button
                          key={i}
                          onClick={() => fetchStarshipData(ship, setResult)}
                        >
                          <Link href="/starship">
                            <MdOutlineRocketLaunch />
                          </Link>
                        </button>
                      )
                    })}
                  </p>
                </div>
              }
            />
          )
        })}
      </div>
      <div className="buttons"></div>
    </div>
  )
}
