import { useState } from 'react';
import SplitPane from 'react-split-pane';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

// Utility function to generate random colors
const randomColor = () => `hsl(${Math.random() * 360}, 100%, 75%)`;

const Partition = ({ color, onSplit, onRemove, canRemove }) => {
  return (
    <div
      className="flex items-center justify-center relative w-full h-full"
      style={{ backgroundColor: color }}
    >
      <div className="absolute top-2 left-2 space-x-2">
        <button onClick={() => onSplit('v')} className="bg-gray-200 p-2 rounded shadow hover:bg-gray-300">V</button>
        <button onClick={() => onSplit('h')} className="bg-gray-200 p-2 rounded shadow hover:bg-gray-300">H</button>
        {canRemove && (
          <button onClick={onRemove} className="bg-red-500 text-white p-2 rounded shadow hover:bg-red-600">-</button>
        )}
      </div>
    </div>
  );
};

// Recursive Partition Container
const RecursivePartition = ({ initialColor }) => {
  const [partition, setPartition] = useState({
    id: 1,
    color: initialColor || randomColor(),
    orientation: null,
    children: [],
  });

  const handleSplit = (id, direction) => {
    setPartition((prev) => recursiveSplit(prev, id, direction));
  };

  const recursiveSplit = (partition, id, direction) => {
    if (partition.id === id) {
      const newColor = randomColor();
      const newPartition = {
        id: Date.now(), // Generate unique ID
        color: newColor,
        orientation: null,
        children: [],
      };
      return {
        ...partition,
        orientation: direction,
        children: [
          { ...partition, id: partition.id }, // Old partition retains color
          newPartition,
        ],
      };
    } else if (partition.children.length > 0) {
      return {
        ...partition,
        children: partition.children.map((child) =>
          recursiveSplit(child, id, direction)
        ),
      };
    }
    return partition;
  };

  const removePartition = (id) => {
    setPartition((prev) => recursiveRemove(prev, id));
  };

  const recursiveRemove = (partition, id) => {
    if (partition.id === id) return null; // Remove this partition

    if (partition.children.length > 0) {
      // If a partition has two children, remove the selected one and return the other.
      if (partition.children.some((child) => child.id === id)) {
        const remainingChild = partition.children.find((child) => child.id !== id);
        return remainingChild || { ...partition, children: [] };
      }

      const updatedChildren = partition.children
        .map((child) => recursiveRemove(child, id))
        .filter(Boolean); // Filter out the null values

      return { ...partition, children: updatedChildren };
    }

    return partition;
  };

  return <PartitionNode partition={partition} onSplit={handleSplit} onRemove={removePartition} />;
};

// Handles Recursive Rendering of Partitions
const PartitionNode = ({ partition, onSplit, onRemove }) => {
  if (partition.children.length === 0) {
    return (
      <ResizableBox
        width={Infinity}
        height={Infinity}
        className="resize-box"
        minConstraints={[100, 100]}
        style={{ flexGrow: 1, margin: '10px' }}
      >
        <Partition
          color={partition.color}
          onSplit={(dir) => onSplit(partition.id, dir)}
          onRemove={() => onRemove(partition.id)}
          canRemove={partition.id !== 1} // Can't remove the first partition
        />
      </ResizableBox>
    );
  }

  return (
    <SplitPane
      split={partition.orientation === 'v' ? 'vertical' : 'horizontal'}
      minSize={100}
      defaultSize="50%"
    >
      <PartitionNode partition={partition.children[0]} onSplit={onSplit} onRemove={onRemove} />
      <PartitionNode partition={partition.children[1]} onSplit={onSplit} onRemove={onRemove} />
    </SplitPane>
  );
};

function PartitionPage2() {
  return (
    <div className="h-screen w-screen flex">
      <RecursivePartition initialColor={randomColor()} />
    </div>
  );
}

export default PartitionPage2;
