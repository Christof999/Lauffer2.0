import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { canonicalUrl } from '../seo/siteConfig'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found">
      <Helmet>
        <title>Seite nicht gefunden – Lauffer Bau</title>
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={canonicalUrl('/')} />
      </Helmet>
      <h1>Seite nicht gefunden</h1>
      <p>Die angeforderte Seite existiert nicht oder wurde verschoben.</p>
      <Link to="/">Zur Startseite</Link>
    </div>
  )
}

export default NotFound
