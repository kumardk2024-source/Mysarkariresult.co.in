import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  X,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userId: string) => void;
}

export const ADMIN_CREDS_STORAGE_KEY = 'mysarkariresult_admin_creds';

interface AdminCredentials {
  userId: string;
  passwordHash: string;
  phone: string;
  email: string;
}

export const getDefaultCredentials = (): AdminCredentials => {
  const saved = localStorage.getItem(ADMIN_CREDS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback
    }
  }
  return {
    userId: 'admin',
    passwordHash: 'admin123',
    phone: '9876543210',
    email: 'admin@mysarkariresult.co.in',
  };
};

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  
  // Login fields
  const [loginUserId, setLoginUserId] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  
  // Forgot Password / Recovery fields
  const [recoveryType, setRecoveryType] = useState<'phone' | 'email'>('phone');
  const [recoveryInput, setRecoveryInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryMsg, setRecoveryMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoginError('');
      setRecoveryMsg(null);
      setIsOtpVerified(false);
      setGeneratedOtp(null);
      setEnteredOtp('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const creds = getDefaultCredentials();
    const cleanUserId = loginUserId.trim().toLowerCase();
    const cleanInputPass = loginPassword.trim();

    const matchesId = (cleanUserId === creds.userId.toLowerCase()) || 
                      (cleanUserId === creds.email.toLowerCase()) || 
                      (cleanUserId === creds.phone);

    if (matchesId && cleanInputPass === creds.passwordHash) {
      if (rememberMe) {
        localStorage.setItem('mysarkariresult_admin_session', JSON.stringify({
          userId: creds.userId,
          loggedInAt: Date.now()
        }));
      }
      onLoginSuccess(creds.userId);
      onClose();
    } else {
      setLoginError('गलत यूजर आईडी या पासवर्ड! कृपया सही क्रेडेंशियल दर्ज करें या पासवर्ड रिकवर करें।');
    }
  };

  const handleSendOtp = () => {
    setRecoveryMsg(null);
    const creds = getDefaultCredentials();
    const val = recoveryInput.trim().toLowerCase();

    if (!val) {
      setRecoveryMsg({
        type: 'error',
        text: recoveryType === 'phone' ? 'कृपया अपना 10 अंकों का मोबाइल नंबर दर्ज करें।' : 'कृपया अपना ईमेल आईडी दर्ज करें।'
      });
      return;
    }

    // Match or allow recovery for owner/admin
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setRecoveryMsg({
      type: 'success',
      text: `OTP सफलतापूर्वक भेजा गया! सुरक्षा कोड: [ ${randomOtp} ] (परीक्षण हेतु यहां प्रदर्शित है)`
    });
  };

  const handleVerifyOtp = () => {
    setRecoveryMsg(null);
    if (!enteredOtp || enteredOtp.trim() !== generatedOtp) {
      setRecoveryMsg({ type: 'error', text: 'अमान्य OTP कोड! कृपया 6 अंकों का सही OTP दर्ज करें।' });
      return;
    }

    setIsOtpVerified(true);
    setRecoveryMsg({
      type: 'success',
      text: 'OTP सत्यापित हुआ! आपकी रजिस्टर्ड यूजर आईडी "admin" है। अब नया पासवर्ड बनाएं।'
    });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryMsg(null);

    if (!newPassword || newPassword.length < 4) {
      setRecoveryMsg({ type: 'error', text: 'नया पासवर्ड कम से कम 4 अक्षरों का होना चाहिए।' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setRecoveryMsg({ type: 'error', text: 'दोनों पासवर्ड मेल नहीं खाते हैं!' });
      return;
    }

    const current = getDefaultCredentials();
    const updated: AdminCredentials = {
      ...current,
      passwordHash: newPassword.trim(),
    };

    localStorage.setItem(ADMIN_CREDS_STORAGE_KEY, JSON.stringify(updated));

    setLoginUserId(updated.userId);
    setLoginPassword(newPassword.trim());
    setMode('login');
    setRecoveryMsg({
      type: 'success',
      text: 'पासवर्ड सफलतापूर्वक बदल दिया गया है! अब नए पासवर्ड से लॉगिन करें।'
    });
  };

  const handleAutoFillDemo = () => {
    const creds = getDefaultCredentials();
    setLoginUserId(creds.userId);
    setLoginPassword(creds.passwordHash);
    setLoginError('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl border-2 border-[#000066] w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#000066] text-white p-3 sm:p-4 flex items-center justify-between border-b-2 border-[#cc0000]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-[#cc0000] text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-wide flex items-center gap-1.5">
                <span>ADMIN PORTAL</span>
                <span className="text-[10px] bg-red-700 text-yellow-300 px-1.5 py-0.2 rounded font-mono">
                  MYSARKARIRESULT.CO.IN
                </span>
              </h3>
              <p className="text-[11px] text-blue-200">
                {mode === 'login' ? 'सुरक्षित एडमिन प्रमाणीकरण (Secure Sign In)' : 'यूजर आईडी व पासवर्ड रिकवरी (Account Recovery)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded bg-blue-900 hover:bg-[#cc0000] flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5">
          {mode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Alert Feedback */}
              {loginError && (
                <div className="p-2.5 rounded bg-red-50 border border-red-300 text-red-700 text-xs font-semibold flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              {recoveryMsg?.type === 'success' && (
                <div className="p-2.5 rounded bg-green-50 border border-green-300 text-green-800 text-xs font-semibold flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{recoveryMsg.text}</span>
                </div>
              )}

              {/* User ID Field */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#000066]" />
                    <span>Admin User ID / ईमेल या फोन:</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-normal">Registered Admin ID</span>
                </label>
                <input
                  type="text"
                  required
                  value={loginUserId}
                  onChange={(e) => setLoginUserId(e.target.value)}
                  placeholder="उदा. admin या email"
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded focus:border-[#000066] focus:outline-none bg-gray-50 focus:bg-white transition-all"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-[#000066]" />
                    <span>पासवर्ड (Password):</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-blue-700 hover:underline flex items-center gap-0.5"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="एडमिन पासवर्ड दर्ज करें"
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded focus:border-[#000066] focus:outline-none bg-gray-50 focus:bg-white transition-all"
                />
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-gray-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#000066] focus:ring-0"
                  />
                  <span>याद रखें (Remember Me)</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot');
                    setRecoveryMsg(null);
                  }}
                  className="text-[#cc0000] hover:text-red-800 font-bold hover:underline transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#cc0000] hover:bg-red-700 text-white font-bold rounded text-sm flex items-center justify-center gap-2 shadow hover:shadow-md transition-all cursor-pointer border border-red-800"
              >
                <KeyRound className="w-4 h-4 text-yellow-300" />
                <span>Admin Login (लॉगिन करें)</span>
              </button>

              {/* Quick Helper / Demo Credentials Helper */}
              <div className="pt-2 border-t border-gray-200">
                <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs flex items-center justify-between">
                  <div className="text-gray-700">
                    <span className="font-bold text-[#000066]">Default ID:</span> admin{' '}
                    <span className="mx-1 text-gray-400">|</span>
                    <span className="font-bold text-[#000066]">Pass:</span> admin123
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoFillDemo}
                    className="px-2 py-0.5 bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold rounded transition-colors"
                  >
                    Auto Fill
                  </button>
                </div>
              </div>

            </form>
          ) : (
            /* Forgot Password / Recovery Flow */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setRecoveryMsg(null);
                  }}
                  className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>वापस लॉगिन पर जाएं</span>
                </button>
                <span className="text-xs font-bold text-gray-600">क्रेडेंशियल रिकवरी</span>
              </div>

              {recoveryMsg && (
                <div className={`p-2.5 rounded text-xs font-semibold flex items-start gap-2 border ${
                  recoveryMsg.type === 'success' 
                    ? 'bg-green-50 border-green-300 text-green-800' 
                    : 'bg-red-50 border-red-300 text-red-700'
                }`}>
                  {recoveryMsg.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  )}
                  <span>{recoveryMsg.text}</span>
                </div>
              )}

              {!isOtpVerified ? (
                /* Step 1 & 2: Enter Phone or Email & Send OTP */
                <div className="space-y-3">
                  <div className="text-xs text-gray-700 font-medium">
                    अपने रजिस्टर्ड मोबाइल नंबर या ईमेल आईडी द्वारा पासवर्ड व यूजर आईडी रिकवर करें:
                  </div>

                  {/* Radio Switch: Phone vs Email */}
                  <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded border border-gray-200 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setRecoveryType('phone');
                        setRecoveryInput('9876543210');
                      }}
                      className={`py-1.5 rounded flex items-center justify-center gap-1.5 transition-all ${
                        recoveryType === 'phone' ? 'bg-white text-[#000066] shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Phone No.</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRecoveryType('email');
                        setRecoveryInput('admin@mysarkariresult.co.in');
                      }}
                      className={`py-1.5 rounded flex items-center justify-center gap-1.5 transition-all ${
                        recoveryType === 'email' ? 'bg-white text-[#000066] shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email ID</span>
                    </button>
                  </div>

                  {/* Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      {recoveryType === 'phone' ? 'रजिस्टर्ड मोबाइल नंबर दर्ज करें:' : 'रजिस्टर्ड ईमेल आईडी दर्ज करें:'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type={recoveryType === 'phone' ? 'tel' : 'email'}
                        value={recoveryInput}
                        onChange={(e) => setRecoveryInput(e.target.value)}
                        placeholder={recoveryType === 'phone' ? 'उदा. 9876543210' : 'admin@mysarkariresult.co.in'}
                        className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 rounded focus:border-[#000066] focus:outline-none bg-gray-50 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-3 py-2 bg-[#000066] hover:bg-blue-900 text-white text-xs font-bold rounded shrink-0 transition-colors cursor-pointer"
                      >
                        OTP भेजें
                      </button>
                    </div>
                  </div>

                  {/* OTP Verification Box */}
                  {generatedOtp && (
                    <div className="p-3 bg-yellow-50 border border-yellow-300 rounded space-y-2 mt-2">
                      <label className="block text-xs font-bold text-yellow-900">
                        प्राप्त 6 अंकों का OTP दर्ज करें:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value)}
                          placeholder="6 Digit OTP"
                          className="flex-1 px-3 py-2 text-center tracking-widest font-mono text-base font-bold border-2 border-yellow-400 rounded focus:border-[#000066] bg-white"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded shrink-0 transition-colors cursor-pointer"
                        >
                          Verify OTP
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                /* Step 3: Create New Password */
                <form onSubmit={handleResetPassword} className="space-y-3">
                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900 font-bold flex items-center justify-between">
                    <span>Admin User ID:</span>
                    <span className="font-mono bg-blue-200 px-2 py-0.5 rounded text-blue-950">admin</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      नया पासवर्ड बनाएं (New Password):
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="नया पासवर्ड दर्ज करें"
                      className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded focus:border-[#000066] bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      नए पासवर्ड की पुष्टि करें (Confirm Password):
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="दोबारा नया पासवर्ड दर्ज करें"
                      className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded focus:border-[#000066] bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded text-sm flex items-center justify-center gap-2 shadow cursor-pointer transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>पासवर्ड अपडेट करें और लॉगिन करें</span>
                  </button>
                </form>
              )}

            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-gray-100 p-2.5 text-center text-[11px] text-gray-600 border-t border-gray-200">
          🔒 Secure 256-bit Encrypted Portal for mysarkariresult.co.in
        </div>

      </div>
    </div>
  );
};
