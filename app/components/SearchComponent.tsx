import React from "react";
import Input from "./Input";

interface SearchProps {
  searchWord: string;
  setSearchWord: (value: string) => void;
  searchSynonym: () => void;
}

const SearchComponent: React.FC<SearchProps> = ({
  searchWord,
  setSearchWord,
  searchSynonym,
}) => {
  return (
    <div className="flex flex-col sm:flex-row mb-2 pt-4 sm:pt-0">
      <Input
        placeholder="Search Word"
        value={searchWord}
        setFunction={setSearchWord}
      />
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={searchSynonym}
      >
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
