'use client';
import { useState } from 'react';
import { sendOtp, verifyOtp, subscribeUser } from '../app/actions';

const SubscribeForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handleSendOtp = async () => {
    setLoading(true); // Set loading state to true
    setMessage('');

    try {
      const response = await sendOtp(email, firstName);
      if (response.success) {
        setGeneratedOtp(response.otp);
        setStep(2);
      } else {
        setMessage(response.message || "");
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  const handleVerifyOtp = async () => {
    const response = await verifyOtp(email, otp, 'SUBSCRIBE');
    if (response.success) {
      setUserId(response.userId || null);
      setStep(3);
    } else {
      setMessage(response.message);
    }
  };

  const handleSubscribe = async () => {
    const response = await subscribeUser(userId!, firstName, email);
    if (response.success) {
      setMessage('Successfully subscribed!');
    } else {
      setMessage(response.message);
    }
  };

  return (
    <div className="bg-black text-white p-8 rounded-lg shadow-lg space-y-4 fade-in transition-opacity duration-500 ease-in-out">
      {message && <p className="text-red-600">{message}</p>}
      {step === 1 && (
        <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-2 bg-black border border-gray-400 rounded-md w-1/3 text-white placeholder-gray-500 focus:outline-none focus:ring-gray-200 focus:border-gray-400 sm:text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 bg-black border border-gray-400 rounded-md w-1/3 text-white placeholder-gray-500 focus:outline-none focus:ring-gray-200 focus:border-gray-400 sm:text-sm"
        />
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <button
            onClick={handleSendOtp}
            className="bg-yellow-500 text-white rounded-full px-6 py-3 hover:bg-yellow-600 transition duration-300 shadow-lg"
          >
            Send OTP
          </button>
        )}
      </div>
      
      )}
      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-2 p-2 bg-black border border-gray-600 rounded-md w-full text-white placeholder-gray-500 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
          />
          <button
            onClick={handleVerifyOtp}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700"
          >
            Verify OTP
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <p className="mt-4 text-gray-400 text-sm">
            bullsEye is not a registered stock trading advisor. All investments in the stock market are subject to market risks. Users are advised to perform their own research along with the suggestions given by bullsEye before making market decisions. Neither the developers nor the promoters will be liable for any sort of loss incurred.
          </p>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
            />
            <span>I Understand</span>
          </div>
          <button
            onClick={handleSubscribe}
            className={`mt-4 px-6 py-2 ${termsAccepted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white font-semibold rounded-full`}
            disabled={!termsAccepted}
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscribeForm;
