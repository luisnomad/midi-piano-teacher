import React from 'react';
import { Button } from '../components/UIElements';

const MainMenu: React.FC = () => {
  const handleGameModeClick = (mode: string) => {
    console.log(`Selected game mode: ${mode}`);
    // Add navigation logic here
  };

  const handleSettingsClick = () => {
    console.log('Navigating to settings');
    // Add navigation logic here
  };

  return (
    <div className="main-menu">
      <h1 className="text-4xl font-bold mb-8">Piano Hero</h1>
      <div className="flex flex-col gap-4">
        <Button onClick={() => handleGameModeClick('Guess the Note')}>
          Guess the Note
        </Button>
        <Button onClick={() => handleGameModeClick('Song Mode')}>
          Song Mode
        </Button>
        <Button onClick={handleSettingsClick}>
          Settings
        </Button>
      </div>
    </div>
  );
};

export default MainMenu;
