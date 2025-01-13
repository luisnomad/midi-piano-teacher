import create from 'zustand';

interface GameState {
  gameMode: 'Guess the Note' | 'Song Mode' | null;
  guessNoteState: {
    score: number;
    currentNote: string | null;
    lives: number;
  };
  songModeState: {
    leftHandTrack: string | null;
    rightHandTrack: string | null;
    isPlaying: boolean;
    currentTime: number;
  };
  midiData: any;
  settings: {
    midiInputDevice: string | null;
    midiVolume: number;
    muteAll: boolean;
  };
  errors: string[];
  setGameMode: (mode: 'Guess the Note' | 'Song Mode' | null) => void;
  setGuessNoteState: (state: Partial<GameState['guessNoteState']>) => void;
  setSongModeState: (state: Partial<GameState['songModeState']>) => void;
  setMidiData: (data: any) => void;
  setSettings: (settings: Partial<GameState['settings']>) => void;
  addError: (error: string) => void;
  clearErrors: () => void;
}

const useStore = create<GameState>((set) => ({
  gameMode: null,
  guessNoteState: {
    score: 0,
    currentNote: null,
    lives: 3,
  },
  songModeState: {
    leftHandTrack: null,
    rightHandTrack: null,
    isPlaying: false,
    currentTime: 0,
  },
  midiData: null,
  settings: {
    midiInputDevice: null,
    midiVolume: 1,
    muteAll: false,
  },
  errors: [],
  setGameMode: (mode) => set({ gameMode: mode }),
  setGuessNoteState: (state) => set((prev) => ({
    guessNoteState: { ...prev.guessNoteState, ...state },
  })),
  setSongModeState: (state) => set((prev) => ({
    songModeState: { ...prev.songModeState, ...state },
  })),
  setMidiData: (data) => set({ midiData: data }),
  setSettings: (settings) => set((prev) => ({
    settings: { ...prev.settings, ...settings },
  })),
  addError: (error) => set((prev) => ({
    errors: [...prev.errors, error],
  })),
  clearErrors: () => set({ errors: [] }),
}));

export default useStore;
