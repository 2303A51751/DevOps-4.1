function Attendance({ status, onMark }) {
  return (
    <div className="attendance-actions" aria-label="Mark attendance">
      <button className="mark-button mark-button--present" type="button" aria-pressed={status === 'present'} onClick={() => onMark('present')}><span className="button-mark" aria-hidden="true">✓</span> Present</button>
      <button className="mark-button mark-button--absent" type="button" aria-pressed={status === 'absent'} onClick={() => onMark('absent')}><span className="button-mark" aria-hidden="true">×</span> Absent</button>
    </div>
  )
}

export default Attendance