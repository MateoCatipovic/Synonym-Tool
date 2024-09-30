export const serializeSynonyms = (synonyms: Set<string>): string => {
  return JSON.stringify([...synonyms]);
};

export const deserializeSynonyms = (data: string): Set<string> => {
  return new Set(JSON.parse(data));
};