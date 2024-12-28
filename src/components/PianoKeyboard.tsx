import React from 'react';

interface PianoKeyboardProps {
  pressedKeys?: string[];
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ pressedKeys = [] }) => {
  const whiteKeys = [
    { id: 'Key60', note: 'C', x: 0 },
    { id: 'Key62', note: 'D', x: 50 },
    { id: 'Key64', note: 'E', x: 100 },
    { id: 'Key65', note: 'F', x: 150 },
    { id: 'Key67', note: 'G', x: 200 },
    { id: 'Key69', note: 'A', x: 250 },
    { id: 'Key71', note: 'B', x: 300 },
    { id: 'Key72', note: 'C', x: 350 },
    { id: 'Key74', note: 'D', x: 400 },
    { id: 'Key76', note: 'E', x: 450 },
    { id: 'Key77', note: 'F', x: 500 },
    { id: 'Key79', note: 'G', x: 550 },
    { id: 'Key81', note: 'A', x: 600 },
    { id: 'Key83', note: 'B', x: 650 }
  ];

  const blackKeys = [
    { id: 'Key61', note: 'C#', x: 35 },
    { id: 'Key63', note: 'D#', x: 85 },
    { id: 'Key66', note: 'F#', x: 185 },
    { id: 'Key68', note: 'G#', x: 235 },
    { id: 'Key70', note: 'A#', x: 285 },
    { id: 'Key73', note: 'C#', x: 385 },
    { id: 'Key75', note: 'D#', x: 435 },
    { id: 'Key78', note: 'F#', x: 535 },
    { id: 'Key80', note: 'G#', x: 585 },
    { id: 'Key82', note: 'A#', x: 635 }
  ];

  return (
    <div className="w-full max-w-4xl">
      <svg viewBox="0 0 750 200" className="w-full">
        {whiteKeys.map(({ id, note, x }) => (
          <g key={id}>
            <rect
              id={`key-${id}`}
              x={x}
              y={0}
              width={50}
              height={200}
              fill={pressedKeys.includes(id) ? '#e0e0e0' : 'white'}
              stroke="black"
              className="cursor-pointer"
            />
            <text
              x={x + 25}
              y={180}
              textAnchor="middle"
              fontSize={14}
              pointerEvents="none"
            >
              {note}
            </text>
          </g>
        ))}
        {blackKeys.map(({ id, note, x }) => (
          <g key={id}>
            <rect
              id={`key-${id}`}
              x={x}
              y={0}
              width={30}
              height={120}
              fill={pressedKeys.includes(id) ? '#404040' : 'black'}
              className="cursor-pointer"
            />
            <text
              x={x + 15}
              y={110}
              textAnchor="middle"
              fontSize={12}
              fill="white"
              pointerEvents="none"
            >
              {note}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default PianoKeyboard;