import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://internship-backend-6d5q.onrender.com';

export default function StudentForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    education: '',
    skills: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState([]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setRecs([]);
    try {
      const payload = { ...form };
      const res = await axios.post(`${API_URL}/recommend`, payload);
      setRecs(res.data.recommendations || []);
    } catch (err) {
      console.error(err);
      alert('Error fetching recommendations. Make sure your backend is live.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="card">
        <div className="form-header">
          <h2>Student Profile</h2>
          <p>Fill your details to get internship recommendations</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input name="education" value={form.education} onChange={handleChange} placeholder="Education (e.g. B.Tech, CS)" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location preference" />
          <textarea name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="md:col-span-2"/>
        </div>
        <div className="form-actions">
          <button type="submit" className="button-primary" disabled={loading}>
            {loading ? 'Finding...' : 'Get Recommendations'}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recommended Internships</h3>
        {recs.length === 0 && !loading && <p className="text-gray-500">No recommendations yet — submit your profile above.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recs.map(r => (
            <div key={r.id} className="card-rec">
              <div>
                <h4>{r.title}</h4>
                <p>{r.company} • {r.location}</p>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Skills: {(r.skills || []).join(', ')}
              </div>
              <div className="mt-1 text-sm text-green-400">
                Matches: {(r.matchingSkills || []).join(', ')}
              </div>
              <div className="mt-1 text-right text-sm font-semibold">
                {r.matchPercent}% match
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
