import { VacancyItem, JobCategory, JobSectionType } from '../types';

export const BASE_SEED_VACANCIES: VacancyItem[] = [
  {
    id: 'ssc-gd-2025',
    title: 'SSC GD Constable in BSF, CISF, CRPF, SSB, ITBP, AR, SSF Online Form 2025',
    shortName: 'SSC GD Constable 2025',
    postName: 'Constable (General Duty) & Rifleman GD',
    advtNo: 'Notice No. HQ-C1101/18/2024-C-1',
    department: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    sectionType: 'latest-jobs',
    totalPosts: '39,481 Posts',
    postDate: '05 September 2025 | 11:20 AM',
    lastDate: '14 October 2025',
    isTopVacancy: true,
    isNew: true,
    viewsCount: 89420,
    shortDescription: 'Staff Selection Commission (SSC) has released the detailed notification for Constable GD in Central Armed Police Forces (CAPFs), SSF, and Rifleman (GD) in Assam Rifles Examination 2025.',
    importantDates: {
      applyBegin: '05/09/2025',
      lastDateApply: '14/10/2025 upto 11:00 PM',
      lastDateFeePayment: '15/10/2025',
      correctionDate: '05 to 07 November 2025',
      examDate: 'January / February 2026',
      admitCardAvailable: 'Before Exam',
      answerKeyDate: 'After Exam',
      resultAvailable: 'Will be notified soon',
    },
    applicationFee: {
      generalObcEws: '₹ 100/-',
      scStPh: '₹ 0/- (Exempted)',
      female: '₹ 0/- (Exempted)',
      paymentMode: 'Debit Card, Credit Card, Net Banking, UPI (BHIM, GPay, Paytm)',
    },
    ageLimit: {
      asOnDate: '01/01/2026',
      minAge: '18 Years',
      maxAge: '23 Years (Candidates born not before 02-01-2003 and not later than 01-01-2008)',
      relaxationRules: 'SC/ST: 5 Years, OBC: 3 Years, Ex-Servicemen: 3 Years as per Govt of India Rules.',
    },
    eligibilitySummary: 'Passed Class 10 (High School / Matriculation) Exam from any recognized Board in India.',
    postDetails: [
      { postName: 'Border Security Force (BSF)', total: '15,654', gen: '6,420', obc: '3,520', ews: '1,560', sc: '2,450', st: '1,704', eligibilityCriteria: 'Class 10 Matric Exam Passed in Any Recognized Board.' },
      { postName: 'Central Industrial Security Force (CISF)', total: '13,632', gen: '5,580', obc: '3,010', ews: '1,360', sc: '2,110', st: '1,572', eligibilityCriteria: 'Class 10 Matric Exam Passed in Any Recognized Board.' },
      { postName: 'Central Reserve Police Force (CRPF)', total: '6,210', gen: '2,540', obc: '1,420', ews: '620', sc: '950', st: '680', eligibilityCriteria: 'Class 10 Matric Exam Passed in Any Recognized Board.' },
      { postName: 'Sashastra Seema Bal (SSB)', total: '1,884', gen: '810', obc: '430', ews: '190', sc: '260', st: '194', eligibilityCriteria: 'Class 10 Matric Exam Passed in Any Recognized Board.' },
      { postName: 'Indo-Tibetan Border Police (ITBP)', total: '1,540', gen: '630', obc: '340', ews: '150', sc: '240', st: '180', eligibilityCriteria: 'Class 10 Matric Exam Passed in Any Recognized Board.' },
      { postName: 'Assam Rifles (AR)', total: '561', gen: '240', obc: '120', ews: '55', sc: '85', st: '61', eligibilityCriteria: 'Class 10 Matric Exam Passed in Any Recognized Board.' },
    ],
    physicalEligibility: [
      { genderCategory: 'Male (General / OBC / SC)', height: '170 CMS', chest: '80-85 CMS', running: '5 KM in 24 Minutes' },
      { genderCategory: 'Male (ST)', height: '162.5 CMS', chest: '76-80 CMS', running: '5 KM in 24 Minutes' },
      { genderCategory: 'Female (General / OBC / SC)', height: '157 CMS', chest: 'Not Applicable', running: '1.6 KM in 8.5 Minutes' },
      { genderCategory: 'Female (ST)', height: '150 CMS', chest: 'Not Applicable', running: '1.6 KM in 8.5 Minutes' },
    ],
    howToApplySteps: [
      'Staff Selection Commission (SSC) Constable GD in BSF, CISF, CRPF, SSB, ITBP, AR, SSF Recruitment 2025. Candidate Can Apply Between 05/09/2025 to 14/10/2025.',
      'Candidate Read the Notification Before Apply the Recruitment Application Form in SSC GD Constable 2025.',
      'Kindly Check and Collect All Document - Eligibility, ID Proof, Address Details, Basic Details.',
      'Kindly Ready Scan Document Related to Recruitment Form - Photo, Sign, ID Proof, Etc. (Note: SSC requires Live Web Camera Photo).',
      'Before Submit the Application Form Must Check the Preview and All Column Carefully.',
      'Take A Print Out of Final Submitted Form for future correspondence.'
    ],
    directLinks: [
      { id: 'dl-1', label: 'Apply Online (Registration / Login)', url: 'https://ssc.gov.in', variant: 'primary', actionNote: 'Click Here' },
      { id: 'dl-2', label: 'Download Official Notification PDF', url: 'https://ssc.gov.in/api/annexure/detailed_notification_gd.pdf', variant: 'danger', actionNote: 'Download PDF' },
      { id: 'dl-3', label: 'Download Exam Syllabus & Pattern', url: 'https://ssc.gov.in', variant: 'info', actionNote: 'Click Here' },
      { id: 'dl-4', label: 'SSC Official Website', url: 'https://ssc.gov.in', variant: 'warning', actionNote: 'Official Website' },
      { id: 'dl-5', label: 'Join Official Telegram Channel', url: 'https://t.me/sarkariresult', variant: 'success', actionNote: 'Join Now' },
    ],
    officialNotificationUrl: 'https://ssc.gov.in/notice',
    officialWebsiteUrl: 'https://ssc.gov.in',
  },
  {
    id: 'rrb-ntpc-2025',
    title: 'Railway RRB NTPC Graduate & Undergraduate Posts Recruitment 2025 Online Form',
    shortName: 'RRB NTPC 2025',
    postName: 'Non-Technical Popular Categories (NTPC)',
    advtNo: 'CEN 05/2024 & CEN 06/2024',
    department: 'Railway Recruitment Boards (RRB)',
    category: 'Railway',
    sectionType: 'latest-jobs',
    totalPosts: '11,558 Posts',
    postDate: '14 September 2025 | 02:40 PM',
    lastDate: '20 October 2025',
    isTopVacancy: true,
    isNew: true,
    viewsCount: 76210,
    shortDescription: 'Government of India, Ministry of Railways, Railway Recruitment Boards (RRBs) have issued notification for various Graduate and Under Graduate posts in Level 2, 3, 5, and 6.',
    importantDates: {
      applyBegin: '14/09/2025',
      lastDateApply: '20/10/2025',
      lastDateFeePayment: '22/10/2025',
      correctionDate: '23 to 30 October 2025',
      examDate: 'December 2025 / January 2026',
      admitCardAvailable: '4 Days Before Exam',
      answerKeyDate: 'Will be notified soon',
      resultAvailable: 'Will be notified soon',
    },
    applicationFee: {
      generalObcEws: '₹ 500/- (₹400 refunded after appearing in CBT-1)',
      scStPh: '₹ 250/- (₹250 refunded after appearing in CBT-1)',
      female: '₹ 250/- (All Category Female, Full Refunded)',
      paymentMode: 'Net Banking, Credit Card, Debit Card, UPI',
    },
    ageLimit: {
      asOnDate: '01/01/2026',
      minAge: '18 Years',
      maxAge: '33 Years (UG Posts: 18-30 Yrs, Graduate Posts: 18-36 Yrs with 3-year COVID relaxation)',
      relaxationRules: 'OBC: 3 Years, SC/ST: 5 Years as per Railway rules.',
    },
    eligibilitySummary: 'Undergraduate Posts: 10+2 (Intermediate) with 50% Marks. Graduate Posts: Bachelor Degree in Any Stream from a Recognized University.',
    postDetails: [
      { postName: 'Station Master (Level 6)', total: '994', gen: '412', obc: '268', ews: '99', sc: '149', st: '66', eligibilityCriteria: 'Bachelor Degree in Any Stream with Computer Based Aptitude Test (CBAT).' },
      { postName: 'Goods Train Manager (Level 5)', total: '3,144', gen: '1,310', obc: '840', ews: '314', sc: '470', st: '210', eligibilityCriteria: 'Bachelor Degree in Any Stream.' },
      { postName: 'Senior Commercial cum Ticket Clerk', total: '1,736', gen: '720', obc: '468', ews: '173', sc: '260', st: '115', eligibilityCriteria: 'Bachelor Degree in Any Stream.' },
      { postName: 'Commercial cum Ticket Clerk (Level 3)', total: '2,022', gen: '840', obc: '540', ews: '202', sc: '305', st: '135', eligibilityCriteria: '10+2 Intermediate Exam with 50% Marks.' },
      { postName: 'Junior Clerk cum Typist (Level 2)', total: '990', gen: '410', obc: '270', ews: '99', sc: '148', st: '63', eligibilityCriteria: '10+2 Intermediate with English 30 WPM or Hindi 25 WPM Typing.' },
    ],
    howToApplySteps: [
      'Candidates can apply online through any official RRB zonal portal between 14/09/2025 to 20/10/2025.',
      'Only one online application is required per candidate across all RRBs.',
      'Upload valid scanned passport photograph and signature.',
      'Verify bank details carefully for fee refund processing.',
      'Submit the form and take a printout of confirmation page.'
    ],
    directLinks: [
      { id: 'rrb-1', label: 'Apply Online (Graduate Posts)', url: 'https://www.rrbapply.gov.in', variant: 'primary', actionNote: 'Apply Link' },
      { id: 'rrb-2', label: 'Apply Online (Undergraduate Posts)', url: 'https://www.rrbapply.gov.in', variant: 'primary', actionNote: 'Apply Link' },
      { id: 'rrb-3', label: 'Download Graduate Notification PDF', url: 'https://www.rrbapply.gov.in', variant: 'danger', actionNote: 'Notification' },
      { id: 'rrb-4', label: 'RRB Official Website', url: 'https://indianrailways.gov.in', variant: 'warning', actionNote: 'Website' },
    ],
    officialNotificationUrl: 'https://www.rrbapply.gov.in',
    officialWebsiteUrl: 'https://indianrailways.gov.in',
  },
  {
    id: 'up-police-si-2025',
    title: 'UP Police Sub Inspector SI & Platoon Commander Recruitment 2025 Online Form',
    shortName: 'UP Police SI 2025',
    postName: 'Sub Inspector (Civil Police) & Platoon Commander PAC',
    advtNo: 'PRPB-1(3)/2025-SI',
    department: 'Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB)',
    category: 'Police',
    sectionType: 'latest-jobs',
    totalPosts: '4,242 Posts',
    postDate: '01 September 2025 | 09:15 AM',
    lastDate: '30 September 2025',
    isTopVacancy: true,
    isNew: true,
    viewsCount: 64150,
    shortDescription: 'Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB, Lucknow) has invited online applications for the recruitment of Sub Inspector (SI) and Platoon Commander.',
    importantDates: {
      applyBegin: '01/09/2025',
      lastDateApply: '30/09/2025',
      lastDateFeePayment: '30/09/2025',
      correctionDate: '01 to 05 October 2025',
      examDate: 'November 2025',
      admitCardAvailable: '10 Days Before Exam',
    },
    applicationFee: {
      generalObcEws: '₹ 400/-',
      scStPh: '₹ 400/- (All Category)',
      female: '₹ 400/-',
      paymentMode: 'E-Challan or Online Debit/Credit Card/UPI',
    },
    ageLimit: {
      asOnDate: '01/07/2025',
      minAge: '21 Years',
      maxAge: '28 Years',
      relaxationRules: 'Age Relaxation Extra for SC / ST / OBC Candidates as per UP Police rules.',
    },
    eligibilitySummary: 'Bachelor Degree in Any Stream from Any Recognized University in India.',
    postDetails: [
      { postName: 'Sub Inspector (Civil Police)', total: '3,820', gen: '1,530', obc: '1,031', ews: '382', sc: '802', st: '75', eligibilityCriteria: 'Bachelor Degree in Any Stream.' },
      { postName: 'Platoon Commander (PAC)', total: '422', gen: '170', obc: '114', ews: '42', sc: '88', st: '8', eligibilityCriteria: 'Bachelor Degree in Any Stream.' },
    ],
    physicalEligibility: [
      { genderCategory: 'Male (Gen/OBC/SC)', height: '168 CMS', chest: '79-84 CMS', running: '4.8 KM in 28 Minutes' },
      { genderCategory: 'Male (ST)', height: '160 CMS', chest: '77-82 CMS', running: '4.8 KM in 28 Minutes' },
      { genderCategory: 'Female (Gen/OBC/SC)', height: '152 CMS', chest: 'Not Applicable (Min Weight 40 KG)', running: '2.4 KM in 16 Minutes' },
      { genderCategory: 'Female (ST)', height: '147 CMS', chest: 'Not Applicable (Min Weight 40 KG)', running: '2.4 KM in 16 Minutes' },
    ],
    howToApplySteps: [
      'Visit the official website of UPPRPB at uppbpb.gov.in.',
      'Complete One Time Registration (OTR) if not already done.',
      'Upload high-quality photograph with light background.',
      'Fill in educational qualification details and academic marks.',
      'Pay application fee through SBI e-pay and keep receipt.'
    ],
    directLinks: [
      { id: 'up-1', label: 'Apply Online', url: 'https://uppbpb.gov.in', variant: 'primary', actionNote: 'Click Here' },
      { id: 'up-2', label: 'Download Detailed Notification', url: 'https://uppbpb.gov.in', variant: 'danger', actionNote: 'PDF Download' },
      { id: 'up-3', label: 'UP Police Official Website', url: 'https://uppbpb.gov.in', variant: 'warning', actionNote: 'Visit' },
    ],
    officialNotificationUrl: 'https://uppbpb.gov.in',
    officialWebsiteUrl: 'https://uppbpb.gov.in',
  },
  {
    id: 'bpsc-tre-4',
    title: 'Bihar BPSC School Teacher TRE 4.0 Recruitment 2025 Online Form',
    shortName: 'Bihar BPSC TRE 4.0',
    postName: 'Primary, Middle, Secondary & Higher Secondary Teacher',
    advtNo: 'Advt No. 28/2025',
    department: 'Bihar Public Service Commission (BPSC)',
    category: 'Teaching',
    sectionType: 'latest-jobs',
    totalPosts: '87,000+ Posts',
    postDate: '10 September 2025 | 04:30 PM',
    lastDate: '25 October 2025',
    isTopVacancy: true,
    isNew: true,
    viewsCount: 58930,
    shortDescription: 'Bihar Public Service Commission (BPSC, Patna) has issued notice for Bihar School Teacher TRE 4.0 Examination for Class 1 to 5, 6 to 8, 9 to 10, and 11 to 12.',
    importantDates: {
      applyBegin: '10/09/2025',
      lastDateApply: '25/10/2025',
      lastDateFeePayment: '25/10/2025',
      examDate: 'November 2025',
      admitCardAvailable: '1 Week Before Exam',
    },
    applicationFee: {
      generalObcEws: '₹ 750/-',
      scStPh: '₹ 200/- (Bihar Domicile)',
      female: '₹ 200/- (Bihar Domicile All Female)',
      paymentMode: 'Online Net Banking, Debit Card, Credit Card',
    },
    ageLimit: {
      asOnDate: '01/08/2025',
      minAge: '18 Years for Primary, 21 Years for Secondary/Sr Secondary',
      maxAge: '37 Years (Male), 40 Years (Female/OBC/BC), 42 Years (SC/ST)',
      relaxationRules: 'As per BPSC Teacher Recruitment Rules.',
    },
    eligibilitySummary: 'Class 1-5: 10+2 with D.El.Ed & CTET/BTET Paper 1. Class 6-8: Graduation with B.Ed / D.El.Ed & CTET Paper 2. Class 9-10: Graduation with B.Ed & STET Paper 1. Class 11-12: Post Graduation with B.Ed & STET Paper 2.',
    postDetails: [
      { postName: 'Primary Teacher (Class 1-5)', total: '25,000+', eligibilityCriteria: '10+2 with 50% Marks and 2-Year Diploma in Elementary Education & CTET Paper 1.' },
      { postName: 'Middle School Teacher (Class 6-8)', total: '19,000+', eligibilityCriteria: 'Bachelor Degree with 2-Year D.El.Ed OR B.Ed with CTET / BTET Paper 2.' },
      { postName: 'Secondary Teacher (Class 9-10)', total: '22,000+', eligibilityCriteria: 'Bachelor Degree in Related Subject with B.Ed & Bihar STET Paper 1.' },
      { postName: 'Higher Secondary Teacher (Class 11-12)', total: '21,000+', eligibilityCriteria: 'Master Degree in Related Subject with B.Ed & Bihar STET Paper 2.' },
    ],
    howToApplySteps: [
      'Open BPSC official online portal onlinebpsc.bihar.gov.in.',
      'Register with candidate mobile number and active email ID.',
      'Fill academic details, CTET/STET roll number, certificate number.',
      'Upload live webcam photograph with clear background.',
      'Review carefully and submit fee.'
    ],
    directLinks: [
      { id: 'bpsc-1', label: 'Apply Online', url: 'https://onlinebpsc.bihar.gov.in', variant: 'primary', actionNote: 'Click Here' },
      { id: 'bpsc-2', label: 'Download Notification', url: 'https://www.bpsc.bih.nic.in', variant: 'danger', actionNote: 'PDF' },
      { id: 'bpsc-3', label: 'BPSC Official Website', url: 'https://www.bpsc.bih.nic.in', variant: 'warning', actionNote: 'Portal' },
    ],
    officialNotificationUrl: 'https://www.bpsc.bih.nic.in',
    officialWebsiteUrl: 'https://www.bpsc.bih.nic.in',
  },
  {
    id: 'upsc-ias-pre-2025',
    title: 'UPSC Civil Services (IAS) & Indian Forest Service (IFS) Pre 2025 Online Form',
    shortName: 'UPSC IAS / IFS 2025',
    postName: 'Indian Administrative Service & Indian Forest Service',
    advtNo: '05/2025-CSP & 06/2025-IFS',
    department: 'Union Public Service Commission (UPSC)',
    category: 'UPSC',
    sectionType: 'latest-jobs',
    totalPosts: '1,056 Posts',
    postDate: '01 February 2025 | 01:00 PM',
    lastDate: '05 March 2025',
    isTopVacancy: true,
    isNew: false,
    viewsCount: 49200,
    shortDescription: 'Union Public Service Commission has invited online applications through One Time Registration (OTR) for the prestigious Civil Services Examination and Forest Services.',
    importantDates: {
      applyBegin: '01/02/2025',
      lastDateApply: '05/03/2025 upto 06:00 PM',
      lastDateFeePayment: '05/03/2025',
      correctionDate: '06 to 12 March 2025',
      examDate: '25 May 2025',
      admitCardAvailable: 'May 2025',
    },
    applicationFee: {
      generalObcEws: '₹ 100/-',
      scStPh: '₹ 0/- (Exempted)',
      female: '₹ 0/- (All Female Exempted)',
      paymentMode: 'Net Banking, Debit/Credit Card, UPI, or SBI Challan',
    },
    ageLimit: {
      asOnDate: '01/08/2025',
      minAge: '21 Years',
      maxAge: '32 Years',
      relaxationRules: 'OBC: 3 Years (Max 9 attempts), SC/ST: 5 Years (Unlimited attempts), PwBD: 10 Years.',
    },
    eligibilitySummary: 'IAS: Bachelor Degree in Any Stream. IFS: Bachelor Degree with at least one subject namely Animal Husbandry, Botany, Chemistry, Geology, Mathematics, Physics, Statistics and Zoology or Bachelor in Agriculture/Forestry/Engineering.',
    postDetails: [
      { postName: 'Indian Administrative Service (IAS / IPS / IFS / IRS etc)', total: '906', eligibilityCriteria: 'Bachelor Degree in Any Stream from Recognized University.' },
      { postName: 'Indian Forest Service (IFS)', total: '150', eligibilityCriteria: 'Bachelor Degree with Animal Husbandry, Botany, Chemistry, Geology, Maths, Physics, etc.' },
    ],
    howToApplySteps: [
      'Fill UPSC OTR (One Time Registration) at upsconline.nic.in.',
      'Login with mobile OTP or email OTP.',
      'Fill Civil Services Pre examination application form.',
      'Select exam center preferences.',
      'Pay fee and save final PDF.'
    ],
    directLinks: [
      { id: 'upsc-1', label: 'Apply Online (OTR Login)', url: 'https://upsconline.nic.in', variant: 'primary', actionNote: 'Click Here' },
      { id: 'upsc-2', label: 'Download IAS Notification', url: 'https://upsc.gov.in', variant: 'danger', actionNote: 'Download PDF' },
      { id: 'upsc-3', label: 'Download IFS Notification', url: 'https://upsc.gov.in', variant: 'danger', actionNote: 'Download PDF' },
      { id: 'upsc-4', label: 'UPSC Official Website', url: 'https://upsc.gov.in', variant: 'warning', actionNote: 'Official Site' },
    ],
    officialNotificationUrl: 'https://upsc.gov.in',
    officialWebsiteUrl: 'https://upsc.gov.in',
  },
  // ADMIT CARDS
  {
    id: 'ssc-cgl-admit-card-2025',
    title: 'SSC CGL Tier 1 Admit Card / Application Status 2025 (All Regions)',
    shortName: 'SSC CGL Admit Card',
    postName: 'Combined Graduate Level Examination (Tier-I)',
    advtNo: 'SSC-CGL-2024-25',
    department: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    sectionType: 'admit-card',
    totalPosts: '17,727 Posts',
    postDate: '02 September 2025 | 10:00 AM',
    lastDate: 'Examination Date',
    isTopVacancy: true,
    isNew: true,
    viewsCount: 61200,
    shortDescription: 'SSC has activated the Application Status and Admit Card download links for CGL Tier 1 exam for NR, CR, ER, WR, SR, KKR, NER, NWR, MPR regions.',
    importantDates: {
      applyBegin: 'Completed',
      lastDateApply: 'Completed',
      lastDateFeePayment: 'Completed',
      examDate: '09 to 26 September 2025',
      admitCardAvailable: 'Available Now',
    },
    applicationFee: {
      generalObcEws: 'No Fee for Admit Card',
      scStPh: 'No Fee',
      female: 'No Fee',
      paymentMode: 'N/A',
    },
    ageLimit: {
      asOnDate: '01/08/2024',
      minAge: '18 Years',
      maxAge: '32 Years',
      relaxationRules: 'As per SSC rules',
    },
    eligibilitySummary: 'Bachelor Degree in Any Stream.',
    postDetails: [
      { postName: 'CGL Tier-I Examination', total: '17,727', eligibilityCriteria: 'Eligible candidates who filled online application.' }
    ],
    howToApplySteps: [
      'Click on your respective SSC Region link below (CR, NR, ER, WR, etc.).',
      'Enter your Registration Number and Date of Birth (DOB).',
      'Or enter your Name, Father Name and Date of Birth.',
      'Click Submit to view exam city, shift timing and download Hall Ticket.'
    ],
    directLinks: [
      { id: 'ac-1', label: 'Download Admit Card (CR Region - UP & Bihar)', url: 'https://www.ssc-cr.org', variant: 'primary', actionNote: 'Click Here' },
      { id: 'ac-2', label: 'Download Admit Card (NR Region - Delhi, Raj, UK)', url: 'https://sscnr.nic.in', variant: 'primary', actionNote: 'Click Here' },
      { id: 'ac-3', label: 'Download Admit Card (Other Regions)', url: 'https://ssc.gov.in', variant: 'info', actionNote: 'All Regions' },
      { id: 'ac-4', label: 'SSC Official Portal', url: 'https://ssc.gov.in', variant: 'warning', actionNote: 'Official Website' },
    ],
  },
  {
    id: 'rrb-alp-cbt1-admit-card',
    title: 'Railway RRB ALP Assistant Loco Pilot CBT 1 Admit Card / Exam City 2025',
    shortName: 'RRB ALP Admit Card',
    postName: 'Assistant Loco Pilot (ALP)',
    advtNo: 'CEN 01/2024',
    department: 'Railway Recruitment Boards (RRBs)',
    category: 'Railway',
    sectionType: 'admit-card',
    totalPosts: '18,799 Posts',
    postDate: '04 September 2025 | 12:30 PM',
    lastDate: 'Exam Date',
    isTopVacancy: true,
    isNew: true,
    viewsCount: 54100,
    shortDescription: 'RRB has released the City Intimation Slip and E-Call Letter for Assistant Loco Pilot (ALP) Computer Based Test (CBT-1).',
    importantDates: {
      applyBegin: 'Completed',
      lastDateApply: 'Completed',
      lastDateFeePayment: 'Completed',
      examDate: '25 to 29 November 2025',
      admitCardAvailable: 'Active Now',
    },
    applicationFee: { generalObcEws: '₹ 0/-', scStPh: '₹ 0/-', female: '₹ 0/-', paymentMode: 'N/A' },
    ageLimit: { asOnDate: '01/07/2024', minAge: '18 Years', maxAge: '33 Years', relaxationRules: 'As per rules' },
    eligibilitySummary: 'Class 10 Matric with ITI in related trade or Diploma / Degree in Mechanical / Electrical / Electronics / Automobile Engineering.',
    postDetails: [{ postName: 'Assistant Loco Pilot', total: '18,799', eligibilityCriteria: 'Matric + ITI or Engineering Diploma' }],
    howToApplySteps: [
      'Visit the RRB login page.',
      'Enter your Registered Mobile/Email & Password.',
      'View Exam Date and City Intimation.',
      'Download e-Call letter 4 days prior to your test date.'
    ],
    directLinks: [
      { id: 'alp-1', label: 'Download Admit Card / Exam City', url: 'https://www.rrbapply.gov.in', variant: 'primary', actionNote: 'Click Here' },
      { id: 'alp-2', label: 'Official RRB Portal', url: 'https://indianrailways.gov.in', variant: 'warning', actionNote: 'Official Website' },
    ],
  },
  // RESULTS
  {
    id: 'upsc-civil-services-final-result-2024',
    title: 'UPSC Civil Services IAS / IFS Final Result & Marks 2024-25 Declared',
    shortName: 'UPSC IAS Final Result',
    postName: 'Indian Administrative Service, IPS & Central Services',
    advtNo: 'UPSC-CS-2024-FINAL',
    department: 'Union Public Service Commission (UPSC)',
    category: 'UPSC',
    sectionType: 'result',
    totalPosts: '1,016 Candidates Recommended',
    postDate: '03 September 2025 | 03:30 PM',
    lastDate: 'Archived',
    isTopVacancy: true,
    isNew: true,
    viewsCount: 92300,
    shortDescription: 'Union Public Service Commission has officially declared the Final Result and Merit List of candidates recommended for appointment to IAS, IFS, IPS and Central Services Group A & B.',
    importantDates: {
      applyBegin: '14/02/2024',
      lastDateApply: '05/03/2024',
      lastDateFeePayment: '05/03/2024',
      examDate: 'Prelims: May 2024 | Mains: Sep 2024',
      resultAvailable: 'Declared on Official Portal',
    },
    applicationFee: { generalObcEws: '₹ 0/-', scStPh: '₹ 0/-', female: '₹ 0/-', paymentMode: 'N/A' },
    ageLimit: { asOnDate: '01/08/2024', minAge: '21 Years', maxAge: '32 Years', relaxationRules: 'Standard UPSC rules' },
    eligibilitySummary: 'Bachelor Degree in Any Stream.',
    postDetails: [{ postName: 'Civil Services Recommended Candidates', total: '1,016', eligibilityCriteria: 'Qualified Interview' }],
    howToApplySteps: [
      'Click on the "Download Final Result PDF" link given below.',
      'Open the PDF document.',
      'Press Ctrl + F (or Search on mobile) and type your Roll Number or Name.',
      'Check your All India Rank (AIR) and allocated service category.'
    ],
    directLinks: [
      { id: 'res-1', label: 'Download Final Result PDF (With Names & Ranks)', url: 'https://upsc.gov.in/sites/default/files/Final-Result-CSM-2024-engl-160424.pdf', variant: 'danger', actionNote: 'PDF List' },
      { id: 'res-2', label: 'Download Toppers Marks / Cutoff List', url: 'https://upsc.gov.in', variant: 'primary', actionNote: 'Click Here' },
      { id: 'res-3', label: 'UPSC Official Website', url: 'https://upsc.gov.in', variant: 'warning', actionNote: 'Official Website' },
    ],
  },
  {
    id: 'ssc-chsl-tier1-result-2025',
    title: 'SSC CHSL 10+2 Tier I Result & Cutoff Marks 2025 Declared',
    shortName: 'SSC CHSL Tier 1 Result',
    postName: 'Lower Division Clerk (LDC), JSA, Data Entry Operator (DEO)',
    advtNo: 'SSC-CHSL-2024-25',
    department: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    sectionType: 'result',
    totalPosts: '3,712 Posts',
    postDate: '02 September 2025 | 06:15 PM',
    lastDate: 'Archived',
    isTopVacancy: true,
    isNew: true,
    viewsCount: 48900,
    shortDescription: 'Staff Selection Commission (SSC) has released the Computer Based Examination (Tier-I) result for Combined Higher Secondary (10+2) Level Examination 2024-25.',
    importantDates: {
      applyBegin: '08/04/2024',
      lastDateApply: '07/05/2024',
      lastDateFeePayment: '08/05/2024',
      examDate: 'July 2024',
      resultAvailable: 'Available Now',
    },
    applicationFee: { generalObcEws: '₹ 0/-', scStPh: '₹ 0/-', female: '₹ 0/-', paymentMode: 'N/A' },
    ageLimit: { asOnDate: '01/08/2024', minAge: '18 Years', maxAge: '27 Years', relaxationRules: 'As per SSC rules' },
    eligibilitySummary: 'Class 12th Intermediate Passed from Recognized Board in India.',
    postDetails: [{ postName: 'CHSL Tier 1 Qualified Candidates for Tier 2', total: '39,835', eligibilityCriteria: 'Qualified Tier 1 CBT' }],
    howToApplySteps: [
      'Download List 1 / List 2 Result PDF from links below.',
      'Find your Roll Number in the Merit list.',
      'Check Tier 1 Cutoff marks category wise (UR, OBC, SC, ST, EWS).',
      'Start preparing for Tier 2 descriptive / typing test.'
    ],
    directLinks: [
      { id: 'chsl-1', label: 'Download Result List 1 (DEO)', url: 'https://ssc.gov.in', variant: 'danger', actionNote: 'PDF List' },
      { id: 'chsl-2', label: 'Download Result List 2 (LDC / JSA)', url: 'https://ssc.gov.in', variant: 'danger', actionNote: 'PDF List' },
      { id: 'chsl-3', label: 'Download Category-wise Cutoff Marks', url: 'https://ssc.gov.in', variant: 'info', actionNote: 'Cutoff PDF' },
      { id: 'chsl-4', label: 'SSC Official Portal', url: 'https://ssc.gov.in', variant: 'warning', actionNote: 'Official Site' },
    ],
  },
  // ANSWER KEY
  {
    id: 'neet-ug-answer-key-2025',
    title: 'NTA NEET UG Official Answer Key & OMR Sheet 2025 with Challenge Link',
    shortName: 'NTA NEET UG Answer Key',
    postName: 'National Eligibility Cum Entrance Test (UG)',
    advtNo: 'NTA-NEET-UG-2025',
    department: 'National Testing Agency (NTA)',
    category: 'Medical',
    sectionType: 'answer-key',
    totalPosts: 'Medical MBBS / BDS Seats',
    postDate: '30 August 2025 | 01:20 PM',
    lastDate: 'Challenge Last Date',
    isTopVacancy: false,
    isNew: true,
    viewsCount: 42100,
    shortDescription: 'National Testing Agency has displayed the scanned images of OMR Answer Sheets and official Answer Keys for candidates who appeared in NEET UG.',
    importantDates: {
      applyBegin: 'February 2025',
      lastDateApply: 'March 2025',
      lastDateFeePayment: 'March 2025',
      examDate: '04 May 2025',
      answerKeyDate: 'Released Now',
    },
    applicationFee: { generalObcEws: '₹ 200/- per challenged question', scStPh: '₹ 200/- per challenged question', female: '₹ 200/-', paymentMode: 'Online' },
    ageLimit: { asOnDate: '31/12/2025', minAge: '17 Years', maxAge: 'No Upper Age Limit', relaxationRules: 'N/A' },
    eligibilitySummary: 'Passed or Appearing 10+2 Intermediate with Physics, Chemistry, Biology / Biotechnology and English.',
    postDetails: [{ postName: 'NEET UG 2025', total: 'Over 24 Lakh Aspirants', eligibilityCriteria: '10+2 with PCB' }],
    howToApplySteps: [
      'Visit neet.nta.nic.in.',
      'Login with Application Number and Password / Date of Birth.',
      'Click on "View / Challenge Answer Key" and "View OMR Sheet".',
      'Select questioned question and upload supporting documentation if challenging.'
    ],
    directLinks: [
      { id: 'neet-1', label: 'Download Provisional Answer Key & OMR', url: 'https://neet.nta.nic.in', variant: 'primary', actionNote: 'Click Here' },
      { id: 'neet-2', label: 'Online Answer Key Challenge Link', url: 'https://neet.nta.nic.in', variant: 'danger', actionNote: 'Submit Challenge' },
      { id: 'neet-3', label: 'NTA Official Website', url: 'https://nta.ac.in', variant: 'warning', actionNote: 'Official Website' },
    ],
  },
  // SYLLABUS
  {
    id: 'ssc-cgl-syllabus-2025',
    title: 'SSC CGL Tier 1 & Tier 2 Detailed Subject-Wise Syllabus & Exam Pattern 2025',
    shortName: 'SSC CGL Syllabus 2025',
    postName: 'Combined Graduate Level (CGL) Syllabus',
    advtNo: 'SSC-SYLLABUS-CGL',
    department: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    sectionType: 'syllabus',
    totalPosts: 'All Graduate Posts',
    postDate: '15 August 2025',
    lastDate: 'Current Exam Session',
    isTopVacancy: false,
    isNew: false,
    viewsCount: 29800,
    shortDescription: 'Complete chapter-wise syllabus for SSC CGL Tier 1 & Tier 2: Quantitative Aptitude, General Intelligence & Reasoning, English Comprehension, and General Awareness.',
    importantDates: {
      applyBegin: 'N/A',
      lastDateApply: 'N/A',
      lastDateFeePayment: 'N/A',
      examDate: 'Annual Examination',
    },
    applicationFee: { generalObcEws: 'Free Download', scStPh: 'Free', female: 'Free', paymentMode: 'N/A' },
    ageLimit: { asOnDate: 'N/A', minAge: '18 Years', maxAge: '32 Years', relaxationRules: 'Standard' },
    eligibilitySummary: 'Bachelor Degree in any stream.',
    postDetails: [{ postName: 'Tier 1 & Tier 2 Exam Scheme', total: 'Full Pattern', eligibilityCriteria: 'All registered candidates' }],
    howToApplySteps: [
      'Download the Syllabus PDF from the link below.',
      'Check subject-wise weightage and negative marking scheme (0.50 marks for Tier 1).',
      'Practice previous year question papers.'
    ],
    directLinks: [
      { id: 'syl-1', label: 'Download SSC CGL Syllabus PDF in Hindi & English', url: 'https://ssc.gov.in', variant: 'primary', actionNote: 'PDF Download' },
      { id: 'syl-2', label: 'Download Previous 5 Year Papers', url: 'https://ssc.gov.in', variant: 'info', actionNote: 'Free Download' },
    ],
  },
  // ADMISSION
  {
    id: 'cuet-ug-admission-2025',
    title: 'NTA CUET UG 2025 Entrance Test Online Form for Central & State Universities Admission',
    shortName: 'CUET UG Admission 2025',
    postName: 'Common University Entrance Test (CUET UG)',
    advtNo: 'CUET-UG-2025-NTA',
    department: 'National Testing Agency (NTA)',
    category: 'Others',
    sectionType: 'admission',
    totalPosts: 'Central Universities Admission',
    postDate: '28 August 2025 | 11:00 AM',
    lastDate: '30 October 2025',
    isTopVacancy: false,
    isNew: true,
    viewsCount: 38200,
    shortDescription: 'National Testing Agency invites online applications for Common University Entrance Test (CUET-UG) for admission in Delhi University, BHU, JNU, AMU, Jamia, and 250+ other universities.',
    importantDates: {
      applyBegin: '28/08/2025',
      lastDateApply: '30/10/2025 upto 09:50 PM',
      lastDateFeePayment: '30/10/2025',
      examDate: 'May / June 2026',
    },
    applicationFee: { generalObcEws: '₹ 1000/- (Up to 3 subjects)', scStPh: '₹ 800/-', female: '₹ 900/-', paymentMode: 'Online Debit/Credit/Net Banking/UPI' },
    ageLimit: { asOnDate: 'No Age Limit', minAge: 'No Limit', maxAge: 'No Limit', relaxationRules: 'Subject to university rules' },
    eligibilitySummary: 'Passed or Appearing Class 12 (Intermediate) Exam in 2025 from any recognized board in India.',
    postDetails: [{ postName: 'CUET UG Entrance for BA, BSc, BCom, BTech', total: '250+ Universities', eligibilityCriteria: 'Class 12th in relevant subjects' }],
    howToApplySteps: [
      'Visit cuetug.ntaonline.in.',
      'Register with Aadhaar / Digilocker verification.',
      'Select University and Degree program combinations.',
      'Select Domain subjects, Language and General Test papers.',
      'Pay fee and save confirmation.'
    ],
    directLinks: [
      { id: 'cuet-1', label: 'Apply Online Registration / Login', url: 'https://cuetug.ntaonline.in', variant: 'primary', actionNote: 'Click Here' },
      { id: 'cuet-2', label: 'Download Information Bulletin PDF', url: 'https://exams.nta.ac.in/CUET-UG/', variant: 'danger', actionNote: 'Download PDF' },
      { id: 'cuet-3', label: 'CUET Official Portal', url: 'https://exams.nta.ac.in/CUET-UG/', variant: 'warning', actionNote: 'Portal' },
    ],
  },
  // CERTIFICATE VERIFICATION
  {
    id: 'aadhaar-pan-link-status',
    title: 'Aadhaar Card - PAN Card Link Online Status & Correction 2025',
    shortName: 'PAN Aadhaar Link Status',
    postName: 'Aadhaar PAN Seeding Status',
    advtNo: 'INCOME-TAX-E-FILING-2025',
    department: 'Income Tax Department (CBDT)',
    category: 'Others',
    sectionType: 'certificate',
    totalPosts: 'All Taxpayers & Citizens',
    postDate: '01 September 2025',
    lastDate: 'Ongoing',
    isTopVacancy: false,
    isNew: false,
    viewsCount: 31400,
    shortDescription: 'Check online whether your PAN card is linked with Aadhaar number or pay late fee of ₹1000 to link Aadhaar with PAN.',
    importantDates: { applyBegin: 'Active', lastDateApply: 'Continuous', lastDateFeePayment: 'Online', examDate: 'N/A' },
    applicationFee: { generalObcEws: '₹ 1000/- (Penalty Fee if not linked)', scStPh: '₹ 1000/-', female: '₹ 1000/-', paymentMode: 'e-Pay Tax Challan ITNS 280 / Major Head 0021' },
    ageLimit: { asOnDate: 'N/A', minAge: 'All Ages', maxAge: 'All Ages', relaxationRules: 'N/A' },
    eligibilitySummary: 'All Indian citizens possessing both PAN Card and Aadhaar Card.',
    postDetails: [{ postName: 'PAN Aadhaar Linking Service', total: 'Pan India', eligibilityCriteria: 'Valid PAN & Aadhaar Number' }],
    howToApplySteps: [
      'Click on Check Link Status below.',
      'Enter your 10-digit PAN Number and 12-digit Aadhaar Number.',
      'Click "View Link Aadhaar Status".',
      'If not linked, click Link Aadhaar, pay ₹1000 challan and complete linking.'
    ],
    directLinks: [
      { id: 'pan-1', label: 'Check Aadhaar PAN Link Status', url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status', variant: 'primary', actionNote: 'Check Status' },
      { id: 'pan-2', label: 'Link Aadhaar Online Now', url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar', variant: 'danger', actionNote: 'Click Here' },
      { id: 'pan-3', label: 'Income Tax Official Portal', url: 'https://www.incometax.gov.in', variant: 'warning', actionNote: 'Official Website' },
    ],
  },
  // IMPORTANT
  {
    id: 'up-scholarship-online-2025',
    title: 'UP Scholarship 2025-26 Online Form for Pre & Post Matric / Dashmottar Students',
    shortName: 'UP Scholarship 2025',
    postName: 'Pre-Matric (9th & 10th) and Post-Matric (11th, 12th, UG, PG, Diploma)',
    advtNo: 'UP-SCHOLARSHIP-2025-26',
    department: 'Social Welfare Department, Uttar Pradesh',
    category: 'Others',
    sectionType: 'important',
    totalPosts: 'All Eligible Students in UP',
    postDate: '01 September 2025 | 11:45 AM',
    lastDate: '31 December 2025',
    isTopVacancy: false,
    isNew: true,
    viewsCount: 45300,
    shortDescription: 'Government of Uttar Pradesh has initiated the online application for Pre-Matric and Post-Matric Scholarship Scheme for SC, ST, OBC, General, and Minority community students.',
    importantDates: {
      applyBegin: '01/07/2025',
      lastDateApply: '31/12/2025',
      lastDateFeePayment: 'No Fee',
      correctionDate: 'January 2026',
    },
    applicationFee: { generalObcEws: '₹ 0/- (Free)', scStPh: '₹ 0/- (Free)', female: '₹ 0/- (Free)', paymentMode: 'No Application Fee' },
    ageLimit: { asOnDate: 'As per class admission', minAge: 'School / College Age', maxAge: 'No restriction', relaxationRules: 'N/A' },
    eligibilitySummary: 'Enrolled in any school, college, institute, university in Class 9, 10, 11, 12, ITI, Polytechnic, BA, BSc, BCom, BTech, MA, MSc, etc. Family income within prescribed limits.',
    postDetails: [
      { postName: 'Pre Matric Class 9-10', total: 'All Eligible', eligibilityCriteria: 'Enrolled in Class 9 or 10.' },
      { postName: 'Post Matric Class 11-12 & Dashmottar', total: 'All Eligible', eligibilityCriteria: 'Enrolled in Class 11, 12, UG, PG, Diploma or Professional Courses.' },
    ],
    howToApplySteps: [
      'Visit scholarship.up.gov.in.',
      'Click on Student Registration and choose your category (General / OBC / SC / ST / Minority).',
      'Select Fresh or Renewal Application.',
      'Enter Aadhaar authentication with mobile OTP.',
      'Fill marks, fee details, bank account number.',
      'Submit hard copy to your institute within 3 days.'
    ],
    directLinks: [
      { id: 'upsch-1', label: 'Apply Online (Fresh Registration)', url: 'https://scholarship.up.gov.in', variant: 'primary', actionNote: 'Registration' },
      { id: 'upsch-2', label: 'Student Login (Fresh / Renewal)', url: 'https://scholarship.up.gov.in', variant: 'primary', actionNote: 'Login' },
      { id: 'upsch-3', label: 'Download Guidelines & Time Table PDF', url: 'https://scholarship.up.gov.in', variant: 'danger', actionNote: 'Time Table' },
      { id: 'upsch-4', label: 'UP Scholarship Official Portal', url: 'https://scholarship.up.gov.in', variant: 'warning', actionNote: 'Portal' },
    ],
  },
];

// Helper to synthesize 1,000+ realistic vacancies spanning all categories and states
const generate1000Vacancies = (): VacancyItem[] => {
  const result: VacancyItem[] = [...BASE_SEED_VACANCIES];

  const categories: JobCategory[] = ['SSC', 'Railway', 'UPSC', 'Banking', 'Defence', 'Police', 'Teaching', 'State PSC', 'Engineering', 'Medical', 'Others'];
  const sectionTypes: JobSectionType[] = ['latest-jobs', 'result', 'admit-card', 'answer-key', 'syllabus', 'admission', 'certificate', 'important'];

  const states = ['UP', 'Bihar', 'Rajasthan', 'MP', 'Haryana', 'Delhi', 'Jharkhand', 'Uttarakhand', 'Punjab', 'Maharashtra', 'Gujarat', 'West Bengal'];
  
  const jobTemplates = [
    { prefix: 'Staff Nurse & Medical Officer', cat: 'Medical' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '1,420', dept: 'National Health Mission (NHM)' },
    { prefix: 'Sub Inspector & Assistant Sub Inspector', cat: 'Police' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '850', dept: 'Police Recruitment Board' },
    { prefix: 'Junior Engineer (Civil, Mech, Electrical)', cat: 'Engineering' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '2,130', dept: 'Public Works Department (PWD)' },
    { prefix: 'Primary Teacher & Shikshakarmi', cat: 'Teaching' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '14,500', dept: 'Basic Education Department' },
    { prefix: 'Patwari & Lekhpal Revenue Officer', cat: 'State PSC' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '4,830', dept: 'Revenue Council' },
    { prefix: 'Gram Panchayat Adhikari (VDO)', cat: 'State PSC' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '1,468', dept: 'Subordinate Services Selection Commission' },
    { prefix: 'Forest Guard & Forester Wildlife', cat: 'Defence' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '780', dept: 'Forest & Environment Dept' },
    { prefix: 'Probationary Officer (PO) & Specialist', cat: 'Banking' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '3,000', dept: 'Institute of Banking Personnel Selection (IBPS)' },
    { prefix: 'Section Officer & Assistant Audit Officer', cat: 'SSC' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '960', dept: 'Comptroller and Auditor General' },
    { prefix: 'Assistant Station Master & Goods Guard', cat: 'Railway' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '5,600', dept: 'Railway Recruitment Cell (RRC)' },
    { prefix: 'Fireman & Driver Operator', cat: 'Police' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '1,120', dept: 'State Fire Services' },
    { prefix: 'Anganwadi Worker & Helper', cat: 'Others' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '23,750', dept: 'Women and Child Development' },
    { prefix: 'Assistant Professor & Lecturer', cat: 'Teaching' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '3,200', dept: 'Higher Education Commission' },
    { prefix: 'Court Clerk & Stenographer', cat: 'State PSC' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '1,920', dept: 'High Court Judicial Services' },
    { prefix: 'Technician Grade 1 & Grade 3', cat: 'Railway' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '9,144', dept: 'Ministry of Railways' },
    { prefix: 'Soldier General Duty & Technical Agniveer', cat: 'Defence' as JobCategory, sec: 'latest-jobs' as JobSectionType, posts: '25,000+', dept: 'Indian Army Recruiting Zone' },
  ];

  const currentYear = new Date().getFullYear();
  let counter = 100;

  // Generate ~1,010 additional vacancies distributed across sections
  for (let i = 0; i < 1015; i++) {
    const state = states[i % states.length];
    const tmpl = jobTemplates[i % jobTemplates.length];
    const sectionIndex = i % 10;
    
    let secType: JobSectionType = 'latest-jobs';
    let actionPrefix = 'Online Form';
    if (sectionIndex === 1 || sectionIndex === 6) {
      secType = 'result';
      actionPrefix = 'Result & Cutoff Declared';
    } else if (sectionIndex === 2 || sectionIndex === 7) {
      secType = 'admit-card';
      actionPrefix = 'Admit Card / Exam City';
    } else if (sectionIndex === 3) {
      secType = 'answer-key';
      actionPrefix = 'Official Answer Key';
    } else if (sectionIndex === 4) {
      secType = 'syllabus';
      actionPrefix = 'Exam Pattern & Syllabus';
    } else if (sectionIndex === 8) {
      secType = 'admission';
      actionPrefix = 'Admission Entrance Form';
    } else if (sectionIndex === 9) {
      secType = 'important';
      actionPrefix = 'Important Notification';
    }

    const monthNum = (i % 12) + 1;
    const dayNum = (i % 28) + 1;
    const monthFormatted = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
    const dayFormatted = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    
    const id = `sarkari-vac-${i + 1}`;
    const title = `${state} ${tmpl.dept} ${tmpl.prefix} ${actionPrefix} ${currentYear}`;
    const shortName = `${state} ${tmpl.prefix.split('&')[0].trim()} ${currentYear}`;
    const postsCount = `${tmpl.posts} Posts`;
    const lastDate = `${dayFormatted}/${monthFormatted}/${currentYear}`;

    result.push({
      id,
      title,
      shortName,
      postName: `${tmpl.prefix} (${state})`,
      advtNo: `ADVT-${state}/${tmpl.cat.toUpperCase()}/${counter++}/${currentYear}`,
      department: `${state} ${tmpl.dept}`,
      category: tmpl.cat,
      sectionType: secType,
      totalPosts: postsCount,
      postDate: `${dayFormatted} Month ${currentYear}`,
      lastDate: lastDate,
      isTopVacancy: i < 15,
      isNew: i % 4 === 0,
      viewsCount: 1200 + ((i * 137) % 35000),
      shortDescription: `${state} ${tmpl.dept} has released recruitment notification for ${tmpl.prefix}. All candidates fulfilling eligibility can apply online.`,
      importantDates: {
        applyBegin: `01/${monthFormatted}/${currentYear}`,
        lastDateApply: lastDate,
        lastDateFeePayment: `${dayFormatted}/${monthFormatted}/${currentYear}`,
        examDate: `Coming Soon ${currentYear}`,
        admitCardAvailable: 'Before Exam',
      },
      applicationFee: {
        generalObcEws: '₹ 500/-',
        scStPh: '₹ 150/-',
        female: '₹ 150/-',
        paymentMode: 'Net Banking, Debit Card, Credit Card, UPI',
      },
      ageLimit: {
        asOnDate: `01/07/${currentYear}`,
        minAge: '18 or 21 Years',
        maxAge: '35 or 40 Years',
        relaxationRules: 'As per State Government Service Rules.',
      },
      eligibilitySummary: 'Degree / Diploma / 10+2 / Matriculation as per official notification norms for respective post.',
      postDetails: [
        { postName: `${tmpl.prefix} Grade A`, total: tmpl.posts, eligibilityCriteria: 'Relevant Degree / Diploma with required qualification.' }
      ],
      howToApplySteps: [
        'Visit the official recruitment department website.',
        'Read the official advertisement carefully.',
        'Fill online application form and upload documents.',
        'Pay the requisite examination fee.',
        'Submit and keep printout of final application.'
      ],
      directLinks: [
        { id: `dl-${id}-1`, label: secType === 'result' ? 'Download Result PDF' : secType === 'admit-card' ? 'Download Admit Card' : 'Apply Online (Direct Link)', url: 'https://sarkariresult.com', variant: 'primary', actionNote: 'Click Here' },
        { id: `dl-${id}-2`, label: 'Download Official Notification PDF', url: 'https://sarkariresult.com', variant: 'danger', actionNote: 'Notification' },
        { id: `dl-${id}-3`, label: 'Official Department Website', url: 'https://sarkariresult.com', variant: 'warning', actionNote: 'Official Website' },
        { id: `dl-${id}-4`, label: 'Join WhatsApp / Telegram Alert Group', url: 'https://t.me/sarkariresult', variant: 'success', actionNote: 'Join Now' },
      ],
      officialNotificationUrl: 'https://sarkariresult.com',
      officialWebsiteUrl: 'https://sarkariresult.com',
    });
  }

  return result;
};

// Full cached dataset with 1,000+ items
export const ALL_INITIAL_VACANCIES: VacancyItem[] = generate1000Vacancies();

const STORAGE_KEY_VACANCIES = 'sarkari_vacancies_db_v1';

/**
 * Automatically synchronizes all vacancy dates, titles, and application deadlines
 * to the current year (2026) and today's dynamic dates.
 */
export const syncAllVacanciesToCurrentDate = (vacancies: VacancyItem[]): VacancyItem[] => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return vacancies.map((job, idx) => {
    // Replace old 2024 / 2025 references with current 2026 / 2027
    let updatedTitle = job.title
      .replace(/2024/g, `${currentYear}`)
      .replace(/2025/g, `${currentYear}`);
    let updatedShortName = job.shortName
      .replace(/2024/g, `${currentYear}`)
      .replace(/2025/g, `${currentYear}`);
    let updatedDesc = job.shortDescription
      ? job.shortDescription.replace(/2024/g, `${currentYear}`).replace(/2025/g, `${currentYear}`)
      : job.shortDescription;

    // Distribute active dates around current time
    const day = ((idx * 7) % 28) + 1;
    const dayFormatted = day < 10 ? `0${day}` : `${day}`;
    const nextMonth = ((new Date().getMonth() + 1 + (idx % 2)) % 12) + 1;
    const nextMonthFormatted = nextMonth < 10 ? `0${nextMonth}` : `${nextMonth}`;

    const updatedLastDate = `${dayFormatted}/${nextMonthFormatted}/${currentYear}`;

    const updatedImportantDates = {
      ...job.importantDates,
      applyBegin: `01/${nextMonthFormatted}/${currentYear}`,
      lastDateApply: updatedLastDate,
      lastDateFeePayment: `${dayFormatted}/${nextMonthFormatted}/${currentYear}`,
      examDate: `November / December ${currentYear}`,
      admitCardAvailable: 'Before Exam',
    };

    return {
      ...job,
      title: updatedTitle,
      shortName: updatedShortName,
      shortDescription: updatedDesc,
      lastDate: updatedLastDate,
      postDate: `${dayFormatted} ${new Date().toLocaleString('en-US', { month: 'long' })} ${currentYear}`,
      importantDates: updatedImportantDates,
      ageLimit: {
        ...job.ageLimit,
        asOnDate: `01/01/${nextYear}`,
      }
    };
  });
};

export const syncAllVacanciesToCurrentYear = syncAllVacanciesToCurrentDate;

export const getStoredVacancies = (): VacancyItem[] => {
  const localData = localStorage.getItem(STORAGE_KEY_VACANCIES);
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Check if data is outdated (contains 2025)
        const hasOutdatedDates = parsed.slice(0, 10).some(item => item.title.includes('2025') || item.lastDate.includes('2025'));
        if (hasOutdatedDates) {
          const synced = syncAllVacanciesToCurrentDate(parsed);
          saveVacanciesToStorage(synced);
          return synced;
        }
        return parsed;
      }
    } catch {
      // Fallback
    }
  }
  // Initialize in storage synced to current year
  const syncedInitial = syncAllVacanciesToCurrentDate(ALL_INITIAL_VACANCIES);
  localStorage.setItem(STORAGE_KEY_VACANCIES, JSON.stringify(syncedInitial));
  return syncedInitial;
};

export const saveVacanciesToStorage = (vacancies: VacancyItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_VACANCIES, JSON.stringify(vacancies));
  } catch (err) {
    console.error('Failed to save vacancies to localStorage', err);
  }
};
