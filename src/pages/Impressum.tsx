import { motion } from 'framer-motion'
import './Legal.css'

function Impressum() {
  return (
    <div className="legal">
      <motion.section
        className="legal-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Impressum</h1>
      </motion.section>

      <section className="legal-content">
        <div className="legal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              <strong>Lauffer Bau · Erdbau · Natursteinhandel</strong><br />
              Paul Lauffer<br />
              Waizendorfer Str. 6<br />
              91639 Wolframs-Eschenbach
            </p>

            <h2>Kontakt</h2>
            <p>
              Telefon: 09875/8129006<br />
              E-Mail: info@lauffer-bau.de
            </p>

            <h2>Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE123456789 (Beispiel)
            </p>

            <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p>
              Berufsbezeichnung: Gartenbaumeister<br />
              Zuständige Kammer: Handwerkskammer [Ort]<br />
              Verliehen durch: Deutschland
            </p>

            <h2>Redaktionell verantwortlich</h2>
            <p>
              Paul Lauffer<br />
              Waizendorfer Str. 6<br />
              91639 Wolframs-Eschenbach
            </p>

            <h2>EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer"> 
                https://ec.europa.eu/consumers/odr/
              </a><br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
              Tätigkeit hinweisen.
            </p>

            <h2>Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
              der Seiten verantwortlich.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Impressum

