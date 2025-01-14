import React, { useState, useRef } from 'react';
import { Upload, Shield, Lock, FileCheck, X, Eye, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { formatFileSize } from '../utils/formatters';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'application/pdf',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

export const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [encryptionProgress, setEncryptionProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 100MB limit');
      return false;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('File type not supported');
      return false;
    }
    setError(null);
    return true;
  };

  const generatePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      generatePreview(file);
      setError(null);
    }
  };

  const simulateEncryption = () => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setEncryptionProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  };

  const simulateUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate encryption first
    await simulateEncryption();
    
    // Then simulate upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSelectedFile(null);
          setPreviewUrl(null);
          setEncryptionProgress(0);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setEncryptionProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <div 
        className={`relative w-full max-w-xl p-8 rounded-xl transition-all duration-300 ${
          isDragging 
            ? 'bg-blue-50 border-blue-400 scale-[1.02]' 
            : 'bg-white border-gray-200 hover:border-blue-300'
        } border-2 border-dashed cursor-pointer group`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          className="hidden"
          onChange={handleFileInput}
          ref={fileInputRef}
          accept={ALLOWED_TYPES.join(',')}
        />
        
        <div className="text-center">
          {previewUrl ? (
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity rounded-lg flex items-center justify-center">
                <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ) : (
            <Upload className="w-12 h-12 mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform" />
          )}
          
          <h3 className="text-lg font-semibold mb-2">
            {selectedFile ? selectedFile.name : 'Choose a file or drag it here'}
          </h3>
          {selectedFile && (
            <p className="text-sm text-gray-500">
              {formatFileSize(selectedFile.size)}
            </p>
          )}
          {error && (
            <div className="flex items-center justify-center text-sm text-red-500 mt-2">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </div>
          )}
        </div>

        {selectedFile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFile();
            }}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {selectedFile && !isUploading && (
        <div className="flex justify-center">
          <Button
            onClick={simulateUpload}
            className="w-48"
          >
            Upload File
          </Button>
        </div>
      )}

      {isUploading && (
        <div className="space-y-4">
          {encryptionProgress < 100 && (
            <div className="space-y-2">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${encryptionProgress}%` }}
                />
              </div>
              <p className="text-center text-sm text-gray-600">
                Encrypting file... {encryptionProgress}%
              </p>
            </div>
          )}
          
          {encryptionProgress === 100 && (
            <div className="space-y-2">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300 relative"
                  style={{ width: `${uploadProgress}%` }}
                >
                  <div className="absolute -right-1 -top-1 w-4 h-4 bg-blue-600 rounded-full animate-pulse" />
                </div>
              </div>
              <p className="text-center text-sm text-gray-600">
                Uploading encrypted file... {uploadProgress}%
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center space-x-8 mt-8">
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="relative">
            <Shield className="w-6 h-6 text-green-500 mb-2 transition-transform group-hover:scale-110" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
          </div>
          <span className="text-sm text-gray-600">End-to-End Encrypted</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer">
          <Lock className="w-6 h-6 text-blue-500 mb-2 transition-transform group-hover:scale-110" />
          <span className="text-sm text-gray-600">Password Protected</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer">
          <FileCheck className="w-6 h-6 text-purple-500 mb-2 transition-transform group-hover:scale-110" />
          <span className="text-sm text-gray-600">Verified Transfer</span>
        </div>
      </div>
    </div>
  );
};