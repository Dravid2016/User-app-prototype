import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../store/appStore';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoButton } from '../components/bento/BentoButton';
import { Phone, User as UserIcon, Mail, ArrowLeft, ShieldCheck, CheckCircle, Sparkles, ArrowRight, Utensils } from 'lucide-react';

interface AuthProps {
  onFinish?: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onFinish }) => {
  const { login, showToast, setPage } = useAppStore();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [step, setStep] = useState<'form' | 'otp'>('form');

  // Form inputs
  const [phone, setPhone] = useState('9876543210');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // OTP inputs
  const [otp, setOtp] = useState<string[]>(['1', '2', '3', '4']);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // OTP Countdown timer
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: any;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Form Validation
  const validatePhone = (num: string) => {
    const cleanNum = num.replace(/\D/g, '');
    return cleanNum.length === 10;
  };

  const validateEmail = (mail: string) => {
    if (!mail) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(mail);
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      showToast('Please enter a valid 10-digit mobile number');
      return;
    }

    if (activeTab === 'signup') {
      if (name.trim().length < 3) {
        showToast('Please enter your full name (minimum 3 characters)');
        return;
      }
      if (!validateEmail(email)) {
        showToast('Please enter a valid email address');
        return;
      }
    }

    // Advance to OTP step
    setStep('otp');
    setTimer(30);
    setCanResend(false);
    setOtp(['1', '2', '3', '4']);
    showToast('OTP sent successfully! (Demo code: 1234)');
    
    setTimeout(() => {
      otpRefs[0].current?.focus();
    }, 150);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const completeLogin = (userProfile: any) => {
    login(userProfile);
    showToast(`Welcome to Feazto, ${userProfile.name}! 🎉`);
    if (onFinish) {
      onFinish();
    } else {
      setPage('home');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otp.join('');

    if (enteredCode.length < 4) {
      showToast('Please enter the 4-digit OTP code');
      return;
    }

    if (enteredCode === '1234') {
      const cleanPhone = phone.replace(/\D/g, '');
      const userProfile = {
        id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
        name: activeTab === 'signup' ? name.trim() : 'Ranjith Kumar',
        phone: `+91 ${cleanPhone.substring(0, 5)} ${cleanPhone.substring(5)}`,
        email: activeTab === 'signup' && email ? email.trim() : 'ranjith.k@feazto.com',
        avatar: undefined,
        isGoldMember: true,
        location: 'Anna Nagar, Chennai',
      };

      completeLogin(userProfile);
    } else {
      showToast('Invalid OTP. Please try "1234" for the demo.');
      setOtp(['', '', '', '']);
      otpRefs[0].current?.focus();
    }
  };

  const handleQuickDemoLogin = () => {
    const demoUser = {
      id: 'usr-demo-1',
      name: 'Ranjith Kumar',
      phone: '+91 98765 43210',
      email: 'ranjith.k@feazto.com',
      avatar: undefined,
      isGoldMember: true,
      location: 'Anna Nagar, Chennai',
    };
    completeLogin(demoUser);
  };

  const handleSkip = () => {
    if (onFinish) {
      onFinish();
    } else {
      setPage('home');
    }
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    setOtp(['1', '2', '3', '4']);
    showToast('A new OTP has been sent. Use "1234" to verify.');
    otpRefs[0].current?.focus();
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-4 py-6 select-none bg-[#fdfaeb] animate-fade-in">
      {/* Top Heritage Header */}
      <div className="text-center pt-2 pb-4 flex flex-col items-center">
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-[#111111] text-[#FFD21F] rounded-full text-[10px] font-black uppercase tracking-wider mb-3 shadow-[0_2px_0_#111111]">
          <Sparkles size={12} className="fill-[#FFD21F]" /> Authentic Homemade Food
        </div>
        
        {/* Official Fixed Logo Asset */}
        <div className="flex flex-col items-center justify-center my-2">
          <img
            src="/brand/feazto-logo.png"
            alt="FEAZTO"
            className="w-40 h-auto object-contain block drop-shadow-sm filter contrast-105"
          />
          <p className="text-[12.5px] font-black text-[#111111] tracking-tight mt-1.5">
            food · culture · connect
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-sm mx-auto">
        <BentoCard padding="lg" className="border-2 border-[#111111] shadow-[0_4px_0_#111111] bg-white rounded-3xl">
          
          {step === 'form' ? (
            <div>
              <div className="text-center mb-4">
                <h2 className="text-base font-black text-[#111111] tracking-tight">
                  Sign In to Your Kitchen
                </h2>
                <p className="text-[10px] font-bold text-[#707070] mt-0.5">
                  Fresh homemade feasts delivered to your doorstep
                </p>
              </div>

              {/* Tab Toggles */}
              <div className="grid grid-cols-2 p-1 bg-[#f4f4f4] border-1.5 border-[#111111] rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className={`py-1.5 px-3 text-[10px] font-black rounded-lg transition-all ${
                    activeTab === 'signin'
                      ? 'bg-[#FFD21F] text-[#111111] border border-[#111111] shadow-[0_1px_0_#111111]'
                      : 'text-[#707070] hover:text-[#111111]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className={`py-1.5 px-3 text-[10px] font-black rounded-lg transition-all ${
                    activeTab === 'signup'
                      ? 'bg-[#FFD21F] text-[#111111] border border-[#111111] shadow-[0_1px_0_#111111]'
                      : 'text-[#707070] hover:text-[#111111]'
                  }`}
                >
                  New Account
                </button>
              </div>

              <form onSubmit={handleRequestOtp} className="space-y-3">
                {activeTab === 'signup' && (
                  <>
                    <div className="space-y-1 text-left">
                      <label className="text-[9.5px] font-black text-[#111111] uppercase tracking-wide">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#707070]">
                          <UserIcon size={14} />
                        </div>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full pl-8 pr-3 py-2 bg-[#FAFAFA] border-1.5 border-[#111111] rounded-xl text-xs font-bold text-[#111111] placeholder:text-[#a0a0a0] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[9.5px] font-black text-[#111111] uppercase tracking-wide flex justify-between">
                        <span>Email</span>
                        <span className="text-[8px] text-[#707070] font-bold">Optional</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#707070]">
                          <Mail size={14} />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full pl-8 pr-3 py-2 bg-[#FAFAFA] border-1.5 border-[#111111] rounded-xl text-xs font-bold text-[#111111] placeholder:text-[#a0a0a0] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Mobile Phone Input */}
                <div className="space-y-1 text-left">
                  <label className="text-[9.5px] font-black text-[#111111] uppercase tracking-wide">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#707070]">
                      <Phone size={14} />
                    </div>
                    <span className="absolute inset-y-0 left-8 flex items-center text-xs font-black text-[#111111] pointer-events-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="98765 43210"
                      className="w-full pl-15 pr-3 py-2 bg-[#FAFAFA] border-1.5 border-[#111111] rounded-xl text-xs font-bold text-[#111111] placeholder:text-[#a0a0a0] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <BentoButton
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="sm"
                    className="shadow-[0_3px_0_#111111] active:translate-y-[2px] active:shadow-none"
                  >
                    Send OTP Verification Code
                  </BentoButton>
                </div>
              </form>

              {/* Quick Demo One-Tap Login */}
              <div className="mt-3 pt-3 border-t border-black/10">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2 bg-[#111111] hover:bg-black text-[#FFD21F] border border-[#111111] rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 shadow-[0_2px_0_#000000] active:scale-98 transition-transform cursor-pointer"
                >
                  <Sparkles size={12} className="fill-[#FFD21F]" />
                  1-Tap Instant Demo Login
                </button>
              </div>
            </div>
          ) : (
            /* OTP Screen */
            <div>
              <button
                onClick={() => setStep('form')}
                className="inline-flex items-center gap-1 text-[10px] font-black text-[#111111] hover:underline mb-3 group cursor-pointer"
              >
                <ArrowLeft size={12} />
                Change Number
              </button>

              <div className="text-center mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFD21F] border-2 border-[#111111] flex items-center justify-center mx-auto mb-2 shadow-[0_2px_0_#111111]">
                  <ShieldCheck size={20} className="text-[#111111]" />
                </div>
                <h2 className="text-base font-black text-[#111111]">Enter OTP Code</h2>
                <p className="text-[9.5px] font-bold text-[#707070] mt-0.5">
                  Sent to +91 {phone.substring(0, 5)} {phone.substring(5)}
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-11 h-12 text-center text-base font-black bg-[#FAFAFA] border-2 border-[#111111] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFD21F] shadow-[0_2px_0_#111111]"
                    />
                  ))}
                </div>

                <div className="p-2 bg-[#fffdf5] border border-black/10 rounded-xl text-center">
                  <p className="text-[9px] font-bold text-[#707070] flex items-center justify-center gap-1">
                    <CheckCircle size={10} className="text-[#111111]" />
                    Demo Code: <span className="text-[#111111] font-black">1234</span>
                  </p>
                </div>

                <BentoButton
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="sm"
                  className="shadow-[0_3px_0_#111111] active:translate-y-[2px] active:shadow-none"
                >
                  Verify & Enter FEAZTO
                </BentoButton>

                <div className="text-center pt-1">
                  {timer > 0 ? (
                    <p className="text-[9px] font-bold text-[#707070]">
                      Resend in <span className="text-[#111111] font-black">{timer}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[9.5px] font-black text-[#111111] underline cursor-pointer"
                    >
                      Resend OTP Code
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

        </BentoCard>

        {/* Skip / Guest Link */}
        <div className="text-center mt-3.5">
          <button
            type="button"
            onClick={handleSkip}
            className="inline-flex items-center gap-1 text-[11px] font-black text-[#111111] hover:text-[#555] cursor-pointer py-1 px-3 rounded-full hover:bg-black/5 transition-all"
          >
            <span>Explore as Guest</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Footer Cultural Note */}
      <div className="text-center pt-4">
        <p className="text-[8.5px] font-bold text-[#888888]">
          100% Homemade · Zero Preservatives · Direct from Home Chefs
        </p>
      </div>
    </div>
  );
};
