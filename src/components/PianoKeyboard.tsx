import React from 'react';

interface PianoKeyboardProps {
  pressedKeys?: string[];
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ pressedKeys = [] }) => {
  const whiteKeys = [
    { id: 'Key48', note: 'C1', x: 0 },
    { id: 'Key50', note: 'D1', x: 50 },
    { id: 'Key52', note: 'E1', x: 100 },
    { id: 'Key53', note: 'F1', x: 150 },
    { id: 'Key55', note: 'G1', x: 200 },
    { id: 'Key57', note: 'A1', x: 250 },
    { id: 'Key59', note: 'B1', x: 300 },
    { id: 'Key60', note: 'C2', x: 350 },
    { id: 'Key62', note: 'D2', x: 400 },
    { id: 'Key64', note: 'E2', x: 450 },
    { id: 'Key65', note: 'F2', x: 500 },
    { id: 'Key67', note: 'G2', x: 550 },
    { id: 'Key69', note: 'A2', x: 600 },
    { id: 'Key71', note: 'B2', x: 650 },
    { id: 'Key72', note: 'C3', x: 700 }
  ];

  const blackKeys = [
    { id: 'Key49', note: 'C#1', x: 35 },
    { id: 'Key51', note: 'D#1', x: 85 },
    { id: 'Key54', note: 'F#1', x: 185 },
    { id: 'Key56', note: 'G#1', x: 235 },
    { id: 'Key58', note: 'A#1', x: 285 },
    { id: 'Key61', note: 'C#2', x: 385 },
    { id: 'Key63', note: 'D#2', x: 435 },
    { id: 'Key66', note: 'F#2', x: 535 },
    { id: 'Key68', note: 'G#2', x: 585 },
    { id: 'Key70', note: 'A#2', x: 635 }
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