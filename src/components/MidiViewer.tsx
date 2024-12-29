import React, { useEffect, useRef } from 'react';

interface NoteEvent {
  note: string;      // e.g. "C#", "D", etc.
  startTime: number; // in seconds
  duration: number;  // in seconds
}

interface MidiViewerProps {
  notes: NoteEvent[];
  currentTime: number;
}

export default function MidiViewer({ notes, currentTime }: MidiViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If needed, adjust scroll/transform here
  }, [currentTime]);

  return (
    <div className="relative w-full h-48 overflow-hidden" ref={containerRef}>
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
            className="absolute bg-blue-500 text-white px-2 py-1 rounded"
            style={{
              left: note.startTime * 100,
              height: '100%',
              width: 40,
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