import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react"
import { FiSearch } from "react-icons/fi"
import { ImCross } from "react-icons/im"

interface Props {
  canUseSearchBar: boolean
  setCanUseSearchBar: Dispatch<SetStateAction<boolean>>
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  searchTerm: string
  setSearchTerm: (value: SetStateAction<string>) => void
}
export default function SearchBar(props: Props) {
  const {
    canUseSearchBar,
    setCanUseSearchBar,
    onSubmit,
    searchTerm,
    setSearchTerm,
  } = props
  const searchBarToggle = () => {
    setCanUseSearchBar(!canUseSearchBar)
  }
  return (
    <div className={`search-wrapper ${canUseSearchBar && "active"}`}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search planets, people and starships..."
          value={searchTerm}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(event.target.value)
          }
        />
        <button type="submit">
          <FiSearch className="icon" />
        </button>
        <button
          type="reset"
          className={`toggle-search-2`}
          onClick={searchBarToggle}
        >
          <FiSearch className="icon" />
        </button>
      </form>
      <button
        className={`toggle-search  close--${!canUseSearchBar}`}
        onClick={searchBarToggle}
      >
        <ImCross size={25} />
      </button>
    </div>
  )
}
