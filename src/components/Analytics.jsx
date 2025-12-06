import React from 'react';
import { BarChart3, Clock, CheckCircle2, Zap } from 'lucide-react';

/**
 * Composant Analytics - Affiche les métriques d'exécution du système
 */
const Analytics = ({ analytics }) => {
  // Si pas d'analytics disponibles, ne rien afficher
  if (!analytics) {
    return null;
  }

  const analyticsStats = [
    {
      label: 'Articles capturés',
      value: analytics.totalArticlesFetched,
      icon: BarChart3,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      valueColor: 'text-blue-700',
      description: 'Total de toutes les analyses',
    },
    {
      label: 'Articles analysés',
      value: analytics.totalArticlesAnalyzed,
      icon: Zap,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      valueColor: 'text-purple-700',
      description: 'Traités par IA',
    },
    {
      label: 'Score moyen',
      value: `${analytics.averageScore}/10`,
      icon: CheckCircle2,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      valueColor: 'text-green-700',
      description: 'Pertinence moyenne',
    },
    {
      label: 'Industrie principale',
      value: analytics.topIndustry,
      icon: BarChart3,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      valueColor: 'text-orange-700',
      description: 'Secteur dominant',
      isText: true,
    },
  ];

  // Formater la date de dernière exécution
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Analytics du Système</h2>
            <p className="text-sm text-gray-600">
              Métriques d'exécution • Dernière mise à jour : {formatDate(analytics.lastExecution)}
            </p>
          </div>
        </div>
        {analytics.lastExecutionTime > 0 && (
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">
              {analytics.lastExecutionTime}s dernière exécution
            </span>
          </div>
        )}
      </div>

      {/* Grid de métriques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.valueColor} mb-2 ${stat.isText ? 'text-lg truncate' : ''}`}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;

