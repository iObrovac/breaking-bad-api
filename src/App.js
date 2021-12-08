import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/ui/Header";
import axios from "axios";
import CharacterGrid from "./Components/ui/characters/CharacterGrid";
import Search from "./Components/ui/Search";

const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      );

      // console.log(result.data);
      setItems(result.data);
      setIsLoading(false);
    };
    fetchItems();
  }, [query]);

  const filteredItems = items.filter((item) => {
    const rec = search.toLowerCase();

    return (
      item.name.toLowerCase().includes(rec) ||
      item.nickname.toLowerCase().includes(rec) ||
      item.portrayed.toLowerCase().includes(rec)
    );
  });

  console.log(items);

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setSearch(q)} />
      <CharacterGrid isLoading={isLoading} items={filteredItems} />
    </div>
  );
};

export default App;
