'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function FileDownloader() {
  const [code, setCode] = useState('');
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const getDownloadUrl = async () => {
    setCopied(false);

    const { data } = await supabase
      .storage
      .from('pasalo')
      .createSignedUrl(code, 60 * 60); // ⏱ válido por 1 hora

    if (data?.signedUrl) {
      setUrl(data.signedUrl);
    } else {
      alert('Archivo no encontrado o código incorrecto');
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // mensaje desaparece en 3s
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Descargar archivo</h2>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Código del archivo"
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />

      <button onClick={getDownloadUrl} style={{ padding: '0.5rem 1rem' }}>
        Obtener archivo
      </button>

      {url && (
        <div style={{ marginTop: '1rem' }}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            👉 Descargar archivo
          </a>

          <div style={{ marginTop: '0.5rem' }}>
            <p style={{ wordBreak: 'break-all' }}>🔗 Enlace: {url}</p>
            <button onClick={copyToClipboard} style={{ marginTop: '0.5rem' }}>
              {copied ? '✅ Copiado' : '📋 Copiar enlace'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
