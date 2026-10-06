import './Header.css'

function Header({ onReset }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" href="#main" aria-label="Student attendance home">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span className="brand-copy"><strong>Student Attendance</strong><small>MANAGEMENT SYSTEM</small></span>
        </a>
        <div className="topbar-actions">
          <span className="system-status"><span /> RECORDS ACTIVE</span>
          <button className="reset-button" type="button" onClick={onReset}><span aria-hidden="true">↺</span> Reset attendance</button>
        </div>
      </div>
    </header>
  )
}

export default Header