import StudentCard from './StudentCard.jsx'

function StudentList({ students, searchTerm, onSearchChange, onMarkAttendance }) {
  return (
    <section className="student-panel" aria-labelledby="roster-heading">
      <div className="panel-heading">
        <div><p className="list-kicker">CLASS REGISTER</p><h2 id="roster-heading">Student roster</h2></div>
        <span className="student-count"><strong>{students.length.toString().padStart(2, '0')}</strong> students</span>
      </div>
      <div className="student-tools">
        <label className="search-field">
          <span className="search-glyph" aria-hidden="true" />
          <input type="search" value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search name or roll no." aria-label="Search students by name or roll number" />
        </label>
        <span className="today-label"><span className="today-dot" /> Today</span>
      </div>
      <div className="roster-head" aria-hidden="true"><span>STUDENT</span><span>BRANCH</span><span>ATTENDANCE</span><span className="actions-heading">MARK TODAY</span></div>
      <div className="student-list">
        {students.length > 0 ? students.map((student) => <StudentCard key={student.id} student={student} onMarkAttendance={onMarkAttendance} />) : <p className="empty-state">No students match “{searchTerm}”.</p>}
      </div>
    </section>
  )
}

export default StudentList