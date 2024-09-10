import { useState } from 'react';

const randomColor = () => `hsl(${Math.random() * 360}, 100%, 75%)`;

function Partition({ color, onSplit }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ backgroundColor: color }}>
      <button onClick={() => onSplit('v')} className="mx-2 p-2 bg-gray-200">V</button>
      <button onClick={() => onSplit('h')} className="mx-2 p-2 bg-gray-200">H</button>
    </div>
  );
}

function RecursivePartitioning() {
  const [partitions, setPartitions] = useState([
    { id: 1, color: randomColor(), orientation: null, children: [] },
  ]);

  const handleSplit = (id, direction) => {
    setPartitions((prev) =>
      prev.map((partition) => {
        if (partition.id === id) {
          const newColor = randomColor();
          const newPartition = {
            id: prev.length + 1,
            color: newColor,
            orientation: null,
            children: [],
          };
          return {
            ...partition,
            orientation: direction,
            children: [partition, newPartition],
          };
        }
        return partition;
      })
    );
  };

  return (
    <div className="h-screen p-4">
      {partitions.map((partition) => (
        <Partition key={partition.id} color={partition.color} onSplit={(dir) => handleSplit(partition.id, dir)} />
      ))}
    </div>
  );
}

export default RecursivePartitioning;
