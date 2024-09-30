import React from "react";

interface ListProps {
  searchWord: string;
  result: string[];
  synonym: string;
}

const List: React.FC<ListProps> = ({ searchWord, result }) => {
  return (
    <div className="mt-2">
      <p className="text-[17px]">Synonyms for {searchWord}:</p>
      <ul className="list-disc pl-5">
        {result.map((synonym, index) => (
          <li key={index}>{synonym}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
