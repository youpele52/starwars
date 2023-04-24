import React from "react"
import { People, SearchedData, Starship } from "@/utils/types"
import Card from "./Card"
import { FiUser } from "react-icons/fi"
import { MdOutlineRocketLaunch } from "react-icons/md"
import { GiWorld } from "react-icons/gi"
import { fetchPersonData } from "@/utils/helpers"
import { useResultStore } from "@/store"
import Link from "next/link"

interface Props {
  starship: SearchedData<Starship>
}

export default function Starships({ starship }: Props) {
  const [setResult] = useResultStore((state) => [state.setResult])
  return (
    <div id="searchable-fields">
      <h2>Starships</h2>
      <div className="cards">
        {starship.results.map((ship) => {
          return (
            <Card
              key={ship.name}
              icon={<GiWorld />}
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
