import React, { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

export default function LogoUploader({ logoUrl, onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onUpload(file_url);
    setUploading(false);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Logo hochladen</label>

      {logoUrl ? (
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-xl border-2 border-border overflow-hidden bg-white flex items-center justify-center">
            <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain p-2" />
          </div>
          <button
            onClick={() => onUpload('')}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-border bg-card hover:bg-muted/50 cursor-pointer transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {uploading ? (
            <div className="w-6 h-6 border-2 border-muted-foreground border-t-primary rounded-full animate-spin" />
          ) : (
            <>
              <Image className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                Klicken zum Hochladen
              </span>
              <span className="text-xs text-muted-foreground/60 mt-1">
                PNG, JPG, SVG
              </span>
            </>
          )}
        </label>
      )}
    </div>
  );
}