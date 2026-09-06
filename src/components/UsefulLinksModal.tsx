import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Search, 
  Sparkles, 
  CreditCard, 
  FileText, 
  Fingerprint, 
  Car, 
  Plane, 
  Award, 
  ShieldCheck, 
  CheckCircle,
  GraduationCap,
  Building,
  HeartHandshake,
  Package,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface UsefulLinkItem {
  id: string;
  name: string;
  nameHi: string;
  authority: string;
  category: 'identity' | 'transport' | 'certificates' | 'education' | 'welfare' | 'utility';
  url: string;
  icon: any;
  accentColor: string;
  badgeBg: string;
  features: string[];
  helpline?: string;
}

const USEFUL_STATIC_LINKS: UsefulLinkItem[] = [
  {
    id: 'uidai-aadhaar',
    name: 'UIDAI Aadhaar Portal',
    nameHi: 'आधार कार्ड ऑनलाइन सेवाएं (UIDAI)',
    authority: 'Unique Identification Authority of India',
    category: 'identity',
    url: 'https://myaadhaar.uidai.gov.in',
    icon: Fingerprint,
    accentColor: 'border-blue-600',
    badgeBg: 'bg-blue-700 text-white',
    features: [
      'Download e-Aadhaar PDF',
      'Check Aadhaar Validity & Mobile Link',
      'Order Aadhaar PVC Card Online',
      'Check Enrolment & Update Status'
    ],
    helpline: 'Toll-Free: 1947'
  },
  {
    id: 'pan-card-nsdl',
    name: 'PAN Card Portal (UTI / NSDL Protean)',
    nameHi: 'पैन कार्ड आवेदन व आधार लिंक सेवा',
    authority: 'Income Tax Department of India',
    category: 'identity',
    url: 'https://www.incometax.gov.in/iec/foportal',
    icon: CreditCard,
    accentColor: 'border-emerald-600',
    badgeBg: 'bg-emerald-700 text-white',
    features: [
      'Apply Instant Free e-PAN (Aadhaar Based)',
      'Link PAN Card with Aadhaar Number',
      'Track New / Duplicate PAN Application',
      'Verify PAN Status & Details Online'
    ],
    helpline: 'Toll-Free: 1800 180 1961'
  },
  {
    id: 'digilocker',
    name: 'DigiLocker Official Portal',
    nameHi: 'डिजिलॉकर - डिजिटल दस्तावेज लॉकर',
    authority: 'Ministry of Electronics & IT (MeitY)',
    category: 'identity',
    url: 'https://www.digilocker.gov.in',
    icon: ShieldCheck,
    accentColor: 'border-indigo-600',
    badgeBg: 'bg-indigo-700 text-white',
    features: [
      'Original 10th / 12th Board Marksheets',
      'Digital Driving Licence & Vehicle RC',
      'Caste, Domicile & Income Certificates',
      'ABC ID for University & College Admissions'
    ],
    helpline: 'National e-Gov Division'
  },
  {
    id: 'voter-eci',
    name: 'Voters\' Services Portal (ECI / NVSP)',
    nameHi: 'मतदाता सेवा पोर्टल (वोटर आईडी कार्ड)',
    authority: 'Election Commission of India (ECI)',
    category: 'identity',
    url: 'https://voters.eci.gov.in',
    icon: Award,
    accentColor: 'border-purple-600',
    badgeBg: 'bg-purple-700 text-white',
    features: [
      'Download Digital e-EPIC (Voter Card)',
      'Search Name in Electoral Voter List',
      'Apply Online Form 6 for New Voter ID',
      'Correction / Shift Address in Voter Card'
    ],
    helpline: 'Voter Helpline: 1950'
  },
  {
    id: 'parivahan-sarathi',
    name: 'Parivahan Sewa (Sarathi / Vahan)',
    nameHi: 'परिवहन सेवा (ड्राइविंग लाइसेंस व आरसी)',
    authority: 'Ministry of Road Transport & Highways',
    category: 'transport',
    url: 'https://parivahan.gov.in',
    icon: Car,
    accentColor: 'border-amber-600',
    badgeBg: 'bg-amber-700 text-white',
    features: [
      'Apply Online Learner Licence (LL) & DL',
      'Renew Driving Licence & Add Vehicle Class',
      'Check E-Challan Status & Pay Online',
      'Vehicle Registration (RC) Status Online'
    ],
    helpline: 'Helpdesk: 0120-2459169'
  },
  {
    id: 'edistrict-certificates',
    name: 'e-District State Portal (RTPS / Edistrict)',
    nameHi: 'ई-डिस्ट्रिक्ट (आय, जाति, निवास प्रमाण पत्र)',
    authority: 'State Revenue & Public Services Departments',
    category: 'certificates',
    url: 'https://edistrict.up.gov.in',
    icon: FileText,
    accentColor: 'border-rose-600',
    badgeBg: 'bg-rose-700 text-white',
    features: [
      'Income Certificate (आय प्रमाण पत्र)',
      'Caste Certificate (जाति प्रमाण पत्र - SC/ST/OBC)',
      'Domicile / Residence Certificate (निवास प्रमाण)',
      '100% Online QR Code Certificate Verification'
    ],
    helpline: 'State Citizen Call Centers'
  },
  {
    id: 'passport-seva',
    name: 'Passport Seva Portal',
    nameHi: 'पासपोर्ट सेवा केंद्र पोर्टल',
    authority: 'Ministry of External Affairs (MEA)',
    category: 'transport',
    url: 'https://www.passportindia.gov.in',
    icon: Plane,
    accentColor: 'border-cyan-600',
    badgeBg: 'bg-cyan-700 text-white',
    features: [
      'Apply Fresh Passport / Renewal (Tatkaal / Normal)',
      'Check Appointment Availability Across PSKs',
      'Track Passport Dispatch & Speed Post Status',
      'Police Clearance Certificate (PCC) Online'
    ],
    helpline: 'National Call Center: 1800 258 1800'
  },
  {
    id: 'scholarship-nsp',
    name: 'National & State Scholarship Portals',
    nameHi: 'राष्ट्रीय व राज्य छात्रवृत्ति पोर्टल',
    authority: 'Ministry of Social Justice & Empowerment',
    category: 'education',
    url: 'https://scholarships.gov.in',
    icon: GraduationCap,
    accentColor: 'border-teal-600',
    badgeBg: 'bg-teal-700 text-white',
    features: [
      'Pre-Matric & Post-Matric Scholarship Forms',
      'UP / Bihar / MP State Scholarship Track Status',
      'Direct Benefit Transfer (DBT) Account Check',
      'Fee Reimbursement for Higher Education'
    ],
    helpline: 'Helpdesk: 0120-6619540'
  },
  {
    id: 'nielit-ccc',
    name: 'NIELIT Student Portal (CCC / O Level)',
    nameHi: 'नाइलिट सीसीसी व ओ लेवल पोर्टल',
    authority: 'National Institute of Electronics & IT',
    category: 'education',
    url: 'https://student.nielit.gov.in',
    icon: Award,
    accentColor: 'border-blue-800',
    badgeBg: 'bg-blue-900 text-white',
    features: [
      'Download CCC Monthly Exam Admit Card',
      'View & Print CCC / BCC Exam Results',
      'Digitally Signed Certificate Verification',
      'Online Exam Form & Registration'
    ],
    helpline: 'Email: ccc@nielit.gov.in'
  },
  {
    id: 'ration-card-nfsa',
    name: 'NFSA Ration Card Portal',
    nameHi: 'राष्ट्रीय खाद्य सुरक्षा राशन कार्ड पोर्टल',
    authority: 'Department of Food & Public Distribution',
    category: 'welfare',
    url: 'https://nfsa.gov.in',
    icon: HeartHandshake,
    accentColor: 'border-green-700',
    badgeBg: 'bg-green-800 text-white',
    features: [
      'Search Name in Village / Ward Ration Card List',
      'Download Electronic Ration Card Slips',
      'One Nation One Ration Card (ONORC) Status',
      'Add New Member in Family Ration Card'
    ],
    helpline: 'Toll-Free: 1967'
  },
  {
    id: 'india-post-track',
    name: 'India Post Speed Post Tracking',
    nameHi: 'इंडिया पोस्ट डाक व पार्सल ट्रैकिंग',
    authority: 'Department of Posts, Govt of India',
    category: 'utility',
    url: 'https://www.indiapost.gov.in',
    icon: Package,
    accentColor: 'border-red-700',
    badgeBg: 'bg-red-800 text-white',
    features: [
      'Track Speed Post / Registered Post Consignments',
      'Track Govt Exam Admit Card & Joining Letters',
      'Find Postal Pincode & Branch Offices',
      'Calculate Domestic & International Postage'
    ],
    helpline: 'Toll-Free: 1800 266 6868'
  },
  {
    id: 'employment-exchange',
    name: 'National Career Service (NCS) / Rojgar',
    nameHi: 'राष्ट्रीय करियर सेवा (रोजगार संगम)',
    authority: 'Ministry of Labour & Employment',
    category: 'utility',
    url: 'https://www.ncs.gov.in',
    icon: Building,
    accentColor: 'border-orange-600',
    badgeBg: 'bg-orange-700 text-white',
    features: [
      'Free Jobseeker Registration & Job Fairs (रोजगार मेला)',
      'State Employment Exchange Card (सेवायोजन कार्ड)',
      'Government & Private Job Matching',
      'Career Counseling & Skill Training Programs'
    ],
    helpline: 'Toll-Free: 1514'
  }
];

interface UsefulLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UsefulLinksModal: React.FC<UsefulLinksModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Trigger rainfall / confetti burst effect upon modal opening
  useEffect(() => {
    if (isOpen) {
      try {
        // Multi-stage rain / cascade effect
        const duration = 1.8 * 1000;
        const animationEnd = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.1 },
            colors: ['#000066', '#cc0000', '#f59e0b', '#10b981', '#6366f1']
          });
          confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.1 },
            colors: ['#000066', '#cc0000', '#f59e0b', '#10b981', '#6366f1']
          });

          if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'सभी पोर्टल (All Links)' },
    { id: 'identity', label: 'पहचान (Aadhaar/PAN/Voter)' },
    { id: 'certificates', label: 'प्रमाण पत्र (Income/Caste)' },
    { id: 'transport', label: 'परिवहन व पासपोर्ट (DL/RC)' },
    { id: 'education', label: 'शिक्षा व छात्रवृत्ति' },
    { id: 'welfare', label: 'कल्याणकारी व राशन' },
    { id: 'utility', label: 'उपयोगी सेवाएं (डाक/रोजगार)' }
  ];

  const filteredLinks = USEFUL_STATIC_LINKS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = search.toLowerCase().trim();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) ||
      item.nameHi.toLowerCase().includes(query) ||
      item.authority.toLowerCase().includes(query) ||
      item.features.some(f => f.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden border-2 border-amber-400 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Rain / Varsha Visual Theme */}
        <div className="bg-gradient-to-r from-[#000066] via-blue-900 to-[#cc0000] text-white p-4 sm:p-5 flex items-center justify-between border-b-4 border-amber-400 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-amber-400 text-red-950 flex items-center justify-center font-black shadow-lg animate-bounce">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white font-sans">
                  मोस्ट यूजफुल सरकारी डायरेक्ट पोर्टल
                </h3>
                <span className="animate-blink bg-amber-400 text-red-950 font-black text-[10px] sm:text-xs px-2 py-0.5 rounded shadow-sm">
                  🌧️ वर्षा इफेक्ट
                </span>
              </div>
              <p className="text-xs sm:text-sm text-yellow-200 font-medium">
                आधार, पैन, वोटर, ड्राइविंग लाइसेंस, आय-जाति प्रमाण पत्र व अन्य सभी आधिकारिक लिंक्स
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-black/30 hover:bg-red-600 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-gray-100 p-3 sm:p-4 border-b border-gray-300 space-y-2.5">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full sm:flex-1">
              <input
                type="text"
                placeholder="सर्च करें: Aadhaar, PAN, Voter ID, Driving Licence, आय प्रमाण पत्र..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white text-gray-900 text-xs sm:text-sm rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#000066]"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-2 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="text-xs font-bold text-gray-600 bg-white border border-gray-300 px-3 py-2 rounded-lg shrink-0">
              कुल उपलब्ध पोर्टल: <strong className="text-[#000066]">{filteredLinks.length}</strong>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#000066] text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Infographic Cards Grid */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-[#f8fafc]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLinks.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border-2 ${item.accentColor} shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group`}
                >
                  {/* Card Header */}
                  <div className="p-3.5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#000066] border border-blue-200 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-blue-900" />
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${item.badgeBg}`}>
                        Gov.in Verified
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-gray-900 mt-2 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs font-bold text-red-700 mt-0.5">
                      {item.nameHi}
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium line-clamp-1 mt-0.5">
                      {item.authority}
                    </p>
                  </div>

                  {/* Feature Checklist (Infographic Style) */}
                  <div className="p-3.5 bg-white space-y-1.5 flex-1">
                    <span className="text-[11px] uppercase font-black tracking-wider text-gray-400 block mb-1">
                      प्रमुख सेवाएं (Key Services):
                    </span>
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}

                    {item.helpline && (
                      <div className="pt-2 text-[11px] font-semibold text-gray-500 italic">
                        📞 {item.helpline}
                      </div>
                    )}
                  </div>

                  {/* Action Link Button */}
                  <div className="p-3 bg-gray-50 border-t border-gray-100">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-[#000066] hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>ऑफिशियल पोर्टल खोलें</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredLinks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-300 p-6">
              <p className="text-gray-500 font-bold text-sm">
                कोई लिंक नहीं मिला। कृपया दूसरा शब्द सर्च करें।
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-gray-100 px-4 py-2.5 border-t border-gray-300 flex items-center justify-between text-xs text-gray-600">
          <span className="font-semibold text-blue-950">
            ★ mysarkariresult.co.in • सभी सरकारी वेबसाइट्स के 100% सुरक्षित डायरेक्ट लिंक्स
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold cursor-pointer"
          >
            बंद करें (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
