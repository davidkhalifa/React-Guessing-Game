import React,  {useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const GuessingGame = () => {
    const [ guess, setGuess ] = useState("");
    const [ message, setMessage ] = useState("Start Guessing");
    const [ randomNumber, setRandomNumber ] = useState(null);
    const [ timesGuessed, setTimesGuessed ] = useState(null);

    useEffect(() => {

        if(randomNumber === null) {
            setRandomNumber(
                JSON.parse(localStorage.getItem("random"))   || generateNum()
            )
        }

        if(timesGuessed === null) {
            setTimesGuessed(
                JSON.parse(localStorage.getItem("guesses")) || 0
                );
        }


    }, [])

    function generateNum() {
        let random = Math.floor(Math.random() * 100);

        localStorage.setItem("random", JSON.stringify(random));

        return random;
    }

    function handleSubmit(e) {
        e.preventDefault();

        let parsedNum = parseInt(guess);

        if( parsedNum === randomNumber ) {
            setMessage("You got me &#128513;")
        } else if ( parsedNum > randomNumber ) {
            setMessage("That's to high")
        } else {
            setMessage("That's to low")
        }

        setTimesGuessed(timesGuessed + 1);
        localStorage.setItem("guesses", JSON.stringify(timesGuessed + 1));
    }   

    function handleChange(e) {
        if(!isNaN(e.target.value)) {
            setGuess(e.target.value);
        } else {
            alert("Sorry! It has to a number :)")
        }
        
    }

    function startOver() {
        setGuess("");
        setMessage("Start now!");
        setTimesGuessed(0);
    }


    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>I am thinking of a number between 1 and 100, Guess the lucky number!</Form.Label>
                <Form.label>You have made {timesGuessed} guesses</Form.label>
                <Form.Control
                type="text"
                value={guess}
                name="guess"
                onChange={handleChange}
                />
                <Button type="submit">Guess</Button>
                <Form.Label>{message}</Form.Label>
                <Button onClick={startOver} type="button">Start Over</Button>
            </Form.Group>
            <br/>
        </Form>

        </>
    )

  
    
}

export default GuessingGame;









