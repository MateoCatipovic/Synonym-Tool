import { getSynonyms } from "@/lib/synonymsStore";

interface Params {
  params: {
    word: string;
  };
}

export async function GET(req: Request, { params }: Params): Promise<Response> {
  const { word } = params;

  const trimmedWord = word.trim().toLowerCase();

  const synonyms = getSynonyms(trimmedWord);

  return new Response(JSON.stringify({ word, synonyms }), { status: 200 });
}
