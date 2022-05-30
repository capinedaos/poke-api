import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeUser } from "../store/slices/user.slice";
import { useDispatch } from "react-redux";
import "../assets/style/UserInput.css";
import imgTrainer from "../assets/images/pokemon-trainer.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const UserInput = () => {
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getName = () => {
    dispatch(changeUser(userName));
    navigate("/pokemons");
  };

  return (
    <div className="inputContainer">
      <div className="title">
        <h1>Hello trainer!</h1>
        <img src={imgTrainer} alt="" />
      </div>
      <p>Give me your name to start</p>
      <div className="input">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <button onClick={getName}>
          {" "}
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default UserInput;
