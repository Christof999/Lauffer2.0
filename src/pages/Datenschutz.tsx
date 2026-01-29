import { motion } from 'framer-motion'
import './Legal.css'

function Datenschutz() {
  return (
    <div className="legal">
      <motion.section
        className="legal-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Datenschutzerklärung</h1>
      </motion.section>

      <section className="legal-content">
        <div className="legal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>1. Datenschutz auf einen Blick</h2>
            
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>
            <p>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
              Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>

            <p>
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei 
              kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>

            <p>
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website 
              durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, 
              Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>

            <h2>2. Hosting</h2>
            <p>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:<br />
              [Hosting-Anbieter eintragen]
            </p>

            <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen 
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3>Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
              <strong>Lauffer Bau</strong><br />
              Paul Lauffer<br />
              Waizendorfer Str. 6<br />
              91639 Wolframs-Eschenbach<br /><br />
              Telefon: 09875/8129006<br />
              E-Mail: info@lauffer-bau.de
            </p>

            <h2>4. Datenerfassung auf dieser Website</h2>
            
            <h3>Cookies</h3>
            <p>
              Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien 
              und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für 
              die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem 
              Endgerät gespeichert.
            </p>

            <h3>Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>

            <h3>Anfrage per E-Mail, Telefon oder Telefax</h3>
            <p>
              Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive 
              aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der 
              Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
            </p>

            <h2>5. Soziale Medien</h2>
            <p>
              Diese Website nutzt keine Social-Media-Plugins von sozialen Netzwerken.
            </p>

            <h2>6. Analyse-Tools und Werbung</h2>
            <p>
              Diese Website verwendet keine Analyse-Tools oder Werbe-Cookies ohne Ihre explizite 
              Einwilligung.
            </p>

            <h2>7. Plugins und Tools</h2>
            <p>
              Diese Website verwendet aktuell keine externen Plugins oder Tools.
            </p>

            <h2>8. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten 
              personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung 
              sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
            </p>

            <p className="legal-updated">
              <em>Stand dieser Datenschutzerklärung: {new Date().toLocaleDateString('de-DE')}</em>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Datenschutz

