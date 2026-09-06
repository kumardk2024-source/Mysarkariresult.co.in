import React, { useState, useEffect, useMemo } from 'react';
import { 
  getStoredVacancies, 
  saveVacanciesToStorage,
  syncAllVacanciesToCurrentYear
} from './data/mockVacancies';
import { 
  getAnalytics, 
  trackPageView, 
  saveAnalytics 
} from './utils/analytics';
import { 
  VacancyItem, 
  JobCategory, 
  JobSectionType, 
  SiteAnalytics 
} from './types';
import { Header } from './components/Header';
import { TopBadges } from './components/TopBadges';
import { VacancyDetail } from './components/VacancyDetail';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { NotificationModal } from './components/NotificationModal';
import { CurrentAffairsModal } from './components/CurrentAffairsModal';
import { UsefulLinksModal } from './components/UsefulLinksModal';
import { SarkariToolsModal } from './components/SarkariToolsModal';
import { 
  CurrentAffairItem,
  getStoredCurrentAffairs,
  saveStoredCurrentAffairs,
  syncCurrentAffairsDatesToToday
} from './data/currentAffairsData';
import { Footer } from './components/Footer';
import { 
  Award, 
  DownloadCloud, 
  Zap, 
  CheckCircle2, 
  FileText, 
  Bookmark, 
  ChevronRight, 
  Calendar, 
  Search, 
  Filter, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

export default function App() {
  // Vacancies state
  const [vacancies, setVacancies] = useState<VacancyItem[]>(() => getStoredVacancies());
  
  // Analytics state
  const [analytics, setAnalytics] = useState<SiteAnalytics>(() => getAnalytics());

  // Navigation & Filtering state
  const [currentSection, setCurrentSection] = useState<JobSectionType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected Job for Detail View
  const [selectedJob, setSelectedJob] = useState<VacancyItem | null>(null);

  // Modals & Admin Authentication
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('mysarkariresult_admin_session');
  });
  const [adminUser, setAdminUser] = useState<string>(() => {
    const session = localStorage.getItem('mysarkariresult_admin_session');
    if (session) {
      try {
        return JSON.parse(session).userId || 'admin';
      } catch {
        return 'admin';
      }
    }
    return 'admin';
  });
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [editingJobInitial, setEditingJobInitial] = useState<VacancyItem | null>(null);

  // New Features Modals State
  const [isCurrentAffairsOpen, setIsCurrentAffairsOpen] = useState<boolean>(false);
  const [currentAffairsInitialCaId, setCurrentAffairsInitialCaId] = useState<string | undefined>(undefined);
  const [currentAffairsStartWithQuiz, setCurrentAffairsStartWithQuiz] = useState<boolean>(false);

  const [isUsefulLinksOpen, setIsUsefulLinksOpen] = useState<boolean>(false);

  const [isSarkariToolsOpen, setIsSarkariToolsOpen] = useState<boolean>(false);
  const [sarkariToolsInitialTab, setSarkariToolsInitialTab] = useState<'photo' | 'pdf'>('photo');

  // Daily Current Affairs state (Persisted in LocalStorage)
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffairItem[]>(() => getStoredCurrentAffairs());

  const handleUpdateCurrentAffairs = (items: CurrentAffairItem[]) => {
    setCurrentAffairs(items);
    saveStoredCurrentAffairs(items);
  };

  const handleAddCurrentAffair = (item: CurrentAffairItem) => {
    const updated = [item, ...currentAffairs];
    setCurrentAffairs(updated);
    saveStoredCurrentAffairs(updated);
  };

  const handleDeleteCurrentAffair = (id: string) => {
    const updated = currentAffairs.filter(c => c.id !== id);
    setCurrentAffairs(updated);
    saveStoredCurrentAffairs(updated);
  };

  // 1-Click Auto Date Synchronization to current year (2026/today)
  const handleSyncAllDatesToCurrentYear = () => {
    const updatedVacancies = syncAllVacanciesToCurrentYear(vacancies);
    setVacancies(updatedVacancies);
    saveVacanciesToStorage(updatedVacancies);

    const updatedCa = syncCurrentAffairsDatesToToday(currentAffairs);
    setCurrentAffairs(updatedCa);
    saveStoredCurrentAffairs(updatedCa);
  };

  const handleOpenCurrentAffairs = (caId?: string, openQuiz?: boolean) => {
    setCurrentAffairsInitialCaId(caId);
    setCurrentAffairsStartWithQuiz(!!openQuiz);
    setIsCurrentAffairsOpen(true);
  };

  const handleOpenUsefulLinks = () => {
    setIsUsefulLinksOpen(true);
  };

  const handleOpenSarkariTools = (tab: 'photo' | 'pdf' = 'photo') => {
    setSarkariToolsInitialTab(tab);
    setIsSarkariToolsOpen(true);
  };

  const handleOpenAdminClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = (userId: string) => {
    setIsAdminLoggedIn(true);
    setAdminUser(userId);
    setIsAdminOpen(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('mysarkariresult_admin_session');
    setIsAdminLoggedIn(false);
    setIsAdminOpen(false);
  };

  // Pagination for search / filter views
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 25;

  // Track initial page view & set up simulated visitor interval
  useEffect(() => {
    trackPageView('Home Page');
    setAnalytics(getAnalytics());

    const interval = setInterval(() => {
      setAnalytics(getAnalytics());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Sync vacancies state to storage when updated
  const handleAddVacancy = (newJob: VacancyItem) => {
    const updated = [newJob, ...vacancies];
    setVacancies(updated);
    saveVacanciesToStorage(updated);
  };

  const handleUpdateVacancy = (updatedJob: VacancyItem) => {
    const updated = vacancies.map(v => v.id === updatedJob.id ? updatedJob : v);
    setVacancies(updated);
    saveVacanciesToStorage(updated);
    if (selectedJob && selectedJob.id === updatedJob.id) {
      setSelectedJob(updatedJob);
    }
  };

  const handleDeleteVacancy = (id: string) => {
    const updated = vacancies.filter(v => v.id !== id);
    setVacancies(updated);
    saveVacanciesToStorage(updated);
    if (selectedJob && selectedJob.id === id) {
      setSelectedJob(null);
    }
  };

  // Select a job to view its full official notification details
  const handleSelectJob = (job: VacancyItem) => {
    setSelectedJob(job);
    trackPageView(job.title, { id: job.id, title: job.title });
    setAnalytics(getAnalytics());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectJobById = (id: string) => {
    const job = vacancies.find(v => v.id === id);
    if (job) {
      handleSelectJob(job);
    }
  };

  const handleOpenAdminEdit = (job: VacancyItem) => {
    setEditingJobInitial(job);
    setIsAdminOpen(true);
  };

  // Filtered vacancies for general browsing and search
  const filteredVacancies = useMemo(() => {
    let list = vacancies;

    if (currentSection !== 'all') {
      list = list.filter(v => v.sectionType === currentSection);
    }

    if (selectedCategory !== 'All') {
      list = list.filter(v => v.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(v => 
        v.title.toLowerCase().includes(q) ||
        v.department.toLowerCase().includes(q) ||
        v.postName.toLowerCase().includes(q) ||
        v.advtNo.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [vacancies, currentSection, selectedCategory, searchQuery]);

  // Specific lists for the 3-column Sarkari Result tables on the Home screen
  const latestJobs = useMemo(() => {
    let list = vacancies.filter(v => v.sectionType === 'latest-jobs');
    if (selectedCategory !== 'All') list = list.filter(v => v.category === selectedCategory);
    return list.slice(0, 15);
  }, [vacancies, selectedCategory]);

  const admitCards = useMemo(() => {
    let list = vacancies.filter(v => v.sectionType === 'admit-card');
    if (selectedCategory !== 'All') list = list.filter(v => v.category === selectedCategory);
    return list.slice(0, 15);
  }, [vacancies, selectedCategory]);

  const results = useMemo(() => {
    let list = vacancies.filter(v => v.sectionType === 'result');
    if (selectedCategory !== 'All') list = list.filter(v => v.category === selectedCategory);
    return list.slice(0, 15);
  }, [vacancies, selectedCategory]);

  const answerKeys = useMemo(() => {
    let list = vacancies.filter(v => v.sectionType === 'answer-key');
    if (selectedCategory !== 'All') list = list.filter(v => v.category === selectedCategory);
    return list.slice(0, 10);
  }, [vacancies, selectedCategory]);

  const syllabuses = useMemo(() => {
    let list = vacancies.filter(v => v.sectionType === 'syllabus');
    if (selectedCategory !== 'All') list = list.filter(v => v.category === selectedCategory);
    return list.slice(0, 10);
  }, [vacancies, selectedCategory]);

  const admissions = useMemo(() => {
    let list = vacancies.filter(v => v.sectionType === 'admission' || v.sectionType === 'certificate' || v.sectionType === 'important');
    if (selectedCategory !== 'All') list = list.filter(v => v.category === selectedCategory);
    return list.slice(0, 10);
  }, [vacancies, selectedCategory]);

  // Pagination for searched/filtered view
  const totalPages = Math.ceil(filteredVacancies.length / ITEMS_PER_PAGE);
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVacancies.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVacancies, currentPage]);

  const isSearchOrFilterActive = searchQuery.trim() !== '' || currentSection !== 'all';

  // Quick add link state in bottom High Density Admin Preview Bar
  const [quickTitle, setQuickTitle] = useState('');
  const [quickUrl, setQuickUrl] = useState('');
  const [quickMsg, setQuickMsg] = useState('');

  const handleQuickPostLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    const newJob: VacancyItem = {
      id: `job-quick-${Date.now()}`,
      title: quickTitle.trim(),
      shortName: quickTitle.trim().slice(0, 30),
      department: 'Direct Fast Update',
      postName: quickTitle.trim(),
      advtNo: `ADV-${new Date().getFullYear()}`,
      category: 'Others',
      sectionType: 'latest-jobs',
      totalPosts: 'Check Notification',
      postDate: new Date().toLocaleDateString('en-GB'),
      lastDate: '30 Days From Notice',
      shortDescription: `Official direct link recruitment for ${quickTitle.trim()}.`,
      viewsCount: 1,
      importantDates: {
        applyBegin: new Date().toLocaleDateString('en-GB'),
        lastDateApply: '30 Days From Notice',
        lastDateFeePayment: '30 Days From Notice',
        examDate: 'Notify Soon',
        admitCardAvailable: 'Before Exam',
      },
      applicationFee: {
        generalObcEws: '₹ 100/-',
        scStPh: '₹ 0/-',
        female: '₹ 0/-',
        paymentMode: 'Online Net Banking / UPI / Debit Card',
      },
      ageLimit: {
        asOnDate: '01/08/2025',
        minAge: '18 Years',
        maxAge: '35 Years',
        relaxationRules: 'As per Govt rules',
      },
      eligibilitySummary: 'Check official notification for complete educational qualification criteria.',
      howToApplySteps: [
        'Candidate can apply online by visiting the official link provided below.',
        'Read the official notification carefully before submitting the online form.',
        'Upload required documents and submit fee if applicable.',
      ],
      postDetails: [
        {
          postName: quickTitle.trim(),
          total: 'Check Notification',
          eligibilityCriteria: 'As per official recruitment rules.',
        },
      ],
      directLinks: [
        { id: `dl-${Date.now()}-1`, label: 'Direct Apply / Portal Link', url: quickUrl.trim() || 'https://mysarkariresult.co.in', actionNote: 'Click Here', variant: 'primary' },
        { id: `dl-${Date.now()}-2`, label: 'Official Website', url: 'https://mysarkariresult.co.in', actionNote: 'Click Here', variant: 'info' },
      ],
      isNew: true,
      isTopVacancy: true,
    };
    handleAddVacancy(newJob);
    setQuickTitle('');
    setQuickUrl('');
    setQuickMsg('Link Posted Successfully!');
    setTimeout(() => setQuickMsg(''), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f2f6] text-gray-900 font-sans">
      
      {/* 1. Header with mysarkariresult.co.in Branding, Search, Navigation & Admin Corner */}
      <Header
        currentSection={currentSection}
        onSelectSection={(sec) => {
          setCurrentSection(sec);
          setSelectedJob(null);
          setCurrentPage(1);
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
          if (q.trim()) setSelectedJob(null);
        }}
        onOpenAdmin={handleOpenAdminClick}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        adminUser={adminUser}
        onLogoutAdmin={handleAdminLogout}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenCurrentAffairs={handleOpenCurrentAffairs}
        onOpenUsefulLinks={handleOpenUsefulLinks}
        onOpenSarkariTools={handleOpenSarkariTools}
        currentAffairsList={currentAffairs}
        onSelectJobById={handleSelectJobById}
        liveVisitors={analytics.liveActiveUsers}
        totalVacanciesCount={vacancies.length}
        unreadNotificationsCount={5}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 py-3">
        
        {/* CASE A: FULL VACANCY DETAILS VIEW */}
        {selectedJob ? (
          <VacancyDetail
            job={selectedJob}
            onBack={() => setSelectedJob(null)}
            onOpenAdminEdit={handleOpenAdminEdit}
            isAdminLoggedIn={isAdminLoggedIn}
          />
        ) : isSearchOrFilterActive ? (
          
          /* CASE B: SEARCHED OR SECTION FILTERED LIST WITH PAGINATION */
          <div className="space-y-3">
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-300 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-black text-red-900 uppercase font-serif">
                  {currentSection !== 'all' ? `${currentSection.replace('-', ' ')} List` : 'Search Results'}
                  {selectedCategory !== 'All' ? ` • ${selectedCategory}` : ''}
                </h2>
                <p className="text-xs text-gray-600">
                  Found <strong className="text-red-700">{filteredVacancies.length}</strong> matching vacancies and updates
                </p>
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-1 rounded bg-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-300"
                >
                  Clear Search
                </button>
              )}
            </div>

            {/* List Table */}
            <div className="bg-white rounded-lg shadow border-2 border-red-800 overflow-hidden">
              <div className="bg-[#8B0000] text-white px-4 py-2 font-bold text-xs sm:text-sm flex justify-between items-center">
                <span>POST NAME & COMMISSION</span>
                <span>TOTAL POSTS / LAST DATE</span>
              </div>

              <div className="divide-y divide-gray-200">
                {paginatedList.length > 0 ? (
                  paginatedList.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => handleSelectJob(job)}
                      className="p-3 sm:p-4 hover:bg-red-50/60 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-red-700 text-white text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                            {job.category}
                          </span>
                          {job.isNew && (
                            <span className="bg-amber-400 text-red-900 text-[10px] font-black px-1.5 py-0.2 rounded animate-pulse">
                              NEW
                            </span>
                          )}
                          <span className="text-xs text-gray-500 font-medium">
                            {job.department}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-blue-900 hover:underline">
                          {job.title}
                        </h3>

                        <p className="text-xs text-gray-600 line-clamp-1">
                          {job.shortDescription || job.eligibilitySummary}
                        </p>
                      </div>

                      <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-1 border-t sm:border-t-0 pt-1 sm:pt-0">
                        <span className="text-xs font-black text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          {job.totalPosts}
                        </span>
                        <span className="text-xs text-red-700 font-semibold flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Last Date: {job.lastDate}
                        </span>
                        <span className="text-[11px] text-blue-700 font-bold hidden sm:inline flex items-center">
                          View Details & Apply ›
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    No matching vacancies found for "{searchQuery}". Try searching for SSC, Railway, or Police.
                  </div>
                )}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 py-3 bg-white rounded-lg shadow-sm border border-gray-300">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded border border-gray-300 text-xs font-bold disabled:opacity-40 hover:bg-gray-100 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-xs font-semibold text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded border border-gray-300 text-xs font-bold disabled:opacity-40 hover:bg-gray-100 flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        ) : (
          
          /* CASE C: CLASSIC SARKARI RESULT HOMEPAGE */
          <div className="space-y-4">
            
            {/* Top Highlighted Badges (SSC GD, NTPC, UP Police SI, BPSC TRE 4.0, etc.) */}
            <TopBadges
              vacancies={vacancies}
              onSelectJob={handleSelectJob}
            />

            {/* Welcome Notification Bar */}
            <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white p-2.5 rounded shadow text-center text-xs sm:text-sm font-bold border border-amber-400 flex flex-wrap items-center justify-center gap-2">
              <span className="text-amber-300 font-extrabold">★ WWW.MYSARKARIRESULT.CO.IN ★</span>
              <span>भारत की सबसे लोकप्रिय सरकारी नौकरी और परीक्षा परिणाम वेबसाइट</span>
              <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded ml-1 animate-pulse">
                FASTEST UPDATES
              </span>
            </div>

            {/* PRIMARY 3-COLUMN SARKARI RESULT SECTION (Result | Admit Card | Latest Jobs) in High Density Theme */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              
              {/* COLUMN 1: RESULT in High Density Vibrant Red #cc0000 */}
              <div className="bg-white border border-gray-300 rounded flex flex-col shadow-sm">
                <div className="bg-[#cc0000] text-white p-2 text-center font-bold text-base sm:text-lg tracking-wide rounded-t flex items-center justify-center gap-1.5">
                  <Award className="w-4 h-4 text-white" />
                  <span>RESULT</span>
                </div>
                <div className="overflow-y-auto p-2 space-y-1 text-xs sm:text-sm text-blue-800 underline decoration-blue-300 flex-1">
                  {results.map((job) => (
                    <button
                      key={job.id}
                      id={`job-link-${job.id}`}
                      onClick={() => handleSelectJob(job)}
                      className="block hover:text-[#cc0000] text-left w-full p-1 rounded font-semibold leading-snug transition-colors group cursor-pointer"
                    >
                      <span className="flex items-start justify-between gap-1">
                        <span>{job.title}</span>
                        {job.isNew && (
                          <span className="animate-blink no-underline inline-block bg-[#cc0000] text-white text-[9px] font-black px-1.5 py-0.2 rounded shrink-0 shadow-sm">
                            NEW
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="p-2 bg-gray-50 border-t border-gray-200 text-center">
                  <button
                    onClick={() => setCurrentSection('result')}
                    className="text-xs font-bold text-[#cc0000] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <span>View More Results ({vacancies.filter(v => v.sectionType === 'result').length}+)</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* COLUMN 2: ADMIT CARD in High Density Deep Blue #000066 */}
              <div className="bg-white border border-gray-300 rounded flex flex-col shadow-sm">
                <div className="bg-[#000066] text-white p-2 text-center font-bold text-base sm:text-lg tracking-wide rounded-t flex items-center justify-center gap-1.5">
                  <DownloadCloud className="w-4 h-4 text-white" />
                  <span>ADMIT CARD</span>
                </div>
                <div className="overflow-y-auto p-2 space-y-1 text-xs sm:text-sm text-blue-800 underline decoration-blue-300 flex-1">
                  {admitCards.map((job) => (
                    <button
                      key={job.id}
                      id={`job-link-${job.id}`}
                      onClick={() => handleSelectJob(job)}
                      className="block hover:text-[#cc0000] text-left w-full p-1 rounded font-semibold leading-snug transition-colors group cursor-pointer"
                    >
                      <span className="flex items-start justify-between gap-1">
                        <span>{job.title}</span>
                        {job.isNew && (
                          <span className="animate-blink no-underline inline-block bg-[#000066] text-white text-[9px] font-black px-1.5 py-0.2 rounded shrink-0 shadow-sm">
                            NEW
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="p-2 bg-gray-50 border-t border-gray-200 text-center">
                  <button
                    onClick={() => setCurrentSection('admit-card')}
                    className="text-xs font-bold text-[#000066] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <span>View More Admit Cards ({vacancies.filter(v => v.sectionType === 'admit-card').length}+)</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* COLUMN 3: LATEST JOBS in High Density Forest Green #006400 */}
              <div className="bg-white border border-gray-300 rounded flex flex-col shadow-sm">
                <div className="bg-[#006400] text-white p-2 text-center font-bold text-base sm:text-lg tracking-wide rounded-t flex items-center justify-center gap-1.5">
                  <Zap className="w-4 h-4 text-white" />
                  <span>LATEST JOBS</span>
                </div>
                <div className="overflow-y-auto p-2 space-y-1 text-xs sm:text-sm text-blue-800 underline decoration-blue-300 flex-1">
                  {latestJobs.map((job) => (
                    <button
                      key={job.id}
                      id={`job-link-${job.id}`}
                      onClick={() => handleSelectJob(job)}
                      className="block hover:text-[#cc0000] text-left w-full p-1 rounded font-semibold leading-snug transition-colors group cursor-pointer"
                    >
                      <span className="flex items-start justify-between gap-1">
                        <span>{job.title}</span>
                        <span className="no-underline flex items-center gap-1 shrink-0">
                          {job.isNew && (
                            <span className="animate-blink bg-[#006400] text-white text-[9px] font-black px-1.5 py-0.2 rounded shadow-sm">
                              NEW
                            </span>
                          )}
                          <span className="text-[10px] text-red-600 font-bold">
                            Last: {job.lastDate}
                          </span>
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="p-2 bg-gray-50 border-t border-gray-200 text-center">
                  <button
                    onClick={() => setCurrentSection('latest-jobs')}
                    className="text-xs font-bold text-[#006400] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <span>View More Jobs ({vacancies.filter(v => v.sectionType === 'latest-jobs').length}+)</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* SECONDARY 3-COLUMN SARKARI RESULT SECTION (Answer Key | Syllabus | Admission & Important) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-2">
              
              {/* Answer Key */}
              <div className="bg-white border border-gray-300 rounded flex flex-col shadow-sm">
                <div className="bg-amber-700 text-white p-2 text-center font-bold text-sm sm:text-base tracking-wide rounded-t flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>ANSWER KEY</span>
                </div>
                <div className="overflow-y-auto p-2 space-y-1 text-xs sm:text-sm text-blue-800 underline decoration-blue-300 flex-1">
                  {answerKeys.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => handleSelectJob(job)}
                      className="block hover:text-[#cc0000] text-left w-full p-1 rounded font-semibold leading-snug transition-colors"
                    >
                      <span>{job.title}</span>
                    </button>
                  ))}
                </div>
                <div className="p-1.5 bg-gray-50 border-t border-gray-200 text-center">
                  <button
                    onClick={() => setCurrentSection('answer-key')}
                    className="text-xs font-bold text-amber-800 hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>View More Answer Keys</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Syllabus */}
              <div className="bg-white border border-gray-300 rounded flex flex-col shadow-sm">
                <div className="bg-indigo-900 text-white p-2 text-center font-bold text-sm sm:text-base tracking-wide rounded-t flex items-center justify-center gap-1.5">
                  <FileText className="w-4 h-4 text-white" />
                  <span>SYLLABUS</span>
                </div>
                <div className="overflow-y-auto p-2 space-y-1 text-xs sm:text-sm text-blue-800 underline decoration-blue-300 flex-1">
                  {syllabuses.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => handleSelectJob(job)}
                      className="block hover:text-[#cc0000] text-left w-full p-1 rounded font-semibold leading-snug transition-colors"
                    >
                      <span>{job.title}</span>
                    </button>
                  ))}
                </div>
                <div className="p-1.5 bg-gray-50 border-t border-gray-200 text-center">
                  <button
                    onClick={() => setCurrentSection('syllabus')}
                    className="text-xs font-bold text-indigo-900 hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>View More Syllabus</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Admission & Important */}
              <div className="bg-white border border-gray-300 rounded flex flex-col shadow-sm">
                <div className="bg-teal-800 text-white p-2 text-center font-bold text-sm sm:text-base tracking-wide rounded-t flex items-center justify-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-white" />
                  <span>ADMISSION & SERVICES</span>
                </div>
                <div className="overflow-y-auto p-2 space-y-1 text-xs sm:text-sm text-blue-800 underline decoration-blue-300 flex-1">
                  {admissions.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => handleSelectJob(job)}
                      className="block hover:text-[#cc0000] text-left w-full p-1 rounded font-semibold leading-snug transition-colors"
                    >
                      <span>{job.title}</span>
                    </button>
                  ))}
                </div>
                <div className="p-1.5 bg-gray-50 border-t border-gray-200 text-center">
                  <button
                    onClick={() => setCurrentSection('admission')}
                    className="text-xs font-bold text-teal-800 hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>View More Admissions</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* High Density Design: Admin Panel Preview & Live Analytics Bar */}
            <div className="bg-gray-800 text-white p-3 sm:p-4 my-3 rounded shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 border-t-2 border-green-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
                <div className="bg-green-500 text-black text-xs px-2 py-1 rounded font-bold shrink-0">
                  ADMIN PANEL PREVIEW
                </div>
                <form onSubmit={handleQuickPostLink} className="text-sm flex flex-wrap items-center gap-2 w-full">
                  <span className="font-bold text-xs sm:text-sm whitespace-nowrap">Quick Add Link:</span>
                  <input
                    type="text"
                    placeholder="Enter Job Title..."
                    value={quickTitle}
                    onChange={(e) => setQuickTitle(e.target.value)}
                    className="bg-gray-700 text-white text-xs p-1.5 rounded w-full sm:w-48 border border-gray-600 focus:outline-none focus:border-green-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Direct URL..."
                    value={quickUrl}
                    onChange={(e) => setQuickUrl(e.target.value)}
                    className="bg-gray-700 text-white text-xs p-1.5 rounded w-full sm:w-48 border border-gray-600 focus:outline-none focus:border-green-400"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1.5 rounded font-bold transition-colors cursor-pointer"
                  >
                    Post Link
                  </button>
                  {quickMsg && <span className="text-green-400 font-bold text-xs animate-pulse">{quickMsg}</span>}
                </form>
              </div>
              <div className="flex gap-6 text-xs text-gray-400 shrink-0 self-end md:self-center">
                <div className="text-center">
                  <p className="text-white font-bold text-base sm:text-lg">{analytics.liveActiveUsers.toLocaleString('en-IN')}</p>
                  <p className="text-[10px]">Online Viewers</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-base sm:text-lg">{analytics.totalPageViews.toLocaleString('en-IN')}</p>
                  <p className="text-[10px]">Total Hits Today</p>
                </div>
              </div>
            </div>

            {/* Quick Helper Banner */}
            <div className="bg-white p-3 sm:p-4 rounded border border-gray-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="p-2 rounded bg-red-100 text-[#cc0000] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    Looking for a specific State or Central Department?
                  </h4>
                  <p className="text-gray-600 text-xs">
                    Use our instant search bar above to search by commission, post name, advertisement number, or state qualification.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDeployGuideOpen(true)}
                  className="px-3.5 py-1.5 rounded bg-green-700 hover:bg-green-600 text-white font-bold text-xs transition-colors shadow-sm whitespace-nowrap"
                >
                  🚀 Public Deploy Guide
                </button>
                <button
                  onClick={handleOpenAdminClick}
                  className="px-3.5 py-1.5 rounded bg-[#cc0000] hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm whitespace-nowrap cursor-pointer"
                >
                  🔒 Admin Control
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* 4. Modals */}
      
      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          setEditingJobInitial(null);
        }}
        vacancies={vacancies}
        onAddVacancy={handleAddVacancy}
        onUpdateVacancy={handleUpdateVacancy}
        onDeleteVacancy={handleDeleteVacancy}
        analytics={analytics}
        onRefreshAnalytics={() => setAnalytics(getAnalytics())}
        editingJobInitial={editingJobInitial}
        onLogout={handleAdminLogout}
        adminUser={adminUser}
        onSyncAllDatesToCurrentYear={handleSyncAllDatesToCurrentYear}
        currentAffairs={currentAffairs}
        onUpdateCurrentAffairs={handleUpdateCurrentAffairs}
        onAddCurrentAffair={handleAddCurrentAffair}
        onDeleteCurrentAffair={handleDeleteCurrentAffair}
      />

      {/* Admin Corner Login & Password Recovery Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Daily Current Affairs & "10 Ka Dum" MCQ Quiz Modal */}
      <CurrentAffairsModal
        isOpen={isCurrentAffairsOpen}
        onClose={() => setIsCurrentAffairsOpen(false)}
        currentAffairs={currentAffairs}
        initialSelectedId={currentAffairsInitialCaId}
        startWithQuiz={currentAffairsStartWithQuiz}
      />

      {/* Useful Government Links with Rain/Rainfall Animation & Infographics Modal */}
      <UsefulLinksModal
        isOpen={isUsefulLinksOpen}
        onClose={() => setIsUsefulLinksOpen(false)}
      />

      {/* Sarkari Tools Modal: Photo/Signature KB Resizer & iLovePDF Full Suite */}
      <SarkariToolsModal
        isOpen={isSarkariToolsOpen}
        onClose={() => setIsSarkariToolsOpen(false)}
        initialTab={sarkariToolsInitialTab}
      />

      {/* Public Deployment Guide Modal */}
      <DeploymentGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

      {/* Instant Notification Alerts Modal */}
      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        recentAlerts={vacancies.filter(v => v.isNew || v.isTopVacancy)}
        onSelectJob={handleSelectJob}
      />

      {/* 5. Footer */}
      <Footer
        onSelectSection={(sec) => {
          setCurrentSection(sec);
          setSelectedJob(null);
          setCurrentPage(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        totalPageViews={analytics.totalPageViews}
      />

    </div>
  );
}
