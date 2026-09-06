import React, { useState } from 'react';
import { Bell, Check, X, Send, Volume2, ShieldCheck, Zap } from 'lucide-react';
import { VacancyItem } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentAlerts: VacancyItem[];
  onSelectJob: (job: VacancyItem) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  recentAlerts,
  onSelectJob,
}) => {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border-4 border-amber-500 w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-red-700 text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-black/20">
              <Bell className="w-5 h-5 text-yellow-300 animate-bounce" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-wide font-serif">
                SARKARI JOB NOTIFICATIONS & ALERTS
              </h2>
              <p className="text-[11px] text-amber-100">
                Never miss an admit card, result or top government job deadline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 text-xs sm:text-sm">
          
          {/* Email / WhatsApp Subscription Box */}
          <div className="bg-amber-50 p-3.5 rounded-lg border border-amber-300">
            <div className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Get Daily 100% Free Govt Job Alert (ईमेल / मोबाइल अलर्ट)</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              जैसे ही कोई नया फॉर्म या रिजल्ट घोषित होगा, आपको तुरंत नोटिफिकेशन मिलेगा।
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-emerald-100 text-emerald-900 rounded font-bold text-center flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Alerts Activated! Check notifications on your device.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email or WhatsApp number..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded text-xs shrink-0 cursor-pointer shadow"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Sound Alert Toggle */}
          <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded border border-gray-200">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
              <Volume2 className="w-4 h-4 text-gray-500" />
              <span>Job Notification Chime / Sound Alert</span>
            </span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-2.5 py-1 rounded text-xs font-bold ${
                soundEnabled ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {soundEnabled ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          {/* Recent Live Alerts List */}
          <div>
            <h4 className="font-extrabold text-gray-900 uppercase text-xs mb-2 flex items-center justify-between border-b pb-1">
              <span>Today's Fresh Releases</span>
              <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">Live Now</span>
            </h4>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {recentAlerts.slice(0, 7).map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => {
                    onSelectJob(alert);
                    onClose();
                  }}
                  className="p-2 bg-white hover:bg-amber-50 border border-gray-200 rounded flex items-center justify-between gap-2 cursor-pointer transition-colors text-xs"
                >
                  <div className="truncate">
                    <span className="font-bold text-red-800 block truncate">
                      {alert.shortName || alert.title}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {alert.totalPosts} • Last Date: {alert.lastDate}
                    </span>
                  </div>

                  <span className="bg-red-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded shrink-0">
                    OPEN
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-100 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-800 text-white font-bold rounded text-xs cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
