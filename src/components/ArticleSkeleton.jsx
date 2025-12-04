import React from 'react';

const ArticleSkeleton = () => {
  return (
    <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="h-6 w-20 bg-dark-700 rounded"></div>
        <div className="h-6 w-12 bg-dark-700 rounded"></div>
      </div>

      {/* Title */}
      <div className="space-y-3 mb-6">
        <div className="h-6 w-full bg-dark-700 rounded"></div>
        <div className="h-6 w-3/4 bg-dark-700 rounded"></div>
      </div>

      {/* Content Preview */}
      <div className="space-y-2 mb-6">
        <div className="h-4 w-full bg-dark-700/50 rounded"></div>
        <div className="h-4 w-full bg-dark-700/50 rounded"></div>
        <div className="h-4 w-2/3 bg-dark-700/50 rounded"></div>
      </div>

      {/* Meta */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 w-24 bg-dark-700/50 rounded"></div>
        <div className="h-4 w-20 bg-dark-700/50 rounded"></div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-6">
        <div className="h-6 w-16 bg-dark-700 rounded"></div>
        <div className="h-6 w-20 bg-dark-700 rounded"></div>
        <div className="h-6 w-14 bg-dark-700 rounded"></div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-dark-700">
        <div className="h-5 w-24 bg-dark-700 rounded"></div>
        <div className="h-5 w-16 bg-dark-700 rounded"></div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;

