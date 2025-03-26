
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DownloadWord = () => {
  const { toast } = useToast();
  
  const handleDownload = async () => {
    try {
      // Array of all SRS section files to include in the document
      const sectionFiles = [
        "/src/docs/srs/index.md",
        "/src/docs/srs/introduction.md",
        "/src/docs/srs/overview.md",
        "/src/docs/srs/features.md",
        "/src/docs/srs/interfaces.md",
        "/src/docs/srs/non-functional.md",
        "/src/docs/srs/hardware.md",
        "/src/docs/srs/planning.md",
        "/src/docs/srs/appendices.md"
      ];

      // Fetch and combine all sections
      let fullDocument = "";
      
      for (const filePath of sectionFiles) {
        try {
          const response = await fetch(filePath);
          const text = await response.text();
          fullDocument += text + "\n\n";
        } catch (error) {
          console.error(`Error loading section ${filePath}:`, error);
        }
      }
      
      // Convert markdown to HTML for better Word formatting
      // This is a simple conversion; a more robust solution might use a markdown library
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word'
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>ToddlerGuardian SRS Document</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>90</w:Zoom>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            body { font-family: 'Calibri', sans-serif; }
            h1 { font-size: 18pt; font-weight: bold; margin-top: 24pt; margin-bottom: 6pt; }
            h2 { font-size: 16pt; font-weight: bold; margin-top: 18pt; margin-bottom: 6pt; }
            h3 { font-size: 14pt; font-weight: bold; margin-top: 14pt; margin-bottom: 4pt; }
            p { font-size: 11pt; margin-bottom: 6pt; }
            ul { margin-left: 20pt; }
            li { font-size: 11pt; margin-bottom: 3pt; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${fullDocument
              .replace(/^# (.*$)/gm, '<h1>$1</h1>')
              .replace(/^## (.*$)/gm, '<h2>$1</h2>')
              .replace(/^### (.*$)/gm, '<h3>$1</h3>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\n- (.*)/g, '<ul><li>$1</li></ul>')
              .replace(/<\/ul>\n<ul>/g, '')
              .replace(/\n\n/g, '<p></p>')
              .replace(/\n/g, '<br />')
              .replace(/\|\s*([^|]*)\s*\|\s*([^|]*)\s*\|\s*([^|]*)\s*\|\s*([^|]*)\s*\|/g, '<table><tr><td>$1</td><td>$2</td><td>$3</td><td>$4</td></tr></table>')
              .replace(/<table>(<tr>.*?<\/tr>)<\/table><table>/g, '<table>$1')}
        </body>
        </html>
      `;
      
      // Create a Blob with the content
      const blob = new Blob([htmlContent], { 
        type: 'application/vnd.ms-word;charset=utf-8' 
      });
      
      // Create a download link and trigger it
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'ToddlerGuardian_SRS.doc';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: "The SRS document is being downloaded as a Word file.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the document. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleDownload} className="mt-4 mb-8">
      <Download className="mr-2 h-4 w-4" /> Download SRS as Word Document
    </Button>
  );
};

export default DownloadWord;
