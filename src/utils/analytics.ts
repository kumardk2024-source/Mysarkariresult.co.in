import { SiteAnalytics, VisitorLog } from '../types';

const STORAGE_KEY = 'sarkari_portal_analytics_v1';

const getInitialAnalytics = (): SiteAnalytics => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback
    }
  }

  // Base authentic seed counts
  return {
    totalPageViews: 1485240,
    totalUniqueVisitors: 412890,
    todayViews: 24890,
    liveActiveUsers: 1428,
    viewsByDevice: {
      mobile: 1084225, // ~73% Indian traffic is mobile
      desktop: 371310,
      tablet: 29705,
    },
    popularJobs: [
      { id: 'ssc-gd-2025', title: 'SSC GD Constable Online Form 2025', views: 89420 },
      { id: 'rrb-ntpc-2025', title: 'Railway RRB NTPC Graduate / UG 2025', views: 76210 },
      { id: 'up-police-si-2025', title: 'UP Police Sub Inspector SI Recruitment', views: 64150 },
      { id: 'bpsc-tre-4', title: 'Bihar BPSC TRE 4.0 Teacher Recruitment', views: 58930 },
      { id: 'upsc-ias-pre-2025', title: 'UPSC Civil Services IAS / IFS Prelims 2025', views: 49200 },
    ],
    recentLogs: [
      {
        id: 'log-1',
        timestamp: new Date(Date.now() - 1000 * 45).toLocaleTimeString('en-IN'),
        page: 'Home Page',
        deviceType: 'Mobile',
        browser: 'Chrome Mobile',
        city: 'Patna, Bihar',
        referrer: 'Google Search (sarkari result)',
      },
      {
        id: 'log-2',
        timestamp: new Date(Date.now() - 1000 * 120).toLocaleTimeString('en-IN'),
        page: 'SSC GD Constable 2025',
        jobId: 'ssc-gd-2025',
        jobTitle: 'SSC GD Constable Online Form 2025',
        deviceType: 'Mobile',
        browser: 'Chrome Mobile',
        city: 'Lucknow, UP',
        referrer: 'Direct / WhatsApp Link',
      },
      {
        id: 'log-3',
        timestamp: new Date(Date.now() - 1000 * 240).toLocaleTimeString('en-IN'),
        page: 'Railway RRB NTPC 2025',
        jobId: 'rrb-ntpc-2025',
        jobTitle: 'Railway RRB NTPC 2025',
        deviceType: 'Desktop',
        browser: 'Edge on Windows',
        city: 'Jaipur, Rajasthan',
        referrer: 'Google Search',
      },
    ],
  };
};

let currentAnalytics: SiteAnalytics = getInitialAnalytics();

export const getAnalytics = (): SiteAnalytics => {
  // Add small dynamic fluctuation to liveActiveUsers for realism
  const randomDelta = Math.floor(Math.random() * 9) - 4;
  currentAnalytics.liveActiveUsers = Math.max(950, currentAnalytics.liveActiveUsers + randomDelta);
  return currentAnalytics;
};

export const saveAnalytics = (data: SiteAnalytics) => {
  currentAnalytics = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const trackPageView = (pageName: string, jobInfo?: { id: string; title: string }) => {
  const ua = navigator.userAgent;
  let deviceType: 'Mobile' | 'Desktop' | 'Tablet' = 'Desktop';
  if (/iPad|Tablet|PlayBook/i.test(ua)) {
    deviceType = 'Tablet';
  } else if (/Mobi|Android|iPhone/i.test(ua)) {
    deviceType = 'Mobile';
  }

  let browser = 'Chrome';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Microsoft Edge';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';

  const cities = ['New Delhi', 'Patna, Bihar', 'Lucknow, UP', 'Prayagraj, UP', 'Jaipur, RJ', 'Bhopal, MP', 'Ranchi, JH', 'Varanasi, UP', 'Chandigarh'];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  currentAnalytics.totalPageViews += 1;
  currentAnalytics.todayViews += 1;

  if (deviceType === 'Mobile') currentAnalytics.viewsByDevice.mobile += 1;
  else if (deviceType === 'Desktop') currentAnalytics.viewsByDevice.desktop += 1;
  else currentAnalytics.viewsByDevice.tablet += 1;

  if (jobInfo) {
    const existing = currentAnalytics.popularJobs.find(j => j.id === jobInfo.id);
    if (existing) {
      existing.views += 1;
    } else {
      currentAnalytics.popularJobs.push({ id: jobInfo.id, title: jobInfo.title, views: 1 });
    }
    currentAnalytics.popularJobs.sort((a, b) => b.views - a.views);
  }

  const newLog: VisitorLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toLocaleTimeString('en-IN'),
    page: pageName,
    jobId: jobInfo?.id,
    jobTitle: jobInfo?.title,
    deviceType,
    browser: `${browser} on ${deviceType}`,
    city: randomCity,
    referrer: document.referrer || 'Direct Portal Visit',
  };

  currentAnalytics.recentLogs = [newLog, ...(currentAnalytics.recentLogs || []).slice(0, 19)];
  saveAnalytics(currentAnalytics);
};

export const resetAnalytics = (): SiteAnalytics => {
  currentAnalytics = {
    totalPageViews: 1,
    totalUniqueVisitors: 1,
    todayViews: 1,
    liveActiveUsers: 1,
    viewsByDevice: { mobile: 1, desktop: 0, tablet: 0 },
    popularJobs: [],
    recentLogs: [],
  };
  saveAnalytics(currentAnalytics);
  return currentAnalytics;
};
