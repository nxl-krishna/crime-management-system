"use client"
import { useState } from 'react';

function UpdateCriminal() {
  const [criminalId, setCriminalId] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    address: '',
    phone_number: '',
    nationality: '',
    physical_marks: '',
    photo_url: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateCriminal = async () => {
    await fetch('/api/criminals', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, criminal_id: criminalId })
    });
    alert('Criminal updated successfully!');
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-center">Update Criminal</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <input
          placeholder="Criminal ID"
          value={criminalId}
          onChange={(e) => setCriminalId(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key.replace('_', ' ').toUpperCase()}
              value={formData[key]}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          ))}
        </div>
        <button onClick={updateCriminal} className="bg-yellow-500 text-white p-3 rounded mt-4 w-full">Update Criminal</button>
      </div>
    </div>
  );
}

function DeleteCriminal() {
  const [criminalId, setCriminalId] = useState('');

  const deleteCriminal = async () => {
    await fetch('/api/criminals', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ criminal_id: criminalId })
    });
    alert('Criminal deleted successfully!');
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-center">Delete Criminal</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <input
          placeholder="Criminal ID"
          value={criminalId}
          onChange={(e) => setCriminalId(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button onClick={deleteCriminal} className="bg-red-600 text-white p-3 rounded w-full">Delete Criminal</button>
      </div>
    </div>
  );
}

export default function UpdateDeleteCriminals() {
  return (
    <div className="p-8 space-y-6">
      <UpdateCriminal />
      <DeleteCriminal />
    </div>
  );
}
