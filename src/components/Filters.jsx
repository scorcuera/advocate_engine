import React from 'react';
import { Search, Filter, X } from 'lucide-react';

/**
 * Composant Filters - Barre de filtres et recherche
 */
const Filters = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  industryFilter,
  setIndustryFilter,
  sentimentFilter,
  setSentimentFilter,
  sortBy,
  setSortBy,
  availableIndustries 
}) => {
  const statuses = ['Tous', 'New', 'Analyzed', 'Approved', 'Rejected'];
  const sentiments = ['Tous', 'Positive', 'Neutral', 'Negative', 'Mixed'];

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('Tous');
    setIndustryFilter([]);
    setSentimentFilter('Tous');
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'Tous' || 
                          industryFilter.length > 0 || sentimentFilter !== 'Tous';

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-dark-700 p-2 rounded-lg">
          <Filter className="w-5 h-5 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-100">Filtres et recherche</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-dark-700 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-dark-600 transition-colors font-semibold"
          >
            <X className="w-4 h-4" />
            Réinitialiser
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-4">
        {/* Barre de recherche */}
        <div className="xl:col-span-2">
          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
            Recherche par titre
          </label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un article..."
              className="w-full pl-12 pr-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder-gray-600"
            />
          </div>
        </div>

        {/* Filtre par statut */}
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
            Statut
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all cursor-pointer"
          >
            {statuses.map(status => (
              <option key={status} value={status} className="bg-dark-800 text-gray-100">{status}</option>
            ))}
          </select>
        </div>

        {/* Filtre par sentiment */}
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
            Sentiment
          </label>
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all cursor-pointer"
          >
            {sentiments.map(sentiment => (
              <option key={sentiment} value={sentiment} className="bg-dark-800 text-gray-100">{sentiment}</option>
            ))}
          </select>
        </div>

        {/* Tri */}
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
            Trier par
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all cursor-pointer"
          >
            <option value="date-desc" className="bg-dark-800 text-gray-100">Date (plus récent)</option>
            <option value="date-asc" className="bg-dark-800 text-gray-100">Date (plus ancien)</option>
            <option value="score-desc" className="bg-dark-800 text-gray-100">Score (plus élevé)</option>
            <option value="score-asc" className="bg-dark-800 text-gray-100">Score (plus bas)</option>
          </select>
        </div>
      </div>

      {/* Filtre multi-select des industries */}
      <div className="mt-6">
        <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
          Industries
        </label>
        <div className="flex flex-wrap gap-2">
          {availableIndustries.map(industry => {
            const isSelected = industryFilter.includes(industry);
            return (
              <button
                key={industry}
                onClick={() => {
                  if (isSelected) {
                    setIndustryFilter(industryFilter.filter(i => i !== industry));
                  } else {
                    setIndustryFilter([...industryFilter, industry]);
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600 border border-dark-600'
                }`}
              >
                {industry}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;


