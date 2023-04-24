import { useResultStore } from "@/store"
import Head from "next/head"
import React from "react"
import { Starship } from "@/utils/types"
import router from "next/router"
import { GiWorld } from "react-icons/gi"
import { fetchPersonData } from "@/utils/helpers"
import { MdOutlineRocketLaunch } from "react-icons/md"
import Link from "next/link"
import { FiUser } from "react-icons/fi"

export default function Starship() {
  const [result, setResult] = useResultStore((state) => [
    state.result,
    state.setResult,
  ])

  if (!result && typeof window !== "undefined") {
    router.push("/")
  }
  const starship = result as Starship
  if (result)
    return (
      <>
        <Head>
          <title>Star Wars | {starship.name}</title>
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
          </section>
          <div className="image-wrapper">
            <button>
              <Link href="/">Home</Link>
            </button>
          </div>
        </main>
      </>
    )
}
