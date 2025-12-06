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
  Globe,
  Hourglass
} from 'lucide-react';

/**
 * Composant ArticleDetail - Modal détaillée d'un article
 */
const ArticleDetail = ({ article, onClose, onApprove, onReject, isUpdating }) => {
  const [copiedSection, setCopiedSection] = useState(null);

  if (!article) return null;

  // Configuration des couleurs par sentiment - Filled
  const sentimentColors = {
    Positive: 'bg-green-500 text-white',
    Neutral: 'bg-gray-500 text-white',
    Negative: 'bg-red-500 text-white',
    Mixed: 'bg-yellow-500 text-white',
  };

  // Configuration des couleurs par statut - Filled
  const statusColors = {
    New: 'bg-blue-500 text-white',
    Analyzed: 'bg-purple-500 text-white',
    Approved: 'bg-green-500 text-white',
    Rejected: 'bg-red-500 text-white',
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

  // Score color - Filled
  const getScoreColor = (score) => {
    if (score >= 8) return 'bg-green-500 text-white';
    if (score >= 6) return 'bg-blue-500 text-white';
    if (score >= 4) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
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
      {/* Contenedor del modal */}
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white px-8 py-6 z-20">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className={`px-4 py-2 rounded-lg text-sm font-bold ${statusColors[article.status] || statusColors.New}`}>
                  {article.status}
                </span>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${getScoreColor(article.relevanceScore)}`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{article.relevanceScore}/10</span>
                </div>
                <span className={`px-4 py-2 rounded-lg text-sm font-bold ${sentimentColors[article.sentiment] || sentimentColors.Neutral}`}>
                  {article.sentiment}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-3 leading-tight">{article.title}</h2>
              <div className="flex items-center gap-4 text-sm text-blue-50">
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{formatDate(article.publicationDate)}</span>
                </div>
                <span className="bg-white/20 px-3 py-1.5 rounded-lg font-bold backdrop-blur-sm">{article.source}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-lg p-2.5 transition-colors duration-150 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Corps */}
        <div className="px-8 py-6 space-y-6 bg-gray-50">
          {/* Industries et Tags */}
          <div className="flex flex-wrap gap-6">
            {article.industry && article.industry.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Industries:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.industry.map((ind, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white text-blue-700 rounded-lg text-sm font-bold border border-blue-300 shadow-sm"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {article.tags && article.tags.length > 0 && (
              <div>
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider block mb-3">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-xs font-medium border border-gray-300"
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
            <div className="bg-white border-l-4 border-purple-500 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                <span>📝</span> Résumé IA
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{article.aiSummary}</p>
            </div>
          )}

          {/* Points clés */}
          {article.aiKeyPoints && (
            <div className="bg-white border-l-4 border-blue-500 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <span>🔑</span> Points clés
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{article.aiKeyPoints}</div>
            </div>
          )}

          {/* Message pour articles "New" ou Copies pour réseaux sociaux */}
          {article.status === 'New' ? (
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Hourglass className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    Article en attente de traitement
                  </h3>
                  <p className="text-blue-700 leading-relaxed mb-3">
                    Cet article a été capturé et sera bientôt analysé par notre système d'IA. 
                    Une fois le traitement terminé, vous disposerez :
                  </p>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span>
                      <span>D'un résumé IA complet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span>
                      <span>De points clés extraits automatiquement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span>
                      <span>De copies prêtes pour LinkedIn, Twitter et Intranet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span>
                      <span>D'un score de pertinence et d'une analyse de sentiment</span>
                    </li>
                  </ul>
                  <p className="text-sm text-blue-600 mt-4 font-medium">
                    💡 Le traitement prend généralement quelques minutes. Revenez bientôt pour consulter les résultats.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📱</span> Copies pour diffusion
              </h3>

              {/* LinkedIn */}
              {article.linkedinCopy && (
              <div className="bg-white border border-gray-300 rounded-xl p-6 hover:border-blue-400 hover:shadow-sm transition-all duration-150">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Linkedin className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">LinkedIn</h4>
                  </div>
                  <button
                    onClick={() => copyToClipboard(article.linkedinCopy, 'linkedin')}
                    className="btn-primary text-sm"
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
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{article.linkedinCopy}</p>
              </div>
            )}

            {/* Twitter */}
            {article.twitterCopy && (
              <div className="bg-white border border-gray-300 rounded-xl p-6 hover:border-sky-400 hover:shadow-sm transition-all duration-150">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-sky-100 p-2 rounded-lg">
                      <Twitter className="w-6 h-6 text-sky-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">Twitter / X</h4>
                  </div>
                  <button
                    onClick={() => copyToClipboard(article.twitterCopy, 'twitter')}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-150 text-sm font-bold"
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
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{article.twitterCopy}</p>
              </div>
            )}

            {/* Intranet */}
            {article.intranetCopy && (
              <div className="bg-white border border-gray-300 rounded-xl p-6 hover:border-green-400 hover:shadow-sm transition-all duration-150">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Globe className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">Intranet</h4>
                  </div>
                  <button
                    onClick={() => copyToClipboard(article.intranetCopy, 'intranet')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-150 text-sm font-bold"
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
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{article.intranetCopy}</p>
              </div>
            )}
            </div>
          )}

          {/* Lien vers l'article source */}
          <div className="flex justify-center pt-6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-3 text-lg"
            >
              <ExternalLink className="w-6 h-6" />
              Lire l'article complet
            </a>
          </div>
        </div>

        {/* Footer avec actions - Limpio sin línea separadora pesada */}
        <div className="sticky bottom-0 bg-white px-8 py-6 z-20 border-t border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold transition-colors duration-150"
            >
              Fermer
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => onReject(article.id)}
                disabled={isUpdating || article.status === 'Rejected'}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all duration-150 ${
                  article.status === 'Rejected'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md active:scale-95'
                }`}
              >
                <XCircle className="w-5 h-5" />
                {isUpdating ? 'Traitement...' : 'Rejeter'}
              </button>
              <button
                onClick={() => onApprove(article.id)}
                disabled={isUpdating || article.status === 'Approved'}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all duration-150 ${
                  article.status === 'Approved'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md active:scale-95'
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


