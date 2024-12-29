/**
 * MidiPlayer Component
 * 
 * A component that loads and plays MIDI files using the Web Audio API and Soundfont.
 * Features:
 * - MIDI file upload and parsing using @tonejs/midi
 * - Real-time playback using soundfont-player
 * - Visual timeline representation
 * - Play/pause/reset controls
 * - Progress trackingxw
 * 
 * @component
 * @example
 * ```tsx
 * <MidiPlayer />
 * ```
 */

import React, { useState, useEffect, useRef } from 'react';
import { Midi } from '@tonejs/midi';
import Soundfont from 'soundfont-player';
import { Upload, Play, Pause, RotateCcw } from 'lucide-react';
import MidiViewer from './MidiViewer';

/** Represents a single MIDI note with timing and playback state */
interface Note {
  /** MIDI note number (0-127) */
  note: number;
  /** Start time in seconds */
  time: number;
  /** Note duration in seconds */
  duration: number;
  /** Note velocity (0-1) */
  velocity: number;
  /** Whether note is currently playing */
  isPlaying: boolean;
  /** Whether note has been played in current session */
  hasPlayed: boolean;
}

function getNoteName(noteNumber: number) {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#','G','G#','A','A#','B'];
  return noteNames[noteNumber % 12] || 'Unknown';
}

const MidiPlayer = () => {
  const [midiData, setMidiData] = useState<Note[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const playerRef = useRef<Soundfont.Player | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize audio context and soundfont player
  useEffect(() => {
    const initAudio = async () => {
      try {
        audioContextRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
        if (audioContextRef.current) {
          playerRef.current = await Soundfont.instrument(
            audioContextRef.current,
            'acoustic_grand_piano'
          );
        }
      } catch (err) {
        setError('Failed to initialize audio system');
        console.error(err);
      }
    };

    initAudio();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle file upload
  interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleFileUpload = async (event: FileUploadEvent) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setFileName(file.name);
    setCurrentTime(0);
    setIsPlaying(false);

    try {
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        try {
          const midi = new Midi(e.target?.result as ArrayBuffer);
          
          // Convert MIDI data to our format
          const notes: Note[] = midi.tracks.flatMap(track => 
            track.notes.map(note => ({
              note: note.midi,
              time: note.time,
              duration: note.duration,
              velocity: note.velocity,
              isPlaying: false,
              hasPlayed: false
            }))
          ).sort((a, b) => a.time - b.time);

          setMidiData(notes);
          setIsLoading(false);
        } catch (err) {
          setError('Invalid MIDI file');
          setIsLoading(false);
          console.error(err);
        }
      };

      reader.onerror = () => {
        setError('Failed to read file');
        setIsLoading(false);
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      setError('Failed to process file');
      setIsLoading(false);
      console.error(err);
    }
  };

  // Handle playback animation and note triggering
  interface AnimationFrame {
    (timestamp: number): void;
  }

  const animate: AnimationFrame = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const newTime = (timestamp - startTimeRef.current) / 1000;
    setCurrentTime(newTime);

    // Update notes' playing status and trigger new notes
    const updatedNotes: Note[] = midiData.map(note => {
      const isNoteCurrentlyPlaying = newTime >= note.time && 
                                   newTime <= note.time + note.duration;
      
      // Trigger note if it's time to play and hasn't been played
      if (newTime >= note.time && !note.hasPlayed && playerRef.current) {
        playerRef.current.play(note.note.toString(), 0, {
          duration: note.duration * 1000,
          gain: note.velocity
        });
        note.hasPlayed = true;
      }

      return {
        ...note,
        isPlaying: isNoteCurrentlyPlaying
      };
    });

    setMidiData(updatedNotes);

    // Continue animation if still playing
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!midiData.length) return;
    
    if (!isPlaying) {
      // Reset hasPlayed flags when starting from beginning
      if (currentTime === 0) {
        setMidiData(midiData.map(note => ({ ...note, hasPlayed: false })));
      }
      startTimeRef.current = performance.now() - (currentTime * 1000);
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    startTimeRef.current = null;
    setMidiData(midiData.map(note => ({ 
      ...note, 
      isPlaying: false,
      hasPlayed: false 
    })));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* File upload section */}
      <div className="mb-6">
        <input
          type="file"
          ref={fileInputRef}
          accept=".mid,.midi"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-200"
        >
          <Upload size={20} />
          Upload MIDI File
        </button>
        {fileName && (
          <p className="mt-2 text-sm text-gray-600">
            Loaded: {fileName}
          </p>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-600">
            Error: {error}
          </p>
        )}
      </div>

      {/* Controls section */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={handlePlayPause}
          disabled={!midiData.length || isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 disabled:bg-blue-300"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button
          onClick={handleReset}
          disabled={!midiData.length || isLoading}
          className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg flex items-center gap-2 disabled:bg-gray-50 disabled:border-gray-200"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      {/* Add MidiViewer and transform midiData into note objects */}
      {<MidiViewer
        notes={midiData.map(m => ({
          note: getNoteName(m.note),
          startTime: m.time,
          duration: m.duration

        }))}
        currentTime={currentTime}
      />}
    </div>
  );
};

export default MidiPlayer;