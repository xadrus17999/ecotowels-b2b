import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Wrench } from 'lucide-react';

import ShopHeader from '@/components/shop/ShopHeader';
import InfoSection from '@/components/shop/InfoSection';
import PresetSelector from '@/components/shop/PresetSelector';
import CustomConfigurator from '@/components/shop/CustomConfigurator';
import LogoUploader from '@/components/shop/LogoUploader';
import ConfigSummary from '@/components/shop/ConfigSummary';
import ContactForm from '@/components/shop/ContactForm';
import SuccessMessage from '@/components/shop/SuccessMessage';

const PRODUCER_EMAIL = 'info@example.com'; // Replace with actual email

const heroImage = 'https://media.base44.com/images/public/69c93819dabe2e39886b1787/e0610fa0c_generated_66ff1638.png';
const detailImage = 'https://media.base44.com/images/public/69c93819dabe2e39886b1787/a5dac2a69_generated_919e919b.png';

export default function Home() {
  const [mode, setMode] = useState('preset');
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [customConfig, setCustomConfig] = useState({ length: '', color: '', material: '' });
  const [logoUrl, setLogoUrl] = useState('');
  const [step, setStep] = useState(1); // 1 = config, 2 = contact
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contact, setContact] = useState({
    company_name: '', contact_name: '', contact_email: '',
    contact_phone: '', quantity: '', notes: ''
  });

  const activeConfig = mode === 'preset' && selectedPreset
    ? { length: selectedPreset.length, color: selectedPreset.color, material: selectedPreset.material }
    : customConfig;

  const isConfigValid = activeConfig.length && activeConfig.color && activeConfig.material;

  const handleNext = () => {
    if (!isConfigValid) {
      toast.error('Bitte füllen Sie alle Konfigurationsfelder aus.');
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
      configuration_type: mode,
      preset_name: mode === 'preset' ? selectedPreset?.name : '',
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
<p><strong>Typ:</strong> ${mode === 'preset' ? `Preset — ${selectedPreset?.name}` : 'Individuell'}</p>
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

    await base44.integrations.Core.SendEmail({
      to: PRODUCER_EMAIL,
      subject: `Neue Handtuch-Anfrage von ${contact.company_name}`,
      body: emailBody
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setMode('preset');
    setSelectedPreset(null);
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
      <section id="konfigurator" className="py-20 md:py-28 bg-muted/30">
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
                    Wählen Sie eines unserer bewährten Presets oder erstellen Sie Ihre eigene Konfiguration.
                  </p>
                </div>

                {/* Step 1: Configuration */}
                <div className="space-y-8">
                  <Tabs value={mode} onValueChange={(v) => { setMode(v); setSelectedPreset(null); }}>
                    <TabsList className="w-full max-w-sm mx-auto grid grid-cols-2 bg-muted">
                      <TabsTrigger value="preset" className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Presets
                      </TabsTrigger>
                      <TabsTrigger value="custom" className="flex items-center gap-2">
                        <Wrench className="w-4 h-4" />
                        Individuell
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <AnimatePresence mode="wait">
                    {mode === 'preset' ? (
                      <motion.div
                        key="preset"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <PresetSelector selected={selectedPreset} onSelect={setSelectedPreset} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="custom"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <CustomConfigurator config={customConfig} onChange={setCustomConfig} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <LogoUploader logoUrl={logoUrl} onUpload={setLogoUrl} />

                  <ConfigSummary config={activeConfig} logoUrl={logoUrl} />

                  {step === 1 && (
                    <div className="text-center pt-4">
                      <button
                        onClick={handleNext}
                        disabled={!isConfigValid}
                        className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground rounded-full font-medium text-sm tracking-wide hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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

      {/* Footer */}
      <footer className="py-10 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} — Personalisierte Öko-Handtücher für Ihr Unternehmen
          </p>
        </div>
      </footer>
    </div>
  );
}