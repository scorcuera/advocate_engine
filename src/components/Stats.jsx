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
      gradient: 'from-primary-600 to-primary-500',
      iconBg: 'bg-primary-500/20',
      iconColor: 'text-primary-400',
      valueColor: 'text-white',
      glow: 'shadow-glow-primary',
    },
    {
      label: 'Analysés aujourd\'hui',
      value: analyzedToday,
      icon: TrendingUp,
      gradient: 'from-accent-teal-600 to-accent-teal-500',
      iconBg: 'bg-accent-teal-500/20',
      iconColor: 'text-accent-teal-400',
      valueColor: 'text-white',
      glow: 'shadow-glow-teal',
    },
    {
      label: 'Score moyen',
      value: `${avgRelevanceScore}/10`,
      icon: Target,
      gradient: 'from-accent-purple-600 to-accent-purple-500',
      iconBg: 'bg-accent-purple-500/20',
      iconColor: 'text-accent-purple-400',
      valueColor: 'text-white',
      glow: 'shadow-glow-purple',
    },
    {
      label: 'Top industries',
      value: topIndustries.length > 0 ? topIndustries.join(', ') : 'Aucune',
      icon: Award,
      gradient: 'from-accent-gold-600 to-accent-gold-500',
      iconBg: 'bg-accent-gold-500/20',
      iconColor: 'text-accent-gold-400',
      valueColor: 'text-white',
      glow: 'shadow-lg',
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-dark-800 border border-dark-700 rounded-xl p-6 hardware-accelerated hover:border-dark-600 transition-colors duration-75"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.iconBg} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400 mb-1 uppercase tracking-wider">{stat.label}</p>
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


