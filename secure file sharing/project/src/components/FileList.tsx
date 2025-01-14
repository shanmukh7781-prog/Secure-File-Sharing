import React, { useState } from 'react';
import { File, Download, Trash2, Clock, Eye, Lock } from 'lucide-react';

type FileItem = {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  expiresIn: string;
  isEncrypted: boolean;
  thumbnail?: string;
};

const files: FileItem[] = [
  {
    id: '1',
    name: 'important-document.pdf',
    size: '2.4 MB',
    uploadDate: '2024-03-15',
    expiresIn: '6 days',
    isEncrypted: true,
    thumbnail: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=300&q=80'
  },
  {
    id: '2',
    name: 'presentation.pptx',
    size: '5.1 MB',
    uploadDate: '2024-03-14',
    expiresIn: '5 days',
    isEncrypted: true,
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&q=80'
  }
];

export const FileList = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Shared Files</h3>
        <span className="text-sm text-gray-500">{files.length} files</span>
      </div>
      <div className="space-y-4">
        {files.map(file => (
          <div 
            key={file.id} 
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative group"
            onMouseEnter={() => setHoveredId(file.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  {file.thumbnail ? (
                    <img 
                      src={file.thumbnail} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <File className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                  {file.isEncrypted && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{file.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="font-medium">{file.size}</span>
                    <span>•</span>
                    <div className="flex items-center text-orange-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {file.expiresIn}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    hoveredId === file.id ? 'bg-blue-50 text-blue-600 scale-110' : 'text-gray-400'
                  }`}
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button 
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    hoveredId === file.id ? 'bg-green-50 text-green-600 scale-110' : 'text-gray-400'
                  }`}
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    hoveredId === file.id ? 'bg-red-50 text-red-600 scale-110' : 'text-gray-400'
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};