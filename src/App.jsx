import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [findABook, setfindABook] = useState("");
  const [resultFindABook, setResultFindABook] = useState([]);

  useEffect(() => {
    if (findABook) {
      fetchABook(findABook);
    }
  }, [findABook]);

  const fetchABook = async (text) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`
      );
      setResultFindABook(res.data.items);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  return (
    <div>
      <h1>Find a Book</h1>
      <input
        type="text"
        value={findABook}
        onChange={(event) => setfindABook(event.target.value)}
      />
      <ul>
        {resultFindABook.length > 0 && (
          <>
            {resultFindABook.map((result, index) => (
              <div key={index}>
                <li>{result.volumeInfo.title}</li>
              </div>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
export default App;
