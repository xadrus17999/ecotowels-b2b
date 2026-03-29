import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

import ShopHeader from '@/components/shop/ShopHeader';
import InfoSection from '@/components/shop/InfoSection';
import PresetSelector from '@/components/shop/PresetSelector';
import CustomConfigurator from '@/components/shop/CustomConfigurator';
import LogoUploader from '@/components/shop/LogoUploader';
import ConfigSummary from '@/components/shop/ConfigSummary';
import ContactForm from '@/components/shop/ContactForm';
import SuccessMessage from '@/components/shop/SuccessMessage';
import FAQ from '@/components/shop/FAQ';
import PhotoGallery from '@/components/shop/PhotoGallery';

const PRODUCER_EMAIL = 'xadrus15@googlemail.com';

const heroImage = 'https://media.base44.com/images/public/69c93819dabe2e39886b1787/e0610fa0c_generated_66ff1638.png';
const detailImage = 'https://media.base44.com/images/public/69c93819dabe2e39886b1787/a5dac2a69_generated_919e919b.png';

export default function Home() {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [customConfig, setCustomConfig] = useState({ length: '', color: '', material: '' });
  const [logoUrl, setLogoUrl] = useState('');
  const [step, setStep] = useState(1); // 1 = config, 2 = contact
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contact, setContact] = useState({
    company_name: '', contact_name: '', contact_email: '',
    contact_phone: '', quantity: '', notes: ''
  });

  const activeConfig = customConfig;
  const isConfigValid = selectedVariant && activeConfig.length && activeConfig.color;

  const getMissingFields = () => {
    const missing = [];
    if (!selectedVariant) missing.push('Veredelungs-Variante');
    if (!activeConfig.length) missing.push('Größe');
    if (!activeConfig.color) missing.push('Farbe');
    return missing;
  };

  const handleNext = () => {
    const missing = getMissingFields();
    if (missing.length > 0) {
      toast.error(`Bitte noch ausfüllen: ${missing.join(', ')}`);
      return;
    }
    setStep(2);
    setTimeout(() => {
      document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!contact.company_name || !contact.contact_name || !contact.contact_email || !contact.quantity) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    setSubmitting(true);

    const inquiryData = {
      configuration_type: 'custom',
      preset_name: selectedVariant?.name || '',
      towel_length: activeConfig.length,
      towel_color: activeConfig.color,
      towel_material: activeConfig.material,
      logo_url: logoUrl,
      quantity: parseInt(contact.quantity.replace(/[^0-9]/g, '')) || 0,
      company_name: contact.company_name,
      contact_name: contact.contact_name,
      contact_email: contact.contact_email,
      contact_phone: contact.contact_phone,
      notes: contact.notes,
      status: 'neu'
    };

    await base44.entities.TowelInquiry.create(inquiryData);

    const emailBody = `
<h2>Neue Handtuch-Anfrage</h2>
<hr>
<h3>Konfiguration</h3>
<p><strong>Veredelungs-Variante:</strong> ${selectedVariant?.name || '—'}</p>
<p><strong>Größe:</strong> ${activeConfig.length}</p>
<p><strong>Farbe:</strong> ${activeConfig.color}</p>
<p><strong>Stoff:</strong> ${activeConfig.material}</p>
${logoUrl ? `<p><strong>Logo:</strong> <a href="${logoUrl}">Logo ansehen</a></p>` : '<p><strong>Logo:</strong> Keins hochgeladen</p>'}
<hr>
<h3>Kontaktdaten</h3>
<p><strong>Firma:</strong> ${contact.company_name}</p>
<p><strong>Ansprechpartner:</strong> ${contact.contact_name}</p>
<p><strong>E-Mail:</strong> ${contact.contact_email}</p>
<p><strong>Telefon:</strong> ${contact.contact_phone || '—'}</p>
<p><strong>Stückzahl:</strong> ${contact.quantity}</p>
${contact.notes ? `<p><strong>Anmerkungen:</strong> ${contact.notes}</p>` : ''}
    `.trim();

    // Email via Resend (best-effort, does not block success screen)
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Absolut Hübbers <onboarding@resend.dev>',
        to: [PRODUCER_EMAIL],
        subject: `Neue Handtuch-Anfrage von ${contact.company_name}`,
        html: emailBody,
      }),
    }).catch(() => {});

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedVariant(null);
    setCustomConfig({ length: '', color: '', material: '' });
    setLogoUrl('');
    setStep(1);
    setSubmitted(false);
    setContact({
      company_name: '', contact_name: '', contact_email: '',
      contact_phone: '', quantity: '', notes: ''
    });
    document.getElementById('konfigurator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <ShopHeader heroImage={heroImage} />
      <InfoSection detailImage={detailImage} />

      {/* Configurator */}
      <section id="konfigurator" className="py-20 md:py-28 bg-secondary/40">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessMessage key="success" onReset={handleReset} />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center mb-12">
                  <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3">
                    Konfigurator
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Ihr Handtuch gestalten
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Wählen Sie Ihre Veredelungs-Variante und stellen Sie Größe, Stoff und Farbe nach Ihren Wünschen zusammen.
                  </p>
                </div>

                {/* Step 1: Configuration */}
                <div className="space-y-8">
                  <PresetSelector selected={selectedVariant} onSelect={setSelectedVariant} />

                  <CustomConfigurator config={customConfig} onChange={setCustomConfig} />

                  <LogoUploader logoUrl={logoUrl} onUpload={setLogoUrl} />

                  <ConfigSummary config={activeConfig} logoUrl={logoUrl} variant={selectedVariant} />

                  {step === 1 && (
                    <div className="text-center pt-4 space-y-2">
                      {!isConfigValid && (
                        <p className="text-sm text-muted-foreground">
                          Noch ausfüllen: <span className="text-accent font-medium">{getMissingFields().join(', ')}</span>
                        </p>
                      )}
                      <button
                        onClick={handleNext}
                        className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground rounded-full font-medium text-sm tracking-wide hover:opacity-90 transition-all"
                      >
                        Weiter zu Kontaktdaten
                      </button>
                    </div>
                  )}

                  {/* Step 2: Contact */}
                  <AnimatePresence>
                    {step === 2 && (
                      <motion.div
                        id="kontakt"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="border-t border-border pt-10 mt-10"
                      >
                        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                          Kontaktdaten & Stückzahl
                        </h3>
                        <p className="text-muted-foreground text-sm mb-8">
                          Teilen Sie uns Ihre Daten mit und wir senden Ihnen ein individuelles Angebot.
                        </p>
                        <ContactForm
                          contact={contact}
                          onChange={setContact}
                          onSubmit={handleSubmit}
                          submitting={submitting}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <PhotoGallery />
      <FAQ />

      {/* Footer */}
      <footer className="py-10 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Absolut Hübbers — Personalisierte Öko-Handtücher für Ihr Unternehmen
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="/impressum" className="text-xs text-muted-foreground/70 hover:text-foreground underline underline-offset-2 transition-colors">
              Impressum
            </a>
            <a href="/datenschutz" className="text-xs text-muted-foreground/70 hover:text-foreground underline underline-offset-2 transition-colors">
              Datenschutzerklärung
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}