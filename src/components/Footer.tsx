export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
        <p className="text-center text-base text-gray-500">
          &copy; {new Date().getFullYear()} MoodEats - Recipe Finder for College Students
        </p>
        <div className="mt-2 flex justify-center space-x-6">
          <a 
            href="https://www.themealdb.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">The Meal DB</span>
            <span className="text-sm">Powered by TheMealDB API</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
