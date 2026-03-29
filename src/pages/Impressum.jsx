import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Impressum() {
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

        <h1 className="font-heading text-3xl font-bold text-foreground mb-10">Impressum / AGB</h1>

        <div className="space-y-8 text-sm text-foreground leading-relaxed">

          {/* Kontakt */}
          <section>
            <h2 className="font-semibold text-base mb-3">Angaben gemäß § 5 TMG</h2>
            <p>
              absolut-hübbers werbeartikel<br />
              Markus Hübbers<br />
              Antoniterstraße 44<br />
              47551 Bedburg-Hau
            </p>
            <p className="mt-3">
              Telefon: 02821 4609003<br />
              Mail: <a href="mailto:m.huebbers@absolut-huebbers.de" className="underline hover:text-primary">m.huebbers@absolut-huebbers.de</a>
            </p>
            <p className="mt-3">USt.IdNr.: DE231593620</p>
          </section>

          {/* OS-Plattform */}
          <section className="text-muted-foreground">
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie hier finden:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                https://ec.europa.eu/consumers/odr/
              </a>.
              Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.
            </p>
          </section>

          <hr className="border-border" />

          {/* AGB */}
          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-6">Allgemeine Geschäftsbedingungen (AGB)</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Allgemeines</h3>
                <p className="text-muted-foreground">
                  Diese Allgemeinen Geschäftsbedingungen gelten in der jeweils gültigen Fassung für alle unsere Verträge, Lieferungen und sonstigen Leistungen. Abweichende Bedingungen des Bestellers erkennen wir nicht an, es sei denn, wir hätten diesen ausdrücklich schriftlich zugestimmt.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Aufträge – Preise – Lieferungen – Zahlungen – Transportschäden</h3>
                <p className="text-muted-foreground">
                  Bestellungen können schriftlich, online per Internet, per Telefon oder per Telefax erteilt werden. Bestellungen sind für uns nur verbindlich, soweit wir sie bestätigen oder ihnen durch Versendung der Ware nachkommen. Mündliche Nebenabsprachen gelten nur, wenn wir sie Ihnen schriftlich bestätigen.
                </p>
                <p className="text-muted-foreground mt-2">
                  Es gelten die Preise zum Zeitpunkt der Bestellung. Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer sowie der Kosten für Verpackung und Versand. Lieferung erfolgt ab Werk an die vom Kunden angegebene Lieferanschrift. Die Haftung geht an den Kunden über sobald dieser den Empfang der Sendung gegenüber dem Paketdienst bzw. der Spedition quittiert hat. Von daher ist es im eigenen Interesse des Bestellers, die Sendung bei Annahme sorgfältig auf Transportschäden zu überprüfen. Wird eine Beschädigung festgestellt, so ist der Empfänger verpflichtet, den Schaden beim Transportunternehmer auf der Empfangsbestätigung zu reklamieren. Bei Schäden, die erst beim Auspacken der Ware bemerkt werden, verpflichtet sich der Empfänger uns umgehend zu kontaktieren.
                </p>
                <p className="text-muted-foreground mt-2">
                  Die Zahlung erfolgt gegen Rechnung. Zahlungsziel: 10 Tage nach Erhalt der Ware ohne Abzug.
                </p>
                <p className="text-muted-foreground mt-2">
                  Preisänderungen für unsere Produkte behalten wir uns grundsätzlich ohne Ankündigung vor. Bei hohen Rechnungsbeträgen / hohem Auftragsvolumen einzelner Bestellungen/Kunden behalten wir uns eine Vorauszahlung vor.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Sonderdrucke – Sonderkonfektionierungen</h3>
                <p className="text-muted-foreground">
                  Aufträge für Sonderdrucke / Sonderkonfektionierung werden nur schriftlich angenommen. Die Bestellungen werden von uns generell bestätigt und nur nach Erhalt der unterschriebenen Druckfreigabe und Auftragsbestätigung weiterverarbeitet.
                </p>
                <p className="text-muted-foreground mt-2">
                  Eine Mehr- oder Minderlieferung von 10% ist bei Sonderanfertigungen branchenüblich und muss vom Besteller anerkannt werden. Sonderanfertigungen werden von uns nicht zurückgenommen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Fristen für Lieferungen – Eigentumsvorbehalt</h3>
                <p className="text-muted-foreground">
                  Teillieferungen liegen je nach Liefersituation in unserem Ermessen. Bei einer Bestellung mit festgelegtem und durch uns bestätigten Termin erfolgt nach Verstreichen dieses Termins keine Nachlieferung mehr, es sei denn auf ausdrücklichen Wunsch des Kunden. Nachlieferungen erfolgen ohne zusätzliche Versandkosten.
                </p>
                <p className="text-muted-foreground mt-2">
                  Sollten wir nach Bestellannahme feststellen, dass uns ein Fehler zu Preis-, Lieferzeit oder Produktangaben unterlaufen ist, werden wir den Kunden umgehend informieren. Die Bestellung kann dann ggf. zu den geänderten Konditionen nochmals bestätigt werden.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Höhere Gewalt</h3>
                <p className="text-muted-foreground">
                  Fälle höherer Gewalt entheben die Parteien von der Vertragsverpflichtung für die Dauer der Störung und dem Umfang ihrer Wirkung. Insbesondere verlängern sich die Lieferfristen angemessen. Hierzu gehören Umstände und Vorkommnisse, die mit der Sorgfalt einer ordentlichen Betriebsführung nicht verhindert werden können oder die außerhalb unseres Willens liegen, wie z.B. Verkehrsstörungen, Importsperren, Schwierigkeiten bei der Beschaffung von Rohmaterialien. Nicht rechtzeitige Lieferung von Unterlieferungen und ähnliche vorbezeichnete Umstände sind auch dann nicht von uns zu vertreten, wenn sie während eines bereits vorliegenden Verzuges entstehen. Hiermit weisen wir Sie darauf hin, dass wir keine Stornierungen von Bestellungen oder Verträgen akzeptieren, die in Verbindung mit vorhersehbarer, wirtschaftlichen Störungen aufgrund des neuartigen Corona-Virus, oder andere Pandemien insbesondere, aber nicht ausschließlich, aufgrund von Absagen von Ereignissen/Events oder Lieferproblemen - sofern dies nicht schriftlich, vertraglich anders geregelt ist.
                </p>
                <p className="text-muted-foreground mt-2">
                  Wir behalten uns das Recht vor, zumutbare Änderungen der Produkte, die der Verbesserung dienen, ohne Vorankündigung durchzuführen. Aus Produktions- und wiedergabetechnischen Gründen können bei den abgebildeten Produkten Abweichungen zum Original sein. Technische Änderungen und Irrtum vorbehalten. Alle Angaben ohne Gewähr.
                </p>
                <p className="text-muted-foreground mt-2">
                  Sollte es durch unvorhersehbare und drastische Wetterereignisse, z.B. Hochwasser, Gewitter, Starkregen- oder Hagel zu Schäden kommen, übernehmen wir keine Haftung.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Rücktritt</h3>
                <p className="text-muted-foreground">
                  Für den Fall unvorhersehbarer, von uns nicht zu vertretender Ereignisse oder auch für sonstige Fälle der höheren Gewalt gemäß obiger Ausführung der Lieferbedingungen sowie für den Fall sich nachträglich herausstellender Unmöglichkeit der Ausführung der Lieferung, wird der Vertrag angemessen angepasst. Soweit dies wirtschaftlich nicht vertretbar ist, steht uns das Recht zu, ganz oder teilweise vom Vertrag durch schriftliche Erklärung zurückzutreten. In einem solchen Fall steht dem Auftraggeber kein Schadensersatzanspruch wegen eines solchen Rücktritts zu.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Bildrechte</h3>
                <p className="text-muted-foreground">
                  Alle Bildrechte liegen ausschließlich bei absolut-hübbers werbeartikel. Eine Verwendung ohne unsere ausdrückliche Zustimmung ist nicht gestattet! Uns zur Verfügung gestellte Bild- und Grafikdaten dürfen von absolut-hübbers werbeartikel für Anzeige- und Werbezwecke ohne separate Zustimmung genutzt werden.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Erfüllungsort und Gerichtsstand</h3>
                <p className="text-muted-foreground">
                  Erfüllungsort für die Lieferung sowie für die Zahlung ist jeweils unser Hauptsitz. Gerichtsstand bei allen sich aus dem Vertragsverhältnis ergebenen Streitigkeiten ist das für unseren Hauptsitz zuständige Gericht, d.h. Amtsgericht Kleve. Dies gilt auch für Geschäftsabschlüsse mit ausländischen Geschäftspartnern.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-border" />

          <section className="text-muted-foreground space-y-2">
            <p>© absolut-hübbers werbeartikel 01/2023</p>
            <p className="font-medium text-foreground">Wir verkaufen nur an B2B Kunden.</p>
            <p>Bitte beachten Sie den Mindestbestellwert von 400,00€.</p>
            <p>Stellen Sie uns gerne ihre Anfrage, wir setzen uns schnellstmöglich mit Ihnen in Verbindung.</p>
          </section>

        </div>
      </div>
    </div>
  );
}