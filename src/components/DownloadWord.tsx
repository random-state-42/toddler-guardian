
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
      
      // Create a Blob with the content
      const blob = new Blob([fullDocument], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      
      // Create a download link and trigger it
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'ToddlerGuardian_SRS.docx';
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
