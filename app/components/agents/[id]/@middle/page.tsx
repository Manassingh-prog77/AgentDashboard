export default function middle() {
    return (
      <div className="h-full w-full flex justify-center items-center bg-gray-50 border-gray-300 border shadow-md rounded-md">
        <div className="w-full h-full p-10">
          {/* Name Field */}
          <div className="mb-8">
            <label className="block text-2xl font-semibold text-gray-700 mb-4">
              Name
            </label>
            <input
              type="text"
              className="w-full h-14 text-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
  
          {/* Prompt Field */}
          <div className="flex flex-col flex-grow">
            <label className="block text-2xl font-semibold text-gray-700 mb-4">
              Prompt
            </label>
            <textarea
              className="w-full h-72 text-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            ></textarea>
          </div>
        </div>
      </div>
    );
  }