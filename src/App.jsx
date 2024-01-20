import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [findInputBook, setFindInputBook] = useState([]);
  const [inputState, setInputState] = useState("");

  const findFromGoogle = async (text) => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`
      );

      setFindInputBook(result.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (inputState !== "") {
      findFromGoogle(inputState);
    }
  }, [inputState]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        value={inputState}
        onChange={(event) => setInputState(event.target.value)}
      />
      <div className="bookList">
        <ul>
          {findInputBook.map((book, index) => (
            <li key={index}>{book.volumeInfo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
