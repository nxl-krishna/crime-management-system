"use client"
import { useState } from 'react';

export default function UpdateDeleteCriminalCrime() {
  const [formData, setFormData] = useState({
    id: '',
    criminal_id: '',
    crime_id: '',
    role: '',
    conviction_status: 'Under Trial',
    sentence_details: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateCriminalCrime = async () => {
    await fetch('/api/criminal-crime', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert('Criminal-Crime link updated successfully!');
  };

  const deleteCriminalCrime = async () => {
    await fetch('/api/criminal-crime', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: formData.id })
    });
    alert('Criminal-Crime link deleted successfully!');
    setFormData({
      id: '',
      criminal_id: '',
      crime_id: '',
      role: '',
      conviction_status: 'Under Trial',
      sentence_details: ''
    });
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-center">Update/Delete Criminal-Crime</h1>
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
        <div className="flex gap-4">
          <button onClick={updateCriminalCrime} className="bg-blue-600 text-white p-3 rounded w-full">Update Criminal-Crime</button>
          <button onClick={deleteCriminalCrime} className="bg-red-600 text-white p-3 rounded w-full">Delete Criminal-Crime</button>
        </div>
      </div>
    </div>
  );
}
