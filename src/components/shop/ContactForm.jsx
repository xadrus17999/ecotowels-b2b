import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Loader2 } from 'lucide-react';

const quantities = [
  '50', '100', '250', '500', '1.000', '2.500', '5.000', '10.000+'
];

export default function ContactForm({ contact, onChange, onSubmit, submitting }) {
  const accepted = !!contact.privacy_accepted;

  const handleSubmit = () => {
    if (!accepted) return;
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="company">Firma *</Label>
          <Input
            id="company"
            placeholder="Musterfirma GmbH"
            value={contact.company_name}
            onChange={(e) => onChange({ ...contact, company_name: e.target.value })}
            className="bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Ansprechpartner *</Label>
          <Input
            id="name"
            placeholder="Max Mustermann"
            value={contact.contact_name}
            onChange={(e) => onChange({ ...contact, contact_name: e.target.value })}
            className="bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="max@musterfirma.de"
            value={contact.contact_email}
            onChange={(e) => onChange({ ...contact, contact_email: e.target.value })}
            className="bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+49 123 456789"
            value={contact.contact_phone}
            onChange={(e) => onChange({ ...contact, contact_phone: e.target.value })}
            className="bg-card"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Stückzahl *</Label>
        <Select value={contact.quantity} onValueChange={(v) => onChange({ ...contact, quantity: v })}>
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Stückzahl wählen" />
          </SelectTrigger>
          <SelectContent>
            {quantities.map((q) => (
              <SelectItem key={q} value={q}>{q} Stück</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Anmerkungen</Label>
        <Textarea
          id="notes"
          placeholder="Besondere Wünsche, Liefertermin, etc."
          value={contact.notes}
          onChange={(e) => onChange({ ...contact, notes: e.target.value })}
          className="bg-card min-h-[100px]"
        />
      </div>

      <div className={`flex items-start gap-3 p-4 rounded-xl border ${accepted ? 'border-primary/30 bg-primary/5' : 'border-border bg-muted/30'}`}>
        <Checkbox
          id="datenschutz"
          checked={accepted}
          onCheckedChange={(v) => onChange({ ...contact, privacy_accepted: !!v })}
          className="mt-0.5 shrink-0"
        />
        <label htmlFor="datenschutz" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
          Ich habe die{' '}
          <a href="/datenschutz" target="_blank" className="underline hover:text-foreground transition-colors">
            Datenschutzerklärung
          </a>{' '}
          gelesen und akzeptiere, dass meine Daten zur Kontaktaufnahme gespeichert werden. Eine Anfrage stellt noch keinen verbindlichen Vertrag dar. <span className="text-destructive">*</span>
        </label>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={submitting || !accepted}
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-medium rounded-xl"
      >
        {submitting ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : (
          <Send className="w-5 h-5 mr-2" />
        )}
        {submitting ? 'Wird gesendet...' : 'Anfrage absenden'}
      </Button>
    </div>
  );
}