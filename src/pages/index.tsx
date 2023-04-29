import Head from "next/head";
import { Inter } from "next/font/google";
import { People, Planet, SearchedData, Starship } from "@/utils/types";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { searchAPI } from "@/utils/helpers";
import SearchBar from "@/components/SearchBar";
import PeopleComp from "@/components/People";
import PlanetsComp from "@/components/Planets";
import StarshipsComp from "@/components/Starships";
import Link from "next/link";
import { useRouter } from "next/router";
import { SEARCH_QUERY } from "@/utils/constants";

export default function Home() {
  const [people, setPeople] = useState<SearchedData<People>>();
  const [planets, setPlanets] = useState<SearchedData<Planet>>();
  const [starship, setStarship] = useState<SearchedData<Starship>>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [canUseSearchBar, setCanUseSearchBar] = useState(true);
  const router = useRouter();
  const search_query = router.query[SEARCH_QUERY] as string | undefined;

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (searchTerm === "") {
        alert("Nothing to search\nEnter a text");
      } else if (canUseSearchBar) {
        router.push({ query: { ...router.query, [SEARCH_QUERY]: searchTerm } });
      }
    },
    [canUseSearchBar, router, searchTerm]
  );

  useEffect(() => {
    if (
      starship &&
      starship.count == 0 &&
      people &&
      people.count == 0 &&
      planets &&
      planets.count == 0
    ) {
      alert("No result found");
    }
  }, [searchTerm, people, planets, starship]);

  useEffect(() => {
    if (
      (starship && starship.count > 0) ||
      (people && people.count > 0) ||
      (planets && planets.count > 0)
    ) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm, people, planets, starship]);

  useEffect(() => {
    if (search_query) {
      searchAPI(search_query, setPeople, setPlanets, setStarship);
    }
  }, [search_query]);

  return (
    <>
      <Head>
        <title>Star Wars | Home</title>
        <meta name="description" content="Star Wars" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="home">
        <main>
          <section>
            <header className={`header ${showResults && "hide"}`}>
              <h1>Star wars</h1>
              <p>
                You can search & view planets, people, starships and the
                relationships between them.
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
          <div className="image-wrapper">
            <button>
              <Link href="/">Home</Link>
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
