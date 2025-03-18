import React from 'react';

function FeedbackForm() {
  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibolds">Feedback</h2>
      <p className="text-gray-600  mb-6">
        We would love to hear your thoughts, suggestions, concerns or problems, with anything so we can improve!
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Feedback Type</h3>
        <div className="flex space-x-5">
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="feedbackType" value="comments" />
            <span className="ml-2">Comments</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="feedbackType" value="suggestions" />
            <span className="ml-2">Suggestions</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="feedbackType" value="questions" />
            <span className="ml-2">Questions</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="feedback" className="block text-lg font-medium mb-2">Describe Your Feedback:</label>
        <textarea
          id="feedback"
          rows="4"
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>


      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          id="name"
          className="w-full p-2 border rounded-md focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="ex: myname@example.com"
        />
      </div>

      <div className="text-center mt-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
}

export default FeedbackForm;