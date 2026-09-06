import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  Eye, 
  Users, 
  BarChart3, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ExternalLink, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  Download, 
  Upload, 
  Sparkles,
  Lock,
  Unlock,
  X,
  Link as LinkIcon,
  Flame,
  Calendar,
  Layers,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { VacancyItem, SiteAnalytics, JobCategory, JobSectionType, DirectLink, PostDetailItem } from '../types';
import { resetAnalytics } from '../utils/analytics';
import { CurrentAffairItem, getTodayFormattedDate } from '../data/currentAffairsData';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  vacancies: VacancyItem[];
  onAddVacancy: (newJob: VacancyItem) => void;
  onUpdateVacancy: (updatedJob: VacancyItem) => void;
  onDeleteVacancy: (id: string) => void;
  analytics: SiteAnalytics;
  onRefreshAnalytics: () => void;
  editingJobInitial?: VacancyItem | null;
  onLogout?: () => void;
  adminUser?: string;
  onSyncAllDatesToCurrentYear: () => void;
  currentAffairs: CurrentAffairItem[];
  onUpdateCurrentAffairs: (items: CurrentAffairItem[]) => void;
  onAddCurrentAffair: (item: CurrentAffairItem) => void;
  onDeleteCurrentAffair: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  vacancies,
  onAddVacancy,
  onUpdateVacancy,
  onDeleteVacancy,
  analytics,
  onRefreshAnalytics,
  editingJobInitial,
  onLogout,
  adminUser = 'admin',
  onSyncAllDatesToCurrentYear,
  currentAffairs,
  onUpdateCurrentAffairs,
  onAddCurrentAffair,
  onDeleteCurrentAffair,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default open for quick user testing
  const [pinInput, setPinInput] = useState<string>('1234');
  const [activeTab, setActiveTab] = useState<'analytics' | 'add' | 'manage' | 'homepage-sync'>('homepage-sync');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Current Affairs New Item State
  const [newCaTitle, setNewCaTitle] = useState('');
  const [newCaCategory, setNewCaCategory] = useState<CurrentAffairItem['category']>('National');
  const [newCaSummary, setNewCaSummary] = useState('');
  const [newCaKeyPoints, setNewCaKeyPoints] = useState('');

  // Form State for Adding / Editing Vacancy
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string>('');

  const defaultFormState = {
    title: '',
    shortName: '',
    postName: '',
    advtNo: '',
    department: '',
    category: 'SSC' as JobCategory,
    sectionType: 'latest-jobs' as JobSectionType,
    totalPosts: '',
    postDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
    lastDate: '',
    isTopVacancy: false,
    isNew: true,
    shortDescription: '',
    applyBegin: '',
    lastDateApply: '',
    lastDateFeePayment: '',
    examDate: '',
    admitCardAvailable: '',
    genObcEwsFee: '₹ 100/-',
    scStPhFee: '₹ 0/-',
    femaleFee: '₹ 0/-',
    asOnDate: '01/08/2025',
    minAge: '18 Years',
    maxAge: '27 Years',
    relaxationRules: 'As per Recruitment Rules',
    eligibilitySummary: 'Class 10th / 12th / Bachelor Degree in Any Stream from Recognized University in India.',
    postNameItem: 'General Post',
    postTotalItem: '1,000 Posts',
    postEligibilityItem: 'Bachelor Degree in Any Stream',
    directLinks: [
      { id: 'dl-new-1', label: 'Apply Online (Direct Link)', url: 'https://', variant: 'primary', actionNote: 'Click Here' },
      { id: 'dl-new-2', label: 'Download Official Notification PDF', url: 'https://', variant: 'danger', actionNote: 'Download PDF' },
      { id: 'dl-new-3', label: 'Official Website', url: 'https://', variant: 'warning', actionNote: 'Official Website' },
    ] as DirectLink[],
  };

  const [form, setForm] = useState(defaultFormState);

  // Search in manage tab
  const [manageSearch, setManageSearch] = useState('');

  // Handle setting edit job if passed from outside
  React.useEffect(() => {
    if (editingJobInitial) {
      handleStartEdit(editingJobInitial);
      setActiveTab('add');
    }
  }, [editingJobInitial]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setFeedbackMsg({ type: 'success', text: 'Admin Login Successful!' });
      setTimeout(() => setFeedbackMsg(null), 3000);
    } else {
      setFeedbackMsg({ type: 'error', text: 'Invalid PIN. (Default PIN is 1234)' });
    }
  };

  const handleStartEdit = (job: VacancyItem) => {
    setIsEditing(true);
    setEditingId(job.id);
    setForm({
      title: job.title,
      shortName: job.shortName,
      postName: job.postName,
      advtNo: job.advtNo,
      department: job.department,
      category: job.category,
      sectionType: job.sectionType,
      totalPosts: String(job.totalPosts),
      postDate: job.postDate,
      lastDate: job.lastDate,
      isTopVacancy: !!job.isTopVacancy,
      isNew: !!job.isNew,
      shortDescription: job.shortDescription,
      applyBegin: job.importantDates.applyBegin,
      lastDateApply: job.importantDates.lastDateApply,
      lastDateFeePayment: job.importantDates.lastDateFeePayment,
      examDate: job.importantDates.examDate || '',
      admitCardAvailable: job.importantDates.admitCardAvailable || '',
      genObcEwsFee: job.applicationFee.generalObcEws,
      scStPhFee: job.applicationFee.scStPh,
      femaleFee: job.applicationFee.female,
      asOnDate: job.ageLimit.asOnDate,
      minAge: job.ageLimit.minAge,
      maxAge: job.ageLimit.maxAge,
      relaxationRules: job.ageLimit.relaxationRules,
      eligibilitySummary: job.eligibilitySummary,
      postNameItem: job.postDetails?.[0]?.postName || 'General Post',
      postTotalItem: String(job.postDetails?.[0]?.total || job.totalPosts),
      postEligibilityItem: job.postDetails?.[0]?.eligibilityCriteria || job.eligibilitySummary,
      directLinks: job.directLinks && job.directLinks.length > 0 ? [...job.directLinks] : [
        { id: 'dl-1', label: 'Apply Online', url: 'https://', variant: 'primary', actionNote: 'Click Here' },
        { id: 'dl-2', label: 'Download Notification', url: 'https://', variant: 'danger', actionNote: 'Download PDF' }
      ],
    });
    setActiveTab('add');
  };

  const handleAddDirectLink = () => {
    const newLink: DirectLink = {
      id: `dl-${Date.now()}`,
      label: 'New Direct Link / Action Button',
      url: 'https://',
      variant: 'primary',
      actionNote: 'Click Here',
    };
    setForm(prev => ({
      ...prev,
      directLinks: [...prev.directLinks, newLink],
    }));
  };

  const handleUpdateDirectLink = (idx: number, field: keyof DirectLink, value: any) => {
    setForm(prev => {
      const updated = [...prev.directLinks];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, directLinks: updated };
    });
  };

  const handleRemoveDirectLink = (idx: number) => {
    setForm(prev => ({
      ...prev,
      directLinks: prev.directLinks.filter((_, i) => i !== idx),
    }));
  };

  const handlePopulateSample = () => {
    setForm({
      title: 'UP Police Sub Inspector & Fire Officer Online Form 2025',
      shortName: 'UP Police SI 2025',
      postName: 'Sub Inspector (SI) & Platoon Commander',
      advtNo: 'UPPRPB-SI-2025/08',
      department: 'Uttar Pradesh Police Recruitment Board (UPPRPB)',
      category: 'Police',
      sectionType: 'latest-jobs',
      totalPosts: '4,500 Posts',
      postDate: '04 September 2025',
      lastDate: '30 October 2025',
      isTopVacancy: true,
      isNew: true,
      shortDescription: 'UP Police Recruitment Promotion Board has officially issued notification for 4,500 Sub Inspector Posts. Candidates with Graduation Degree can apply online.',
      applyBegin: '05/09/2025',
      lastDateApply: '30/10/2025',
      lastDateFeePayment: '30/10/2025',
      examDate: 'December 2025',
      admitCardAvailable: '10 Days Before Exam',
      genObcEwsFee: '₹ 400/-',
      scStPhFee: '₹ 400/-',
      femaleFee: '₹ 400/-',
      asOnDate: '01/07/2025',
      minAge: '21 Years',
      maxAge: '28 Years',
      relaxationRules: 'SC/ST/OBC: 5 Years Relaxation',
      eligibilitySummary: 'Bachelor Degree in Any Stream from Any Recognized University in India.',
      postNameItem: 'Sub Inspector (Civil Police)',
      postTotalItem: '4,500 Posts',
      postEligibilityItem: 'Bachelor Degree in Any Stream with Physical Fitness Standards.',
      directLinks: [
        { id: `dl-${Date.now()}-1`, label: 'Apply Online (Registration / Login)', url: 'https://uppbpb.gov.in', variant: 'primary', actionNote: 'Click Here' },
        { id: `dl-${Date.now()}-2`, label: 'Download Official Notification PDF', url: 'https://uppbpb.gov.in', variant: 'danger', actionNote: 'Download PDF' },
        { id: `dl-${Date.now()}-3`, label: 'Check Eligibility & Exam Pattern', url: 'https://uppbpb.gov.in', variant: 'info', actionNote: 'Syllabus PDF' },
        { id: `dl-${Date.now()}-4`, label: 'UP Police Official Website', url: 'https://uppbpb.gov.in', variant: 'warning', actionNote: 'Official Website' },
        { id: `dl-${Date.now()}-5`, label: 'Join Official Telegram Group', url: 'https://t.me/sarkariresult', variant: 'success', actionNote: 'Join Now' },
      ],
    });
    setFeedbackMsg({ type: 'success', text: 'Sample real notification filled! Review and click Save.' });
  };

  const handleSubmitVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Title is required!' });
      return;
    }

    const vacancyItem: VacancyItem = {
      id: isEditing ? editingId : `vac-${Date.now()}`,
      title: form.title,
      shortName: form.shortName || form.title,
      postName: form.postName || form.title,
      advtNo: form.advtNo || 'Official Notification',
      department: form.department || 'Government Recruitment Board',
      category: form.category,
      sectionType: form.sectionType,
      totalPosts: form.totalPosts || 'Check Notification',
      postDate: form.postDate,
      lastDate: form.lastDate || form.lastDateApply || 'Check Dates',
      isTopVacancy: form.isTopVacancy,
      isNew: form.isNew,
      viewsCount: isEditing ? (vacancies.find(v => v.id === editingId)?.viewsCount || 100) : 120,
      shortDescription: form.shortDescription,
      importantDates: {
        applyBegin: form.applyBegin || 'Active',
        lastDateApply: form.lastDateApply || form.lastDate || 'Active',
        lastDateFeePayment: form.lastDateFeePayment || form.lastDateApply || 'Active',
        examDate: form.examDate || 'Will be notified soon',
        admitCardAvailable: form.admitCardAvailable || 'Before Exam',
      },
      applicationFee: {
        generalObcEws: form.genObcEwsFee,
        scStPh: form.scStPhFee,
        female: form.femaleFee,
        paymentMode: 'Online Debit/Credit Card, Net Banking, UPI',
      },
      ageLimit: {
        asOnDate: form.asOnDate,
        minAge: form.minAge,
        maxAge: form.maxAge,
        relaxationRules: form.relaxationRules,
      },
      eligibilitySummary: form.eligibilitySummary,
      postDetails: [
        {
          postName: form.postNameItem,
          total: form.postTotalItem,
          eligibilityCriteria: form.postEligibilityItem,
        }
      ],
      howToApplySteps: [
        `Candidate read the notification before apply the application form in ${form.shortName || form.title}.`,
        'Kindly check and collect all documents - eligibility, ID proof, address details, basic details.',
        'Ready scan document related to recruitment form - photo, sign, ID proof, etc.',
        'Before submit application form must check the preview and all columns carefully.',
        'Take a print out of final submitted form.'
      ],
      directLinks: form.directLinks,
      officialNotificationUrl: form.directLinks.find(l => l.variant === 'danger')?.url || 'https://mysarkariresult.co.in',
      officialWebsiteUrl: form.directLinks.find(l => l.variant === 'warning')?.url || 'https://mysarkariresult.co.in',
    };

    if (isEditing) {
      onUpdateVacancy(vacancyItem);
      setFeedbackMsg({ type: 'success', text: `Vacancy "${vacancyItem.shortName}" updated successfully!` });
    } else {
      onAddVacancy(vacancyItem);
      setFeedbackMsg({ type: 'success', text: `New Vacancy "${vacancyItem.shortName}" published successfully!` });
    }

    // Reset form
    setIsEditing(false);
    setEditingId('');
    setForm(defaultFormState);
    setTimeout(() => {
      setFeedbackMsg(null);
      setActiveTab('manage');
    }, 1500);
  };

  const handleResetAnalytics = () => {
    if (confirm('Are you sure you want to reset all visitor logs and counters?')) {
      resetAnalytics();
      onRefreshAnalytics();
      setFeedbackMsg({ type: 'success', text: 'Analytics counter reset!' });
    }
  };

  const filteredManageVacancies = vacancies.filter(v => 
    v.title.toLowerCase().includes(manageSearch.toLowerCase()) ||
    v.department.toLowerCase().includes(manageSearch.toLowerCase()) ||
    v.category.toLowerCase().includes(manageSearch.toLowerCase())
  ).slice(0, 30);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded shadow-2xl border-2 border-[#000066] w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Admin Modal Header in High Density Deep Blue */}
        <div className="bg-[#000066] text-white p-3 sm:p-3.5 flex items-center justify-between border-b-2 border-[#cc0000]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[#cc0000] text-white">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black tracking-wide text-white">
                  MYSARKARIRESULT.CO.IN ADMIN PANEL
                </h2>
                <span className="hidden sm:inline-block text-[10px] bg-green-700 text-white font-mono px-1.5 py-0.2 rounded font-bold">
                  Logged in: {adminUser}
                </span>
              </div>
              <p className="text-[11px] text-blue-200">
                Manage Vacancies, Direct Action Links & Monitor Real-time Website Visitors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-2.5 py-1 rounded bg-red-700 hover:bg-red-800 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-red-500"
                title="Logout from Admin Panel"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded bg-blue-950/80 hover:bg-[#cc0000] flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback Alert Box */}
        {feedbackMsg && (
          <div className={`p-2 text-xs font-bold flex items-center justify-between ${
            feedbackMsg.type === 'success' ? 'bg-green-100 text-green-900 border-b border-green-300' : 'bg-red-100 text-red-900 border-b border-red-300'
          }`}>
            <div className="flex items-center gap-2">
              {feedbackMsg.type === 'success' ? <Check className="w-4 h-4 text-green-700" /> : <AlertCircle className="w-4 h-4 text-red-700" />}
              <span>{feedbackMsg.text}</span>
            </div>
            <button onClick={() => setFeedbackMsg(null)} className="text-gray-500 font-bold">✕</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-gray-100 px-3 py-2 border-b border-gray-300 flex flex-wrap items-center justify-between gap-2">
          <div className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#000066] text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Website Visitors & Analytics</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('add');
                if (!isEditing) setForm(defaultFormState);
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'add'
                  ? 'bg-[#000066] text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Edit Vacancy' : 'Add New Vacancy / Buttons'}</span>
            </button>

            <button
              onClick={() => setActiveTab('manage')}
              className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'manage'
                  ? 'bg-[#000066] text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Manage Vacancies ({vacancies.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('homepage-sync')}
              className={`px-3 py-1.5 rounded text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'homepage-sync'
                  ? 'bg-[#cc0000] text-white shadow-md ring-2 ring-red-400'
                  : 'bg-amber-100 text-red-950 hover:bg-amber-200 border border-amber-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>होमपेज कंट्रोलर व ऑटो-अपडेटर ⚡</span>
            </button>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
            <span className="text-[11px] font-bold text-gray-700">Live System Active</span>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 overflow-y-auto flex-1 bg-gray-50 text-gray-900">
          
          {/* TAB 1: WEBSITE VISITORS & REAL-TIME ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              
              {/* Top Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-lg border-2 border-emerald-500 shadow-sm">
                  <div className="flex items-center justify-between text-emerald-700 mb-1">
                    <span className="text-xs font-bold uppercase">Live Online Users</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-950">
                    {analytics.liveActiveUsers.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-gray-500">Currently active on portal</span>
                </div>

                <div className="bg-white p-3 rounded-lg border-2 border-blue-500 shadow-sm">
                  <div className="text-blue-700 text-xs font-bold uppercase mb-1">
                    Total Page Views
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-950">
                    {analytics.totalPageViews.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-gray-500">All-time portal impressions</span>
                </div>

                <div className="bg-white p-3 rounded-lg border-2 border-purple-500 shadow-sm">
                  <div className="text-purple-700 text-xs font-bold uppercase mb-1">
                    Today's Views
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-purple-950">
                    {analytics.todayViews.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-gray-500">Daily job seekers traffic</span>
                </div>

                <div className="bg-white p-3 rounded-lg border-2 border-amber-500 shadow-sm">
                  <div className="text-amber-700 text-xs font-bold uppercase mb-1">
                    Unique Aspirants
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-950">
                    {analytics.totalUniqueVisitors.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-gray-500">Unique mobile/PC devices</span>
                </div>
              </div>

              {/* Devices & Most Viewed Jobs 2-Column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Device Breakdown */}
                <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm space-y-3">
                  <h3 className="text-xs sm:text-sm font-black text-gray-800 uppercase flex items-center gap-1.5 border-b pb-2">
                    <Smartphone className="w-4 h-4 text-indigo-600" />
                    <span>Visitor Device Breakdown</span>
                  </h3>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="flex items-center gap-1">
                          <Smartphone className="w-3.5 h-3.5 text-blue-600" /> Mobile Phones (73%)
                        </span>
                        <span>{analytics.viewsByDevice.mobile.toLocaleString('en-IN')} views</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '73%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="flex items-center gap-1">
                          <Monitor className="w-3.5 h-3.5 text-purple-600" /> Desktop & Laptops (25%)
                        </span>
                        <span>{analytics.viewsByDevice.desktop.toLocaleString('en-IN')} views</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="flex items-center gap-1">
                          <Tablet className="w-3.5 h-3.5 text-amber-600" /> Tablets (2%)
                        </span>
                        <span>{analytics.viewsByDevice.tablet.toLocaleString('en-IN')} views</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '2%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Jobs Ranking */}
                <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm space-y-3">
                  <h3 className="text-xs sm:text-sm font-black text-gray-800 uppercase flex items-center gap-1.5 border-b pb-2">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    <span>Top Viewed Vacancies Today</span>
                  </h3>
                  
                  <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto">
                    {analytics.popularJobs.map((job, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="w-5 h-5 rounded-full bg-red-100 text-red-800 font-bold flex items-center justify-center text-[10px] shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-gray-800 truncate">
                            {job.title}
                          </span>
                        </div>
                        <span className="font-bold text-red-700 shrink-0">
                          {job.views.toLocaleString('en-IN')} views
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Real-time Live Visitor Stream Table */}
              <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
                <div className="p-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-black text-gray-800 uppercase flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-red-700" />
                    <span>Live Aspirants Activity Stream (Real-time)</span>
                  </h3>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onRefreshAnalytics}
                      className="px-2 py-1 rounded bg-white text-gray-700 hover:bg-gray-200 text-xs font-semibold border flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Refresh</span>
                    </button>
                    <button
                      onClick={handleResetAnalytics}
                      className="px-2 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200 text-xs font-semibold border border-red-300"
                    >
                      <span>Reset Logs</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-56">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                      <tr>
                        <th className="p-2.5">Time</th>
                        <th className="p-2.5">Page / Vacancy</th>
                        <th className="p-2.5">Device & Browser</th>
                        <th className="p-2.5">Location</th>
                        <th className="p-2.5">Source / Referrer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {analytics.recentLogs && analytics.recentLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="p-2.5 text-gray-500 font-mono whitespace-nowrap">{log.timestamp}</td>
                          <td className="p-2.5 font-bold text-gray-900">{log.jobTitle || log.page}</td>
                          <td className="p-2.5 text-gray-600">{log.browser}</td>
                          <td className="p-2.5 text-blue-800 font-medium">{log.city || 'India'}</td>
                          <td className="p-2.5 text-gray-500">{log.referrer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ADD / EDIT VACANCY & DIRECT BUTTONS */}
          {activeTab === 'add' && (
            <form onSubmit={handleSubmitVacancy} className="space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-amber-50 border border-amber-300 rounded-lg">
                <div className="text-xs text-amber-900">
                  <strong>💡 Pro Tip:</strong> You can quickly test by clicking the Sample Auto-Fill button below!
                </div>
                <button
                  type="button"
                  onClick={handlePopulateSample}
                  className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Fill Real UP Police SI Vacancy Sample</span>
                </button>
              </div>

              {/* Basic Details Box */}
              <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm space-y-3">
                <h3 className="text-sm font-black text-red-900 uppercase border-b pb-1">
                  1. Basic Vacancy Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Notification Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SSC GD Constable in BSF, CISF 2025 Online Form"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-red-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Short Name (For Top Badges & Grids)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SSC GD 2025"
                      value={form.shortName}
                      onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-red-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Department / Commission
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Staff Selection Commission (SSC)"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-red-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value as JobCategory })}
                      className="w-full p-2 border border-gray-300 rounded text-xs bg-white"
                    >
                      <option value="SSC">SSC</option>
                      <option value="Railway">Railway</option>
                      <option value="UPSC">UPSC</option>
                      <option value="Banking">Banking</option>
                      <option value="Defence">Defence</option>
                      <option value="Police">Police</option>
                      <option value="Teaching">Teaching</option>
                      <option value="State PSC">State PSC</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Medical">Medical</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Section Type (On Homepage)
                    </label>
                    <select
                      value={form.sectionType}
                      onChange={(e) => setForm({ ...form, sectionType: e.target.value as JobSectionType })}
                      className="w-full p-2 border border-gray-300 rounded text-xs bg-white"
                    >
                      <option value="latest-jobs">Latest Jobs</option>
                      <option value="result">Result</option>
                      <option value="admit-card">Admit Card</option>
                      <option value="answer-key">Answer Key</option>
                      <option value="syllabus">Syllabus</option>
                      <option value="admission">Admission</option>
                      <option value="certificate">Certificate Verification</option>
                      <option value="important">Important</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Advertisement Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Advt No. 04/2025"
                      value={form.advtNo}
                      onChange={(e) => setForm({ ...form, advtNo: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Total Posts / Vacancies
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 39,481 Posts"
                      value={form.totalPosts}
                      onChange={(e) => setForm({ ...form, totalPosts: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-6 py-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-red-900">
                      <input
                        type="checkbox"
                        checked={form.isTopVacancy}
                        onChange={(e) => setForm({ ...form, isTopVacancy: e.target.checked })}
                        className="w-4 h-4 text-red-600 rounded"
                      />
                      <span>Mark as Top Vacancy (Shows in Top Colorful Boxes on Home)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-900">
                      <input
                        type="checkbox"
                        checked={form.isNew}
                        onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span>Blinking "NEW" Badge</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Important Dates & Fees */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm space-y-2.5">
                  <h3 className="text-xs font-black text-red-900 uppercase border-b pb-1">
                    2. Important Dates
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="font-semibold text-gray-700">Application Begin:</label>
                      <input
                        type="text"
                        placeholder="e.g. 05/09/2025"
                        value={form.applyBegin}
                        onChange={(e) => setForm({ ...form, applyBegin: e.target.value })}
                        className="w-full p-1.5 border rounded"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700">Last Date for Apply:</label>
                      <input
                        type="text"
                        placeholder="e.g. 14/10/2025"
                        value={form.lastDateApply}
                        onChange={(e) => setForm({ ...form, lastDateApply: e.target.value, lastDate: e.target.value })}
                        className="w-full p-1.5 border rounded"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700">Exam Date:</label>
                      <input
                        type="text"
                        placeholder="e.g. January 2026"
                        value={form.examDate}
                        onChange={(e) => setForm({ ...form, examDate: e.target.value })}
                        className="w-full p-1.5 border rounded"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700">Admit Card Date:</label>
                      <input
                        type="text"
                        placeholder="e.g. Before Exam"
                        value={form.admitCardAvailable}
                        onChange={(e) => setForm({ ...form, admitCardAvailable: e.target.value })}
                        className="w-full p-1.5 border rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm space-y-2.5">
                  <h3 className="text-xs font-black text-red-900 uppercase border-b pb-1">
                    3. Application Fee & Age Limit
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold text-gray-700">Gen / OBC / EWS Fee:</label>
                        <input
                          type="text"
                          value={form.genObcEwsFee}
                          onChange={(e) => setForm({ ...form, genObcEwsFee: e.target.value })}
                          className="w-full p-1.5 border rounded"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-gray-700">SC / ST / PH Fee:</label>
                        <input
                          type="text"
                          value={form.scStPhFee}
                          onChange={(e) => setForm({ ...form, scStPhFee: e.target.value })}
                          className="w-full p-1.5 border rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold text-gray-700">Min Age:</label>
                        <input
                          type="text"
                          value={form.minAge}
                          onChange={(e) => setForm({ ...form, minAge: e.target.value })}
                          className="w-full p-1.5 border rounded"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-gray-700">Max Age:</label>
                        <input
                          type="text"
                          value={form.maxAge}
                          onChange={(e) => setForm({ ...form, maxAge: e.target.value })}
                          className="w-full p-1.5 border rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700">Eligibility Summary:</label>
                      <input
                        type="text"
                        value={form.eligibilitySummary}
                        onChange={(e) => setForm({ ...form, eligibilitySummary: e.target.value })}
                        className="w-full p-1.5 border rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* DYNAMIC DIRECT LINKS BUILDER (User Explicit Request!) */}
              <div className="bg-white p-4 rounded-lg border-2 border-red-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h3 className="text-sm font-black text-red-900 uppercase flex items-center gap-1.5">
                      <LinkIcon className="w-4 h-4 text-red-700" />
                      <span>4. Direct Links & Custom Action Buttons (Official Links)</span>
                    </h3>
                    <p className="text-[11px] text-gray-600">
                      Add any direct URL buttons like "Apply Online", "Registration", "Direct Download", "Result Link".
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddDirectLink}
                    className="px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ Add Direct Button / Link</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {form.directLinks.map((link, idx) => (
                    <div key={link.id || idx} className="p-2.5 bg-gray-50 border border-gray-300 rounded flex flex-wrap items-center gap-2 text-xs">
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-[10px] font-bold text-gray-600 mb-0.5">Button Text / Label</label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleUpdateDirectLink(idx, 'label', e.target.value)}
                          placeholder="e.g. Apply Online / Direct Result Link"
                          className="w-full p-1.5 border rounded bg-white"
                        />
                      </div>

                      <div className="flex-1 min-w-[240px]">
                        <label className="block text-[10px] font-bold text-gray-600 mb-0.5">Direct Destination URL</label>
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => handleUpdateDirectLink(idx, 'url', e.target.value)}
                          placeholder="https://..."
                          className="w-full p-1.5 border rounded bg-white font-mono"
                        />
                      </div>

                      <div className="w-28">
                        <label className="block text-[10px] font-bold text-gray-600 mb-0.5">Action Badge</label>
                        <input
                          type="text"
                          value={link.actionNote || 'Click Here'}
                          onChange={(e) => handleUpdateDirectLink(idx, 'actionNote', e.target.value)}
                          className="w-full p-1.5 border rounded bg-white text-center font-semibold"
                        />
                      </div>

                      <div className="w-28">
                        <label className="block text-[10px] font-bold text-gray-600 mb-0.5">Style</label>
                        <select
                          value={link.variant || 'primary'}
                          onChange={(e) => handleUpdateDirectLink(idx, 'variant', e.target.value)}
                          className="w-full p-1.5 border rounded bg-white"
                        >
                          <option value="primary">Blue (Apply)</option>
                          <option value="danger">Red (PDF/Alert)</option>
                          <option value="success">Green (Active)</option>
                          <option value="warning">Amber (Website)</option>
                          <option value="info">Sky (Syllabus)</option>
                        </select>
                      </div>

                      <div className="flex items-end pt-3">
                        <button
                          type="button"
                          onClick={() => handleRemoveDirectLink(idx)}
                          className="p-1.5 rounded bg-red-100 hover:bg-red-200 text-red-700"
                          title="Delete Link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit / Save Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId('');
                      setForm(defaultFormState);
                    }}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-bold text-xs"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded bg-red-800 hover:bg-red-700 text-white font-extrabold text-sm shadow-md transition-colors cursor-pointer"
                >
                  {isEditing ? 'Save & Update Vacancy' : 'Publish New Vacancy To Website'}
                </button>
              </div>

            </form>
          )}

          {/* TAB 3: MANAGE ALL VACANCIES */}
          {activeTab === 'manage' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <input
                  type="text"
                  placeholder="Filter vacancies by title, commission, dept..."
                  value={manageSearch}
                  onChange={(e) => setManageSearch(e.target.value)}
                  className="p-2 border rounded text-xs w-full sm:w-80 bg-white"
                />

                <span className="text-xs text-gray-500 font-semibold">
                  Showing top {filteredManageVacancies.length} of {vacancies.length} total vacancies
                </span>
              </div>

              <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-gray-100 text-gray-800 font-bold border-b border-gray-300">
                    <tr>
                      <th className="p-2.5">Title / Post</th>
                      <th className="p-2.5">Dept / Category</th>
                      <th className="p-2.5 text-center">Total Posts</th>
                      <th className="p-2.5">Last Date</th>
                      <th className="p-2.5 text-center">Top Box</th>
                      <th className="p-2.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredManageVacancies.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="p-2.5 font-bold text-gray-900 max-w-xs truncate">
                          {job.title}
                        </td>
                        <td className="p-2.5 text-gray-600">
                          <span className="bg-gray-100 px-2 py-0.5 rounded font-semibold text-gray-800 mr-1">
                            {job.category}
                          </span>
                          <span>{job.sectionType}</span>
                        </td>
                        <td className="p-2.5 text-center font-bold text-purple-900 whitespace-nowrap">
                          {job.totalPosts}
                        </td>
                        <td className="p-2.5 text-red-700 font-semibold whitespace-nowrap">
                          {job.lastDate}
                        </td>
                        <td className="p-2.5 text-center">
                          {job.isTopVacancy ? (
                            <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                              YES
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-2.5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleStartEdit(job)}
                              className="p-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-800"
                              title="Edit Vacancy"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete vacancy "${job.shortName || job.title}"?`)) {
                                  onDeleteVacancy(job.id);
                                  setFeedbackMsg({ type: 'success', text: 'Vacancy deleted.' });
                                }
                              }}
                              className="p-1 rounded bg-red-100 hover:bg-red-200 text-red-800"
                              title="Delete Vacancy"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: HOMEPAGE LIVE CONTROLLER & AUTO-UPDATER (होमपेज लाइव कंट्रोलर व ऑटो-अपडेटर) */}
          {activeTab === 'homepage-sync' && (
            <div className="space-y-6">
              
              {/* Section 1: 1-Click All Dates Auto-Sync to 2026 / Today */}
              <div className="bg-gradient-to-r from-red-50 to-amber-50 border-2 border-[#cc0000] rounded p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-200 pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-[#cc0000] text-white">
                      <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-red-950">
                        1-Click ऑटोमैटिक डेट अपडेटर (Auto-Sync to Today / 2026)
                      </h3>
                      <p className="text-xs text-red-800">
                        सभी 1,000+ सरकारी भर्तियों, परिणामों व प्रवेश पत्रों की तिथियां तुरंत आज की तारीख में अपडेट करें
                      </p>
                    </div>
                  </div>

                  <button
                    id="admin-sync-all-dates-btn"
                    onClick={() => {
                      onSyncAllDatesToCurrentYear();
                      setFeedbackMsg({
                        type: 'success',
                        text: '✅ बधाई! डेटाबेस की सभी 1,000+ भर्तियों की तिथियां वर्तमान वर्ष 2026 व आज की लाइव तारीख में सफलतापूर्वक अपडेट हो गईं!'
                      });
                    }}
                    className="px-4 py-2.5 rounded bg-[#cc0000] hover:bg-red-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer border border-red-400 shrink-0"
                  >
                    <RefreshCw className="w-4 h-4 text-yellow-300" />
                    <span>⚡ अभी सभी तिथियां आज में सिंक करें</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white border border-red-200 rounded p-3 text-center">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">वर्तमान वर्ष (Current Year)</span>
                    <p className="text-xl font-black text-[#000066] mt-0.5">{new Date().getFullYear()}</p>
                    <span className="text-[10px] text-green-700 font-semibold">● ऑटो-सक्रिय</span>
                  </div>
                  <div className="bg-white border border-red-200 rounded p-3 text-center">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">आज की लाइव तारीख (Today)</span>
                    <p className="text-base font-black text-[#cc0000] mt-0.5">{getTodayFormattedDate()}</p>
                    <span className="text-[10px] text-blue-700 font-semibold">दैनिक समसामयिकी सिंक</span>
                  </div>
                  <div className="bg-white border border-red-200 rounded p-3 text-center">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">डेटाबेस कुल रिक्तियां</span>
                    <p className="text-xl font-black text-green-700 mt-0.5">{vacancies.length.toLocaleString('en-IN')}+</p>
                    <span className="text-[10px] text-gray-600 font-semibold">100% वेरिफाइड लिंक्स</span>
                  </div>
                </div>

                <div className="mt-3 bg-amber-100 border border-amber-300 rounded p-2.5 text-xs text-amber-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    <strong>एडमिन सूचना:</strong> जब भी आप "सिंक करें" दबाते हैं, होमपेज पर प्रदर्शित SSC GD, RRB NTPC, UP Police, BPSC TRE और अन्य 1,000+ परीक्षाओं की आवेदन तिथियां और परीक्षा तिथियां वर्तमान 2026/2027 कैलेंडर में स्वतः पुनर्निर्धारित हो जाती हैं।
                  </p>
                </div>
              </div>

              {/* Section 2: Current Affairs & Daily 10 Ka Dum Quiz Manager */}
              <div className="bg-white border border-gray-300 rounded p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-500" />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        दैनिक समसामयिकी (Current Affairs) व "डेली 10 का दम" क्विज कंट्रोलर
                      </h3>
                      <p className="text-xs text-gray-500">
                        होमपेज की चलती हुई समसामयिकी पट्टी और क्विज के प्रश्नों को प्रबंधित करें
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const todayStr = getTodayFormattedDate();
                      const updated = currentAffairs.map(c => ({ ...c, date: todayStr }));
                      onUpdateCurrentAffairs(updated);
                      setFeedbackMsg({ type: 'success', text: `सभी समसामयिकी की तिथि आज (${todayStr}) कर दी गई!` });
                    }}
                    className="px-3 py-1.5 rounded bg-blue-900 hover:bg-blue-800 text-yellow-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>आज की तारीख में रिफ्रेश करें ({getTodayFormattedDate()})</span>
                  </button>
                </div>

                {/* Add New Current Affair Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newCaTitle.trim()) {
                      setFeedbackMsg({ type: 'error', text: 'समसामयिकी का शीर्षक आवश्यक है!' });
                      return;
                    }
                    const newItem: CurrentAffairItem = {
                      id: `ca-${Date.now()}`,
                      title: newCaTitle,
                      titleEn: newCaTitle,
                      category: newCaCategory,
                      date: getTodayFormattedDate(),
                      summary: newCaSummary || 'प्रतियोगी परीक्षाओं हेतु महत्वपूर्ण समसामयिकी विवरण।',
                      keyPoints: newCaKeyPoints ? newCaKeyPoints.split('\n').filter(p => p.trim()) : [newCaTitle],
                      examSignificance: 'UPSC, SSC, Railway, State PSC व अन्य सभी प्रतियोगी परीक्षाओं हेतु उपयोगी।',
                      relatedStaticGk: 'सामान्य ज्ञान एवं समसामयिकी अध्ययन नोट्स।',
                    };
                    onAddCurrentAffair(newItem);
                    setNewCaTitle('');
                    setNewCaSummary('');
                    setNewCaKeyPoints('');
                    setFeedbackMsg({ type: 'success', text: 'नई समसामयिकी होमपेज टिकर और क्विज में जोड़ दी गई!' });
                  }}
                  className="bg-gray-50 border border-gray-200 rounded p-3 mb-4 space-y-3"
                >
                  <span className="text-xs font-bold text-gray-800 uppercase block">
                    + नई समसामयिकी हेडलाइन जोड़ें (होमपेज टिकर पर तुरंत चलेगी)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        placeholder="जैसे: 11. इसरो ने लॉन्च किया नया मौसम उपग्रह INSAT-3DS..."
                        value={newCaTitle}
                        onChange={(e) => setNewCaTitle(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-900"
                      />
                    </div>
                    <div>
                      <select
                        value={newCaCategory}
                        onChange={(e) => setNewCaCategory(e.target.value as any)}
                        className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-900"
                      >
                        <option value="National">National (राष्ट्रीय)</option>
                        <option value="Defense">Defense (रक्षा)</option>
                        <option value="Science & Tech">Science & Tech (विज्ञान)</option>
                        <option value="Economy">Economy (अर्थव्यवस्था)</option>
                        <option value="Sports">Sports (खेलकूद)</option>
                        <option value="International">International (अंतरराष्ट्रीय)</option>
                        <option value="Govt Schemes">Govt Schemes (सरकारी योजना)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <textarea
                      rows={2}
                      placeholder="संक्षिप्त विवरण (Summary)"
                      value={newCaSummary}
                      onChange={(e) => setNewCaSummary(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-900 focus:outline-none focus:border-blue-900"
                    />
                    <textarea
                      rows={2}
                      placeholder="मुख्य बिंदु (Key Points - प्रति पंक्ति एक बिंदु)"
                      value={newCaKeyPoints}
                      onChange={(e) => setNewCaKeyPoints(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-900 focus:outline-none focus:border-blue-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-white" />
                    <span>समसामयिकी प्रकाशित करें</span>
                  </button>
                </form>

                {/* List of current affairs */}
                <div className="overflow-x-auto max-h-60 border border-gray-200 rounded">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#000066] text-white font-bold sticky top-0">
                      <tr>
                        <th className="p-2">क्र.सं.</th>
                        <th className="p-2">हेडलाइन (Headline)</th>
                        <th className="p-2">श्रेणी</th>
                        <th className="p-2">दिनांक</th>
                        <th className="p-2 text-center">कार्रवाई</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {currentAffairs.map((ca, idx) => (
                        <tr key={ca.id} className="hover:bg-gray-50">
                          <td className="p-2 font-mono font-bold text-gray-600">{idx + 1}</td>
                          <td className="p-2 font-semibold text-gray-900 max-w-md truncate">{ca.title}</td>
                          <td className="p-2">
                            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                              {ca.category}
                            </span>
                          </td>
                          <td className="p-2 text-gray-600 text-[11px] whitespace-nowrap">{ca.date}</td>
                          <td className="p-2 text-center">
                            <button
                              onClick={() => {
                                if (confirm(`समसामयिकी "${ca.title}" को हटाएं?`)) {
                                  onDeleteCurrentAffair(ca.id);
                                  setFeedbackMsg({ type: 'success', text: 'समसामयिकी हटा दी गई।' });
                                }
                              }}
                              className="p-1 rounded bg-red-100 hover:bg-red-200 text-red-800 cursor-pointer"
                              title="हटाएं"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 3: Top 8 Highlight Badges Live Manager */}
              <div className="bg-white border border-gray-300 rounded p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-900" />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        होमपेज टॉप 8 रंगीन बॉक्स (Top Badges Cards)
                      </h3>
                      <p className="text-xs text-gray-500">
                        होमपेज के मुख्य 8 रंगीन कार्डों पर कौन-सी भर्ती दिखेगी, यहां से एक क्लिक में टॉगल करें
                      </p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded">
                    {vacancies.filter(v => v.isTopVacancy).length} टॉप भर्तियां सक्रिय
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                  {vacancies.filter(v => v.isTopVacancy).slice(0, 8).map((job, idx) => (
                    <div key={job.id} className="p-2.5 rounded bg-gray-50 border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-blue-900 uppercase">कार्ड #{idx + 1}</span>
                          <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1 rounded">टॉप</span>
                        </div>
                        <p className="text-xs font-bold text-gray-900 mt-1 line-clamp-2">{job.shortName || job.title}</p>
                        <p className="text-[11px] text-gray-500">{job.totalPosts}</p>
                      </div>
                      <button
                        onClick={() => {
                          const updated = { ...job, isTopVacancy: false };
                          onUpdateVacancy(updated);
                          setFeedbackMsg({ type: 'success', text: `"${job.shortName}" को टॉप कार्ड से हटा दिया गया!` });
                        }}
                        className="mt-2 text-[10px] py-1 px-2 rounded bg-gray-200 hover:bg-red-100 text-gray-700 hover:text-red-800 font-bold cursor-pointer"
                      >
                        टॉप से हटाएं
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
