import { Link } from 'react-router-dom'

function Profile() {
  return <section className="profile-layout"><div className="profile-mark" aria-hidden="true">J.</div><div className="profile-copy"><span className="eyebrow">Reader profile</span><h1>Hello, Jamie.</h1><p>Your shelf is a work in progress. Keep exploring and save the ideas you want to return to.</p><div className="profile-stats"><div className="profile-stat"><strong>03</strong><span>Books explored</span></div><div className="profile-stat"><strong>02</strong><span>Subjects followed</span></div><div className="profile-stat"><strong>01</strong><span>Current read</span></div></div><Link className="button" style={{ marginTop: 26 }} to="/books">Find a new read</Link></div></section>
}

export default Profile