import { S_searchBar } from "./S_searchBar";
import { S_container } from "../../../others/reusable-styles/S_container";
import SearchIcon from "../../../../assets/icons/SearchIcon";
import { useContext, ChangeEvent, useEffect } from "react";
import { Context } from "../../../../utils/Context";

const SearchBar: React.FC = () => {
  const { rows, setList, setSearchValue } = useContext(Context);

  useEffect(() => () => setSearchValue(""), [setSearchValue]);

  const filterList = (e: ChangeEvent<HTMLInputElement>) => {
    const list = [...rows].filter(product => {
      const concatenateString = `${product.species}${product.grade}${
        product.drying_method
      }${product.treatment || ""}${product.usage}`;

      return concatenateString
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setSearchValue(e.target.value.toLowerCase());
    setList([...list]);
  };

  return (
    <S_container>
      <S_searchBar data-test="search-bar">
        <input
          type="text"
          onChange={e => filterList(e)}
          className="search-bar"
          placeholder="Search"
        />
        <button type="submit">
          <SearchIcon />
        </button>
      </S_searchBar>
    </S_container>
  );
};

export default SearchBar;
