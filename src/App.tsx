import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/guess-the-note">
            <GuessTheNote />
          </Route>
          <Route path="/song-mode">
            <SongMode />
          </Route>
          <Route path="/">
            <MainMenu />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
