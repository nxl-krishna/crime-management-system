"use client"
import { useState } from 'react';

export default function ManageOfficer() {
  const [formData, setFormData] = useState({
    officer_id: '',
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

  const updateOfficer = async () => {
    try {
      const response = await fetch('/api/officers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Officer updated successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const deleteOfficer = async () => {
    try {
      const response = await fetch('/api/officers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ officer_id: formData.officer_id })
      });

      if (response.ok) {
        alert('Officer deleted successfully!');
        setFormData({
          officer_id: '',
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
      <h1 className="text-4xl font-bold text-center">Manage Officer</h1>
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
        <button onClick={updateOfficer} className="bg-yellow-600 text-white p-3 rounded w-full mb-2">Update Officer</button>
        <button onClick={deleteOfficer} className="bg-red-600 text-white p-3 rounded w-full">Delete Officer</button>
      </div>
    </div>
  );
}
