import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/style/PokemonDetail.css";
import { useParams } from "react-router-dom";
import { v4 as uuiv4 } from "uuid";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/Pokemon-Logo.png";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState({});
  // const [color, setColor] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      // .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126")
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemon(res.data));
  }, [id]);

  console.log(pokemon);

  return (
    <div className="cardPokemon">
      <div className="imgLogo">
        <img src={logo} alt="" />
      </div>
      <Link to="/pokemons" className="link">
        <button>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </Link>
      <div className="containerCard">
        <div className="containerNameImg">
          <img src={pokemon.sprites?.other?.home.front_default} alt="" />

          <div className="containerWeightHeight">
            <div className="weight">
              <p className="number">{pokemon.weight}</p>
              <p className="gray"> Weight </p>
            </div>

            <div className="height">
              <p className="number"> {pokemon.height}</p>
              <p className="gray">Height</p>
            </div>
          </div>

          <div className="name">
            <h1>{pokemon.name}</h1>

            <div className="containerLine">
              <div className="line"></div>
              <div className="line"></div>
            </div>

            <p># {pokemon.id}</p>
          </div>
        </div>

        <div className="containerTypeAbility">
          <div className="container">
            <div className="title">
              <div className="line"></div>
              <h2>Type</h2>
              <div className="line"></div>
            </div>

            <div className="display">
              {pokemon.types?.map((type) => (
                <p key={uuiv4()}>{type.type.name}</p>
              ))}
            </div>
          </div>

          <div className="container">
            <div className="title">
              <div className="line"></div>
              <h2>Abilities</h2>
              <div className="line"></div>
            </div>

            <div className="display">
              {pokemon.abilities?.map((abilitie) => (
                <p key={uuiv4()}>{abilitie.ability.name}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="title">
            <div className="line"></div>
            <h2>Stats Base</h2>
            <div className="line"></div>
          </div>
          <div className="stats_items">
            <div className="state_name">
              {pokemon.stats?.map((stat) => (
                <p key={uuiv4()}>{stat.stat.name}:</p>
              ))}
            </div>

            <div className="state_base">
              {pokemon.stats?.map((stat) => (
                <div className="skills" key={uuiv4()}>
                  <div className="percent">
                    <div
                      className="progress"
                      style={{ width: stat.base_stat * 2 }}
                    >
                      {stat.base_stat}/150
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="containerMoves">
        {/* <button>Encounters</button> */}
        <div className="moves">
          <div className="title">
            <div className="line"></div>
            <h2>Movements</h2>
            <div className="line"></div>
          </div>

          {pokemon.moves?.map((move) => (
            <p key={uuiv4()}>{move.move.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
