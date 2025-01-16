import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './screens/MainMenu';
import Settings from './screens/Settings';
import GuessTheNote from './screens/GuessTheNote';
import SongMode from './screens/SongMode';
import useStore from './state/store';

const App: React.FC = () => {
  const { gameMode, setGameMode } = useStore();

  useEffect(() => {
    // Initialize game mode or other state if needed
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/guess-the-note" element={<GuessTheNote />} />
          <Route path="/song-mode" element={<SongMode />} />
          <Route path="/" element={<MainMenu />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;