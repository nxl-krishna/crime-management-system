"use client"
import { useState } from 'react';

export default function AddOfficer() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    ranks: '',
    station: '',
    phone_number: '',
    email: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addOfficer = async () => {
    try {
      const response = await fetch('/api/officers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Officer added successfully!');
        setFormData({
          first_name: '',
          last_name: '',
          ranks: '',
          station: '',
          phone_number: '',
          email: ''
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
      <h1 className="text-4xl font-bold text-center">Add Officer</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace('_', ' ').toUpperCase()}
            value={formData[key]}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-4"
          />
        ))}
        <button onClick={addOfficer} className="bg-blue-600 text-white p-3 rounded w-full">Add Officer</button>
      </div>
      <a href="/dashboard/officer/updatedeleteofficer">
  <button className="mt-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
   update/delete
  </button>
</a>
    </div>
  );
}
