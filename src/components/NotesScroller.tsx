import React, { useEffect, useRef } from 'react';

interface Note {
  note: number;
  time: number;
  duration: number;
  velocity: number;
  isPlaying: boolean;
  track: number;
}

interface NotesScrollerProps {
  notes: Note[];
  currentTime: number;
}

const noteColors = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FFA500', // Orange
  '#800080', // Purple
];

const NotesScroller: React.FC<NotesScrollerProps> = ({ notes, currentTime }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = currentTime * 100;
    }
  }, [currentTime]);

  return (
    <div className="relative w-full h-48 overflow-hidden" ref={containerRef}>
      <div className="absolute w-full h-full">
        {notes.map((note, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              left: `${note.note * 10}px`,
              top: `${note.time * 100}px`,
              height: `${note.duration * 100}px`,
              width: '10px',
              backgroundColor: noteColors[note.note % noteColors.length],
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesScroller;
