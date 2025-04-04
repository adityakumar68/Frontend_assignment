"use client";
import React, { useState } from "react";
import MathQuiz from "../components/Quiz";
import PDFViewer from "../components/PDFViewer";
import useAntiScreenshot from "../utils/useAntiScreenshot";
import YouTubePlayer from "../components/YouTubePlayer";

export default function Home() {
  useAntiScreenshot();

  // State to track which content is currently selected
  const [activeContent, setActiveContent] = useState("video");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Interactive Learning Platform</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-[calc(100vh-200px)]">
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Content selector tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveContent("video")}
                className={`py-2 px-4 font-medium text-sm rounded-t-lg transition-colors duration-200 ${
                  activeContent === "video"
                    ? "bg-indigo-50 border-b-2 border-indigo-600 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                Video Lesson
              </button>
              <button
                onClick={() => setActiveContent("pdf")}
                className={`py-2 px-4 font-medium text-sm rounded-t-lg transition-colors duration-200 ${
                  activeContent === "pdf"
                    ? "bg-indigo-50 border-b-2 border-indigo-600 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                Document
              </button>
            </div>

            {/* Content container with conditional rendering */}
            <div className="flex-grow">
              {activeContent === "video" ? (
                <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
                  <YouTubePlayer />
                </div>
              ) : (
                <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
                  <PDFViewer />
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 h-full">
            {/* Math Quiz Section - full height of right column */}
            <MathQuiz />
          </div>
        </div>
      </main>
    </div>
  );
}
