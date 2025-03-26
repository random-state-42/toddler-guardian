
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import srsDocument from '@/docs/SRSDocument.md?raw';

const DownloadWord = () => {
  const handleDownload = () => {
    // Convert Markdown to a format Word can handle better
    // Simple approach: Replace Markdown headers with bigger text
    // This isn't perfect, but allows the content to be opened in Word
    let content = srsDocument;
    
    // Create a Blob with the content
    const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
    // Create a download link and trigger it
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ToddlerGuardian_SRS.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleDownload} className="mt-4 mb-8">
      <Download className="mr-2 h-4 w-4" /> Download SRS as Word Document
    </Button>
  );
};

export default DownloadWord;
