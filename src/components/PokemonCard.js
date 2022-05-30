import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/style/PokemonCard.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuiv4 } from "uuid";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(pokemonUrl).then((res) => setPokemon(res.data));
  }, [pokemonUrl]);

  console.log(pokemon);

  return (
    <div className="containerTarget">
      <div
        className="target"
        onClick={() => navigate(`/pokemons/${pokemon.id} `)}
      >
        <img src={pokemon.sprites?.other?.home.front_default} alt="" />
        <h2>{pokemon.name}</h2>

        <div className="types">
          <p>Types:</p>
          {pokemon.types?.map((type) => (
            <p key={uuiv4()}>{type.type.name},</p>
          ))}
        </div>

        <div className="stats">
          {pokemon.stats?.map((stat) => (
            <p key={uuiv4()}>
              {stat.stat.name}: {stat.base_stat}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
