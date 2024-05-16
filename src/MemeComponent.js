import React, { useState, useEffect } from 'react';

const MemeComponent = () => {
  const [meme, setMeme] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMeme = async () => {
    try {
      const response = await fetch('https://api.imgflip.com/get_memes');
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      const memes = data.data.memes;
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      setMeme(randomMeme);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleNextMeme = () => {
    setLoading(true);
    fetchMeme();
  };

  useEffect(() => {
    fetchMeme();
  
    const interval = setInterval(fetchMeme, 5000); // Change meme every 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Meme of the Moment</h1>
        {meme && (
          <div className="text-center">
            <div className="max-w-full h-auto rounded-lg overflow-hidden shadow-lg">
              <img src={meme.url} alt={meme.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-semibold mt-4 text-gray-800">{meme.name}</h2>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextMeme}
            >
              Next Meme
            </button>
          </div>
        )}
        {!meme && <p className="text-gray-800">Loading...</p>}
      </div>
    </div>
  );
};

export default MemeComponent;
