import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const searchingBook = async (text) => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`
      );
      console.log(result);
      setSearchResult(result.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchText) {
      searchingBook(searchText);
    }
  }, [searchText]);

  return (
    <div className="App">
      <h1 className="title">Find a book</h1>
      <label>
        <input
          id="book-title"
          name="book-title"
          type="text"
          placeholder="Enter Book Title"
          onChange={(event) => setSearchText(event.target.value)}
        />
        {searchResult.map((result, index) => {
          return (
            <div key={index} className="resultList">
              <li className="searchResultList">{result.volumeInfo.title}</li>
            </div>
          );
        })}
      </label>
    </div>
  );
}

export default App;
