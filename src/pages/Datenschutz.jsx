import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-10">Datenschutzerklärung</h1>

        <div className="space-y-8 text-sm text-foreground leading-relaxed">

          <section>
            <h2 className="font-semibold text-base mb-3">Verantwortlich für diese Webseite ist:</h2>
            <p className="text-muted-foreground">
              absolut hübbers werbeartikel<br />
              Antoniterstraße 44<br />
              47551 Bedburg - Hau<br />
              Tel.: 02821 / 4609003<br />
              Email: <a href="mailto:info@absolut-huebbers.de" className="underline hover:text-primary">info@absolut-huebbers.de</a>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-3">Datenschutz - Grundlegendes</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Ihre "personenbezogene Daten" sind alle Informationen, die Sie als Person identifizieren oder Rückschlüsse auf Ihre Persönlichkeit erlauben. Diese unterliegen dem Datenschutz gemäß Datenschutz-Grundverordnung (DSGVO). Wir als Webseitenbetreiber nehmen Ihren Datenschutz sehr ernst und behandelt Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Vorschriften. Da durch neue Technologien und die ständige Weiterentwicklung dieser Webseite Änderungen an dieser Datenschutzerklärung vorgenommen werden können, empfehlen wir Ihnen, sich diese Datenschutzerklärung in regelmäßigen Abständen wieder durchzulesen.</p>
              <p>Wir halten uns an die Grundsätze der Datenvermeidung und Datensparsamkeit. Wir speichern Ihre personenbezogenen Daten daher nur so lange, wie dies zur Erreichung der hier genannten Zwecke erforderlich ist oder wie es die vom Gesetzgeber vorgesehenen vielfältigen Speicherfristen vorsehen. Nach Fortfall des jeweiligen Zweckes bzw. Ablauf dieser Fristen werden die entsprechenden Daten routinemäßig und entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht.</p>
              <p>Wir verarbeiten Ihre personenbezogenen Daten nur zu den in dieser Datenschutzerklärung im Folgenden genannten Zwecken. Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den genannten Zwecken findet nicht statt.</p>
              <p>Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Sie Ihre ausdrückliche Einwilligung dazu erteilt haben,</li>
                <li>die Verarbeitung zur Abwicklung eines Vertrags mit Ihnen erforderlich ist,</li>
                <li>die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist,</li>
                <li>die Verarbeitung zur Wahrung berechtigter Interessen erforderlich ist und</li>
                <li>kein Grund zur Annahme besteht, dass Sie ein überwiegendes schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben.</li>
              </ul>
              <p>Eine Weitergabe Ihrer Daten an Dritte ohne Ihre ausdrückliche Einwilligung erfolgt nicht. Ausgenommen hiervon sind lediglich unsere Dienstleistungspartner, wie z.B. Versanddienstleister, Zahlungsdienstleister, Warenwirtschaftsdienstleister, Diensteanbieter für die Bestellabwicklung, Webhoster, IT-Dienstleister und Dropshipping Händler. Die Weitergabe Ihrer Daten ist auf ein Mindestmaß beschränkt und erfolgt unter Beachtung der gesetzlichen Vorgaben. Wir haben - soweit erforderlich - einen Auftragsbearbeitungsvertrag mit unseren entsprechenden Dienstleistungspartner geschlossen.</p>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-3">Ihre Nutzerrechte</h2>
            <p className="text-muted-foreground mb-4">Unter den oben angegebenen Kontaktdaten können Sie jederzeit folgende Rechte ausüben:</p>
            <div className="space-y-3 text-muted-foreground">
              <div><span className="font-medium text-foreground">Recht auf Auskunft:</span> Sie erhalten jederzeit Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung.</div>
              <div><span className="font-medium text-foreground">Recht auf Berichtigung:</span> Wir berichtigen auf Ihre Anweisung unrichtige, personenbezogene Daten.</div>
              <div><span className="font-medium text-foreground">Recht auf Löschung/Blockierung:</span> Wir löschen auf Ihren Wunsch Ihre bei uns gespeicherten Daten. Sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen, schränken die Datenverarbeitung auf die gesetzlichen Erfordernisse ein.</div>
              <div><span className="font-medium text-foreground">Widerrufsrecht:</span> Sie können Ihrer Einwilligung auf Datenverarbeitung bei uns jederzeit widersprechen.</div>
              <div><span className="font-medium text-foreground">Recht auf Datenübertragbarkeit:</span> Sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben, stellen wir die einfache Übertragung Ihrer bei uns gespeicherten persönlichen Daten auf andere Anbieter sicher.</div>
              <div><span className="font-medium text-foreground">Beschwerderecht:</span> Sie können sich jederzeit mit einer Beschwerde an die für Sie zuständige Aufsichtsbehörde wenden.</div>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-3">Server-Logfiles</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Sie können unsere Webseite besuchen, ohne Angaben zu Ihrer Person zu machen. Es werden bei jedem Zugriff auf unsere Website Nutzungsdaten durch Ihren Internetbrowser übermittelt und in Protokolldaten (Server-Logfiles) gespeichert. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und ähnliches.</p>
              <p>Diese Informationen sind technisch notwendig, um von Ihnen angeforderte Inhalte von Webseiten korrekt auszuliefern und fallen bei Nutzung des Internets zwingend an. Sie werden insbesondere zu folgenden Zwecken verarbeitet:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website,</li>
                <li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
                <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
                <li>zu weiteren administrativen Zwecken.</li>
              </ul>
              <p>Die Verarbeitung Ihrer personenbezogenen Daten basiert auf unserem berechtigten Interesse aus den vorgenannten Zwecken zur Datenerhebung. Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen. Anonyme Informationen dieser Art werden von uns ggfs. statistisch ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu optimieren. Empfänger der Daten sind nur die verantwortliche Stellen, mit denen wir einen Auftragsverarbeitungsvertrag abgeschlossen haben.</p>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-3">Cookies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Wie die viele Webseiten im Netz verwenden auch wir so genannte „Cookies". Cookies sind kleine Textdateien, die von einem Websiteserver auf Ihre Festplatte übertragen werden. Hierdurch erhalten wir automatisch bestimmte Daten wie z. B. IP-Adresse, verwendeter Browser, Betriebssystem und Ihre Verbindung zum Internet.</p>
              <p>Cookies können nicht verwendet werden, um Programme zu starten oder Viren auf Ihren Computer zu übertragen. Durch den Einsatz der Cookies können wir Ihnen die Navigation in unserer Webseite erleichtern und die korrekte Anzeige, z.B. des Warenkorbes, ermöglichen.</p>
              <p>Wir setzen z.B. Cookies ein, um Sie bei einem erneuten Besuch unserer Webseite wiederzuerkennen, damit Sie Ihre Kontaktdaten bei einer Anfrage nicht erneut eingeben müssen.</p>
              <p>In keinem Fall werden die von uns erfassten Daten an Dritte weitergegeben oder ohne Ihre Einwilligung eine Verknüpfung mit personenbezogenen Daten hergestellt.</p>
              <p>Natürlich können Sie unsere Website grundsätzlich auch ohne Cookies betrachten, allerdings werden dann einige Funktionen der Webseite nicht oder nur eingeschränkt möglich sein. Internet-Browser sind regelmäßig so eingestellt, dass sie Cookies akzeptieren. Im Allgemeinen können Sie die Verwendung von Cookies jederzeit über die Einstellungen Ihres Browsers deaktivieren.</p>
              <p>Folgende Cookies kommen bei der Nutzung unserer Website zum Einsatz:</p>
              <ul className="list-disc ml-5 space-y-2">
                <li><span className="font-medium text-foreground">PHPSESSID</span> - Dieses Cookie speichert Ihre aktuelle Sitzung mit Bezug und gewährleistet eine korrekte Anzeige und Funktion der Webseite. Das Cookie wird beim Schließen des Internet-Browsers wieder gelöscht.</li>
                <li><span className="font-medium text-foreground">ci_session</span> - Dieses Cookie dient zur Wiedererkennung der Webseitenbesucher, damit diese ihre Kontaktdaten bei einer wiederholten Anfrage nicht erneut eingeben müssen. Das Cookie wird nach 2 Jahren wieder gelöscht.</li>
                <li><span className="font-medium text-foreground">Cookie Info Script</span> - Wir nutzen die Script-Anwendung von diesem Anbieter, um Ihnen den Infobanner zur Cookienutzung anzuzeigen.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-3">SSL-Verschlüsselung</h2>
            <p className="text-muted-foreground">Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden wir dem aktuellen Stand der Technik entsprechende Verschlüsselungsverfahren (SSL). Sie erkennen diese verschlüsselte Verbindungen an dem Präfix "https://" in der Adresszeile Ihres Browsers. Sämtliche Daten, die über die Formulare diese Website übermittelt werden, werden verschlüsselt übertragen und können nicht von Dritten gelesen werden.</p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-3">Kontaktformular</h2>
            <p className="text-muted-foreground">Durch die Nutzung des Kontaktformulares in unserer Webseite erteilen Sie uns Ihre freiwillige Einwilligung zur Verarbeitung Ihrer dort angegeben persönlichen Daten zum Zwecke der Kontaktaufnahme mit Ihnen. Die Angabe Ihrer E-Mail-Adresse ist hierzu erforderlich, damit wir Ihre Anfrage bearbeiten und beantworten können. Die Angabe weiterer Daten ist optional. Die von Ihnen gemachten Angaben werden zum Zwecke der Bearbeitung der Anfrage sowie für mögliche Anschlussfragen gespeichert. Die Verarbeitung der Daten erfolgt auf Grundlage des Art. 6 (1) lit. a DSGVO mit Ihrer Einwilligung.</p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-3">Preisanfrageformular</h2>
            <p className="text-muted-foreground">Durch die Nutzung des Warenkorbes mit Preisanfrage in unserer Webseite erteilen Sie uns Ihre freiwillige Einwilligung zur Verarbeitung Ihrer dort angegeben persönlichen Daten zum Zwecke der Kontaktaufnahme mit Ihnen. Die als Pflichtfelder gekennzeichneten Daten sind erforderlich, damit wir Ihre Preisanfrage korrekt bearbeiten und beantworten können. Die Angabe aller weiterer Daten ist optional.</p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-3">Bestellungen</h2>
            <p className="text-muted-foreground">Eine Bestellung und der Vertragsabschluss kann über diese Webseite nicht erfolgen. Bei einer Warenbestellung erheben und verwenden wir auf Grundlage des Art. 6 (1) lit. b DSGVO Ihre personenbezogenen Daten nur, soweit dies zur Erfüllung und Abwicklung Ihrer Bestellung und für den Vertragsabschluss erforderlich ist.</p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-3">Verwendung von Google reCAPTCHA</h2>
            <p className="text-muted-foreground">Wir verwenden Google reCAPTCHA um zu überprüfen, ob die Eingabe der Daten in das Formular von einer Person oder einem automatischen Programm vorgenommen wird. Für diesen Dienst ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlanda ("Google") verantwortlich. Weitere Informationen finden Sie unter: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">https://policies.google.com/privacy</a></p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-3">Verwendung von Scriptbibliotheken</h2>
            <p className="text-muted-foreground">Für die korrekte Darstellung und Funktionsweise unserer Webseite nutzen wir Handlebars.js. Für ein schnelleres Laden der Javascript-Bibliothek haben wir diese über einen CDN-Dienst des Dienstanbieters Cloudflare, Inc. eingebunden. Die Datenschutzrichtlinie von Cloudflare finden Sie hier: <a href="https://www.cloudflare.com/gdpr/introduction/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">https://www.cloudflare.com/gdpr/introduction/</a></p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-3">Hinweise</h2>
            <p className="text-muted-foreground">Wir behalten uns vor, diese Datenschutzerklärung jederzeit an die aktuellen rechtlichen Anforderungen anzupassen. Bei Ihren erneuten Besuch unserer Webseite gilt dann die neue Datenschutzerklärung. Sollten Sie Fragen zu unserem Datenschutz haben, können Sie sich gerne jederzeit schriftlich an uns wenden.</p>
          </section>

          <hr className="border-border" />

          <section className="text-muted-foreground space-y-2">
            <p>© absolut-hübbers 01/2023</p>
            <p className="font-medium text-foreground">Wir verkaufen nur an B2B Kunden.</p>
            <p>Bitte beachten Sie den Mindestbestellwert von 400,00€.</p>
            <p>Stellen Sie uns gerne ihre Anfrage, wir setzen uns schnellstmöglich mit Ihnen in Verbindung.</p>
          </section>

        </div>
      </div>
    </div>
  );
}