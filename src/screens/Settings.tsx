import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from '../components/UIElements';
import { useStore } from '../state/store';

const Settings: React.FC = () => {
  const [midiInputs, setMidiInputs] = useState<WebMidi.MIDIInput[]>([]);
  const [selectedInput, setSelectedInput] = useState<string>('');
  const [volume, setVolume] = useState<number>(100);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const { setMidiInput, setMidiVolume, setMuteAll } = useStore(state => ({
    setMidiInput: state.setMidiInput,
    setMidiVolume: state.setMidiVolume,
    setMuteAll: state.setMuteAll,
  }));

  useEffect(() => {
    const initMIDI = async () => {
      if (navigator.requestMIDIAccess) {
        const midiAccess = await navigator.requestMIDIAccess();
        const inputs = Array.from(midiAccess.inputs.values());
        setMidiInputs(inputs);
      }
    };

    initMIDI();
  }, []);

  const handleInputChange = (value: string) => {
    setSelectedInput(value);
    const input = midiInputs.find(input => input.id === value);
    if (input) {
      setMidiInput(input);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);
    setMidiVolume(newVolume);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    setMuteAll(!isMuted);
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="setting-item">
        <label>MIDI Input Device:</label>
        <Dropdown
          options={midiInputs.map(input => input.name)}
          onChange={handleInputChange}
          className="midi-input-dropdown"
        />
      </div>
      <div className="setting-item">
        <label>Volume:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
      <div className="setting-item">
        <Button onClick={handleMuteToggle}>
          {isMuted ? 'Unmute All' : 'Mute All'}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
