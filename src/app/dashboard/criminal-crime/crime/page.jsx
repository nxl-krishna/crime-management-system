"use client"
import { useState } from 'react';

export default function AddCrime() {
  const [formData, setFormData] = useState({
    crime_type: '',
    description: '',
    crime_date: '',
    crime_location: ''
  });
  const [crimeId, setCrimeId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCrime = async () => {
    setIsSubmitting(true);
    await fetch('/api/crimes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert('Crime added successfully!');
    setIsSubmitting(false);
    setFormData({
      crime_type: '',
      description: '',
      crime_date: '',
      crime_location: ''
    });
    getLatestCrime();
  };

  const getLatestCrime = async () => {
    const response = await fetch('/api/crimes');
    const data = await response.json();
    if (data.length > 0) {
      const latestCrime = data[data.length - 1];
      setCrimeId(latestCrime.crime_id);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-center">Add New Crime</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key.replace('_', ' ').toUpperCase()}
              value={formData[key]}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              disabled={isSubmitting}
            />
          ))}
        </div>
        <button
          onClick={addCrime}
          className="bg-green-600 text-white p-3 rounded mt-4 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Crime'}
        </button>
        {crimeId && (
          <p className="text-center mt-4 text-green-700">Latest Crime ID: {crimeId}</p>
        )}
      </div>
    </div>
  );
}
