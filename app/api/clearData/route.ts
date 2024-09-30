import db from "@/lib/db";

export async function POST(req: Request): Promise<Response> {
  try {
    // Clear the 'synonyms' and 'groups' tables in the SQLite database
    db.prepare("DELETE FROM synonyms").run();
    db.prepare("DELETE FROM groups").run();

    // Return a success message
    return new Response(
      JSON.stringify({ message: "Database cleared successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing the database:", error);
    // Return an error message in case of failure
    return new Response(
      JSON.stringify({ error: "Failed to clear the database" }),
      { status: 500 }
    );
  }
}
