import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const AlertTriangle = getIcon('AlertTriangle');
const HomeIcon = getIcon('Home');

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-800 dark:to-surface-900">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-6 inline-block">
            <AlertTriangle className="h-16 w-16 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-surface-900 dark:text-white">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-surface-800 dark:text-surface-100">
          Page Not Found
        </h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <Link 
          to="/"
          className="btn-primary inline-flex items-center"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center text-surface-500 dark:text-surface-400 text-sm"
      >
        <p>&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
      </motion.div>
    </div>
  );
}

export default NotFound;