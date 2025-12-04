import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Calendar, 
  TrendingUp, 
  Tag, 
  Check, 
  XCircle,
  Copy,
  Linkedin,
  Twitter,
  Globe
} from 'lucide-react';

/**
 * Composant ArticleDetail - Modal détaillée d'un article
 */
const ArticleDetail = ({ article, onClose, onApprove, onReject, isUpdating }) => {
  const [copiedSection, setCopiedSection] = useState(null);

  if (!article) return null;

  // Configuration des couleurs par sentiment
  const sentimentColors = {
    Positive: 'bg-green-500/20 text-green-400 border-green-500',
    Neutral: 'bg-gray-500/20 text-gray-400 border-gray-500',
    Negative: 'bg-red-500/20 text-red-400 border-red-500',
    Mixed: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
  };

  // Configuration des couleurs par statut
  const statusColors = {
    New: 'bg-blue-500/20 text-blue-400 border-blue-500',
    Analyzed: 'bg-purple-500/20 text-purple-400 border-purple-500',
    Approved: 'bg-green-500/20 text-green-400 border-green-500',
    Rejected: 'bg-red-500/20 text-red-400 border-red-500',
  };

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Score color
  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-400 bg-green-500/20 border-green-500';
    if (score >= 6) return 'text-primary-400 bg-primary-500/20 border-primary-500';
    if (score >= 4) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500';
    return 'text-red-400 bg-red-500/20 border-red-500';
  };

  // Copier dans le presse-papiers
  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    });
  };

  return (
    <div 
      className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      {/* Contenedor del modal optimizado: fondo sólido en lugar de glass-effect para evitar blending costoso */}
      <div 
        className="bg-dark-900 rounded-2xl shadow-premium-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar border border-dark-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Premium - Sin blur sticky para rendimiento */}
        <div className="sticky top-0 bg-dark-900 border-b border-dark-700 px-8 py-6 z-20">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className={`px-4 py-2 rounded-lg text-xs font-bold border ${statusColors[article.status] || statusColors.New}`}>
                  {article.status}
                </span>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border ${getScoreColor(article.relevanceScore)}`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{article.relevanceScore}/10</span>
                </div>
                <span className={`px-4 py-2 rounded-lg text-xs font-bold border ${sentimentColors[article.sentiment] || sentimentColors.Neutral}`}>
                  {article.sentiment}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-3 leading-tight text-gray-100">{article.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2 bg-dark-800 border border-dark-700 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{formatDate(article.publicationDate)}</span>
                </div>
                <span className="bg-dark-800 border border-dark-700 px-3 py-1.5 rounded-lg font-bold">{article.source}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-xl p-3 transition-colors duration-150"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Corps */}
        <div className="px-8 py-6 space-y-6">
          {/* Industries et Tags */}
          <div className="flex flex-wrap gap-6">
            {article.industry && article.industry.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-primary-400" />
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Industries:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.industry.map((ind, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-dark-800 text-primary-400 rounded-lg text-sm font-bold border border-dark-700"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {article.tags && article.tags.length > 0 && (
              <div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block mb-3">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-dark-800 text-gray-400 rounded-lg text-xs font-medium border border-dark-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Résumé IA */}
          {article.aiSummary && (
            <div className="bg-dark-800 border-l-4 border-accent-purple-500 rounded-xl p-6">
              <h3 className="text-xl font-bold text-accent-purple-400 mb-4 flex items-center gap-2">
                <span>📝</span> Résumé IA
              </h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{article.aiSummary}</p>
            </div>
          )}

          {/* Points clés */}
          {article.aiKeyPoints && (
            <div className="bg-dark-800 border-l-4 border-primary-500 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary-400 mb-4 flex items-center gap-2">
                <span>🔑</span> Points clés
              </h3>
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{article.aiKeyPoints}</div>
            </div>
          )}

          {/* Copies pour réseaux sociaux */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <span>📱</span> Copies pour diffusion
            </h3>

            {/* LinkedIn */}
            {article.linkedinCopy && (
              <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-blue-500/50 transition-colors duration-150 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-dark-700 p-2 rounded-lg">
                      <Linkedin className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="font-bold text-gray-100 text-lg">LinkedIn</h4>
                  </div>
                  <button
                    onClick={() => copyToClipboard(article.linkedinCopy, 'linkedin')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-150 text-sm font-bold"
                  >
                    {copiedSection === 'linkedin' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copié!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copier
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{article.linkedinCopy}</p>
              </div>
            )}

            {/* Twitter */}
            {article.twitterCopy && (
              <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-sky-500/50 transition-colors duration-150 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-dark-700 p-2 rounded-lg">
                      <Twitter className="w-6 h-6 text-sky-400" />
                    </div>
                    <h4 className="font-bold text-gray-100 text-lg">Twitter / X</h4>
                  </div>
                  <button
                    onClick={() => copyToClipboard(article.twitterCopy, 'twitter')}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors duration-150 text-sm font-bold"
                  >
                    {copiedSection === 'twitter' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copié!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copier
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{article.twitterCopy}</p>
              </div>
            )}

            {/* Intranet */}
            {article.intranetCopy && (
              <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-accent-teal-500/50 transition-colors duration-150 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-dark-700 p-2 rounded-lg">
                      <Globe className="w-6 h-6 text-accent-teal-400" />
                    </div>
                    <h4 className="font-bold text-gray-100 text-lg">Intranet</h4>
                  </div>
                  <button
                    onClick={() => copyToClipboard(article.intranetCopy, 'intranet')}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-teal-600 text-white rounded-lg hover:bg-accent-teal-500 transition-colors duration-150 text-sm font-bold"
                  >
                    {copiedSection === 'intranet' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copié!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copier
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{article.intranetCopy}</p>
              </div>
            )}
          </div>

          {/* Lien vers l'article source */}
          <div className="flex justify-center pt-6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-dark-800 hover:bg-dark-700 text-gray-200 rounded-xl transition-colors duration-150 font-bold text-lg border border-dark-700 hover:border-primary-500 group"
            >
              <ExternalLink className="w-6 h-6" />
              Lire l'article complet
            </a>
          </div>
        </div>

        {/* Footer avec actions */}
        <div className="sticky bottom-0 bg-dark-900 border-t border-dark-700 px-8 py-6 rounded-b-2xl z-20">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-dark-800 hover:bg-dark-700 text-gray-200 rounded-xl font-bold transition-colors duration-150 border border-dark-700"
            >
              Fermer
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => onReject(article.id)}
                disabled={isUpdating || article.status === 'Rejected'}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-transform duration-150 active:scale-95 ${
                  article.status === 'Rejected'
                    ? 'bg-dark-800 text-gray-600 cursor-not-allowed border border-dark-700'
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'
                }`}
              >
                <XCircle className="w-5 h-5" />
                {isUpdating ? 'Traitement...' : 'Rejeter'}
              </button>
              <button
                onClick={() => onApprove(article.id)}
                disabled={isUpdating || article.status === 'Approved'}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-transform duration-150 active:scale-95 ${
                  article.status === 'Approved'
                    ? 'bg-dark-800 text-gray-600 cursor-not-allowed border border-dark-700'
                    : 'bg-green-600 hover:bg-green-500 text-white shadow-lg'
                }`}
              >
                <Check className="w-5 h-5" />
                {isUpdating ? 'Traitement...' : 'Approuver'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;


