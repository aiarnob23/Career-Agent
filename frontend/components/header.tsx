'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/button';
import { Menu, X, Sparkles} from 'lucide-react';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold gradient-text">Career Agent</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
          <Link href="/chat" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              AI Assistant
            </Link>
            <Link href="/resume-builder" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              Resume Builder
            </Link>
          </nav>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="px-4 py-6 space-y-4">
          <Link
              href="/chat"
              className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Assistant
            </Link>
            <Link
              href="/resume-builder"
              className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resume Builder
            </Link>
  
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;