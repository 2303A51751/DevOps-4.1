import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import StudentList from './components/StudentList.jsx'
import Summary from './components/Summary.jsx'
import './App.css'

const initialStudents = [
  { id: 'CSE101', name: 'Rahul', rollNumber: 'CSE101', branch: 'CSE', attended: 82, held: 100, status: null },
  { id: 'CSE102', name: 'Priya', rollNumber: 'CSE102', branch: 'CSE', attended: 68, held: 100, status: null },
  { id: 'CSE103', name: 'Arjun', rollNumber: 'CSE103', branch: 'CSE', attended: 91, held: 100, status: null },
]

function App() {
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return students
    return students.filter((student) =>
      `${student.name} ${student.rollNumber}`.toLowerCase().includes(query),
    )
  }, [searchTerm, students])

  function markAttendance(studentId, status) {
    setStudents((currentStudents) => currentStudents.map((student) => {
      if (student.id !== studentId || student.status === status) return student
      const isFirstMarkToday = student.status === null
      return {
        ...student,
        held: student.held + (isFirstMarkToday ? 1 : 0),
        attended: student.attended + (status === 'present' ? 1 : 0) - (student.status === 'present' ? 1 : 0),
        status,
      }
    }))
  }

  function resetAttendance() {
    setStudents(initialStudents.map((student) => ({ ...student })))
  }

  return (
    <div className="app-shell">
      <Header onReset={resetAttendance} />
      <main className="dashboard" id="main">
        <section className="welcome-row" aria-labelledby="page-heading">
          <div>
            <p className="eyebrow">ACADEMIC SERVICES <span> / </span> DAILY REGISTER</p>
            <h1 id="page-heading">Attendance overview</h1>
            <p className="welcome-copy">Keep today’s roll call moving and stay ahead of attendance eligibility.</p>
          </div>
          <div className="session-date">
            <span className="date-mark" aria-hidden="true">◷</span>
            <div><span className="date-label">CURRENT SESSION</span><strong>Regular class</strong></div>
          </div>
        </section>
        <Summary students={students} />
        <section className="workspace-section" aria-label="Student attendance workspace">
          <StudentList
            students={filteredStudents}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onMarkAttendance={markAttendance}
          />
          <aside className="attendance-note">
            <div className="note-icon" aria-hidden="true">!</div>
            <div>
              <h2>Eligibility threshold</h2>
              <p>Students need at least <strong>75%</strong> attendance to remain eligible for examinations.</p>
            </div>
          </aside>
        </section>
        <footer className="page-footer"><span>STUDENT RECORDS</span><span>Attendance updates are reflected instantly</span></footer>
      </main>
    </div>
  )
}

export default App
