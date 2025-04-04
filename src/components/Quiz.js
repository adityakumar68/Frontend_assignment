"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MathQuiz = () => {
  const [answers, setAnswers] = useState({ q1: '', q2: '' });
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Quiz questions data
  const quizData = [
    {
      id: 'q1',
      question: 'What is the value of √64?',
      options: [
        { value: 'a', text: '4' },
        { value: 'b', text: '8' },
        { value: 'c', text: '16' },
        { value: 'd', text: '32' }
      ],
      correctAnswer: 'b'
    },
    {
      id: 'q2',
      question: 'If x² - 5x + 6 = 0, what are the values of x?',
      options: [
        { value: 'a', text: 'x = 1 and x = 5' },
        { value: 'b', text: 'x = 2 and x = 4' },
        { value: 'c', text: 'x = 2 and x = 3' },
        { value: 'd', text: 'x = 1 and x = 6' }
      ],
      correctAnswer: 'c'
    }
  ];

  // Submit MCQ answers
  const submitAnswers = () => {
    let correctCount = 0;
    
    quizData.forEach(question => {
      if (answers[question.id] === question.correctAnswer) correctCount++;
    });
    
    setScore(correctCount);
    setSubmitted(true);
  };

  // Reset quiz
  const resetQuiz = () => {
    setAnswers({ q1: '', q2: '' });
    setScore(null);
    setSubmitted(false);
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Math Quiz</h2>
      
      <div className="space-y-4 flex-grow overflow-y-auto mb-4">
        {quizData.map((question, index) => (
          <motion.div
            key={question.id}
            className="bg-gray-50 rounded-lg p-3 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <h3 className="font-medium text-gray-800 text-sm">{question.question}</h3>
            <div className="space-y-2">
              {question.options.map((option) => (
                <motion.label
                  key={option.value}
                  className={`flex items-center p-2 rounded-lg cursor-pointer border text-sm ${
                    submitted && option.value === question.correctAnswer 
                      ? 'bg-green-50 border-green-300' 
                      : submitted && answers[question.id] === option.value && option.value !== question.correctAnswer
                      ? 'bg-red-50 border-red-300'
                      : answers[question.id] === option.value
                      ? 'bg-indigo-50 border-indigo-300'
                      : 'border-gray-200 hover:bg-gray-100'
                  } transition-all duration-200`}
                  whileHover={!submitted ? { scale: 1.01 } : {}}
                  whileTap={!submitted ? { scale: 0.99 } : {}}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={() => setAnswers({...answers, [question.id]: option.value})}
                    disabled={submitted}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">{option.text}</span>
                  
                  {submitted && option.value === question.correctAnswer && (
                    <motion.span 
                      className="ml-auto text-green-500 flex items-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </motion.span>
                  )}
                  
                  {submitted && answers[question.id] === option.value && option.value !== question.correctAnswer && (
                    <motion.span 
                      className="ml-auto text-red-500 flex items-center" 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </motion.span>
                  )}
                </motion.label>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mb-12">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className={`p-3 rounded-lg flex items-center justify-between text-sm ${
                score === 2 ? 'bg-green-100 text-green-800' : 
                score === 0 ? 'bg-red-100 text-red-800' : 
                'bg-yellow-100 text-yellow-800'
              }`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <p className="font-medium">Your score: {score}/2</p>
            </motion.div>
            
            <motion.button
              onClick={resetQuiz}
              className="mt-3 w-full px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            onClick={submitAnswers}
            disabled={!answers.q1 || !answers.q2}
            className={`w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
              !answers.q1 || !answers.q2 ? 
              'bg-gray-300 text-gray-500 cursor-not-allowed' : 
              'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
            whileHover={!answers.q1 || !answers.q2 ? {} : { scale: 1.02 }}
            whileTap={!answers.q1 || !answers.q2 ? {} : { scale: 0.98 }}
          >
            Submit Answers
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default MathQuiz;