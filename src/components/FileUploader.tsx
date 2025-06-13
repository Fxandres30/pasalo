'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export default function FileUploader() {
  const [uploading, setUploading] = useState(false);
  const [fileCode, setFileCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFileCode('');
    setUrl('');

    const code = uuidv4(); // Código único
    const { error } = await supabase.storage.from('pasalo').upload(code, file);

    if (error) {
      alert('Error al subir el archivo');
    } else {
      setFileCode(code);

      // 🔐 Crear link temporal de descarga
      const { data } = await supabase
        .storage
        .from('pasalo')
        .createSignedUrl(code, 60 * 60); // válido por 1 hora

      if (data?.signedUrl) setUrl(data.signedUrl);
    }

    setUploading(false);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(fileCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Subir archivo</h2>

      <input type="file" onChange={handleUpload} />
      {uploading && <p>Subiendo archivo...</p>}

      {fileCode && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>📌 Código del archivo:</strong> {fileCode}</p>
          <button onClick={copyCode}>
            {copied ? '✅ Copiado' : '📋 Copiar código'}
          </button>
          <br />

          {url && (
            <div style={{ marginTop: '1rem' }}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                👉 Descargar este archivo
              </a>
              <p style={{ wordBreak: 'break-all' }}>🔗 Link temporal: {url}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
