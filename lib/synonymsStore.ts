import db from "./db";
import { v4 as uuidv4 } from "uuid";
import { serializeSynonyms, deserializeSynonyms } from "./synonymHelpers";

// Define types for the rows returned from the database
interface SynonymRow {
  groupId: string;
}

interface GroupRow {
  synonyms: string;
}

// Find root group of a word
const find = (word: string): string => {
  const wordRow = db
    .prepare("SELECT groupId FROM synonyms WHERE word = ?")
    .get(word) as SynonymRow | undefined;

  if (!wordRow) {
    const groupId = uuidv4();
    db.prepare("INSERT INTO synonyms (word, groupId) VALUES (?, ?)").run(
      word,
      groupId
    );
    db.prepare("INSERT INTO groups (groupId, synonyms) VALUES (?, ?)").run(
      groupId,
      serializeSynonyms(new Set([word]))
    );
    return groupId;
  }
  return wordRow.groupId;
};

const union = (word1: string, word2: string) => {
  const root1 = find(word1);
  const root2 = find(word2);

  if (root1 !== root2) {
    try {
      // Database operations here
    } catch (error) {
      console.error("Database operation failed:", error);
      throw new Error("Database operation failed");
    }
    const group1Row = db
      .prepare("SELECT synonyms FROM groups WHERE groupId = ?")
      .get(root1) as GroupRow | undefined;
    const group2Row = db
      .prepare("SELECT synonyms FROM groups WHERE groupId = ?")
      .get(root2) as GroupRow | undefined;

    // Check if group1Row and group2Row are properly retrieved
    if (!group1Row || !group2Row) {
      throw new Error("One of the groups could not be found.");
    }

    const group1 = deserializeSynonyms(group1Row.synonyms);
    const group2 = deserializeSynonyms(group2Row.synonyms);

    if (group1.size >= group2.size) {
      group2.forEach((word) => {
        db.prepare("UPDATE synonyms SET groupId = ? WHERE word = ?").run(
          root1,
          word
        );
        group1.add(word);
      });
      db.prepare("UPDATE groups SET synonyms = ? WHERE groupId = ?").run(
        serializeSynonyms(group1),
        root1
      );
      db.prepare("DELETE FROM groups WHERE groupId = ?").run(root2);
    } else {
      group1.forEach((word) => {
        db.prepare("UPDATE synonyms SET groupId = ? WHERE word = ?").run(
          root2,
          word
        );
        group2.add(word);
      });
      db.prepare("UPDATE groups SET synonyms = ? WHERE groupId = ?").run(
        serializeSynonyms(group2),
        root2
      );
      db.prepare("DELETE FROM groups WHERE groupId = ?").run(root1);
    }
  }
};

const getSynonyms = (word: string): string[] => {
  const rootGroupId = db
    .prepare("SELECT groupId FROM synonyms WHERE word = ?")
    .get(word) as SynonymRow | undefined;

  if (!rootGroupId?.groupId) {
    return ["There are no synonyms!"];
  } else {
    const groupRow = db
      .prepare("SELECT synonyms FROM groups WHERE groupId = ?")
      .get(rootGroupId.groupId) as GroupRow | undefined;

    if (!groupRow) return ["There are no synonyms!"];

    const synonyms = deserializeSynonyms(groupRow.synonyms);

    // Filter out the word itself from the synonyms list before returning
    return Array.from(synonyms).filter((synonym) => synonym !== word);
  }
};

export { union, getSynonyms };

// console.log("Initial State of Maps:", { synonymMap, groupMap });

// // Helper function to find the root group of a word
// const find = (word: string): string => {
//   console.log("in find :", { synonymMap, groupMap });
//   const x = synonymMap.has(word);
//   console.log("X:", x);
//   if (!synonymMap.has(word)) {
//     const groupId = uuidv4(); // Assign a new group ID to the word if it's not part of any group yet
//     console.log("newid", groupId);
//     synonymMap.set(word, groupId);
//     groupMap.set(groupId, new Set([word]));
//     return groupId; // Return the groupId as the root
//   }

//   const rootGroup = synonymMap.get(word)!;
//   console.log(rootGroup);

//   return rootGroup;
// };

// // Union function to combine two words' synonym groups
// const union = (word1: string, word2: string) => {
//   const root1 = find(word1);
//   const root2 = find(word2);

//   console.log(`root1 za ${word1}: `, root1);
//   console.log(`root2 za ${word2}: `, root2);

//   if (root1 !== root2) {
//     const group1 = groupMap.get(root1)!;
//     console.log(`group1 za ${root1}: `, group1);
//     const group2 = groupMap.get(root2)!;
//     console.log(`group2 za ${root2}: `, group2);

//     // Merge the smaller group into the larger group for efficiency
//     if (group1.size >= group2.size) {
//       // All words from group2 are now mapped to root1
//       group2.forEach((word) => {
//         synonymMap.set(word, root1);
//         console.log(`NEWID for ${word}:`, synonymMap.get(word));
//         group1.add(word); // Add word to the group of root1
//         console.log(`group1  :`, groupMap.get(root1));
//       });
//       groupMap.delete(root2); // Remove group2 after merging
//       console.log(`group1  :`, groupMap.get(root1));
//       console.log(`NEWID for ${word1}:`, synonymMap.get(word1));
//       console.log(`NEWID for ${word2}:`, synonymMap.get(word2));
//     } else {
//       // All words from group1 are now mapped to root2
//       group1.forEach((word) => {
//         synonymMap.set(word, root2);
//         group2.add(word); // Add word to the group of root2
//       });
//       groupMap.delete(root1); // Remove group1 after merging
//     }
//     console.log("After adding:", { synonymMap, groupMap });
//   }
// };

// // Get all synonyms of a given word
// const getSynonyms = (word: string): string[] => {
//   const root = find(word);
//   console.log("root in search: ", root);
//   return Array.from(groupMap.get(root)!);
// };

// export { union, getSynonyms };
