import React, { useState, useRef } from 'react';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  isVerifying?: boolean;
  onResend: () => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  isVerifying = false,
  onResend
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null)
  );

  const handleChange = (
    index: number, 
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (
    index: number, 
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === 'Backspace' && 
      !otp[index] && 
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text').slice(0, length);
    
    if (!isNaN(Number(pastedText))) {
      const pastedDigits = pastedText.split('');
      const newOtp = [...otp];
      
      pastedDigits.forEach((digit, index) => {
        if (index < length) {
          newOtp[index] = digit;
        }
      });

      setOtp(newOtp);

      inputRefs.current[pastedDigits.length - 1]?.focus();

      if (newOtp.every(digit => digit !== '')) {
        onComplete(newOtp.join(''));
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center space-x-2 sm:space-x-3 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => inputRefs.current[index] = el}
            type="tel"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`
              w-10 h-12 sm:w-12 sm:h-14 
              text-center text-xl sm:text-2xl 
              border-2 rounded-lg 
              focus:outline-none focus:ring-2 
              transition-all duration-300
              ${digit 
                ? 'border-blue-500 focus:ring-blue-300 bg-blue-50' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }
            `}
            placeholder="-"
          />
        ))}
      </div>
      <div className="flex justify-center items-center space-x-4 text-sm">
        <button
          type="button"
          onClick={onResend}
          disabled={isVerifying}
          className={`
            text-blue-600 hover:underline
            ${isVerifying ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OTPInput;