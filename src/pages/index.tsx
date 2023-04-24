import Head from "next/head"
import { Inter } from "next/font/google"
import { People, Planet, SearchedData, Starship } from "@/utils/types"
import { FormEvent, useCallback, useEffect, useState } from "react"
import { searchAPI } from "@/utils/helpers"
import SearchBar from "@/components/SearchBar"
import PeopleComp from "@/components/People"
import PlanetsComp from "@/components/Planets"
import StarshipsComp from "@/components/Starships"

export default function Home() {
  const [people, setPeople] = useState<SearchedData<People>>()
  const [planets, setPlanets] = useState<SearchedData<Planet>>()
  const [starship, setStarship] = useState<SearchedData<Starship>>()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [showResults, setShowResults] = useState(false)
  const [canUseSearchBar, setCanUseSearchBar] = useState(true)
  console.log("file: index.tsx:15 > Home > people:", people)
  console.log("file: index.tsx:16 > Home > planets:", planets)
  console.log("file: index.tsx:19 > Home > starship:", starship)

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (searchTerm === "") {
        alert("Nothing to search\nEnter a text")
      } else if (canUseSearchBar) {
        searchAPI(searchTerm, setPeople, setPlanets, setStarship)
      }
    },
    [canUseSearchBar, searchTerm]
  )

  useEffect(() => {
    if (
      starship &&
      starship.count == 0 &&
      people &&
      people.count == 0 &&
      planets &&
      planets.count == 0
    ) {
      alert("No result found")
    }
  }, [searchTerm, people, planets, starship])

  useEffect(() => {
    if (
      (starship && starship.count > 0) ||
      (people && people.count > 0) ||
      (planets && planets.count > 0)
    ) {
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [searchTerm, people, planets, starship])

  return (
    <>
      <Head>
        <title>Star Wars | Info</title>
        <meta name="description" content="Star Wars" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="home">
        <nav></nav>
        <main>
          <section>
            <header className={`header ${showResults && "hide"}`}>
              <h1>Star wars</h1>
              <p>
                dbkjbsf Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Impedit omnis corrupti nisi exercitationem tempore aliquam,
                repudiandae totam velit illum voluptatum alias nulla aspernatur
                suscipit ratione similique, iste laboriosam reiciendis
                architecto!
              </p>
            </header>

            <SearchBar
              canUseSearchBar={canUseSearchBar}
              setCanUseSearchBar={setCanUseSearchBar}
              onSubmit={onSubmit}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            {people && people.count > 0 && <PeopleComp people={people} />}
            {planets && planets.count > 0 && <PlanetsComp planets={planets} />}
            {starship && starship.count > 0 && (
              <StarshipsComp starship={starship} />
            )}
          </section>
          <div className="image-wrapper"></div>
        </main>
      </div>
    </>
  )
}
