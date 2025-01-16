import React, { useState } from 'react';
import MidiPlayer from '../components/MidiPlayer';
import NotesScroller from '../components/NotesScroller';
import Keyboard from '../components/Keyboard';
import { Button, Dropdown } from '../components/UIElements';

const SongMode: React.FC = () => {
  const [leftHandTrack, setLeftHandTrack] = useState<string | null>(null);
  const [rightHandTrack, setRightHandTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="song-mode">
      <div className="track-selection">
        <Dropdown
          options={['Track 1', 'Track 2', 'Track 3']}
          onChange={setLeftHandTrack}
          className="left-hand-track"
        />
        <Dropdown
          options={['Track 1', 'Track 2', 'Track 3']}
          onChange={setRightHandTrack}
          className="right-hand-track"
        />
      </div>
      <Button onClick={handleStartPause} className="start-pause-button">
        {isPlaying ? 'Pause' : 'Start'}
      </Button>
      <div className="progress-bar">
        {/* Progress bar implementation */}
      </div>
      <NotesScroller notes={[]} currentTime={0} />
      <Keyboard />
      <div className="score">
        {/* Score implementation */}
      </div>
    </div>
  );
};

export default SongMode;
