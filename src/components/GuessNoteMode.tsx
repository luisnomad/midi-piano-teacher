import React, { useState, useEffect } from 'react';
import Keyboard from './Keyboard';
import useStore from '../state/store';

const GuessNoteMode: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const { pressedKeys, setPressedKeys } = useStore();

  useEffect(() => {
    const generateRandomNote = () => {
      const notes = ['C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1', 'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3'];
      const randomIndex = Math.floor(Math.random() * notes.length);
      return notes[randomIndex];
    };

    const newNote = generateRandomNote();
    setCurrentNote(newNote);
  }, []);

  useEffect(() => {
    if (pressedKeys.length > 0 && currentNote) {
      if (pressedKeys.includes(currentNote)) {
        setScore(score + 1);
        setCurrentNote(null);
        setPressedKeys([]);
      } else {
        setLives(lives - 1);
        if (lives - 1 === 0) {
          alert('Game Over');
          setScore(0);
          setLives(3);
        }
      }
    }
  }, [pressedKeys, currentNote, score, lives, setPressedKeys]);

  return (
    <div className="guess-note-mode">
      <h1 className="text-4xl font-bold mb-4">Guess The Note</h1>
      <div className="score text-2xl mb-2">Score: {score}</div>
      <div className="lives text-2xl mb-2">Lives: {lives}</div>
      <div className="current-note text-2xl mb-4">Current Note: {currentNote}</div>
      <Keyboard />
    </div>
  );
};

export default GuessNoteMode;
