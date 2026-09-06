import React, { useState, useEffect } from 'react';
import { 
  X, 
  Flame, 
  Award, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  HelpCircle, 
  Share2, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  CurrentAffairItem, 
  QuizQuestion, 
  INITIAL_CURRENT_AFFAIRS, 
  DAILY_10_KA_DUM_QUIZ 
} from '../data/currentAffairsData';

interface CurrentAffairsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAffairs?: CurrentAffairItem[];
  selectedAffairId?: string | null;
  initialSelectedId?: string | null;
  quizQuestions?: QuizQuestion[];
  initialTab?: 'details' | 'quiz';
  startWithQuiz?: boolean;
}

export const CurrentAffairsModal: React.FC<CurrentAffairsModalProps> = ({
  isOpen,
  onClose,
  currentAffairs = INITIAL_CURRENT_AFFAIRS,
  selectedAffairId,
  initialSelectedId,
  quizQuestions = DAILY_10_KA_DUM_QUIZ,
  initialTab = 'details',
  startWithQuiz = false,
}) => {
  const effectiveInitialTab = startWithQuiz ? 'quiz' : initialTab;
  const [activeTab, setActiveTab] = useState<'details' | 'quiz'>(effectiveInitialTab);
  
  const effectiveAffairId = selectedAffairId || initialSelectedId;
  const safeAffairs = currentAffairs && currentAffairs.length > 0 ? currentAffairs : INITIAL_CURRENT_AFFAIRS;
  const safeQuiz = quizQuestions && quizQuestions.length > 0 ? quizQuestions : DAILY_10_KA_DUM_QUIZ;

  // Track selected affair safely with fallbacks
  const [currentId, setCurrentId] = useState<string>(() => {
    return effectiveAffairId || (safeAffairs[0]?.id || 'ca-1');
  });

  // Keep state synchronized whenever opening or changing selection
  useEffect(() => {
    if (isOpen) {
      if (startWithQuiz) {
        setActiveTab('quiz');
      } else if (initialTab) {
        setActiveTab(initialTab);
      }
      if (effectiveAffairId) {
        setCurrentId(effectiveAffairId);
      }
    }
  }, [isOpen, startWithQuiz, initialTab, effectiveAffairId]);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentItem = safeAffairs.find(a => a.id === currentId) || safeAffairs[0] || INITIAL_CURRENT_AFFAIRS[0];
  const activeQuestion = safeQuiz[currentQuestionIndex] || safeQuiz[0] || DAILY_10_KA_DUM_QUIZ[0];

  const handleAnswerSelect = (optionIndex: number) => {
    if (userAnswers[currentQuestionIndex] !== undefined) return; // already answered
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizSubmitted(true);
      // Trigger festive confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setIsQuizSubmitted(false);
  };

  const handleShareAffair = () => {
    if (navigator.clipboard && currentItem) {
      const shareText = `*${currentItem.title}*\n\nआज का डेली करंट अफेयर्स & डेली 10 का दम क्विज हल करें: https://mysarkariresult.co.in`;
      navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const totalScore = calculateScore();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border-2 border-[#000066] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#000066] via-blue-900 to-[#000066] text-white px-4 py-3 flex items-center justify-between border-b-4 border-amber-400">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-400 text-red-900 flex items-center justify-center font-black shadow-md">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  डेली करंट अफेयर्स 2026 & डेली 10 का दम
                </h3>
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase">
                  Live GK
                </span>
              </div>
              <p className="text-xs text-yellow-300 font-medium">
                UPSC, SSC CGL/GD, Railway, Police & State Exams हेतु आज के महत्वपूर्ण तथ्य
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-blue-950/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Switcher */}
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-[#000066] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>समसामयिकी विवरण (Topic Details)</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <Award className="w-4 h-4 text-yellow-300" />
              <span>डेली 10 का दम (10 MCQs Quiz)</span>
              <span className="bg-yellow-300 text-red-900 text-[10px] font-black px-1.5 py-0.2 rounded-full ml-0.5">
                10 अंक
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center text-xs text-gray-600 font-bold">
            <Calendar className="w-3.5 h-3.5 mr-1 text-[#000066]" />
            <span>आज: {currentItem?.date}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-gray-50">
          
          {/* TAB 1: DETAILED CURRENT AFFAIR TOPIC */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              {/* Quick Topic Chips Selector */}
              <div className="bg-white p-2.5 rounded-lg border border-gray-300 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#000066]" />
                    <span>आज के टॉप 10 टॉपिक में से चुनें:</span>
                  </span>
                  <span className="text-[11px] text-blue-900 font-semibold">
                    10 में से {currentAffairs.findIndex(a => a.id === currentId) + 1}वां
                  </span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {currentAffairs.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentId(item.id)}
                      className={`px-2.5 py-1 rounded text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        item.id === currentId
                          ? 'bg-[#000066] text-white shadow-xs'
                          : 'bg-gray-100 text-gray-800 hover:bg-blue-50 border border-gray-300'
                      }`}
                    >
                      #{index + 1} {item.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Topic Detail Card */}
              {currentItem && (
                <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
                  {/* Title Bar */}
                  <div className="bg-gradient-to-r from-blue-50 to-amber-50 p-4 border-b border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="bg-[#000066] text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                        {currentItem.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-red-600" />
                          {currentItem.date}
                        </span>
                        <button
                          onClick={handleShareAffair}
                          className="px-2 py-1 rounded bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold flex items-center gap-1 border border-gray-300 cursor-pointer"
                        >
                          <Share2 className="w-3 h-3" />
                          <span>{copiedShare ? 'कॉपी हुआ!' : 'शेयर'}</span>
                        </button>
                      </div>
                    </div>

                    <h4 className="text-base sm:text-xl font-black text-gray-900 leading-snug">
                      {currentItem.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1 italic">
                      {currentItem.titleEn}
                    </p>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 space-y-4">
                    {/* Executive Summary */}
                    <div className="bg-blue-50/70 border-l-4 border-[#000066] p-3 rounded-r-lg text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                      <strong className="text-[#000066] block mb-1">संक्षिप्त विवरण (Executive Summary):</strong>
                      {currentItem.summary}
                    </div>

                    {/* Detailed Key Points */}
                    <div>
                      <h5 className="text-xs sm:text-sm font-black text-gray-900 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>महत्वपूर्ण तथ्य और बिंदु (Key Facts):</span>
                      </h5>
                      <ul className="space-y-2">
                        {currentItem.keyPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-800">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#000066] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dual Cards: Exam Significance & Static GK */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="bg-amber-50 border border-amber-300 rounded-lg p-3">
                        <h6 className="text-xs font-black text-amber-900 flex items-center gap-1 mb-1">
                          <GraduationCap className="w-4 h-4 text-amber-700" />
                          <span>प्रतियोगी परीक्षा के लिए महत्व:</span>
                        </h6>
                        <p className="text-xs text-amber-950 leading-relaxed">
                          {currentItem.examSignificance}
                        </p>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3">
                        <h6 className="text-xs font-black text-emerald-900 flex items-center gap-1 mb-1">
                          <HelpCircle className="w-4 h-4 text-emerald-700" />
                          <span>संबंधित स्टैटिक जीके (Static GK):</span>
                        </h6>
                        <p className="text-xs text-emerald-950 leading-relaxed">
                          {currentItem.relatedStaticGk}
                        </p>
                      </div>
                    </div>

                    {/* Call to action for Daily 10 Ka Dum */}
                    <div className="bg-gradient-to-r from-red-600 to-[#cc0000] text-white p-3 rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-black uppercase text-yellow-300 block">ज्ञान परखें:</span>
                        <p className="text-xs sm:text-sm font-bold">
                          आज के करंट अफेयर्स पर आधारित "डेली 10 का दम" क्विज खेलें!
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('quiz')}
                        className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-red-950 font-black text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Award className="w-4 h-4" />
                        <span>स्टार्ट 10 का दम क्विज</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DAILY 10 KA DUM QUIZ */}
          {activeTab === 'quiz' && (
            <div>
              {!isQuizSubmitted ? (
                /* ACTIVE QUIZ PLAY SCREEN */
                <div className="bg-white rounded-xl border border-gray-300 shadow-sm p-4 sm:p-6 space-y-4">
                  {/* Quiz Status Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-700 text-white font-black text-xs px-2.5 py-1 rounded-md">
                        प्रश्न {currentQuestionIndex + 1} / {quizQuestions.length}
                      </span>
                      <span className="text-xs font-bold text-gray-600">
                        श्रेणी: {activeQuestion.category}
                      </span>
                    </div>

                    {/* Score preview indicator */}
                    <div className="text-xs font-black text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded">
                      अंक: {Object.keys(userAnswers).filter(k => userAnswers[Number(k)] === quizQuestions[Number(k)].correctIndex).length} / {Object.keys(userAnswers).length}
                    </div>
                  </div>

                  {/* Question Progress Dots */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {quizQuestions.map((q, idx) => {
                      const isAnswered = userAnswers[idx] !== undefined;
                      const isCorrect = isAnswered && userAnswers[idx] === q.correctIndex;
                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                            idx === currentQuestionIndex
                              ? 'ring-2 ring-red-600 font-black scale-110'
                              : ''
                          } ${
                            isAnswered
                              ? isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-red-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Current Question Text */}
                  <div className="pt-2">
                    <h4 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
                      Q.{currentQuestionIndex + 1}. {activeQuestion.question}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                      {activeQuestion.questionEn}
                    </p>
                  </div>

                  {/* 4 Options */}
                  <div className="space-y-2.5 pt-2">
                    {activeQuestion.options.map((opt, optIdx) => {
                      const isSelected = userAnswers[currentQuestionIndex] === optIdx;
                      const hasAnswered = userAnswers[currentQuestionIndex] !== undefined;
                      const isCorrectOption = optIdx === activeQuestion.correctIndex;

                      let btnStyle = 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-blue-50';
                      if (hasAnswered) {
                        if (isCorrectOption) {
                          btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-100 border-red-500 text-red-950 font-bold';
                        } else {
                          btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={hasAnswered}
                          onClick={() => handleAnswerSelect(optIdx)}
                          className={`w-full p-3 rounded-lg border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                              isSelected || (hasAnswered && isCorrectOption)
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {hasAnswered && isCorrectOption && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {hasAnswered && isSelected && !isCorrectOption && (
                            <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Box (Visible once answered) */}
                  {userAnswers[currentQuestionIndex] !== undefined && (
                    <div className={`p-3.5 rounded-lg border text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200 ${
                      userAnswers[currentQuestionIndex] === activeQuestion.correctIndex
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-red-50 border-red-300 text-red-950'
                    }`}>
                      <div className="font-bold flex items-center gap-1 mb-1">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          {userAnswers[currentQuestionIndex] === activeQuestion.correctIndex
                            ? '✅ सही उत्तर!'
                            : '❌ गलत उत्तर! सही उत्तर: ' + activeQuestion.options[activeQuestion.correctIndex]}
                        </span>
                      </div>
                      <p>{activeQuestion.explanation}</p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="px-3 sm:px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-gray-800 text-xs sm:text-sm font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>पिछला</span>
                    </button>

                    <button
                      onClick={handleNextQuestion}
                      className="px-4 sm:px-6 py-2 rounded-lg bg-[#000066] hover:bg-blue-900 text-white text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <span>
                        {currentQuestionIndex === quizQuestions.length - 1
                          ? 'परिणाम देखें (View Score)'
                          : 'अगला प्रश्न'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* QUIZ SCORE RESULT CARD */
                <div className="bg-white rounded-xl border-2 border-amber-400 shadow-lg p-6 sm:p-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center font-black shadow-inner">
                    <Award className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                      डेली 10 का दम परिणाम
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                      आपका कुल स्कोर: <span className="text-[#000066]">{totalScore}</span> / 10
                    </h3>
                    <p className="text-sm font-bold text-gray-600 mt-1">
                      {totalScore >= 8 
                        ? '🔥 शानदार तैयारी! आप सरकारी परीक्षा में टॉप रैंक प्राप्त कर सकते हैं।' 
                        : totalScore >= 5 
                        ? '👍 अच्छा प्रयास! समसामयिकी के मुख्य बिंदुओं का पुनरावलोकन करें।' 
                        : '📚 नियमित रूप से डेली करंट अफेयर्स पढ़ें और पुनः अभ्यास करें।'}
                    </p>
                  </div>

                  {/* Stat Counters */}
                  <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                    <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-lg">
                      <span className="text-xs text-emerald-800 font-bold block">सही उत्तर</span>
                      <span className="text-xl font-black text-emerald-700">{totalScore}</span>
                    </div>
                    <div className="bg-red-50 border border-red-300 p-3 rounded-lg">
                      <span className="text-xs text-red-800 font-bold block">गलत उत्तर</span>
                      <span className="text-xl font-black text-red-700">{10 - totalScore}</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-300 p-3 rounded-lg">
                      <span className="text-xs text-blue-800 font-bold block">सटीकता</span>
                      <span className="text-xl font-black text-blue-800">{Math.round((totalScore / 10) * 100)}%</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                    <button
                      onClick={handleResetQuiz}
                      className="px-5 py-2.5 rounded-lg bg-[#000066] hover:bg-blue-900 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>दोबारा क्विज दें (Retake)</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('details')}
                      className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-gray-700" />
                      <span>टॉपिक पढ़ें (Review Topics)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-100 px-4 py-2.5 border-t border-gray-300 flex items-center justify-between text-xs text-gray-600">
          <span className="font-semibold">
            mysarkariresult.co.in • 100% निशुल्क परीक्षा तैयारी
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold cursor-pointer"
          >
            बंद करें (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
