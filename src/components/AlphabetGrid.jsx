import { useState } from 'react';

function AlphabetTile({ letter, onClick }) {
  return (
    <button
      className="p-4 m-2 bg-blue-500 text-white font-bold text-2xl"
      onClick={() => onClick(letter)}>
      {letter}
    </button>
  );
}

function AlphabetGrid() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [outputString, setOutputString] = useState('');

  const handleTileClick = (letter) => {
    let newString = outputString + letter;
    
    const replaceConsecutive = (str) => {
      return str.replace(/(.)\1{2,}/g, (match) => '_'.repeat(match.length));
    };

    setOutputString(replaceConsecutive(newString));
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-6 gap-4">
        {alphabet.map((letter) => (
          <AlphabetTile key={letter} letter={letter} onClick={handleTileClick} />
        ))}
      </div>
      <div className="mt-4 p-2 bg-gray-200 font-mono" id="outputString">
        {outputString}
      </div>
    </div>
  );
}

export default AlphabetGrid;
