import axios from "axios"
import { Dispatch, SetStateAction } from "react"
import { People, Planet, SearchedData, Starship } from "./types"
import { SWAPI_BASE_URL } from "./constants"

//  fetch search Term
export async function searchAPI(
  searchTerm: string,
  setPeople: Dispatch<SetStateAction<SearchedData<People> | undefined>>,
  setPlanets: Dispatch<SetStateAction<SearchedData<Planet> | undefined>>,
  setStarship: Dispatch<SetStateAction<SearchedData<Starship> | undefined>>
) {
  let searchedPlanets: SearchedData<Planet>
  let searchedPeople: SearchedData<People>
  let searchedStarship: SearchedData<Starship>

  const fetchPlanets = await axios
    .get(`${SWAPI_BASE_URL}/planets/?search=${searchTerm}`)
    .then(async (response) => {
      const data = await response.data
      searchedPlanets = data
    })

  const fetchPeople = await axios
    .get(`${SWAPI_BASE_URL}/people/?search=${searchTerm}`)
    .then(async (response) => {
      const data = await response.data
      searchedPeople = data
    })
  const fetchStarship = await axios
    .get(`${SWAPI_BASE_URL}/starships/?search=${searchTerm}`)
    .then(async (response) => {
      const data = await response.data
      searchedStarship = data
    })

  Promise.all([fetchPlanets, fetchPeople, fetchStarship]).then(() => {
    setPeople(searchedPeople)
    setPlanets(searchedPlanets)
    setStarship(searchedStarship)
  })
}
// general fetch with given url

export async function fetchPersonData(
  url: string,
  setResult: (result: People | Starship | Planet) => void
) {
  let person: People
  const fetchPeople = await axios.get(`${url}`).then(async (response) => {
    const data = await response.data
    person = data
  })

  Promise.all([fetchPeople]).then(() => {
    setResult(person)
  })
}
export async function fetchPlanetData(
  url: string,
  setResult: (result: People | Starship | Planet) => void
) {
  let planet: Planet
  const fetchPlanet = await axios.get(`${url}`).then(async (response) => {
    const data = await response.data
    planet = data
  })

  Promise.all([fetchPlanet]).then(() => {
    setResult(planet)
  })
}
export async function fetchStarshipData(
  url: string,
  setResult: (result: People | Starship | Planet) => void
) {
  let starship: Starship
  const fetchStarship = await axios.get(`${url}`).then(async (response) => {
    const data = await response.data
    starship = data
  })

  Promise.all([fetchStarship]).then(() => {
    setResult(starship)
  })
}
