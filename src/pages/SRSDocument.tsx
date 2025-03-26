
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DownloadWord from '@/components/DownloadWord';

const SRSDocument = () => {
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
        
        <iframe 
          src="/src/docs/SRSDocument.md" 
          className="w-full h-[700px] border border-gray-200 rounded-lg"
          title="SRS Document"
        />
      </div>
    </div>
  );
};

export default SRSDocument;
