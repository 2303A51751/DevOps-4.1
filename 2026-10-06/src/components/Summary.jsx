function Summary({ students }) {
  const presentCount = students.filter((student) => student.status === 'present').length
  const absentCount = students.filter((student) => student.status === 'absent').length
  const eligibleCount = students.filter((student) => (student.attended / student.held) * 100 >= 75).length
  const overallAttendance = students.length
    ? Math.round(students.reduce((total, student) => total + (student.attended / student.held) * 100, 0) / students.length)
    : 0

  return (
    <section className="summary-grid" aria-label="Attendance summary" aria-live="polite">
      <Metric className="metric--total" label="TOTAL STUDENTS" value={students.length} symbol="▦" detail="Enrolled in this register" />
      <Metric className="metric--present" label="PRESENT TODAY" value={presentCount} symbol="✓" detail="Marked in this session" />
      <Metric className="metric--absent" label="ABSENT TODAY" value={absentCount} symbol="×" detail="Marked in this session" />
      <div className="metric metric--attendance">
        <div className="metric-topline"><span className="metric-label">CLASS ELIGIBLE</span><span className="metric-symbol" aria-hidden="true">↗</span></div>
        <div className="metric-value">{eligibleCount}<small> / {students.length}</small></div>
        <p className="metric-detail">Overall attendance {overallAttendance}%</p>
        <div className="overall-track" role="progressbar" aria-label="Overall class attendance" aria-valuemin="0" aria-valuemax="100" aria-valuenow={overallAttendance}><span style={{ width: `${overallAttendance}%` }} /></div>
      </div>
    </section>
  )
}

function Metric({ className, label, value, symbol, detail }) {
  return (
    <div className={`metric ${className}`}>
      <div className="metric-topline"><span className="metric-label">{label}</span><span className="metric-symbol" aria-hidden="true">{symbol}</span></div>
      <div className="metric-value">{value}</div>
      <p className="metric-detail">{detail}</p>
    </div>
  )
}

export default Summary