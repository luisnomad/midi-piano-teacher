import React, { useEffect, useState, useRef } from 'react';
import PianoKeyboard from './components/PianoKeyboard';
import Soundfont, { Player } from 'soundfont-player';
import MidiPlayer from './components/MidiPlayer';

const App: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const playerRef = useRef<Player | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getMIDIKeyId = (note: number): string => `Key${note}`;

  useEffect(() => {
    const initAudio = async () => {
      audioContextRef.current = new AudioContext();
      playerRef.current = await Soundfont.instrument(
        audioContextRef.current,
        'acoustic_grand_piano'
      );
    };

    const handleMIDIMessage = (message: WebMidi.MIDIMessageEvent) => {
      const [status, note, velocity] = message.data;
      const keyId = getMIDIKeyId(note);
      
      // Note on (144) with velocity > 0
      if (status === 144 && velocity > 0) {
        setPressedKeys(prev => [...prev, keyId]);
        playerRef.current?.play(note.toString());
      }
      // Note off (128) or note on with velocity 0
      else if (status === 128 || (status === 144 && velocity === 0)) {
        setPressedKeys(prev => prev.filter(key => key !== keyId));
        playerRef.current?.stop();
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

    initAudio();
    initMIDI();

    return () => {
      audioContextRef.current?.close();
      playerRef.current?.stop();
    };
  }, []);

  return (
    <div className="App">
      <h1>25 Keys MIDI Controller</h1>
      <PianoKeyboard pressedKeys={pressedKeys} />
      <MidiPlayer />
    </div>
  );
};

export default App;