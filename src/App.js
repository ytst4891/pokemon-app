import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [ loading, setLoading ] = useState(true);
  const [ pokemonData, setPakemonData ] = useState([]);
  const [ nextURL, setNextURL ] = useState("");
  const [ prevURL, setPrevURL ] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results)
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  // ページ内の各ポケモンデータを取得
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(pokemon => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPakemonData(_pokemonData);
  }

  // 前へボタン処理
  const handlePrevPage = async () => {
    if(prevURL) {
      setLoading(true);
      let res = await getAllPokemon(prevURL);
      await loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    }    
  }

  // 次へボタン処理
  const handleNextPage = async () => {
    if(nextURL) {
      setLoading(true);
      let res = await getAllPokemon(nextURL);
      await loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中</h1>
          ) : (
            <>
              <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon}/>
                })}
              </div>
              <div className="btn">
                {prevURL && <button onClick={handlePrevPage}>前へ</button>}
                {nextURL && <button onClick={handleNextPage}>次へ</button>}
              </div>
            </>
          )}
      </div>
    </>
  );
}

export default App;
