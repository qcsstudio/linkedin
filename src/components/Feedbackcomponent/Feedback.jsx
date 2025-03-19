import React, { useState } from 'react';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    feedbackType: '',
    feedback: '',
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRadioChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      feedbackType: e.target.value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);  
    alert('Feedback submitted!');
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Feedback</h2>
      <p className="text-gray-600 mb-6">
        We would love to hear your thoughts, suggestions, concerns or problems, with anything so we can improve!
      </p>

      <form onSubmit={submitHandler}>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Feedback Type</h3>
          <div className="flex space-x-5">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="feedbackType"
                value="comments"
                checked={formData.feedbackType === 'comments'}
                onChange={handleRadioChange}
              />
              <span className="ml-2">Comments</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="feedbackType"
                value="suggestions"
                checked={formData.feedbackType === 'suggestions'}
                onChange={handleRadioChange}
              />
              <span className="ml-2">Suggestions</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="feedbackType"
                value="questions"
                checked={formData.feedbackType === 'questions'}
                onChange={handleRadioChange}
              />
              <span className="ml-2">Questions</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="feedback" className="block text-lg font-medium mb-2">Describe Your Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none focus:border-blue-500"
            value={formData.feedback}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border rounded-md focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            placeholder="ex: myname@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
