// src/app/victims/page.jsx
'use client';

import { useState, useEffect } from 'react';

export default function VictimsPage() {
  const [victims, setVictims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    crime_id: '',
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
    contact_info: '',
    injuries: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all victims
  const fetchVictims = async () => {
    try {
      const response = await fetch('/api/victims');
      const data = await response.json();
      setVictims(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching victims:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVictims();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add or update victim
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { victim_id: editingId, ...formData } : formData;
      
      const response = await fetch('/api/victims', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        await fetchVictims();
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Delete victim
  const handleDelete = async (victim_id) => {
    if (confirm('Are you sure you want to delete this victim record?')) {
      try {
        const response = await fetch('/api/victims', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ victim_id })
        });

        if (response.ok) {
          await fetchVictims();
        }
      } catch (error) {
        console.error('Error deleting victim:', error);
      }
    }
  };

  // Edit victim
  const handleEdit = (victim) => {
    setEditingId(victim.victim_id);
    setFormData({
      crime_id: victim.crime_id,
      first_name: victim.first_name,
      last_name: victim.last_name,
      age: victim.age || '',
      gender: victim.gender || '',
      contact_info: victim.contact_info || '',
      injuries: victim.injuries || ''
    });
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      crime_id: '',
      first_name: '',
      last_name: '',
      age: '',
      gender: '',
      contact_info: '',
      injuries: ''
    });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Victims Management</h1>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-6 bg-gray-100 rounded-lg">
        <input
          type="number"
          name="crime_id"
          value={formData.crime_id}
          onChange={handleInputChange}
          placeholder="Crime ID"
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          placeholder="First Name"
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="Age"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="contact_info"
          value={formData.contact_info}
          onChange={handleInputChange}
          placeholder="Contact Info"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="injuries"
          value={formData.injuries}
          onChange={handleInputChange}
          placeholder="Injuries"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          rows="3"
        />
        <div className="flex gap-2 md:col-span-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {editingId ? 'Update' : 'Add'} Victim
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Victims Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Injuries</th>
              <th className="p-3 text-left">Crime Type</th>
              <th className="p-3 text-left">Crime Date</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {victims.map(victim => (
              <tr key={victim.victim_id} className="border-b hover:bg-gray-50">
                <td className="p-3">{victim.victim_id}</td>
                <td className="p-3">{victim.first_name} {victim.last_name}</td>
                <td className="p-3">{victim.age}</td>
                <td className="p-3">{victim.gender}</td>
                <td className="p-3">{victim.contact_info}</td>
                <td className="p-3">{victim.injuries}</td>
                <td className="p-3">{victim.crime_type}</td>
                <td className="p-3">{new Date(victim.crime_date).toLocaleDateString()}</td>
                <td className="p-3">{victim.crime_location}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(victim)}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(victim.victim_id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}