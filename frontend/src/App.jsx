import React, { useEffect, useState } from 'react'
import Timetable from './components/Timetable'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export default function App() {
  const [subjects, setSubjects] = useState([])
  const [selected, setSelected] = useState('')
  const [entries, setEntries] = useState([])
  const [loadingSubjects, setLoadingSubjects] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoadingSubjects(true)
    setError(null)
    fetch(`${API_BASE}/subjects`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => setSubjects(data))
      .catch(err => {
        console.error(err)
        setError('Failed to load subjects (check backend)')
      })
      .finally(() => setLoadingSubjects(false))
  }, [])

  useEffect(() => {
    if (!selected) return setEntries([])
    fetch(`${API_BASE}/timetables?subjectId=${selected}`)
      .then(r => r.json())
      .then(setEntries)
      .catch(err => {
        console.error(err)
        setEntries([])
      })
  }, [selected])

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Course Timetable</h1>

      <label>
        Select subject:{' '}
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          disabled={loadingSubjects || subjects.length === 0}
        >
          <option value="">{loadingSubjects ? 'Loading subjects...' : '-- choose --'}</option>
          {subjects.map(s => (
            <option key={s._id} value={s._id}>{s.code ? `${s.code} — ${s.name}` : s.name}</option>
          ))}
        </select>
      </label>

      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

      <div style={{ marginTop: 20 }}>
        <Timetable entries={entries} />
      </div>
    </div>
  )
}
