import React, { useState } from 'react';
import { 
  Bell, 
  ShieldCheck, 
  Search, 
  Globe, 
  Zap, 
  Home, 
  FileText, 
  Award, 
  CheckCircle2, 
  DownloadCloud, 
  Bookmark,
  Share2,
  Lock,
  Flame,
  LogOut,
  Sparkles,
  Crop,
  Layers
} from 'lucide-react';
import { JobSectionType, JobCategory } from '../types';
import { CurrentAffairItem } from '../data/currentAffairsData';

interface HeaderProps {
  currentSection: JobSectionType | 'all';
  onSelectSection: (section: JobSectionType | 'all') => void;
  selectedCategory: JobCategory;
  onSelectCategory: (category: JobCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAdmin: () => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  adminUser?: string;
  onLogoutAdmin?: () => void;
  onOpenDeployGuide: () => void;
  onOpenNotifications: () => void;
  onSelectJobById: (id: string) => void;
  onOpenCurrentAffairs?: (affairId?: string, openQuiz?: boolean) => void;
  onOpenUsefulLinks?: () => void;
  onOpenSarkariTools?: (tab?: 'photo' | 'pdf') => void;
  currentAffairsList?: CurrentAffairItem[];
  customTickerItems?: Array<{ title: string; id: string }>;
  liveVisitors: number;
  totalVacanciesCount: number;
  unreadNotificationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onSelectSection,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenAdmin,
  onOpenAdminLogin,
  isAdminLoggedIn,
  adminUser = 'admin',
  onLogoutAdmin,
  onOpenDeployGuide,
  onOpenNotifications,
  onSelectJobById,
  onOpenCurrentAffairs,
  onOpenUsefulLinks,
  onOpenSarkariTools,
  currentAffairsList,
  customTickerItems,
  liveVisitors,
  totalVacanciesCount,
  unreadNotificationsCount,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  // Latest updates ticker items
  const tickerItems = customTickerItems && customTickerItems.length > 0 ? customTickerItems : [
    { title: 'SSC GD Constable 2026 Apply Online 39,481 Posts', id: 'ssc-gd-2025' },
    { title: 'Railway RRB NTPC Graduate / UG 2026 Apply Online 11,558 Posts', id: 'rrb-ntpc-2025' },
    { title: 'UP Police SI 2026 Online Form 4,242 Posts Active Now', id: 'up-police-si-2025' },
    { title: 'Bihar BPSC School Teacher TRE 4.0 Online Form 87,000+ Posts', id: 'bpsc-tre-4' },
    { title: 'UPSC IAS / IFS Pre 2026 Online Form 1,056 Posts', id: 'upsc-ias-pre-2025' },
    { title: 'SSC CGL Tier-1 Admit Card & City Intimation All Regions Out', id: 'ssc-cgl-admit-card-2025' },
    { title: 'IBPS PO / Clerk 2026 Mains Score Card & Cutoff Marks Released', id: 'ibps-po-2025' },
    { title: 'Navy SSR / MR Agniveer 01/2026 Batch Online Application Started', id: 'navy-agniveer-2025' },
  ];

  // 10 Top Current Affairs 2026 for Competitive Exams (समसामयिकी)
  const top10CurrentAffairs = (currentAffairsList && currentAffairsList.length > 0)
    ? currentAffairsList.map(ca => ({ id: ca.id, text: ca.title }))
    : [
      { id: 'ca-1', text: '1. भारत ने नौसेना सुरक्षा हेतु उन्नत संचार उपग्रह GSAT-7B सफलतापूर्वक लॉन्च किया' },
      { id: 'ca-2', text: '2. 98वें अकादमी (ऑस्कर) पुरस्कार: भारत की आधिकारिक प्रविष्टि का एलान' },
      { id: 'ca-3', text: '3. भारतीय रिजर्व बैंक (RBI) ने रेपो रेट 6.50% पर स्थिर रखने की घोषणा की' },
      { id: 'ca-4', text: '4. खेलो इंडिया यूथ गेम्स 2026: पदक तालिका में शीर्ष राज्य की नई सूची जारी' },
      { id: 'ca-5', text: '5. चंद्रयान-4 और गगनयान मिशन 2026: ISRO ने परीक्षण के अगले चरण को दी मंजूरी' },
      { id: 'ca-6', text: '6. नीति आयोग ने जारी किया सतत विकास लक्ष्य (SDG India Index 2026)' },
      { id: 'ca-7', text: '7. पीएम सूर्य घर मुफ्त बिजली योजना: 1 करोड़ से अधिक पंजीकरण का नया रिकॉर्ड' },
      { id: 'ca-8', text: '8. भारतीय वायुसेना में शामिल हुआ पहला स्वदेशी लड़ाकू विमान तेजस मार्क-1A' },
      { id: 'ca-9', text: '9. विश्व आर्थिक मंच (WEF): भारत दुनिया की सबसे तेज बढ़ती प्रमुख अर्थव्यवस्था' },
      { id: 'ca-10', text: '10. भारत-मध्य पूर्व-यूरोप आर्थिक गलियारा (IMEC): बुनियादी ढांचे का विस्तार' },
    ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://mysarkariresult.co.in');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const navLinks: Array<{ label: string; section: JobSectionType | 'all'; icon: any }> = [
    { label: 'Home', section: 'all', icon: Home },
    { label: 'Latest Jobs', section: 'latest-jobs', icon: Zap },
    { label: 'Results', section: 'result', icon: Award },
    { label: 'Admit Card', section: 'admit-card', icon: DownloadCloud },
    { label: 'Answer Key', section: 'answer-key', icon: CheckCircle2 },
    { label: 'Syllabus', section: 'syllabus', icon: FileText },
    { label: 'Admission', section: 'admission', icon: Bookmark },
  ];

  const categories: JobCategory[] = [
    'All',
    'SSC',
    'Railway',
    'UPSC',
    'Banking',
    'Defence',
    'Police',
    'Teaching',
    'State PSC',
    'Engineering',
    'Medical',
    'Others'
  ];

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-300">
      {/* Top Status & Fast Utility Bar in High Density Deep Blue */}
      <div className="bg-[#000066] text-white px-3 sm:px-6 py-1.5 text-xs font-sans">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Left: Portal Identity & Live Visitors */}
          <div className="flex items-center space-x-3">
            <span className="font-black tracking-tight text-white flex items-center gap-1">
              <span className="text-yellow-300">MySarkariResult.co.in</span>
              <span className="text-blue-300 text-[11px] hidden sm:inline">- No. 1 Job Portal in India</span>
            </span>
            <span className="hidden sm:inline text-blue-400">|</span>
            <span className="flex items-center text-green-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping mr-1.5 inline-block"></span>
              Live: {liveVisitors.toLocaleString('en-IN')} Viewers
            </span>
          </div>

          {/* Right Corner: Quick Action Buttons + ADMIN LOGIN CORNER PANEL */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Useful Links Infographics Button (वर्षा इफेक्ट) */}
            {onOpenUsefulLinks && (
              <button
                id="header-useful-links-button"
                onClick={onOpenUsefulLinks}
                className="px-2 py-1 rounded bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-yellow-300 font-bold flex items-center gap-1 transition-all text-xs border border-blue-500 cursor-pointer shadow-sm hover:scale-105"
                title="महत्वपूर्ण सरकारी वेबसाइट लिंक (वर्षा व इन्फोग्राफिक इफेक्ट)"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                <span className="hidden sm:inline">उपयोगी लिंक (वर्षा)</span>
                <span className="sm:hidden">लिंक्स</span>
              </button>
            )}

            {/* Sarkari Tools (Photo KB + PDF) Button */}
            {onOpenSarkariTools && (
              <button
                id="header-sarkari-tools-button"
                onClick={() => onOpenSarkariTools()}
                className="px-2 py-1 rounded bg-teal-800 hover:bg-teal-700 text-white font-bold flex items-center gap-1 transition-all text-xs border border-teal-500 cursor-pointer shadow-sm hover:scale-105"
                title="सरकारी टूल्स: फोटो/हस्ताक्षर KB रिसाइज़र व iLovePDF टूल्स"
              >
                <Crop className="w-3.5 h-3.5 text-teal-300" />
                <span className="hidden sm:inline">सरकारी टूल्स (KB/PDF)</span>
                <span className="sm:hidden">टूल्स</span>
              </button>
            )}

            {/* Daily 10 Ka Dum Quiz Button */}
            {onOpenCurrentAffairs && (
              <button
                id="header-daily-quiz-button"
                onClick={() => onOpenCurrentAffairs(undefined, true)}
                className="px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-gray-950 font-black flex items-center gap-1 transition-all text-xs border border-yellow-300 cursor-pointer shadow-sm hover:scale-105"
                title="डेली 10 का दम: 10 दैनिक समसामयिकी क्विज (MCQ)"
              >
                <Flame className="w-3.5 h-3.5 text-red-700" />
                <span>10 का दम</span>
              </button>
            )}

            {/* Share Link Button */}
            <button
              id="header-share-button"
              onClick={handleShare}
              className="px-2.5 py-1 rounded bg-blue-900 hover:bg-blue-800 text-blue-100 font-semibold flex items-center gap-1 transition-colors text-xs border border-blue-700 cursor-pointer"
              title="Copy Website Link"
            >
              <Share2 className="w-3 h-3" />
              <span className="hidden md:inline">{copySuccess ? 'Copied!' : 'Share'}</span>
            </button>

            {/* Notification Bell */}
            <button
              id="header-notifications-button"
              onClick={onOpenNotifications}
              className="relative px-2.5 py-1 rounded bg-blue-900 hover:bg-blue-800 text-yellow-300 font-semibold flex items-center gap-1 transition-colors text-xs border border-blue-700 cursor-pointer"
              title="Job Notifications"
            >
              <Bell className="w-3 h-3 text-yellow-300" />
              <span className="hidden md:inline">Alerts</span>
              {unreadNotificationsCount > 0 && (
                <span className="ml-1 bg-[#cc0000] text-white font-bold rounded-full px-1.5 py-0.1 text-[10px]">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Deployment Guide Button */}
            <button
              id="header-deploy-guide-button"
              onClick={onOpenDeployGuide}
              className="px-2.5 py-1 rounded bg-green-700 hover:bg-green-600 text-white font-bold hidden lg:flex items-center gap-1 transition-all text-xs border border-green-500 shadow-sm cursor-pointer"
              title="How to make this public & earn"
            >
              <Globe className="w-3 h-3" />
              <span>Public Kaise Kare?</span>
            </button>

            {/* ADMIN CORNER LOGIN & MANAGEMENT BUTTON */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-1">
                <button
                  id="header-admin-panel-button"
                  onClick={onOpenAdmin}
                  className="px-2.5 py-1 rounded bg-[#cc0000] hover:bg-red-700 text-white font-bold flex items-center gap-1 transition-all text-xs border border-red-500 shadow-sm cursor-pointer"
                  title="Open Admin Control Panel"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Admin Panel ({adminUser})</span>
                </button>
                {onLogoutAdmin && (
                  <button
                    onClick={onLogoutAdmin}
                    className="p-1 rounded bg-blue-950 hover:bg-red-900 text-blue-200 hover:text-white border border-blue-800 transition-colors cursor-pointer"
                    title="Admin Logout"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                )}
              </div>
            ) : (
              <button
                id="header-admin-login-button"
                onClick={onOpenAdminLogin}
                className="px-3 py-1 rounded bg-[#cc0000] hover:bg-red-700 text-white font-black flex items-center gap-1.5 transition-all text-xs border border-red-400 shadow-md cursor-pointer"
                title="Admin Corner Login (User ID & Password)"
              >
                <Lock className="w-3.5 h-3.5 text-yellow-300" />
                <span>Admin Login</span>
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Main High Density Header Branding Banner */}
      <div className="bg-white border-b-4 border-[#cc0000] py-3 sm:py-4 px-3 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo & Name */}
          <div 
            onClick={() => { onSelectSection('all'); onSelectCategory('All'); onSearchChange(''); }}
            className="cursor-pointer text-center md:text-left select-none group"
          >
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#cc0000] tracking-tighter font-sans">
                MY SARKARI RESULT
              </h1>
              <span className="bg-[#000066] text-white text-xs sm:text-sm font-black px-2 py-0.5 rounded">
                .CO.IN
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-0.5">
              <span className="text-blue-900 font-bold text-xs sm:text-sm tracking-wide uppercase">
                WWW.MYSARKARIRESULT.CO.IN
              </span>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="text-xs text-gray-600 font-medium italic">
                रोजगार और सरकारी रिजल्ट की No. 1 भरोसेमंद वेबसाइट
              </span>
            </div>
          </div>

          {/* Quick Search & Total Count Box */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full sm:w-80">
              <input
                id="header-search-input"
                type="text"
                placeholder="Search 1,000+ Vacancy, Result, Admit Card..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 text-gray-900 placeholder-gray-500 rounded text-xs sm:text-sm border-2 border-gray-300 focus:outline-none focus:border-[#000066] focus:bg-white"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2 text-xs bg-gray-200 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center bg-gray-100 border border-gray-300 rounded px-3 py-1 text-center">
              <span className="text-[10px] text-gray-600 uppercase font-bold">Total Database</span>
              <span className="text-base font-black text-[#000066] leading-tight">
                {totalVacanciesCount.toLocaleString('en-IN')}+
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 1. CONTINUOUS MOVING FLASH NEWS / LATEST UPDATES TICKER (चलती हुई लेटेस्ट अपडेट्स - कर्सर ले जाने पर रुक जाएगी) */}
      <div 
        className="ticker-container bg-yellow-100 border-b border-yellow-300 py-1.5 px-3 sm:px-6 overflow-hidden flex items-center group cursor-pointer"
        title="कर्सर ले जाने पर टिकर रुक जाएगा | क्लिक करके वैकेंसी का पूरा विवरण देखें"
      >
        <div className="flex items-center shrink-0 mr-2 z-10 bg-yellow-100 pr-2">
          <span className="bg-[#cc0000] text-white font-black text-[11px] px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
            <Zap className="w-3 h-3 text-yellow-300" />
            <span>LATEST UPDATES</span>
          </span>
        </div>
        
        {/* Moving Marquee Container with pause-on-hover */}
        <div className="overflow-hidden w-full whitespace-nowrap">
          <div className="animate-marquee flex items-center space-x-8 text-xs sm:text-sm font-bold text-red-700">
            {/* Repeated twice to create infinite uninterrupted loop */}
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                onClick={() => onSelectJobById(item.id)}
                className="hover:underline flex items-center space-x-1.5 shrink-0 text-left cursor-pointer transition-transform hover:scale-105"
                title={`क्लिक करें: ${item.title}`}
              >
                <span className="animate-blink bg-[#cc0000] text-white not-italic px-1.5 py-0.2 rounded font-black text-[10px] shadow-sm">
                  NEW
                </span>
                <span className="hover:text-[#000066]">{item.title}</span>
                <span className="text-yellow-600 font-bold ml-1">★</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. CONTINUOUS MOVING 10 TOP CURRENT AFFAIRS TICKER (चलती हुई टॉप 10 समसामयिकी - कर्सर ले जाने पर रुक जाएगी) */}
      <div 
        className="ticker-container bg-[#000066] text-white py-1.5 px-3 sm:px-6 overflow-hidden flex items-center border-b-2 border-amber-400 group cursor-pointer"
        title="कर्सर ले जाने पर समसामयिकी रुक जाएगी | क्लिक करके विस्तृत विवरण व '10 का दम' क्विज खोलें"
      >
        <div className="flex items-center shrink-0 mr-2 z-10 bg-[#000066] pr-2">
          <button 
            onClick={() => onOpenCurrentAffairs?.()}
            className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-[11px] px-2 py-0.5 rounded flex items-center gap-1 shadow-sm cursor-pointer"
            title="दैनिक समसामयिकी और '10 का दम' क्विज खोलें"
          >
            <Flame className="w-3 h-3 text-red-700" />
            <span>TOP 10 CURRENT AFFAIRS</span>
          </button>
        </div>
        
        {/* Moving Marquee for Top 10 Current Affairs with pause-on-hover */}
        <div className="overflow-hidden w-full whitespace-nowrap">
          <div className="animate-marquee-affairs flex items-center space-x-8 text-xs sm:text-sm font-semibold text-yellow-200">
            {[...top10CurrentAffairs, ...top10CurrentAffairs].map((ca, idx) => (
              <button
                key={`${ca.id}-${idx}`}
                onClick={() => onOpenCurrentAffairs?.(ca.id)}
                className="flex items-center space-x-1.5 shrink-0 cursor-pointer text-left hover:text-white transition-transform hover:scale-105 focus:outline-none"
                title="क्लिक करें: पूरा विवरण और '10 का दम' MCQ क्विज देखें"
              >
                <span className="animate-blink bg-amber-400 text-black px-1.5 py-0.2 rounded font-black text-[10px]">
                  TODAY
                </span>
                <span className="hover:underline">{ca.text}</span>
                <span className="text-amber-400 text-[10px] font-bold bg-blue-900 px-1 py-0.2 rounded">
                  [क्विज]
                </span>
                <span className="text-blue-300 mx-2 font-mono">|</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar with High Density Theme Buttons */}
      <nav className="bg-[#f1f2f6] px-3 sm:px-6 py-1.5 border-b border-gray-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none gap-2">
          <div className="flex space-x-1.5 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentSection === link.section;
              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.section}`}
                  onClick={() => onSelectSection(link.section)}
                  className={`px-3 py-1.5 rounded text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-[#000066] text-white shadow-sm' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-2 text-xs font-bold text-blue-900 pr-2 shrink-0">
            {onOpenUsefulLinks && (
              <button
                onClick={onOpenUsefulLinks}
                className="px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold flex items-center gap-1 border border-blue-300 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                <span>सरकारी पोर्टल लिंक (वर्षा इफेक्ट)</span>
              </button>
            )}
            {onOpenSarkariTools && (
              <button
                onClick={() => onOpenSarkariTools('photo')}
                className="px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold flex items-center gap-1 border border-emerald-300 cursor-pointer"
              >
                <Crop className="w-3.5 h-3.5 text-emerald-700" />
                <span>फोटो/साइन KB रिसाइज़र</span>
              </button>
            )}
            <span>⚡ mysarkariresult.co.in</span>
          </div>
        </div>
      </nav>

      {/* Category Filter Bar */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
          <span className="font-bold text-gray-700 shrink-0 mr-1 flex items-center">
            Dept Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat}`}
              onClick={() => onSelectCategory(cat)}
              className={`px-2.5 py-1 rounded font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#000066] text-white font-bold shadow-sm'
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

    </header>
  );
};
