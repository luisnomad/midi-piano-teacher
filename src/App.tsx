import React, { useEffect, useState } from 'react';
import PianoKeyboard from './components/PianoKeyboard';

const App: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleMIDIMessage = (event: WebMidi.MIDIMessageEvent) => {
      const [status, note, velocity] = event.data;
      const noteId = `Key${note}`;

      console.log(`MIDI event received: status=${status}, note=${note}, velocity=${velocity}`);

      if (status === 144 && velocity > 0) { // Note on
        setPressedKeys((prevKeys) => {
          if (!prevKeys.includes(noteId)) {
            const newKeys = [...prevKeys, noteId];
            console.log(`Note on: ${noteId}, pressedKeys: ${newKeys}`);
            return newKeys;
          }
          return prevKeys;
        });
      } else if (status === 128 || (status === 144 && velocity === 0)) { // Note off
        setPressedKeys((prevKeys) => {
          const newKeys = prevKeys.filter((key) => key !== noteId);
          console.log(`Note off: ${noteId}, pressedKeys: ${newKeys}`);
          return newKeys;
        });
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
      // Cleanup MIDI event listeners if necessary
    };
  }, []);

  return (
    <div className="App">
      <h1>25 Keys MIDI Controller</h1>
      <PianoKeyboard pressedKeys={pressedKeys} />
    </div>
  );
};

export default App;