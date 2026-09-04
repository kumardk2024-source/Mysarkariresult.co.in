import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  CreditCard, 
  UserCheck, 
  ExternalLink, 
  Printer, 
  Share2, 
  CheckCircle, 
  FileText, 
  Eye, 
  Building2, 
  Clock, 
  ShieldAlert,
  Send,
  BookmarkPlus
} from 'lucide-react';
import { VacancyItem } from '../types';

interface VacancyDetailProps {
  job: VacancyItem;
  onBack: () => void;
  onOpenAdminEdit?: (job: VacancyItem) => void;
  isAdminLoggedIn?: boolean;
}

export const VacancyDetail: React.FC<VacancyDetailProps> = ({
  job,
  onBack,
  onOpenAdminEdit,
  isAdminLoggedIn = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`*${job.title}*\nTotal Posts: ${job.totalPosts}\nLast Date: ${job.lastDate}\nCheck details & Direct Apply Link here: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-4 px-2 sm:px-4 print:p-0">
      
      {/* Top Controls & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 bg-white p-2.5 rounded shadow-sm border border-gray-200 print:hidden">
        <button
          id="detail-back-button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-gray-800 text-white hover:bg-gray-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Jobs</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Print Button */}
          <button
            id="detail-print-button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-semibold border border-gray-300"
            title="Print this notification"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print Page</span>
          </button>

          {/* WhatsApp Share */}
          <button
            id="detail-whatsapp-share"
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Share WhatsApp</span>
          </button>

          {/* Copy Link */}
          <button
            id="detail-copy-link"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => setSaved(!saved)}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-semibold border transition-colors ${
              saved 
                ? 'bg-amber-100 text-amber-900 border-amber-400' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-amber-600" />
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>

          {/* Quick Admin Edit Trigger - ONLY visible when Admin is Logged In */}
          {isAdminLoggedIn && onOpenAdminEdit && (
            <button
              onClick={() => onOpenAdminEdit(job)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-red-800 hover:bg-red-700 text-white text-xs font-bold cursor-pointer shadow-sm border border-red-600"
              title="Edit in Admin Panel (Only for Admin)"
            >
              <span>✏️ Edit Vacancy</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Notification Card in High Density Theme */}
      <div className="bg-white rounded border border-gray-300 shadow-sm overflow-hidden">
        
        {/* Title & Department Header */}
        <div className="bg-[#cc0000] text-white p-3 sm:p-4 text-center border-b-2 border-amber-400">
          <span className="bg-[#000066] text-white text-xs font-black px-2.5 py-0.5 rounded uppercase tracking-wider mb-1 inline-block border border-blue-400">
            {job.category} Recruitment • {job.sectionType.toUpperCase()}
          </span>
          <h1 className="text-lg sm:text-2xl font-black text-white mt-1">
            {job.title}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-amber-200 mt-1">
            {job.department} | Advertisement No: <span className="text-white underline font-bold">{job.advtNo || 'Official Notification'}</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/90 mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Post Date: {job.postDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-300" /> Last Date: <strong className="text-yellow-300 font-black">{job.lastDate}</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded font-mono">
              <Eye className="w-3.5 h-3.5 text-emerald-400" /> Views: {job.viewsCount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Short Information Summary */}
        <div className="p-3 sm:p-4 bg-amber-50/70 border-b border-gray-300 text-xs sm:text-sm text-gray-800">
          <strong className="text-[#cc0000] font-bold uppercase block mb-1">
            Short Information / संक्षिप्त विवरण:
          </strong>
          <p className="leading-relaxed">
            {job.shortDescription || `${job.department} has released the official recruitment notification for the post of ${job.postName}. Interested candidates can check eligibility criteria, age limits, vacancy breakdown, and direct application links below.`}
          </p>
        </div>

        {/* Quick Apply Direct Links Banner (Top) */}
        {job.directLinks && job.directLinks.length > 0 && (
          <div className="bg-gray-100 p-2.5 border-b border-gray-300 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold text-[#cc0000] uppercase">
              ⚡ Direct Action:
            </span>
            {job.directLinks.slice(0, 3).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#000066] hover:bg-blue-900 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <span>{link.label}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}

        <div className="p-3 sm:p-5 space-y-4">
          
          {/* Important Dates & Application Fee 2-Column Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            
            {/* Left Box: Important Dates in Deep Blue */}
            <div className="border border-gray-300 rounded overflow-hidden shadow-sm">
              <div className="bg-[#000066] text-white font-bold text-xs sm:text-sm px-3 py-1.5 text-center uppercase tracking-wide flex items-center justify-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>Important Dates (महत्वपूर्ण तिथियां)</span>
              </div>
              <ul className="divide-y divide-gray-200 text-xs bg-white">
                <li className="p-2 flex justify-between">
                  <span className="font-semibold text-gray-700">Application Begin:</span>
                  <span className="font-bold text-emerald-700">{job.importantDates.applyBegin || 'Active Now'}</span>
                </li>
                <li className="p-2 flex justify-between bg-red-50/60">
                  <span className="font-semibold text-[#cc0000]">Last Date for Apply Online:</span>
                  <span className="font-bold text-[#cc0000]">{job.importantDates.lastDateApply || job.lastDate}</span>
                </li>
                <li className="p-2 flex justify-between">
                  <span className="font-semibold text-gray-700">Last Date Pay Exam Fee:</span>
                  <span className="font-medium text-gray-900">{job.importantDates.lastDateFeePayment || job.lastDate}</span>
                </li>
                {job.importantDates.correctionDate && (
                  <li className="p-2 flex justify-between bg-amber-50/50">
                    <span className="font-semibold text-gray-700">Correction Window:</span>
                    <span className="font-medium text-gray-900">{job.importantDates.correctionDate}</span>
                  </li>
                )}
                <li className="p-2 flex justify-between">
                  <span className="font-semibold text-gray-700">Exam Date:</span>
                  <span className="font-bold text-blue-800">{job.importantDates.examDate || 'As per Schedule'}</span>
                </li>
                <li className="p-2 flex justify-between bg-blue-50/40">
                  <span className="font-semibold text-gray-700">Admit Card Available:</span>
                  <span className="font-bold text-emerald-800">{job.importantDates.admitCardAvailable || 'Before Exam'}</span>
                </li>
                {job.importantDates.resultAvailable && (
                  <li className="p-2 flex justify-between">
                    <span className="font-semibold text-gray-700">Result Available:</span>
                    <span className="font-bold text-purple-800">{job.importantDates.resultAvailable}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Right Box: Application Fee in Forest Green */}
            <div className="border border-gray-300 rounded overflow-hidden shadow-sm">
              <div className="bg-[#006400] text-white font-bold text-xs sm:text-sm px-3 py-1.5 text-center uppercase tracking-wide flex items-center justify-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                <span>Application Fee (आवेदन शुल्क)</span>
              </div>
              <ul className="divide-y divide-gray-200 text-xs bg-white">
                <li className="p-2 flex justify-between">
                  <span className="font-semibold text-gray-700">General / OBC / EWS:</span>
                  <span className="font-bold text-gray-900">{job.applicationFee.generalObcEws || '₹ 0/-'}</span>
                </li>
                <li className="p-2 flex justify-between bg-gray-50">
                  <span className="font-semibold text-gray-700">SC / ST / PH:</span>
                  <span className="font-bold text-emerald-700">{job.applicationFee.scStPh || '₹ 0/-'}</span>
                </li>
                <li className="p-2 flex justify-between">
                  <span className="font-semibold text-gray-700">All Category Female:</span>
                  <span className="font-bold text-emerald-700">{job.applicationFee.female || '₹ 0/-'}</span>
                </li>
                <li className="p-2 bg-amber-50 text-xs">
                  <strong className="text-gray-900 block mb-0.5">Payment Mode:</strong>
                  <p className="text-gray-700">
                    Pay the Examination Fee Through Debit Card, Credit Card, Net Banking, or UPI Fee Mode Only.
                  </p>
                </li>
              </ul>
            </div>

          </div>

          {/* Age Limit Details Box */}
          <div className="border border-gray-300 rounded overflow-hidden shadow-sm">
            <div className="bg-[#000066] text-white font-bold text-xs sm:text-sm px-3 py-1.5 text-center uppercase tracking-wide flex items-center justify-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Age Limit as on {job.ageLimit.asOnDate || 'Notification Date'}</span>
            </div>
            <div className="p-2.5 sm:p-3 bg-white text-xs space-y-1.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-medium">
                <div className="p-1.5 bg-blue-50/70 rounded border border-blue-200">
                  <span className="text-gray-700">Minimum Age: </span>
                  <strong className="text-blue-900">{job.ageLimit.minAge || '18 Years'}</strong>
                </div>
                <div className="p-1.5 bg-blue-50/70 rounded border border-blue-200">
                  <span className="text-gray-700">Maximum Age: </span>
                  <strong className="text-blue-900">{job.ageLimit.maxAge || 'As per norms'}</strong>
                </div>
              </div>
              <p className="text-gray-700 italic text-xs">
                <strong>Age Relaxation Extra:</strong> {job.ageLimit.relaxationRules || 'Age Relaxation applicable for SC / ST / OBC / Ex-Servicemen as per Government Recruitment Rules.'}
              </p>
            </div>
          </div>

          {/* Vacancy Details Total Posts Table */}
          <div className="border border-gray-300 rounded overflow-hidden shadow-sm">
            <div className="bg-[#cc0000] text-white font-bold text-xs sm:text-sm px-3 py-1.5 text-center uppercase tracking-wide">
              Vacancy Details Total : <span className="text-amber-300 underline font-black">{job.totalPosts}</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-red-100 text-red-950 font-bold border-b border-red-300">
                    <th className="p-2 border-r border-red-200">Post Name</th>
                    <th className="p-2 border-r border-red-200 text-center">Total Posts</th>
                    <th className="p-2">Eligibility Criteria (पात्रता)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {job.postDetails && job.postDetails.length > 0 ? (
                    job.postDetails.map((post, idx) => (
                      <tr key={idx} className="hover:bg-red-50/40">
                        <td className="p-2 font-bold text-gray-900 border-r border-gray-200">
                          {post.postName}
                        </td>
                        <td className="p-2 text-center font-extrabold text-[#cc0000] border-r border-gray-200 whitespace-nowrap">
                          {post.total}
                        </td>
                        <td className="p-2 text-gray-800 leading-snug">
                          {post.eligibilityCriteria}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-2 font-bold text-gray-900 border-r border-gray-200">
                        {job.postName}
                      </td>
                      <td className="p-2 text-center font-extrabold text-[#cc0000] border-r border-gray-200">
                        {job.totalPosts}
                      </td>
                      <td className="p-2 text-gray-800">
                        {job.eligibilitySummary || 'Read official notification for complete educational qualification criteria.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Physical Eligibility Criteria (If available) */}
          {job.physicalEligibility && job.physicalEligibility.length > 0 && (
            <div className="border-2 border-amber-600 rounded overflow-hidden">
              <div className="bg-amber-700 text-white font-bold text-sm px-3 py-2 text-center uppercase tracking-wide">
                Physical Eligibility Criteria (शारीरिक योग्यता)
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-amber-100 text-amber-950 font-bold border-b border-amber-300">
                      <th className="p-2 border-r border-amber-200">Category</th>
                      <th className="p-2 border-r border-amber-200">Height</th>
                      <th className="p-2 border-r border-amber-200">Chest</th>
                      <th className="p-2">Running</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {job.physicalEligibility.map((phy, pidx) => (
                      <tr key={pidx} className="hover:bg-amber-50/50">
                        <td className="p-2 font-bold text-gray-800 border-r border-gray-200">{phy.genderCategory}</td>
                        <td className="p-2 font-medium text-gray-700 border-r border-gray-200">{phy.height}</td>
                        <td className="p-2 font-medium text-gray-700 border-r border-gray-200">{phy.chest}</td>
                        <td className="p-2 font-semibold text-emerald-800">{phy.running}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* How to Apply Form Step by Step */}
          <div className="border border-gray-300 rounded p-4 bg-gray-50 text-xs sm:text-sm space-y-2">
            <h3 className="font-bold text-red-900 uppercase text-sm border-b border-gray-200 pb-1">
              How to Fill {job.shortName || job.title} Online Form:
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-gray-700">
              {job.howToApplySteps && job.howToApplySteps.length > 0 ? (
                job.howToApplySteps.map((step, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">
                    {step}
                  </li>
                ))
              ) : (
                <>
                  <li>Candidates can apply online from {job.importantDates.applyBegin} to {job.importantDates.lastDateApply}.</li>
                  <li>Carefully read the official notification before applying online.</li>
                  <li>Check all documents like eligibility, ID proof, address details, and basic biodata.</li>
                  <li>Scan necessary documents: passport size photo, signature, ID proof, certificates.</li>
                  <li>Review the complete application form before final submission and make payment if applicable.</li>
                  <li>Take a printout of the submitted application form for future reference.</li>
                </>
              )}
            </ul>
          </div>

          {/* SOME USEFUL IMPORTANT DIRECT LINKS TABLE (The Core Sarkari Result Feature) */}
          <div className="border-2 border-[#cc0000] rounded overflow-hidden shadow-sm">
            <div className="bg-[#cc0000] text-white font-bold text-xs sm:text-sm px-3 py-2 text-center uppercase tracking-wider flex items-center justify-center gap-2">
              <span className="text-amber-300">★</span>
              <span>SOME USEFUL IMPORTANT DIRECT LINKS</span>
              <span className="text-amber-300">★</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-gray-200 bg-white text-xs">
                  
                  {/* Dynamic Links added by Admin / Seed data */}
                  {job.directLinks && job.directLinks.map((link) => (
                    <tr key={link.id} className="hover:bg-red-50/50 transition-colors">
                      <td className="p-3 font-bold text-gray-900 border-r border-gray-200 w-3/5">
                        <span className="text-red-700 font-extrabold mr-1.5">●</span>
                        {link.label}
                      </td>
                      <td className="p-3 text-center">
                        <a
                          id={`direct-link-${link.id}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-1 px-4 py-2 rounded font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-105 active:scale-95 ${
                            link.variant === 'danger'
                              ? 'bg-red-700 hover:bg-red-800 text-white'
                              : link.variant === 'warning'
                              ? 'bg-amber-500 hover:bg-amber-600 text-black'
                              : link.variant === 'success'
                              ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                              : link.variant === 'info'
                              ? 'bg-sky-700 hover:bg-sky-800 text-white'
                              : 'bg-blue-800 hover:bg-blue-900 text-white'
                          }`}
                        >
                          <span>{link.actionNote || 'Click Here'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}

                  {/* Fallback default official links if not in directLinks */}
                  {(!job.directLinks || job.directLinks.length === 0) && (
                    <>
                      <tr className="hover:bg-red-50/50">
                        <td className="p-3 font-bold text-gray-900 border-r border-gray-200">
                          <span className="text-red-700 mr-1.5">●</span>
                          Apply Online (Direct Link)
                        </td>
                        <td className="p-3 text-center">
                          <a
                            href={job.officialWebsiteUrl || 'https://sarkariresult.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-4 py-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs"
                          >
                            <span>Click Here</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                      <tr className="hover:bg-red-50/50">
                        <td className="p-3 font-bold text-gray-900 border-r border-gray-200">
                          <span className="text-red-700 mr-1.5">●</span>
                          Download Official Notification PDF
                        </td>
                        <td className="p-3 text-center">
                          <a
                            href={job.officialNotificationUrl || 'https://sarkariresult.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-4 py-1.5 rounded bg-red-700 hover:bg-red-800 text-white font-bold text-xs"
                          >
                            <span>Download PDF</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    </>
                  )}

                  {/* Join Telegram Channel Row */}
                  <tr className="bg-sky-50 hover:bg-sky-100 transition-colors">
                    <td className="p-3 font-bold text-sky-950 border-r border-gray-200">
                      <span className="text-sky-600 mr-1.5">●</span>
                      Join Official Sarkari Result Telegram Channel (Fast Updates)
                    </td>
                    <td className="p-3 text-center">
                      <a
                        href="https://t.me/sarkariresult"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-4 py-2 rounded bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase shadow-sm"
                      >
                        <span>Join Telegram</span>
                        <Send className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>

                  {/* Join WhatsApp Alert Group Row */}
                  <tr className="bg-emerald-50 hover:bg-emerald-100 transition-colors">
                    <td className="p-3 font-bold text-emerald-950 border-r border-gray-200">
                      <span className="text-emerald-600 mr-1.5">●</span>
                      Join Sarkari Result WhatsApp Community
                    </td>
                    <td className="p-3 text-center">
                      <a
                        href="https://whatsapp.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase shadow-sm"
                      >
                        <span>Join WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer Note in Card */}
        <div className="bg-gray-100 p-3 text-center text-xs text-gray-600 border-t border-gray-200">
          <p>
            Disclaimer: Although every care has been taken in publishing the notification details, please verify all terms with the original official recruitment portal before submission.
          </p>
        </div>

      </div>

      {/* Bottom Back Button */}
      <div className="mt-4 text-center print:hidden">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded bg-[#000066] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm shadow transition-colors inline-flex items-center gap-1.5 border border-blue-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sarkari Result Home</span>
        </button>
      </div>

    </div>
  );
};
