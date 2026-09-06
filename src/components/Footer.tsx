import React from 'react';
import { ShieldCheck, Heart, Send, Globe, Users, ExternalLink } from 'lucide-react';
import { JobSectionType } from '../types';

interface FooterProps {
  onSelectSection: (section: JobSectionType | 'all') => void;
  onOpenDeployGuide: () => void;
  totalPageViews: number;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSection,
  onOpenDeployGuide,
  totalPageViews,
}) => {
  return (
    <footer className="w-full bg-[#000066] text-white pt-6 pb-6 border-t-4 border-[#cc0000] mt-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 space-y-6">
        
        {/* Top Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 text-xs">
          
          {/* Col 1: About Portal */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-white tracking-tight">
                MY SARKARI RESULT
              </span>
              <span className="bg-[#cc0000] text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                .CO.IN
              </span>
            </div>
            <p className="text-blue-200 text-xs leading-relaxed">
              mysarkariresult.co.in - India's Trusted Government Jobs, Vacancies, Admit Cards, and Results Portal. Providing fast, authentic, and verified direct links for all central and state examinations.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenDeployGuide}
                className="px-3 py-1 rounded bg-green-700 hover:bg-green-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-green-500 shadow-sm"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>How to Make this Website Public?</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h3 className="font-bold text-white uppercase tracking-wider text-xs border-b border-blue-800 pb-1">
              Quick Navigation
            </h3>
            <ul className="space-y-1 text-xs text-blue-200">
              <li>
                <button onClick={() => onSelectSection('latest-jobs')} className="hover:text-white transition-colors">
                  › Latest Jobs (नवीनतम नौकरियां)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('result')} className="hover:text-white transition-colors">
                  › Results (परीक्षा परिणाम)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('admit-card')} className="hover:text-white transition-colors">
                  › Admit Card (प्रवेश पत्र)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('answer-key')} className="hover:text-white transition-colors">
                  › Answer Key (उत्तर कुंजी)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('syllabus')} className="hover:text-white transition-colors">
                  › Exam Syllabus & Pattern
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('admission')} className="hover:text-white transition-colors">
                  › College & University Admission
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Boards */}
          <div className="space-y-2">
            <h3 className="font-bold text-white uppercase tracking-wider text-xs border-b border-blue-800 pb-1">
              Top Boards & Commissions
            </h3>
            <ul className="space-y-1 text-xs text-blue-200">
              <li>
                <a href="https://ssc.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  › SSC (Staff Selection Commission) <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://upsc.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  › UPSC Civil Services <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://indianrailways.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  › Railway Recruitment Boards (RRB) <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://ibps.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  › IBPS Banking Exams <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://uppbpb.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  › UP Police Recruitment <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Stats */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-white uppercase tracking-wider text-xs border-b border-blue-800 pb-1">
              Connect & Daily Alerts
            </h3>
            <p className="text-xs text-blue-200">
              Join over 2.5 Million job aspirants on Telegram and WhatsApp for fastest instant exam notifications.
            </p>
            
            <div className="flex flex-col gap-1.5">
              <a
                href="https://t.me/sarkariresult"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 bg-sky-600 hover:bg-sky-500 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Join Official Telegram</span>
              </a>

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Join WhatsApp Group</span>
              </a>
            </div>

            {/* Total Hits Counter */}
            <div className="mt-2 p-1.5 bg-blue-950/80 border border-blue-800 rounded text-center">
              <div className="text-[10px] text-blue-300 uppercase font-bold tracking-wider">
                Total Portal Impressions
              </div>
              <div className="text-base font-black text-white font-mono tracking-widest">
                {totalPageViews.toLocaleString('en-IN')}+
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="bg-blue-950/60 p-2.5 rounded border border-blue-900 text-[11px] text-blue-200 text-center leading-relaxed">
          <p className="font-bold text-white mb-0.5">
            Disclaimer / अस्वीकरण:
          </p>
          <p className="text-[10px] sm:text-[11px] opacity-90">
            The Examination Results / Marks / Information published in this website is only for the immediate information to the examinees and does not constitute to be a legal document. While all efforts have been made to make the information available on this website as authentic as possible. Please cross check with official department websites.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-2 border-t border-blue-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300 gap-1.5">
          <p>
            © 2025 mysarkariresult.co.in. All Rights Reserved.
          </p>
          <p>
            mysarkariresult.co.in ⚡ 1000+ Vacancy Database • Fast Loading
          </p>
        </div>

      </div>
    </footer>
  );
};
