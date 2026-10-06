import Attendance from './Attendance.jsx'

function StudentCard({ student, onMarkAttendance }) {
  const exactAttendancePercentage = (student.attended / student.held) * 100
  const attendancePercentage = Math.round(exactAttendancePercentage)
  const isEligible = exactAttendancePercentage >= 75

  return (
    <article className="student-row" aria-label={`${student.name}, ${student.rollNumber}`}>
      <div className="student-identity">
        <span className="student-avatar" aria-hidden="true">{student.name.slice(0, 1)}</span>
        <div className="student-copy"><div className="student-name">{student.name}</div><div className="student-roll">Roll {student.rollNumber}</div></div>
      </div>
      <span className="branch-tag">{student.branch}</span>
      <div className="attendance-cell">
        <div className="attendance-top"><span>{attendancePercentage}%</span><span className={`eligibility ${isEligible ? '' : 'eligibility--warning'}`}>{isEligible ? 'Eligible' : 'Not eligible'}</span></div>
        <div className={`attendance-track ${isEligible ? '' : 'attendance-track--warning'}`} aria-label={`${attendancePercentage}% attendance`}><span style={{ width: `${attendancePercentage}%` }} /></div>
      </div>
      <Attendance status={student.status} onMark={(status) => onMarkAttendance(student.id, status)} />
    </article>
  )
}

export default StudentCard