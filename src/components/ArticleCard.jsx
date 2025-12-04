import React from 'react';
import { ExternalLink, Calendar, TrendingUp, Tag } from 'lucide-react';

/**
 * Composant ArticleCard - Affiche une carte d'article
 */
const ArticleCard = ({ article, onCardClick }) => {
  // Configuration des couleurs par sentiment
  const sentimentColors = {
    Positive: 'bg-green-500/20 text-green-400 border-green-500/30',
    Neutral: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    Negative: 'bg-red-500/20 text-red-400 border-red-500/30',
    Mixed: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };

  // Configuration des couleurs par statut
  const statusColors = {
    New: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Analyzed: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    Approved: 'bg-green-500/20 text-green-400 border-green-500/30',
    Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  // Couleurs pour les industries
  const industryColors = [
    'bg-primary-500/20 text-primary-400 border-primary-500/30',
    'bg-accent-purple-500/20 text-accent-purple-400 border-accent-purple-500/30',
    'bg-accent-teal-500/20 text-accent-teal-400 border-accent-teal-500/30',
    'bg-accent-gold-500/20 text-accent-gold-400 border-accent-gold-500/30',
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
    if (score >= 8) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (score >= 6) return 'text-primary-400 bg-primary-500/20 border-primary-500/30';
    if (score >= 4) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-red-400 bg-red-500/20 border-red-500/30';
  };

  return (
    <div
      onClick={() => onCardClick(article)}
      className="group relative bg-dark-800 border border-dark-700 rounded-xl cursor-pointer overflow-hidden hover:bg-dark-750 transition-colors duration-75 hardware-accelerated"
    >
      {/* Header avec statut et score */}
      <div className="relative px-6 py-4 border-b border-dark-700">
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
        <h3 className="text-lg font-bold text-gray-100 group-hover:text-primary-400 transition-colors duration-75 line-clamp-2">
          {article.title}
        </h3>
      </div>

      {/* Corps de la carte */}
      <div className="relative p-6">
        {/* Preview du contenu */}
        {article.contentPreview && (
          <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">
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
            <span className="text-gray-400 font-semibold px-2 py-1 glass-effect-light rounded">{article.source}</span>
          </div>

          {/* Sentiment */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sentiment:</span>
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
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Industries:</span>
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
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-dark-700 text-gray-400 border border-dark-600">
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
                className="px-2 py-1 glass-effect-light text-gray-500 rounded text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer avec lien */}
        <div className="pt-4 border-t border-dark-700">
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCardClick(article);
              }}
              className="text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors duration-75 flex items-center gap-1"
            >
              Voir les détails
            </button>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors duration-75"
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


