import React from 'react';

const HelpPage = () => {
  const steps = [
    {
      image: '/assets/images/shotk.png', // Replace with your actual image filenames
      text: 'Step 1: Start by entering your message on the home page. Use the provided input field and click "Submit" to proceed.',
    },
    {
      image: '/assets/images/step2.jpg', // Replace with your actual image filenames
      text: 'Step 2: Your message will be securely sent to the server. Navigate to the next page to view the submitted message.',
    },
    {
      image: '/assets/images/step3.jpg', // Replace with your actual image filenames
      text: 'Step 3: On the next page, you can see your message displayed. This page also provides additional options for managing your message.',
    },
    {
      image: '/assets/images/step4.jpg', // Replace with your actual image filenames
      text: 'Step 4: For any issues or concerns, use the "Help" section to find detailed instructions or contact support.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-10">How to Use Our Application</h1>
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={step.image}
                alt={`Step ${index + 1}`}
                className="w-full md:w-1/2 h-64 object-cover"
              />
              <div className="p-6 md:w-1/2">
                <p className="text-lg">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
