import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <div className="text-center space-y-10">
        {/* Title */}
        <h1 className="text-6xl font-bold mb-4">
          Welcome to the Dynamic Playground
        </h1>
        <p className="text-xl">
          Explore Partitioning and Alphabet Tile Iteration
        </p>

        {/* Buttons */}
        <div className="space-x-8">
          <button
            onClick={() => navigate('/partitioning')}
            className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300 transition transform hover:scale-105"
          >
            Go to Partitioning Page
          </button>
          <button
            onClick={() => navigate('/alphabet-tiles')}
            className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-400 transition transform hover:scale-105"
          >
            Go to Alphabet Tiles Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
