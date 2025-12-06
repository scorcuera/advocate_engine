import React from 'react';
import { TrendingUp, FileText, Target, Award } from 'lucide-react';

/**
 * Composant Stats - Affiche les statistiques globales des articles
 */
const Stats = ({ articles }) => {
  // Calcul des statistiques
  const totalArticles = articles.length;
  
  // Articles analysés aujourd'hui
  const today = new Date().toISOString().split('T')[0];
  const analyzedToday = articles.filter(article => {
    const pubDate = article.publicationDate?.split('T')[0];
    return pubDate === today && article.status === 'Analyzed';
  }).length;

  // Score moyen de pertinence
  const avgRelevanceScore = articles.length > 0
    ? (articles.reduce((sum, article) => sum + (article.relevanceScore || 0), 0) / articles.length).toFixed(1)
    : 0;

  // Top 3 industries
  const industryCounts = {};
  articles.forEach(article => {
    article.industry?.forEach(ind => {
      industryCounts[ind] = (industryCounts[ind] || 0) + 1;
    });
  });
  const topIndustries = Object.entries(industryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name);

  const stats = [
    {
      label: 'Total d\'articles',
      value: totalArticles,
      icon: FileText,
      bgColor: 'bg-sociabble-blue-100',
      iconColor: 'text-sociabble-blue-600',
      valueColor: 'text-gray-900',
    },
    {
      label: 'Analysés aujourd\'hui',
      value: analyzedToday,
      icon: TrendingUp,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      valueColor: 'text-gray-900',
    },
    {
      label: 'Score moyen',
      value: `${avgRelevanceScore}/10`,
      icon: Target,
      bgColor: 'bg-sociabble-purple-100',
      iconColor: 'text-sociabble-purple-600',
      valueColor: 'text-gray-900',
    },
    {
      label: 'Top industries',
      value: topIndustries.length > 0 ? topIndustries.join(', ') : 'Aucune',
      icon: Award,
      bgColor: 'bg-sociabble-orange-100',
      iconColor: 'text-sociabble-orange-600',
      valueColor: 'text-gray-900',
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-6 hardware-accelerated hover:shadow-md transition-shadow duration-150"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.valueColor} ${stat.isText ? 'text-base' : ''}`}>
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;


