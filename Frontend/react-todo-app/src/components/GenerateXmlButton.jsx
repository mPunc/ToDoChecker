import { useState } from 'react';

export default function GenerateXmlButton() {
  const [status, setStatus] = useState(null);

  const handleGenerate = async () => {
    setStatus('loading');

    try {
      const res = await fetch('http://localhost:5001/todo/generate-xml');

      if (!res.ok) {
        throw new Error('Failed to generate XML.');
      }

      const result = await res.text();
      console.log(result);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4 text-gray-800">
      <h1 className="text-xl font-bold mb-4">Press to generate XML</h1>
      <button
        onClick={handleGenerate}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Generate XML
      </button>

      {status === 'loading' && <p className="text-gray-500 mt-2">Generating...</p>}
      {status === 'success' && <p className="text-green-600 mt-2">XML generated successfully!</p>}
      {status === 'error' && <p className="text-red-600 mt-2">There was an error generating XML.</p>}
    </div>
  );
}
