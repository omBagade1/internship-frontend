import React from 'react';
import StudentForm from './components/StudentForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4">
        <div className="max-w-4xl mx-auto font-bold">Internship Recommender</div>
      </nav>
      <main className="py-8">
        <StudentForm />
      </main>
    </div>
  );
}

export default App;
