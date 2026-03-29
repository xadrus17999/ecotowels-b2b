import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Impressum</h1>

        <div className="space-y-6 text-sm text-foreground leading-relaxed">
          <section>
            <h2 className="font-semibold text-base mb-2">Angaben gemäß § 5 TMG</h2>
            <p>Absolut Hübbers<br />
            [Straße und Hausnummer]<br />
            [PLZ] [Ort]<br />
            Deutschland</p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">Kontakt</h2>
            <p>Telefon: [Telefonnummer]<br />
            E-Mail: [E-Mail-Adresse]</p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
            [USt-IdNr.]</p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>[Name]<br />
            [Adresse]</p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">Haftungsausschluss</h2>
            <p className="text-muted-foreground">
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}