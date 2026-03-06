export const playBirthdayTune = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const audioCtx = new AudioContext();

  const notes = {
    'G3': 196.00, 'A3': 220.00, 'B3': 246.94, 'C4': 261.63,
    'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00,
    'A4': 440.00, 'Bb4': 466.16, 'C5': 523.25
  };

  const melody = [
    { note: 'G3', duration: 0.5 }, { note: 'G3', duration: 0.5 },
    { note: 'A3', duration: 1 }, { note: 'G3', duration: 1 },
    { note: 'C4', duration: 1 }, { note: 'B3', duration: 2 },

    { note: 'G3', duration: 0.5 }, { note: 'G3', duration: 0.5 },
    { note: 'A3', duration: 1 }, { note: 'G3', duration: 1 },
    { note: 'D4', duration: 1 }, { note: 'C4', duration: 2 },

    { note: 'G3', duration: 0.5 }, { note: 'G3', duration: 0.5 },
    { note: 'G4', duration: 1 }, { note: 'E4', duration: 1 },
    { note: 'C4', duration: 1 }, { note: 'B3', duration: 1 },
    { note: 'A3', duration: 2 },

    { note: 'F4', duration: 0.5 }, { note: 'F4', duration: 0.5 },
    { note: 'E4', duration: 1 }, { note: 'C4', duration: 1 },
    { note: 'D4', duration: 1 }, { note: 'C4', duration: 2 }
  ];

  const tempo = 1.3;
  const loopDuration = melody.reduce((acc, curr) => acc + (curr.duration / tempo), 0);

  const playSequence = (startTime) => {
    let nextNoteTime = startTime;
    melody.forEach(({ note, duration }) => {
      const trueDuration = duration / tempo;

      // Main Synth
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(notes[note], nextNoteTime);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      gain.gain.setValueAtTime(0, nextNoteTime);
      gain.gain.linearRampToValueAtTime(0.2, nextNoteTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, nextNoteTime + trueDuration);

      // Secondary Harmonic
      const sub = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(notes[note] * 0.5, nextNoteTime);
      sub.connect(subGain);
      subGain.connect(audioCtx.destination);
      subGain.gain.setValueAtTime(0, nextNoteTime);
      subGain.gain.linearRampToValueAtTime(0.1, nextNoteTime + 0.1);
      subGain.gain.exponentialRampToValueAtTime(0.01, nextNoteTime + trueDuration);

      osc.start(nextNoteTime);
      osc.stop(nextNoteTime + trueDuration);
      sub.start(nextNoteTime);
      sub.stop(nextNoteTime + trueDuration);

      nextNoteTime += trueDuration;
    });
  };

  // Setup Looping via standard scheduler approach
  let currentStartTime = audioCtx.currentTime;

  const scheduleLoop = () => {
    playSequence(currentStartTime);
    currentStartTime += loopDuration;
  };

  // Immediate start
  scheduleLoop();

  // Continuous loop until closed
  const interval = setInterval(scheduleLoop, loopDuration * 1000);

  return {
    stop: () => {
      clearInterval(interval);
      audioCtx.close();
    }
  };
};
