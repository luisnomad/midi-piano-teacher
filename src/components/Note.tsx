import React from 'react';

interface NoteProps {
    pitch: number;
    isActive: boolean;
}

const Note: React.FC<NoteProps> = ({ pitch, isActive }) => {
    const noteStyle = {
        width: '40px',
        height: '120px',
        backgroundColor: isActive ? 'yellow' : 'white',
        border: '1px solid black',
        display: 'inline-block',
        margin: '1px',
        position: 'relative' as 'relative',
    };

    return (
        <div style={noteStyle}>
            {pitch}
        </div>
    );
};

export default Note;