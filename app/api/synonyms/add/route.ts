import { union } from "@/lib/synonymsStore";

export async function POST(req: Request): Promise<Response> {
  const { word, synonym } = await req.json();

  if (!word || !synonym) {
    return new Response(
      JSON.stringify({ error: "Word and synonym are required" }),
      { status: 400 }
    );
  }
  // Convert to lowercase and trim any extra spaces
  const trimmedWord = word.trim().toLowerCase();
  const trimmedSynonym = synonym.trim().toLowerCase();

  union(trimmedWord, trimmedSynonym);

  return new Response(
    JSON.stringify({ message: "Synonym added successfully" }),
    { status: 200 }
  );
}
