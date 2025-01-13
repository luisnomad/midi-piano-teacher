import React, { useState, useEffect } from 'react';

const whiteKeys = [
  { id: 'C1', note: 'C1' },
  { id: 'D1', note: 'D1' },
  { id: 'E1', note: 'E1' },
  { id: 'F1', note: 'F1' },
  { id: 'G1', note: 'G1' },
  { id: 'A1', note: 'A1' },
  { id: 'B1', note: 'B1' },
  { id: 'C2', note: 'C2' },
  { id: 'D2', note: 'D2' },
  { id: 'E2', note: 'E2' },
  { id: 'F2', note: 'F2' },
  { id: 'G2', note: 'G2' },
  { id: 'A2', note: 'A2' },
  { id: 'B2', note: 'B2' },
  { id: 'C3', note: 'C3' }
];

const blackKeys = [
  { id: 'C#1', note: 'C#1' },
  { id: 'D#1', note: 'D#1' },
  { id: 'F#1', note: 'F#1' },
  { id: 'G#1', note: 'G#1' },
  { id: 'A#1', note: 'A#1' },
  { id: 'C#2', note: 'C#2' },
  { id: 'D#2', note: 'D#2' },
  { id: 'F#2', note: 'F#2' },
  { id: 'G#2', note: 'G#2' },
  { id: 'A#2', note: 'A#2' }
];

const Keyboard = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  const handleKeyDown = (note: string) => {
    if (!pressedKeys.includes(note)) {
      setPressedKeys([...pressedKeys, note]);
    }
  };

  const handleKeyUp = (note: string) => {
    setPressedKeys(pressedKeys.filter(key => key !== note));
  };

  useEffect(() => {
    const handleMIDIMessage = (message: WebMidi.MIDIMessageEvent) => {
      const [status, note, velocity] = message.data;
      const noteName = getNoteName(note);

      if (status === 144 && velocity > 0) {
        handleKeyDown(noteName);
      } else if (status === 128 || (status === 144 && velocity === 0)) {
        handleKeyUp(noteName);
      }
    };

    const initMIDI = async () => {
      if (navigator.requestMIDIAccess) {
        const midiAccess = await navigator.requestMIDIAccess();
        midiAccess.inputs.forEach(input => {
          input.onmidimessage = handleMIDIMessage;
        });
      }
    };

    initMIDI();

    return () => {
      if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(midiAccess => {
          midiAccess.inputs.forEach(input => {
            input.onmidimessage = null;
          });
        });
      }
    };
  }, [pressedKeys]);

  const getNoteName = (note: number): string => {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(note / 12) - 1;
    const noteName = noteNames[note % 12];
    return `${noteName}${octave}`;
  };

  return (
    <div className="keyboard">
      <div className="white-keys">
        {whiteKeys.map(key => (
          <div
            key={key.id}
            className={`key white-key ${pressedKeys.includes(key.note) ? 'pressed' : ''}`}
            onMouseDown={() => handleKeyDown(key.note)}
            onMouseUp={() => handleKeyUp(key.note)}
            onTouchStart={() => handleKeyDown(key.note)}
            onTouchEnd={() => handleKeyUp(key.note)}
          >
            {key.note}
          </div>
        ))}
      </div>
      <div className="black-keys">
        {blackKeys.map(key => (
          <div
            key={key.id}
            className={`key black-key ${pressedKeys.includes(key.note) ? 'pressed' : ''}`}
            onMouseDown={() => handleKeyDown(key.note)}
            onMouseUp={() => handleKeyUp(key.note)}
            onTouchStart={() => handleKeyDown(key.note)}
            onTouchEnd={() => handleKeyUp(key.note)}
          >
            {key.note}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
