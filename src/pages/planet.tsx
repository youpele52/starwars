import { useResultStore } from "@/store"
import Head from "next/head"
import React from "react"
import { Planet } from "@/utils/types"
import router from "next/router"
import { GiWorld } from "react-icons/gi"
import { fetchPersonData } from "@/utils/helpers"
import { MdOutlineRocketLaunch } from "react-icons/md"
import Link from "next/link"
import { FiUser } from "react-icons/fi"

export default function Planet() {
  const [result, setResult] = useResultStore((state) => [
    state.result,
    state.setResult,
  ])

  if (!result && typeof window !== "undefined") {
    router.push("/")
  }
  const planet = result as Planet
  if (result)
    return (
      <>
        <Head>
          <title>Star Wars | {planet.name}</title>
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
