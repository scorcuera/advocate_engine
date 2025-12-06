import React from 'react';
import { ExternalLink, Calendar, TrendingUp, Tag } from 'lucide-react';

/**
 * Composant ArticleCard - Affiche une carte d'article
 */
const ArticleCard = ({ article, onCardClick }) => {
  // Configuration des couleurs par sentiment
  const sentimentColors = {
    Positive: 'bg-green-100 text-green-700 border-green-300',
    Neutral: 'bg-gray-100 text-gray-700 border-gray-300',
    Negative: 'bg-red-100 text-red-700 border-red-300',
    Mixed: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  };

  // Configuration des couleurs par statut
  const statusColors = {
    New: 'bg-blue-100 text-blue-700 border-blue-300',
    Analyzed: 'bg-purple-100 text-purple-700 border-purple-300',
    Approved: 'bg-green-100 text-green-700 border-green-300',
    Rejected: 'bg-red-100 text-red-700 border-red-300',
  };

  // Couleurs pour les industries
  const industryColors = [
    'bg-sociabble-blue-100 text-sociabble-blue-700 border-sociabble-blue-300',
    'bg-sociabble-purple-100 text-sociabble-purple-700 border-sociabble-purple-300',
    'bg-teal-100 text-teal-700 border-teal-300',
    'bg-sociabble-orange-100 text-sociabble-orange-700 border-sociabble-orange-300',
  ];

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  // Score color based on value
  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-700 bg-green-100 border-green-300';
    if (score >= 6) return 'text-sociabble-blue-700 bg-sociabble-blue-100 border-sociabble-blue-300';
    if (score >= 4) return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    return 'text-red-700 bg-red-100 border-red-300';
  };

  return (
    <div
      onClick={() => onCardClick(article)}
      className="group relative bg-white border border-gray-200 rounded-xl cursor-pointer overflow-hidden hover:shadow-md hover:border-sociabble-blue-300 transition-all duration-150 hardware-accelerated"
    >
      {/* Header avec statut et score */}
      <div className="relative px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-1 rounded text-xs font-bold border ${statusColors[article.status] || statusColors.New}`}>
            {article.status}
          </span>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-sm font-bold border ${getScoreColor(article.relevanceScore)}`}>
            <TrendingUp className="w-4 h-4" />
            <span>{article.relevanceScore}/10</span>
          </div>
        </div>
        
        {/* Titre */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-sociabble-blue-600 transition-colors duration-150 line-clamp-2">
          {article.title}
        </h3>
      </div>

      {/* Corps de la carte */}
      <div className="relative p-6">
        {/* Preview du contenu */}
        {article.contentPreview && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {article.contentPreview}
          </p>
        )}

        {/* Métadonnées */}
        <div className="space-y-3 mb-4">
          {/* Date et source */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publicationDate)}</span>
            </div>
            <span className="text-gray-700 font-semibold px-2 py-1 bg-gray-100 rounded">{article.source}</span>
          </div>

          {/* Sentiment */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Sentiment:</span>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${sentimentColors[article.sentiment] || sentimentColors.Neutral}`}>
              {article.sentiment}
            </span>
          </div>
        </div>

        {/* Industries */}
        {article.industry && article.industry.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Industries:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.industry.slice(0, 3).map((ind, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                    industryColors[index % industryColors.length]
                  }`}
                >
                  {ind}
                </span>
              ))}
              {article.industry.length > 3 && (
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-gray-100 text-gray-600 border border-gray-300">
                  +{article.industry.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer avec lien */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCardClick(article);
              }}
              className="text-sm font-bold text-sociabble-blue-600 hover:text-sociabble-blue-700 transition-colors duration-75 flex items-center gap-1"
            >
              Voir les détails
            </button>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-sociabble-orange-600 transition-colors duration-75"
            >
              <ExternalLink className="w-4 h-4" />
              Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;


