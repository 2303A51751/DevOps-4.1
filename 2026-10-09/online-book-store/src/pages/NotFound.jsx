import { Link } from 'react-router-dom'

function NotFound() {
  return <section className="not-found"><strong>404</strong><span className="eyebrow">Wrong turn in the stacks</span><h1>This page isn't on our shelf.</h1><p>The address may have changed, or this chapter may not have been written yet.</p><Link className="button" to="/">Return home</Link></section>
}

export default NotFound