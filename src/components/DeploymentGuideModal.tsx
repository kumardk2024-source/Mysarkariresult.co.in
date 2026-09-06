import React, { useState } from 'react';
import { 
  Globe, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Rocket, 
  DollarSign, 
  Search, 
  Share2, 
  Server, 
  FileCode2,
  Copy,
  Check
} from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = (text: string, stepIndex: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedStep(stepIndex);
      setTimeout(() => setCopiedStep(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border-4 border-emerald-700 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-4 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-400">
              <Rocket className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-wide font-serif">
                वेबसाइट को पब्लिक (Live) कैसे करें और पैसे कैसे कमाएं?
              </h2>
              <p className="text-xs text-emerald-200">
                Complete Step-by-Step Guide for Public Deployment, Custom Domain, SEO & AdSense Earning
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-950/80 hover:bg-emerald-700 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-gray-800 text-xs sm:text-sm">
          
          {/* Quick Summary Alert Box */}
          <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3.5 rounded-r-md">
            <h3 className="font-extrabold text-emerald-950 text-sm mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>नमस्ते! आपकी सरकारी रिजल्ट वेबसाइट पूरी तरह तैयार है</span>
            </h3>
            <p className="text-emerald-900 leading-relaxed">
              इसमें 1,000+ वैकेंसी, एडमिट कार्ड, रिजल्ट्स, फास्ट लोडिंग, एडमिन पैनल (डायरेक्ट लिंक बटन जोड़ने वाला) और रियल-टाइम व्यूअर ट्रैकिंग सब कुछ तैयार है। नीचे दिए गए स्टेप्स से आप इसे इंटरनेट पर हमेशा के लिए लाइव कर सकते हैं:
            </p>
          </div>

          {/* STEP 1: INSTANT SHARING VIA AI STUDIO */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-red-900 font-extrabold text-sm sm:text-base border-b pb-1.5">
              <span className="w-6 h-6 rounded-full bg-red-800 text-white flex items-center justify-center text-xs">1</span>
              <span>स्टेप 1: तुरंत पब्लिक लिंक बनाएं (AI Studio 1-Click Share) - Free & Instant</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              अगर आप तुरंत अपने दोस्तों या यूजर्स को दिखाना चाहते हैं:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 pl-1">
              <li>स्क्रीन के ऊपर दाईं ओर (Top-Right) दिए गए <strong>"Share"</strong> या <strong>"Deploy"</strong> बटन पर क्लिक करें।</li>
              <li>वहां आपको एक लाइव यूआरएल (उदा. <code className="bg-gray-100 px-1 py-0.5 rounded text-blue-700">https://...run.app</code>) मिलेगा।</li>
              <li>इस लिंक को कोई भी मोबाइल या कंप्यूटर पर कहीं से भी खोल सकता है।</li>
            </ul>
          </div>

          {/* STEP 2: CUSTOM DOMAIN (LIKE MYSARKARIRESULT.CO.IN) */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-sm sm:text-base border-b pb-1.5">
              <span className="w-6 h-6 rounded-full bg-indigo-800 text-white flex items-center justify-center text-xs">2</span>
              <span>स्टेप 2: अपना डोमेन (जैसे mysarkariresult.co.in) कनेक्ट करें</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              आपकी वेबसाइट का आधिकारिक डोमेन <strong className="text-[#000066]">mysarkariresult.co.in</strong> है:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 pl-1">
              <li><strong>GoDaddy, Hostinger या Namecheap</strong> पर अपना डोमेन <code className="bg-blue-50 px-1.5 py-0.5 rounded text-[#000066] font-bold">mysarkariresult.co.in</code> रजिस्टर या मैनेज करें।</li>
              <li>Vercel / Cloud Run के <strong>Custom Domain</strong> सेक्शन में जाकर <code className="bg-gray-100 px-1 py-0.5 rounded text-purple-700">mysarkariresult.co.in</code> जोड़ें।</li>
              <li>DNS CNAME या A Record पॉइंट करें और ऑटोमैटिक फ्री SSL (HTTPS) एक्टिवेट हो जाएगा।</li>
            </ol>
          </div>

          {/* STEP 3: FREE LIFETIME HOSTING ON VERCEL OR GITHUB */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm sm:text-base border-b pb-1.5">
              <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs">3</span>
              <span>स्टेप 3: Vercel या Netlify पर फ्री 24/7 होस्टिंग (0 रुपये खर्च)</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Vercel और Netlify दुनिया की सबसे तेज CDN होस्टिंग देती हैं (भारत के मुंबई और दिल्ली सर्वर से सेकंड भर में खुलती है):
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 pl-1">
              <li>AI Studio के Settings मेनू से <strong>"Export to GitHub"</strong> या <strong>"Download ZIP"</strong> पर क्लिक करें।</li>
              <li><strong>Vercel.com</strong> पर फ्री अकाउंट बनाएं।</li>
              <li>"Add New Project" पर क्लिक करके अपने GitHub कोड को इम्पोर्ट करें।</li>
              <li>Build Command: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-700 font-mono">npm run build</code> और Output Directory: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-700 font-mono">dist</code> रखें।</li>
              <li>20 सेकंड में आपकी साइट पूरी दुनिया के लिए लाइव हो जाएगी!</li>
            </ol>
          </div>

          {/* STEP 4: HOW SARKARI RESULT MAKES MONEY (ADSENSE & EARNING) */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm space-y-2 bg-gradient-to-br from-amber-50/50 to-white">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base border-b pb-1.5">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">4</span>
              <span>स्टेप 4: सरकारी रिजल्ट वेबसाइट से कमाई कैसे होती है? (Monetization)</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white border border-amber-200 rounded">
                <strong className="text-red-800 font-bold block mb-1">
                  1. Google AdSense (सबसे बड़ी कमाई)
                </strong>
                <p className="text-xs text-gray-600 leading-relaxed">
                  जब आपकी साइट पर 50-100 पोस्ट्स और रोजाना 500+ विजिटर्स आने लगें, तो <strong>adsense.google.com</strong> पर अप्लाई करें। विज्ञापन हेडर, वैकेंसी के बीच और लिंक्स के ऊपर दिखेंगे। सरकारी रिजल्ट इसी से लाखों कमाता है।
                </p>
              </div>

              <div className="p-3 bg-white border border-amber-200 rounded">
                <strong className="text-emerald-800 font-bold block mb-1">
                  2. Telegram & WhatsApp Community
                </strong>
                <p className="text-xs text-gray-600 leading-relaxed">
                  वेबसाइट में लगे Telegram और WhatsApp बटनों से छात्र आपके ग्रुप में जुड़ेंगे। 10k-50k मेंबर्स होने पर कोचिंग संस्थानों के पेड प्रमोशन और बुक एफिलिएट लिंक्स से मोटी कमाई होती है।
                </p>
              </div>
            </div>
          </div>

          {/* STEP 5: GOOGLE SEARCH CONSOLE & SEO (INDEXING) */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-purple-900 font-extrabold text-sm sm:text-base border-b pb-1.5">
              <span className="w-6 h-6 rounded-full bg-purple-800 text-white flex items-center justify-center text-xs">5</span>
              <span>स्टेप 5: गूगल सर्च में नंबर 1 पर कैसे लाएं? (Google SEO & Sitemap)</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              गूगल पर जब कोई छात्र "SSC GD Online Form" या "Sarkari Result 2025" खोजे तो आपकी साइट दिखे इसके लिए:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 pl-1">
              <li><strong>Google Search Console</strong> (<a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-blue-600 underline">search.google.com</a>) में अपना डोमेन सबमिट करें।</li>
              <li>जैसे ही कोई नई वैकेंसी आए, एडमिन पैनल से 10 मिनट के अंदर उसका पूरा डिटेल और डायरेक्ट लिंक पब्लिश करें — जो सबसे पहले डालता है, गूगल उसे टॉप पर रैंक करता है!</li>
            </ul>
          </div>

        </div>

        {/* Footer Close */}
        <div className="p-3 bg-gray-100 border-t border-gray-300 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow"
          >
            समझ गया / Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
