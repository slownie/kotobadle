
import { useState } from "react"
const useWordle = (solution) => {
    const [turn,setTurn] = useState(0);
    const [currentGuess,setCurrentGuess] = useState(''); // What the user is currently typing
    const [guesses,setGuesses] = useState([]); // Formatted guesses
    const [history,setHistory] = useState([]); // Plain-string guesses
    const [isCorrect,setIsCorrect] = useState(false); // Victory

    const formatGuess = () => {

    }

    const addNewGuess = () => {

    }

    const handleKeyup = ({key}) => {
        console.log(key)
    }

    return {turn,currentGuess,guesses,isCorrect,handleKeyup}
}
export default useWordle;
