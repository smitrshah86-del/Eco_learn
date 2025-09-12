import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Quiz, Question } from '../../types';

interface QuizInterfaceProps {
  quiz: Quiz;
  onComplete: (score: number, totalQuestions: number) => void;
  onBack: () => void;
}

export const QuizInterface: React.FC<QuizInterfaceProps> = ({ quiz, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleQuizComplete(newAnswers);
      }
    }
  };

  const handleQuizComplete = (finalAnswers?: number[]) => {
    const answersToCheck = finalAnswers || answers;
    let correctCount = 0;
    
    quiz.questions.forEach((question, index) => {
      if (answersToCheck[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setShowResult(true);
    onComplete(correctCount, quiz.questions.length);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = quiz.questions[currentQuestion];

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
            score >= quiz.questions.length * 0.8 ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'
          }`}>
            {score >= quiz.questions.length * 0.8 ? (
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Quiz Complete!
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You scored {score} out of {quiz.questions.length} questions correct
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Score Percentage</p>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${(score / quiz.questions.length) * 100}%` }}
              />
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {Math.round((score / quiz.questions.length) * 100)}%
            </p>
          </div>
          
          <button
            onClick={onBack}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Quiz Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{quiz.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
          <Clock className="h-5 w-5" />
          <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {currentQ.question}
        </h2>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? 'border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-400'
                  : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-gray-900 dark:text-white">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedAnswer === null
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700'
                : 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
            }`}
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};