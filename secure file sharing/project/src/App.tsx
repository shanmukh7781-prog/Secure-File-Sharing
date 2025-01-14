import React from 'react';
import { FileUpload } from './components/FileUpload';
import { FileList } from './components/FileList';
import { Shield } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Shield className="w-16 h-16 text-blue-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Secure File Sharing
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto leading-relaxed">
              Upload and share files with end-to-end encryption. 
              Your data remains private and secure.
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <FileUpload />
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <FileList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;