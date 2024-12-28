import React, { useEffect, useState } from 'react';
import Note from './Note';

const MidiController: React.FC = () => {
    const [activeNote, setActiveNote] = useState<number | null>(null);
    const totalKeys = 25;

    useEffect(() => {
        const handleMIDIMessage = (event: WebMidi.MIDIMessageEvent) => {
            const [status, note, velocity] = event.data;
            if (status === 144 && velocity > 0) { // Note on
                setActiveNote(note);
            } else if (status === 128 || (status === 144 && velocity === 0)) { // Note off
                setActiveNote(null);
            }
        };

        const initMIDI = async () => {
            if (navigator.requestMIDIAccess) {
                const midiAccess = await navigator.requestMIDIAccess();
                midiAccess.inputs.forEach(input => {
                    input.onmidimessage = handleMIDIMessage;
                });
            }
        };

        initMIDI();

        return () => {
            // Cleanup MIDI event listeners if necessary
        };
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {Array.from({ length: totalKeys }, (_, index) => (
                <Note key={index} pitch={index + 60} isActive={activeNote === index + 60} />
            ))}
        </div>
    );
};

export default MidiController;