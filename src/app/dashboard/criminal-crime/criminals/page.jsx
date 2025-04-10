"use client"
import { useState } from 'react';

export default function AddCriminal() {
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
  const [criminalId, setCriminalId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
const [isAdded, setIsAdded] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCriminal = async () => {
    setIsSubmitting(true);
    await fetch('/api/criminals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert('Criminal added successfully!');
setFormData({
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
setIsAdded(true);
    setIsSubmitting(false);
  };

  const getLatestCriminal = async () => {
    const response = await fetch('/api/criminals');
    const data = await response.json();
    if (data.length > 0) {
      const latestCriminal = data[data.length - 1];
      setCriminalId(latestCriminal.criminal_id);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-center">Add New Criminal</h1>
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
          onClick={addCriminal}
          className="bg-green-600 text-white p-3 rounded mt-4 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Criminal'}
        </button>
        <button
          onClick={getLatestCriminal}
          disabled={!isAdded}
          className="bg-blue-600 text-white p-3 rounded mt-4 w-full"
        >
          Get Latest Criminal ID
        </button>
        {criminalId && (
          <p className="text-center mt-4 text-green-700">Latest Criminal ID: {criminalId}</p>
        )}
      </div>
    </div>
  );
}
