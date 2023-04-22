import Head from "next/head"
import { Inter } from "next/font/google"
import { People, Planet, SearchedData, Starship } from "@/utils/types"
import { useEffect, useState } from "react"
import { searchAPI } from "@/utils/helpers"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [people, setPeople] = useState<SearchedData<People>>()
  const [planets, setPlanets] = useState<SearchedData<Planet>>()
  const [starship, setStarship] = useState<SearchedData<Starship>>()

  useEffect(() => {
    searchAPI("pp", setPeople, setPlanets, setStarship)
  }, [])

  return (
    <>
      <Head>
        <title>Star Wars</title>
        <meta name="description" content="Star Wars" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
