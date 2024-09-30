import React from "react";
import Input from "./Input";

interface AddProps {
  word: string;
  setWord: (value: string) => void;
  synonym: string;
  setSynonym: (value: string) => void;
  addSynonym: () => void;
}

const AddComponent: React.FC<AddProps> = ({
  word,
  setWord,
  synonym,
  setSynonym,
  addSynonym,
}) => {
  return (
    <div className="flex flex-col sm:flex-row  pt-4">
      <Input placeholder="Word" value={word} setFunction={setWord} />
      <Input placeholder="Synonym" value={synonym} setFunction={setSynonym}/>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={addSynonym}
      >
        Add Synonym
      </button>
    </div>
  );
};

export default AddComponent;
