import React, { useState } from 'react';
import { Shield, BookOpen, Award, CheckCircle2, AlertCircle, RotateCcw, BarChart3, Heart, Lock } from 'lucide-react';
import { UserProgress, QuizAttempt } from '../types';
import { getQuizAttempts, resetAllProgress, saveProgress } from '../utils/storage';
import { playSound } from '../utils/sound';
import { TRANSLATIONS } from '../utils/translations';

interface ParentDashboardProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const lang = progress.language || 'en';
  const t = TRANSLATIONS[lang];

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const attempts = getQuizAttempts();

  const totalAnswered = progress.totalQuestionsAnswered || 0;
  const totalCorrect = progress.totalCorrectAnswers || 0;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Breakdown by categories for "Areas of Improvement"
  const catEntries = Object.entries(progress.categoryStats || {});

  // Identify strength vs areas needing practice
  const areasNeedingPractice = catEntries.filter(
    ([_, stat]) => stat.attempted >= 3 && Math.round((stat.correct / stat.attempted) * 100) < 65
  );

  const handleResetData = () => {
    resetAllProgress();
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl">
              👨‍👩‍👧
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                {lang === 'hi' ? 'अभिभावक एवं शिक्षक पोर्टल' : 'Parent & Educator Portal'}
              </div>
              <h1 className="font-['Fredoka','Mukta',sans-serif] text-2xl sm:text-3xl font-black">
                {lang === 'hi' ? 'अधिगम प्रगति एवं बाल सुरक्षा' : 'Learning Insights & Child Safety'}
              </h1>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">
            <Shield size={14} />
            <span>{lang === 'hi' ? '100% बाल सुरक्षित • शून्य व्यक्तिगत डेटा' : '100% Kid Safe • Zero Data Collected'}</span>
          </div>
        </div>

        <p className="text-slate-300 text-sm font-medium max-w-2xl">
          {lang === 'hi'
            ? 'जीके किड्स वर्ल्ड पूरी तरह से निःशुल्क, विज्ञापन-मुक्त और सुरक्षित है। यहाँ कोई भी ईमेल, फोन नंबर या व्यक्तिगत जानकारी एकत्र नहीं की जाती। सभी प्रगति आपके परिवार के इसी डिवाइस पर सुरक्षित रूप से सहेजी जाती है।'
            : 'GK Kids World is completely free, non-commercial, and does not require or store any email, phone number, or real identity. All progress remains safely saved right here on your family’s device.'}
        </p>
      </div>

      {/* Learning Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">
            {lang === 'hi' ? 'पूर्ण किए गए क्विज़' : 'Quizzes Completed'}
          </div>
          <div className="font-['Fredoka',sans-serif] text-3xl font-black text-slate-800 mt-1">
            {progress.quizzesCompleted}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">
            {lang === 'hi' ? 'सक्रिय बाल जिज्ञासु' : 'Active learner'}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">
            {lang === 'hi' ? 'प्रयास किए गए प्रश्न' : 'Questions Attempted'}
          </div>
          <div className="font-['Fredoka',sans-serif] text-3xl font-black text-slate-800 mt-1">
            {totalAnswered}
          </div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">
            {totalCorrect} {lang === 'hi' ? 'सही उत्तर' : 'correct answers'}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">
            {lang === 'hi' ? 'कुल सटीकता' : 'Overall Accuracy'}
          </div>
          <div className="font-['Fredoka',sans-serif] text-3xl font-black text-sky-600 mt-1">
            {accuracy}%
          </div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">
            {lang === 'hi' ? 'सभी विषयों में' : 'Across all topics'}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">
            {lang === 'hi' ? 'कुल अर्जित सितारे' : 'Stars Earned'}
          </div>
          <div className="font-['Fredoka',sans-serif] text-3xl font-black text-amber-600 mt-1">
            {progress.stars} ⭐
          </div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">
            {progress.points} {lang === 'hi' ? 'कुल अंक' : 'total points'}
          </div>
        </div>
      </div>

      {/* Learning Mastery Breakdown & Areas for Growth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strong topics */}
        <div className="bg-white rounded-3xl p-5 border-3 border-emerald-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-emerald-600" />
            <h3 className="font-['Fredoka','Mukta',sans-serif] text-lg font-bold text-slate-800">
              {lang === 'hi' ? 'मजबूत विषय' : 'Top Strengths'}
            </h3>
          </div>

          {catEntries.length === 0 ? (
            <p className="text-xs text-slate-500">
              {lang === 'hi' ? 'विषयवार प्रगति देखने के लिए कुछ और क्विज़ खेलें!' : 'Play a few more quizzes to see topic strengths!'}
            </p>
          ) : (
            <div className="space-y-2">
              {catEntries.map(([cat, stat]) => {
                const percent = Math.round((stat.correct / stat.attempted) * 100);
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>{cat}</span>
                      <span>{stat.correct}/{stat.attempted} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          percent >= 70 ? 'bg-emerald-500' : percent >= 50 ? 'bg-amber-500' : 'bg-rose-400'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Areas of Improvement */}
        <div className="bg-white rounded-3xl p-5 border-3 border-amber-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={20} className="text-amber-600" />
            <h3 className="font-['Fredoka','Mukta',sans-serif] text-lg font-bold text-slate-800">
              {lang === 'hi' ? 'सुधार के संभावित क्षेत्र' : 'Areas of Improvement'}
            </h3>
          </div>

          {areasNeedingPractice.length === 0 ? (
            <div className="bg-emerald-50 text-emerald-900 rounded-2xl p-4 text-xs font-semibold leading-relaxed">
              {lang === 'hi'
                ? '🎉 बहुत बढ़िया! बच्चा सभी हल किए गए विषयों में लगातार अच्छा प्रदर्शन कर रहा है। उसे नए स्तर और नए विषय आज़माने के लिए प्रेरित करें।'
                : '🎉 Great job! The child is performing consistently across attempted categories. Encourage them to try new classes or subject categories from the Home screen.'}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-slate-600 font-medium">
                {lang === 'hi'
                  ? 'बच्चा इन विषयों में पुनः अभ्यास करके और बेहतर कर सकता है:'
                  : 'The learner might benefit from repeating quizzes in these topics:'}
              </p>
              {areasNeedingPractice.map(([cat, stat]) => (
                <div
                  key={cat}
                  className="flex items-center justify-between p-2.5 bg-amber-50 rounded-xl text-xs font-bold text-amber-900 border border-amber-200"
                >
                  <span>{cat}</span>
                  <span>{stat.correct}/{stat.attempted} {lang === 'hi' ? 'सही उत्तर' : 'answered correctly'}</span>
                </div>
              ))}
            </div>
          )}

          <div className="bg-sky-50 rounded-2xl p-3 border border-sky-100 text-xs text-sky-900 font-medium">
            💡 <strong>{lang === 'hi' ? 'शिक्षक सुझाव:' : 'Teacher Tip:'}</strong>{' '}
            {lang === 'hi'
              ? 'एलकेजी और यूकेजी के बच्चों को "🔊 पढ़कर सुनाओ" बटन का उपयोग करने के लिए प्रोत्साहित करें जिससे उनकी सुनने और समझने की क्षमता बढ़ेगी।'
              : 'Encourage your child to use the "🔊 Read to Me" feature in LKG and UKG to build confidence in listening and vocabulary comprehension.'}
          </div>
        </div>
      </div>

      {/* Quiz Settings & Question Randomization Controller */}
      <div className="bg-white rounded-3xl p-6 border-3 border-amber-200 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-amber-100 pb-4">
          <div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              {lang === 'hi' ? 'क्विज़ प्रणाली कॉन्फ़िगरेशन' : 'Quiz System Settings'}
            </div>
            <h2 className="font-['Fredoka','Mukta',sans-serif] text-xl sm:text-2xl font-black text-slate-800">
              ⚙️ {lang === 'hi' ? 'प्रश्नों की संख्या और दोहराव नियंत्रण' : 'Questions per Quiz & Anti-Repeat Engine'}
            </h2>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold px-3 py-1.5 rounded-full">
            <span>🎲 Fisher-Yates Shuffle Active</span>
          </div>
        </div>

        {/* Setting: Number of questions per quiz */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            {lang === 'hi' ? 'प्रति क्विज़ सत्र प्रश्नों की संख्या चुनें:' : 'Select Questions per Quiz Session:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[5, 8, 10, 15].map((cnt) => {
              const isSelected = (progress.questionsPerQuiz || 10) === cnt;
              return (
                <button
                  key={cnt}
                  onClick={() => {
                    playSound('click', progress.soundEnabled);
                    const updated = { ...progress, questionsPerQuiz: cnt };
                    saveProgress(updated);
                    onUpdateProgress(updated);
                  }}
                  className={`py-3 px-4 rounded-2xl font-['Fredoka',sans-serif] font-black text-base border-2 transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-md scale-[1.02]'
                      : 'bg-amber-50/50 border-amber-200 text-slate-700 hover:bg-amber-100'
                  }`}
                >
                  {cnt} {lang === 'hi' ? 'प्रश्न' : 'Questions'}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {lang === 'hi'
              ? 'प्रत्येक क्विज़ में पूरे 588 प्रश्नों के बैंक में से इतने प्रश्नों का यादृच्छिक चयन (Fisher-Yates) बिना दोहराव के किया जाएगा।'
              : 'Each quiz session randomly picks this many unique questions from our 588-question bank without repeats.'}
          </p>
        </div>

        {/* Question History Status & Cycle Reset */}
        <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <span>🔄</span> {lang === 'hi' ? 'प्रश्न दोहराव रोकथाम स्थिति:' : 'Question Anti-Repeat Status:'}
            </div>
            <div className="text-xs text-slate-600 font-medium">
              {lang === 'hi'
                ? `हाल ही में हल किए गए प्रश्न: ${progress.recentlyShownQuestionIds?.length || 0} / 588 प्रश्न। जब पूरा बैंक हल हो जाता है तो यह चक्र स्वतः नया आरंभ होता है।`
                : `Questions encountered in active cycle: ${progress.recentlyShownQuestionIds?.length || 0} / 588 questions. Cycles reset automatically when all questions are explored.`}
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click', progress.soundEnabled);
              const updated = { ...progress, recentlyShownQuestionIds: [] };
              saveProgress(updated);
              onUpdateProgress(updated);
            }}
            className="shrink-0 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-transform active:scale-95"
            title="Start a fresh cycle of questions"
          >
            🔄 {lang === 'hi' ? 'चक्र अभी रीसेट करें' : 'Reset Question Cycle'}
          </button>
        </div>
      </div>

      {/* Safety & Reset Zone */}
      <div className="bg-slate-50 rounded-3xl p-5 border-2 border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-bold text-slate-800 text-sm">
            {lang === 'hi' ? 'अभ्यास डेटा रीसेट करें' : 'Reset Practice Data'}
          </div>
          <div className="text-xs text-slate-500">
            {lang === 'hi'
              ? 'किसी नए छात्र या भाई-बहन को नए सिरे से शुरुआत कराने के लिए सभी सितारे और इतिहास साफ़ करें।'
              : 'Clear all stars, badges, and local quiz history to let a new student or sibling start fresh.'}
          </div>
        </div>

        {showResetConfirm ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowResetConfirm(false)}
              className="text-xs font-bold text-slate-500 px-3 py-1.5"
            >
              {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              onClick={handleResetData}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm"
            >
              {lang === 'hi' ? 'हाँ, सब कुछ रीसेट करें' : 'Yes, Reset Everything'}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 font-bold text-xs px-3.5 py-2 rounded-xl transition-all"
          >
            <RotateCcw size={14} />
            <span>{lang === 'hi' ? 'शिक्षार्थी डेटा रीसेट करें' : 'Reset Learner Data'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
