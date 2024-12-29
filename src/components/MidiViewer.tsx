import React, { useEffect, useRef, useState } from 'react';

interface NoteEvent {
  note: string;      // e.g. "C#", "D", etc.
  startTime: number; // in seconds
  duration: number;  // in seconds
  track: number;     // track number
}

interface MidiViewerProps {
  notes: NoteEvent[];
  currentTime: number;
  mutedTracks: number[];
  toggleMute: (track: number) => void;
}

const trackColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
];

export default function MidiViewer({ notes, currentTime, mutedTracks, toggleMute }: MidiViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If needed, adjust scroll/transform here
  }, [currentTime]);

  return (
    <div className="relative w-full h-48 overflow-hidden" ref={containerRef}>
      {/* Mute buttons */}
      <div className="absolute left-0 top-0 flex flex-col gap-2 z-10">
        {[...new Set(notes.map(note => note.track))].map(track => (
          <button
            key={track}
            onClick={() => toggleMute(track)}
            className={`px-2 py-1 rounded ${trackColors[track % trackColors.length]} ${mutedTracks.includes(track) ? 'opacity-50' : ''}`}
          >
            {mutedTracks.includes(track) ? 'Unmute' : 'Mute'}
          </button>
        ))}
      </div>

      {/* Large container that moves right to left as time progresses */}
      <div
        className="absolute h-full"
        style={{
          width: '5000px',
          transform: `translateX(${-currentTime * 100}px)`,
        }}
      >
        {notes.map((note, idx) => (
          <div
            key={idx}
            className={`absolute text-white px-2 py-1 rounded ${mutedTracks.includes(note.track) ? 'bg-gray-500' : trackColors[note.track % trackColors.length]}`}
            style={{
              left: note.startTime * 100,
              top: `${note.track * 20}px`, // Adjust vertical position based on track number
              height: '20px',
              width: `${note.duration * 100}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {note.note}
          </div>
        ))}
      </div>

      {/* Center line */}
      <div className="absolute w-0.5 h-full bg-red-500 left-1/2 top-0" />
    </div>
  );
}