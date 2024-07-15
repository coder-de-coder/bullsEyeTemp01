'use client';
import { useState } from 'react';
import { sendUnsubscribeOtp, verifyUnsubscribeOtp, deleteUser } from '../app/actions';
import FadeIn from './FadeIn';

const UnsubscribeOverlay = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // Step 1 for entering email and OTP, Step 2 for confirmation message

  const handleSendOtp = async () => {
    const response = await sendUnsubscribeOtp(email);
    if (response.success) {
      setMessage('OTP sent to your email. Please check and enter.');
      setStep(2);
    } else {
      setMessage(response.message || "");
    }
  };

  const handleVerifyOtp = async () => {
    const response = await verifyUnsubscribeOtp(email, otp);
    if (response.success) {
      const deleteResponse = await deleteUser(email);
      if (deleteResponse.success) {
        setMessage('Successfully unsubscribed.');
        setTimeout(() => {
          onClose(); // Close the overlay after successful unsubscribe
        }, 2000); // Example: Close after 2 seconds
      } else {
        setMessage(deleteResponse.message);
      }
    } else {
      setMessage(response.message);
    }
  };

  return (
    <FadeIn>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold mb-4">Unsubscribe from bullsEye</h2>
              <p className="text-gray-700 mb-4">We&apos;re sorry to see you go. Please verify your email to unsubscribe.</p>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              />
              <button onClick={handleSendOtp} className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                Send OTP
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-xl font-bold mb-4">Enter OTP to Unsubscribe</h2>
              <p className="text-gray-700 mb-4">{message}</p>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              />
              <button onClick={handleVerifyOtp} className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                Verify OTP
              </button>
            </>
          )}
          <button onClick={onClose} className="mt-4 px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </FadeIn>
  );
};

export default UnsubscribeOverlay;
