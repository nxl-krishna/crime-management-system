"use client"
import { useState } from 'react';

export default function UpdateDeleteCrime() {
  const [crimeId, setCrimeId] = useState('');
  const [formData, setFormData] = useState({
    crime_type: '',
    description: '',
    crime_date: '',
    crime_location: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || '' });
  };

  const updateCrime = async () => {
    setIsUpdating(true);
    await fetch('/api/crimes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crime_id: crimeId, ...formData })
    });
    alert('Crime updated successfully!');
    setIsUpdating(false);
  };

  const deleteCrime = async () => {
    await fetch('/api/crimes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crime_id: crimeId })
    });
    alert('Crime deleted successfully!');
    setFormData({
      crime_type: '',
      description: '',
      crime_date: '',
      crime_location: ''
    });
    setCrimeId('');
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-center">Update/Delete Crime</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <input
          type="text"
          name="crimeId"
          placeholder="Enter Crime ID"
          value={crimeId}
          onChange={(e) => setCrimeId(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key.replace('_', ' ').toUpperCase()}
              value={formData[key] || ''}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          ))}
        </div>
        <button
          onClick={updateCrime}
          className="bg-green-600 text-white p-3 rounded mt-4 w-full"
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : 'Update Crime'}
        </button>
        <button
          onClick={deleteCrime}
          className="bg-red-600 text-white p-3 rounded mt-4 w-full"
        >
          Delete Crime
        </button>
      </div>
    </div>
  );
}
