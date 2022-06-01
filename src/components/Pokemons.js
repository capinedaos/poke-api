import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import "../assets/style/Pokemons.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuiv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Pokemons = () => {
  const user = useSelector((state) => state.user);

  const [pokemons, setPokemons] = useState([]);
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();
  // const [namePokemon,setNamePokemon]= useState("");

  useEffect(() => {
    axios
      // .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126")
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        setPokemons(res.data.results);
      });

    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((res) => setTypes(res.data.results));
  }, []);

  const search = () => {
    navigate(`/pokemons/${pokemonSearch.toLowerCase()}`);
  };

  const filterPokemons = (e) => {
    axios.get(e.target.value).then((res) => setPokemons(res.data.pokemon));
  };


  const [page, setPage] = useState(1);

  const pokemonNumbers = 5;
  const lastIndex = pokemonNumbers * page;
  const firstIndex = lastIndex - pokemonNumbers;
  const pokemonPaginated = pokemons.slice(firstIndex, lastIndex);
  const lastPage = Math.ceil(pokemons?.length / pokemonNumbers);

  const numbers = [];
  for (let i = 1; i <= lastPage; i++) {
    numbers.push(i);
  }
   console.log(pokemons);

  return (
    <div className="sectionPokemons">
      <div className="welcome">
        <Link to="/" className="link">
          <button>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </button>
        </Link>

        <h1>Pokedex</h1>
        <p>
          Welcome <b>{user}</b>, here you can find your favorite pokemon{" "}
        </p>
      </div>

      <div className="search">
        <select onChange={filterPokemons}>
          <option value="">Select Type</option>
          {types.map((type) => (
            <option value={type.url} key={uuiv4()}>
              {type.name}
            </option>
          ))}
        </select>

        <div className="input_search">
          <input
            type="text"
            value={pokemonSearch}
            onChange={(e) => setPokemonSearch(e.target.value)}
            placeholder="Search Here..."
          />
          <button onClick={search}>Buscar</button>
        </div>
        <div className="arrow">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === lastPage}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <div className="pages" >
        {numbers.map((number) => (
          <button onClick={() => setPage(number)}>{number} </button>
        ))}
      </div>

      <div className="containerPokemons">
        {pokemonPaginated?.map((pokemon) => (
          <PokemonCard
            key={pokemon.url !== undefined ? pokemon.url : pokemon.pokemon.url}
            pokemonUrl={
              pokemon.url !== undefined ? pokemon.url : pokemon.pokemon.url
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Pokemons;
