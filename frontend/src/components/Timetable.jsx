import React from 'react'

export default function Timetable({ entries }) {
  if (!entries) return null
  if (entries.length === 0) return <div>No schedule for this subject.</div>

  // Group by day
  const byDay = entries.reduce((acc, e) => {
    (acc[e.day] = acc[e.day] || []).push(e)
    return acc
  }, {})

  const days = Object.keys(byDay)

  return (
    <div>
      {days.map(day => (
        <div key={day} style={{ marginBottom: 12 }}>
          <h3>{day}</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Time</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Location</th>
              </tr>
            </thead>
            <tbody>
              {byDay[day].map((e, i) => (
                <tr key={i}>
                  <td style={{ padding: '6px 0' }}>{e.start} — {e.end}</td>
                  <td style={{ padding: '6px 0' }}>{e.location || 'TBD'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
