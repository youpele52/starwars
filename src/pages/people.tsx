import { useResultStore } from "@/store"
import Head from "next/head"
import React from "react"
import { People } from "@/utils/types"
import router from "next/router"
import { GiWorld } from "react-icons/gi"
import { fetchPlanetData, fetchStarshipData } from "@/utils/helpers"
import { MdOutlineRocketLaunch } from "react-icons/md"
import Link from "next/link"

export default function People() {
  const [result, setResult] = useResultStore((state) => [
    state.result,
    state.setResult,
  ])

  if (!result && typeof window !== "undefined") {
    router.push("/")
  }
  const person = result as People
  if (result)
    return (
      <>
        <Head>
          <title>Star Wars | {person.name}</title>
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
                <button
                  onClick={() => fetchPlanetData(person.homeworld, setResult)}
                >
                  <Link href="/planet">
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
          </section>
          <div className="image-wrapper"></div>
        </main>
      </>
    )
}
