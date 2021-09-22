import { useRef, useState } from "react";
import { FcSearch } from "react-icons/fc";
interface SearchProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

function Search({ setSearchText }: SearchProps) {
  const handleChange = () => {
    let s = searchBar.current as unknown as HTMLInputElement;
    setSearchText("&" + searchType + "=" + s.value);
  };

  const ChangeSearchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };
  const searchBar = useRef(null);
  const [searchType, setSearchType] = useState("text");

  return (
    <div className="searchbar">
      <select name="typeOfSearch" onChange={ChangeSearchType}>
        <option value="text">Text</option>
        <option value="tags">Tag</option>
      </select>
      <input
        ref={searchBar}
        placeholder="Write here what you want to search as images .."
      />{" "}
      <button onClick={handleChange}>
        {" "}
        <FcSearch />
      </button>
    </div>
  );
}

export default Search;
