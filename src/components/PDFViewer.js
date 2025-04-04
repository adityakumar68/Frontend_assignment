"use client";
import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";

const PDFViewer = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfObjectUrl, setPdfObjectUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Clean up object URL when component unmounts or when file changes
  useEffect(() => {
    return () => {
      if (pdfObjectUrl) {
        URL.revokeObjectURL(pdfObjectUrl);
      }
    };
  }, [pdfObjectUrl]);

  // Handle PDF upload
  const onPdfFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      // Create object URL for the file
      const objectUrl = URL.createObjectURL(file);
      setPdfObjectUrl(objectUrl);
    } else if (file) {
      alert("Please upload a valid PDF file");
    }
  };

  // Custom PDF viewr
  const CustomPDFViewer = () => {
    return (
      <div className="border rounded-lg overflow-hidden flex flex-col h-full">
        <div className="bg-gray-50 p-2 flex justify-between items-center">
          <h3 className="font-medium text-gray-700 truncate flex-1 text-sm">
            {pdfFile?.name || "Document"}
          </h3>
        </div>
        <div className="flex-grow bg-gray-100 relative">
          <object
            data={`${pdfObjectUrl}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0`}
            type="application/pdf"
            className="w-full h-full min-h-screen md:min-h-0"
            aria-label="PDF Document"
          >
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-gray-500">
                Your browser doesn't support embedded PDFs.
              </p>
            </div>
          </object>
          {/* Anti-screenshot overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.01) 1px, transparent 0)",
              backgroundSize: "4px 4px",
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">PDF Viewer</h2>
      <div className="flex-grow flex flex-col">
        {!pdfObjectUrl ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex-grow flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-indigo-300">
            <Upload className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-500 mb-4">Upload a PDF file to view</p>
            <label className="cursor-pointer px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 active:scale-95">
              <span>Select PDF</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={onPdfFileChange}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="flex-grow h-full">
            {/* Enhanced container for better mobile/tablet viewing */}
            <div className="h-full md:h-screen lg:h-full max-h-full overflow-hidden">
              <CustomPDFViewer />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PDFViewer;
