'use client';

import FileUploader from '@/components/FileUploader';
import FileDownloader from '@/components/FileDownloader';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>-----------</h1>
      <FileUploader />
      <hr />
      <FileDownloader />
    </main>
  );
}
