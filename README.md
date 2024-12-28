# MIDI Controller React App

This project is a React application that simulates a 25-key MIDI controller. It highlights the note being played based on MIDI input events.

## Project Structure

- `public/`: Contains the static files for the application.
- `src/`: Contains the source code for the application.
  - `components/`: Contains the React components.
    - `MidiController.tsx`: Renders the MIDI controller and manages the highlighted note.
    - `Note.tsx`: Represents an individual key on the MIDI controller.
  - `App.tsx`: The main application component that integrates the MIDI controller.
  - `index.tsx`: The entry point of the application.
- `package.json`: Lists the project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration file.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-react-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```

This will launch the application in your default web browser.

## Features

- Visual representation of a 25-key MIDI controller.
- Highlights the currently played note based on MIDI input.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.