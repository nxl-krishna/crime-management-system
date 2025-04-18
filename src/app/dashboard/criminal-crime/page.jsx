"use client"
import { useState } from 'react';

export default function AddCriminalCrime() {
  const [formData, setFormData] = useState({
    criminal_id: '',
    crime_id: '',
    role: '',
    conviction_status: 'Under Trial',
    sentence_details: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCriminalCrime = async () => {
    try {
      const response = await fetch('/api/criminal-crime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Criminal-Crime link added successfully!');
        setFormData({
          criminal_id: '',
          crime_id: '',
          role: '',
          conviction_status: 'Under Trial',
          sentence_details: ''
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-center">Add Criminal-Crime</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        {Object.keys(formData).map((key) => (
          key !== 'conviction_status' ? (
            <input
              key={key}
              name={key}
              placeholder={key.replace('_', ' ').toUpperCase()}
              value={formData[key]}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-4"
            />
          ) : (
            <select
              key={key}
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-4"
            >
              <option value="Convicted">Convicted</option>
              <option value="Under Trial">Under Trial</option>
              <option value="Acquitted">Acquitted</option>
            </select>
          )
        ))}
        <button onClick={addCriminalCrime} className="bg-green-600 text-white p-3 rounded w-full">Add Criminal-Crime</button>
      </div>
      <a href="/dashboard/criminal-crime/updatedeletecriminal-crime">
  <button className="mt-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
   update/delete
  </button>
</a>
    </div>
  );
}
