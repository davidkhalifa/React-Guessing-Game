import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./GuessingGame.module.css";

const GuessingGame = () => {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Start Guessing!");
  const [randomNumber, setRandomNumber] = useState(null);
  const [timesGuessed, setTimesGuessed] = useState(null);

  useEffect(() => {
    if (randomNumber === null) {
      setRandomNumber(
        JSON.parse(localStorage.getItem("random")) || generateNum()
      );
    }

    if (timesGuessed === null) {
      setTimesGuessed(
        JSON.parse(localStorage.getItem("guesses")) || 0
      );
    }
  }, []);

  function generateNum() {
    let random = Math.floor(Math.random() * 100);

    localStorage.setItem("random", JSON.stringify(random));

    return random;
  }

  function handleSubmit(e) {
    e.preventDefault();

    let parsedNum = parseInt(guess);

    if (parsedNum === randomNumber) {
      setMessage("You got me! lol");
    } else if (parsedNum > randomNumber) {
      setMessage("That's too high");
    } else {
      setMessage("That's too low");
    }

    setTimesGuessed(timesGuessed + 1);
    localStorage.setItem("guesses", JSON.stringify(timesGuessed + 1));
  }

  function handleChange(e) {
    if (!isNaN(e.target.value)) {
      setGuess(e.target.value);
    } else {
      alert("Sorry! It has to be a number :)");
    }
  }

  function startOver() {
    setGuess("");
    setMessage("Start now!");
    setTimesGuessed(0);
    setRandomNumber(generateNum());
    localStorage.removeItem("guesses");
  }

  console.log(randomNumber);

  return (
    <div >
      <Form className={styles.Form} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className={styles.FirstText}>
            I am thinking of a number between 1 and 100. Guess the lucky number!
          </Form.Label>
          <br />
          <Form.Label>You have made {timesGuessed} guesses</Form.Label>
          <Form.Control
            className="text-area"
            type="text"
            value={guess}
            name="guess"
            onChange={handleChange}
            size="lg"
          />
          <br/>
          <Button type="submit">Guess</Button>
          <br />
          <br />
          <Button onClick={startOver} type="button">
            Start Over!
          </Button>
          <br />
          <br />
          <Form.Label>{message}</Form.Label>
        </Form.Group>
      </Form>
    </div>
  );
};

export default GuessingGame;
