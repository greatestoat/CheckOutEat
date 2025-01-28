// TickAnimation.tsx
import { useEffect, useState } from 'react';

const TickAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300); // Delay the animation for a smoother effect

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className={`fixed inset-0 flex justify-center items-center z-50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className={`transition-opacity duration-300 p-4 bg-blue-500 rounded-full shadow-md`}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default TickAnimation;
