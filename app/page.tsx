"use client";
import axios from "axios";
import { useState } from "react";
import AddComponent from "./components/AddComponent";
import SearchComponent from "./components/SearchComponent";
import List from "./components/List";

export default function Home() {
  const [word, setWord] = useState<string>("");
  const [synonym, setSynonym] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const [result, setResult] = useState<string[]>([]);
  const [searchError, setSearchError] = useState<string>("");
  const [addSynonymError, setAddSynonymError] = useState<string>("");

  const addSynonym = async (): Promise<void> => {
    // Check if word or synonym is empty
    if (!word.trim() || !synonym.trim()) {
      setAddSynonymError("Both word and synonym are required.");
      return;
    }
    try {
      const response  = await axios.post("/api/synonyms/add", { word, synonym });

      if (response.data.message) {
        alert(response.data.message);
        setWord("");
        setSynonym("");
        setSearchWord("");
        setResult([]);
        setAddSynonymError("");
      }
    } catch (error) {
      console.error("Error adding synonym:", error);
      alert("Fail to add synonym!");
      setAddSynonymError("Error adding synonym");
    }
  };

  const searchSynonym = async (): Promise<void> => {
    // Check if searchWord is empty
    if (!searchWord.trim()) {
      setSearchError("Please enter a word to search for synonyms.");
      setResult([]);
      return;
    }

    try {
      const resposne = await axios.get(`/api/synonyms/${searchWord}`);
      if (resposne.data) {
        setResult(resposne.data.synonyms);
        setSearchError("");
      }
    } catch (error) {
      console.error("Failed to search synonym", error);
      setSearchError("Failed to search synonym");
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="mb-12">Synonyms Tool</h2>
      {/* Add component */}
      <div className="flex flex-col mx-4 w-[350px] sm:w-auto">
        <p className="text-2xl mb-4">Add Synonym</p>
        <div className="mb-8">
          <AddComponent
            word={word}
            setWord={setWord}
            synonym={synonym}
            setSynonym={setSynonym}
            addSynonym={addSynonym}
          />
          {/* Display add synonym error if it exists */}
          {addSynonymError && (
            <p className="text-red-500 ">{addSynonymError}</p>
          )}
        </div>
        {/* Search component */}
        <div className="flex flex-col">
          <p className="text-2xl mb-4">Search Synonyms</p>
          <SearchComponent
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            searchSynonym={searchSynonym}
          />
          {/* Display search error if it exists */}
          {searchError && <p className="text-red-500">{searchError}</p>}
          {/* List component */}
          <List searchWord={searchWord} result={result} synonym={synonym} />
        </div>
      </div>
    </div>
  );
}
