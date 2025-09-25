import React, { useState } from 'react';
import axios from 'axios';

export default function StudentForm() {
  const [form, setForm] = useState({ name:'', email:'', education:'', skills:'', location:'' });
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
      const res = await axios.post('https://internship-backend-6d5q.onrender.com//recommend', payload);
      setRecs(res.data.recommendations || []);
    } catch (err) {
      console.error(err);
      alert('Error fetching recommendations');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {/* Student Form Card */}
      <div className="card">
        <div className="form-header">
          <h2>Student Profile</h2>
          <p>Fill in your details to get internship recommendations</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div>
              <label className="form-label">Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            </div>

            <div>
              <label className="form-label">Email</label>
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            </div>

            <div>
              <label className="form-label">Education</label>
              <input name="education" value={form.education} onChange={handleChange} placeholder="B.Tech, CS" />
            </div>

            <div>
              <label className="form-label">Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Preferred city" />
            </div>

            <div className="skills-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Skills</label>
              <textarea name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)"/>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="button-primary" disabled={loading}>
              {loading ? 'Finding...' : 'Get Recommendations'}
            </button>
          </div>
        </form>
      </div>

      {/* Recommendation Cards */}
      <div className="recommendation-container">
        {recs.length === 0 && !loading && (
          <p style={{ color: '#888', marginTop: '1rem', textAlign: 'center' }}>
            No recommendations yet — submit profile above.
          </p>
        )}

        {recs.map(r => (
          <div key={r.id} className="card-rec">
            <h4>{r.title}</h4>
            <p>{r.company} • {r.location}</p>
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#aaa' }}>
              Skills: {(r.skills || []).join(', ')}
            </div>
            <div style={{ marginTop: '0.25rem', fontSize: '0.85rem', color: '#4caf50' }}>
              Matches: {(r.matchingSkills || []).join(', ')}
            </div>
            <div style={{ marginTop: '0.5rem', textAlign: 'right', fontWeight: 600 }}>
              Match: {r.matchPercent}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
