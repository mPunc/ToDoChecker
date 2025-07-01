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
    <div className="p-4">
      <button
        onClick={handleGenerate}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Generate XML
      </button>

      {status === 'loading' && <p className="text-gray-500 mt-2">Generating...</p>}
      {status === 'success' && <p className="text-green-600 mt-2">XML generated successfully!</p>}
      {status === 'error' && <p className="text-red-600 mt-2">There was an error generating XML.</p>}
    </div>
  );
}
