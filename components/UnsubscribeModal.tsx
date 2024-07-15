'use client';
import { useState } from 'react';
import { sendUnsubscribeOtp, verifyUnsubscribeOtp, deleteUser } from '../app/actions'; // Adjust the import path if necessary
import FadeIn from './FadeIn';

interface UnsubscribeModalProps {
  closeModal: () => void;
}

const UnsubscribeModal: React.FC<UnsubscribeModalProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // Step 1 for entering email, Step 2 for OTP verification
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    const response = await sendUnsubscribeOtp(email);
    if (response.success) {
      setMessage('OTP sent to your email. Please check and enter.');
      setStep(2);
    } else {
      setMessage(response.message || "");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    const response = await verifyUnsubscribeOtp(email, otp);
    if (response.success) {
      const deleteResponse = await deleteUser(email);
      if (deleteResponse.success) {
        setMessage('Successfully unsubscribed.');
        setTimeout(() => {
          closeModal(); // Close the modal after successful unsubscribe
        }, 2000);
      } else {
        setMessage(deleteResponse.message);
      }
    } else {
      setMessage(response.message);
    }
    setLoading(false);
  };

  return (
    <FadeIn>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          {step === 1 && (
            <>
              <h2 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r to-yellow-500 from-white font-bold mb-4">Unsubscribe from bullsEye</h2>
              <p className="text-gray-300 mb-4">We're sorry to see you go. Please verify your email to unsubscribe.</p>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-3 border border-gray-700 rounded bg-gray-900 text-white w-full placeholder-gray-500 focus:outline-none focus:ring focus:ring-yellow-500"
              />
              <button 
                onClick={handleSendOtp} 
                className="mt-4 px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300 shadow-lg"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r to-yellow-500 from-white font-bold mb-4">Enter OTP to Unsubscribe</h2>
              <p className="text-gray-300 mb-4">{message}</p>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-2 p-3 border border-gray-700 rounded bg-gray-900 text-white w-full placeholder-gray-500 focus:outline-none focus:ring focus:ring-yellow-500"
              />
              <button 
                onClick={handleVerifyOtp} 
                className="mt-4 px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300 shadow-lg"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </>
          )}
          <button onClick={closeModal} className="mx-3 mt-4 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </div>
    </FadeIn>
  );
};

export default UnsubscribeModal;
