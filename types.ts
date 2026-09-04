export type JobCategory = 
  | 'All'
  | 'SSC' 
  | 'Railway' 
  | 'UPSC' 
  | 'Banking' 
  | 'Defence' 
  | 'Police' 
  | 'Teaching' 
  | 'State PSC' 
  | 'Engineering' 
  | 'Medical' 
  | 'Others';

export type JobSectionType = 
  | 'latest-jobs' 
  | 'result' 
  | 'admit-card' 
  | 'answer-key' 
  | 'syllabus' 
  | 'admission' 
  | 'certificate' 
  | 'important';

export interface DirectLink {
  id: string;
  label: string; // e.g. "Apply Online", "Registration Link", "Official Notification PDF"
  url: string;
  variant?: 'primary' | 'danger' | 'success' | 'warning' | 'info';
  actionNote?: string; // e.g. "Click Here", "Server 1", "Active Soon"
}

export interface PostDetailItem {
  postName: string;
  total: number | string;
  gen?: number | string;
  obc?: number | string;
  ews?: number | string;
  sc?: number | string;
  st?: number | string;
  eligibilityCriteria: string;
}

export interface PhysicalEligibilityItem {
  genderCategory: string; // e.g. "Male (General/OBC/SC)", "Male (ST)", "Female"
  height: string;
  chest: string;
  running: string;
}

export interface VacancyItem {
  id: string;
  title: string;
  shortName: string;
  postName: string;
  advtNo: string;
  department: string;
  category: JobCategory;
  sectionType: JobSectionType;
  totalPosts: number | string;
  postDate: string;
  lastDate: string;
  isTopVacancy?: boolean;
  isNew?: boolean;
  viewsCount: number;
  shortDescription: string;
  
  // Important Dates
  importantDates: {
    applyBegin: string;
    lastDateApply: string;
    lastDateFeePayment: string;
    correctionDate?: string;
    examDate?: string;
    admitCardAvailable?: string;
    answerKeyDate?: string;
    resultAvailable?: string;
  };
  
  // Application Fee
  applicationFee: {
    generalObcEws: string;
    scStPh: string;
    female: string;
    paymentMode: string;
  };

  // Age Limit
  ageLimit: {
    asOnDate: string;
    minAge: string;
    maxAge: string;
    relaxationRules: string;
  };

  // Eligibility Summary
  eligibilitySummary: string;

  // Post & Category Wise Details
  postDetails: PostDetailItem[];

  // Physical standards (optional, for police/defence/forest)
  physicalEligibility?: PhysicalEligibilityItem[];

  // Step-by-step How to apply
  howToApplySteps: string[];

  // Dynamic Direct Links added by Admin or default
  directLinks: DirectLink[];

  officialNotificationUrl?: string;
  officialWebsiteUrl?: string;
}

export interface VisitorLog {
  id: string;
  timestamp: string;
  page: string;
  jobId?: string;
  jobTitle?: string;
  deviceType: 'Mobile' | 'Desktop' | 'Tablet';
  browser: string;
  city?: string;
  referrer: string;
}

export interface SiteAnalytics {
  totalPageViews: number;
  totalUniqueVisitors: number;
  todayViews: number;
  liveActiveUsers: number;
  viewsByDevice: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  popularJobs: Array<{
    id: string;
    title: string;
    views: number;
  }>;
  recentLogs: VisitorLog[];
}
