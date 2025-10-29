import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, HeartIcon } from '@heroicons/react/24/outline';

export const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center text-primary-600 hover:text-primary-800 transition-colors"
            >
              <span className="text-2xl font-bold">🍳 MoodEats</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/'
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <HomeIcon className="h-5 w-5 mr-1" />
                Home
              </Link>
              <Link
                to="/favorites"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/favorites'
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <HeartIcon className="h-5 w-5 mr-1" />
                Favorites
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500">For college students who love to cook</span>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/'
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
          >
            <HomeIcon className="h-5 w-5 inline-block mr-2" />
            Home
          </Link>
          <Link
            to="/favorites"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/favorites'
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
          >
            <HeartIcon className="h-5 w-5 inline-block mr-2" />
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
};
