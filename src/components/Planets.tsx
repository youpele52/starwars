import React from "react"
import { People, Planet, SearchedData } from "@/utils/types"
import Card from "./Card"
import { FiUser } from "react-icons/fi"
import { MdOutlineRocketLaunch } from "react-icons/md"
import { GiWorld } from "react-icons/gi"
import { useResultStore } from "@/store"
import { fetchPersonData } from "@/utils/helpers"
import Link from "next/link"

interface Props {
  planets: SearchedData<Planet>
}
export default function Planets({ planets }: Props) {
  const [result, setResult] = useResultStore((state) => [
    state.result,
    state.setResult,
  ])
  console.log("file: People.tsx:17 > People > result:", result)
  return (
    <div id="searchable-fields">
      <h2>Planets</h2>
      <div className="cards">
        {planets.results.map((planet) => {
          return (
            <Card
              key={planet.name}
              icon={<GiWorld />}
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
                        <button
                          key={i}
                          onClick={() => fetchPersonData(person, setResult)}
                        >
                          <Link href="/people">
                            <FiUser />
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
