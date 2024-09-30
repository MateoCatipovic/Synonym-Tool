# Synonyms Tool

## Description
The Synonyms Tool is a simple web-based application built using Next.js that allows users to add synonyms for words and search for existing ones. This project uses SQLite as the database and can be easily deployed to environments like Vercel. However, since SQLite is file-based, database persistence will be reset with each deployment when deployed to serverless platforms like Vercel.

## Features
- **Add Synonyms**: Users can enter a word and its synonym to store in the database.
- **Search Synonyms**: Users can search for synonyms by providing a word, and the app will return any associated synonyms.
- **Error Handling**: Graceful error messages are displayed if required fields are left empty or if a search fails.

## Technologies Used
- **Frontend**: Next.js, React
- **Backend**: Node.js
- **Database**: SQLite
- **Styling**: Tailwind CSS
- **Testing**: Jest, React Testing Library

## Installation and Setup
To run the project locally, follow these steps:

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (version 14 or above recommended).

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/MateoCatipovic/Synonyms-Tool.git
    ```
   
2. Navigate to the project directory:
    ```bash
    cd synonyms-tool
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Run the application:
    ```bash
    npm run dev
    ```

5. Access the app in your browser at `http://localhost:3000`.

## Database Setup
This project uses an SQLite database stored in a file named `synonyms.db`. The database is automatically initialized with two tables: 
- `synonyms`: stores the words and their associated synonyms.
- `groups`: stores synonym groups for organizing related words.

The SQLite database will be located `db` folder at the root of the project.

### Important
If deployed to Vercel or other serverless platforms, note that the SQLite database file will reset on every deployment. To maintain persistent data, consider switching to a cloud-based database like PostgreSQL or MySQL.

## Running Tests
The project includes tests to ensure the functionality of the main features (adding and searching synonyms). Run the tests using:
```bash
npm test