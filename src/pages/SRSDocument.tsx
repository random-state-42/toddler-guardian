
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DownloadWord from '@/components/DownloadWord';

const SRSDocument = () => {
  const [sections, setSections] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("index");
  const [loading, setLoading] = useState(true);

  const sectionFiles = [
    { id: "index", name: "Index", path: "/src/docs/srs/index.md" },
    { id: "introduction", name: "1. Introduction", path: "/src/docs/srs/introduction.md" },
    { id: "overview", name: "2. Overall Description", path: "/src/docs/srs/overview.md" },
    { id: "features", name: "3. System Features", path: "/src/docs/srs/features.md" },
    { id: "interfaces", name: "4. External Interface Requirements", path: "/src/docs/srs/interfaces.md" },
    { id: "non-functional", name: "5. Non-Functional Requirements", path: "/src/docs/srs/non-functional.md" },
    { id: "hardware", name: "6. Hardware Requirements", path: "/src/docs/srs/hardware.md" },
    { id: "planning", name: "7. Planning and Analysis", path: "/src/docs/srs/planning.md" },
    { id: "appendices", name: "8. Appendices", path: "/src/docs/srs/appendices.md" },
  ];

  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      const newSections: Record<string, string> = {};
      
      for (const section of sectionFiles) {
        try {
          const response = await fetch(section.path);
          const text = await response.text();
          newSections[section.id] = text;
        } catch (error) {
          console.error(`Error loading section ${section.id}:`, error);
          newSections[section.id] = `Error loading section: ${section.name}`;
        }
      }
      
      setSections(newSections);
      setLoading(false);
    };
    
    fetchSections();
  }, []);

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering for display
    // This is a basic implementation; consider using a proper markdown renderer
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n- (.*)/g, '<ul class="list-disc ml-5 my-2"><li>$1</li></ul>')
      .replace(/<\/ul>\n<ul class="list-disc ml-5 my-2">/g, '')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <DownloadWord />
      </div>
      
      <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
        <h1 className="text-center mb-8">Software Requirements Specification (SRS)</h1>
        <h1 className="text-center mb-10">ToddlerGuardian: Autism Screening Tool</h1>
        
        <p className="mb-8 text-center text-muted-foreground">
          This document outlines the requirements for the ToddlerGuardian application.
          Click the "Download SRS as Word Document" button above to save this document in Word format.
        </p>
        
        <div className="my-6">
          {loading ? (
            <div className="text-center p-4">Loading SRS document...</div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-flow-col auto-cols-fr mb-4 overflow-x-auto">
                {sectionFiles.map(section => (
                  <TabsTrigger key={section.id} value={section.id}>{section.name}</TabsTrigger>
                ))}
              </TabsList>
              
              {sectionFiles.map(section => (
                <TabsContent key={section.id} value={section.id} className="border p-4 rounded-md">
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(sections[section.id] || 'Loading...') }} />
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default SRSDocument;
