import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, CheckCircle, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';
import Stats from './components/Stats';
import Filters from './components/Filters';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import ArticleSkeleton from './components/ArticleSkeleton';
import { fetchArticles, updateArticleStatus, isConfigValid } from './services/airtable';

/**
 * Composant principal de l'application
 */
function App() {
  // États
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [paginatedArticles, setPaginatedArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // États des filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [industryFilter, setIndustryFilter] = useState([]);
  const [sentimentFilter, setSentimentFilter] = useState('Tous');
  const [sortBy, setSortBy] = useState('date-desc');

  // Récupérer toutes les industries disponibles
  const availableIndustries = React.useMemo(() => {
    const industries = new Set();
    articles.forEach(article => {
      article.industry?.forEach(ind => industries.add(ind));
    });
    return Array.from(industries).sort();
  }, [articles]);

  // Charger les articles au montage
  useEffect(() => {
    loadArticles();
  }, []);

  // Appliquer les filtres et le tri
  useEffect(() => {
    setFiltering(true);
    
    // Utiliser un timeout pour ne pas bloquer le thread principal lors de la frappe
    const timeoutId = setTimeout(() => {
      let filtered = [...articles];

      // Filtre par recherche
      if (searchTerm) {
        filtered = filtered.filter(article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filtre par statut
      if (statusFilter !== 'Tous') {
        filtered = filtered.filter(article => article.status === statusFilter);
      }

      // Filtre par industries
      if (industryFilter.length > 0) {
        filtered = filtered.filter(article =>
          article.industry?.some(ind => industryFilter.includes(ind))
        );
      }

      // Filtre par sentiment
      if (sentimentFilter !== 'Tous') {
        filtered = filtered.filter(article => article.sentiment === sentimentFilter);
      }

      // Tri
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'date-desc':
            return new Date(b.publicationDate) - new Date(a.publicationDate);
          case 'date-asc':
            return new Date(a.publicationDate) - new Date(b.publicationDate);
          case 'score-desc':
            return b.relevanceScore - a.relevanceScore;
          case 'score-asc':
            return a.relevanceScore - b.relevanceScore;
          default:
            return 0;
        }
      });

      setFilteredArticles(filtered);
      setCurrentPage(1); // Revenir à la première page lors d'un filtrage
      setFiltering(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [articles, searchTerm, statusFilter, industryFilter, sentimentFilter, sortBy]);

  // Pagination effect
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedArticles(filteredArticles.slice(startIndex, endIndex));
    // Scroll top eliminado para evitar saltos de vista
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /**
   * Charger les articles depuis Airtable
   */
  const loadArticles = async () => {
    // Vérifier la configuration
    if (!isConfigValid()) {
      setError('Configuration Airtable manquante. Veuillez configurer vos variables d\'environnement VITE_AIRTABLE_API_KEY et VITE_AIRTABLE_BASE_ID dans le fichier .env');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchArticles();
      setArticles(data);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors du chargement des articles.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Approuver un article
   */
  const handleApprove = async (articleId) => {
    try {
      setIsUpdating(true);
      setError(null);
      const updatedArticle = await updateArticleStatus(articleId, 'Approved');
      
      // Mettre à jour l'article dans la liste
      setArticles(prevArticles =>
        prevArticles.map(article =>
          article.id === articleId ? updatedArticle : article
        )
      );

      // Mettre à jour l'article sélectionné
      if (selectedArticle?.id === articleId) {
        setSelectedArticle(updatedArticle);
      }

      showSuccessMessage('✅ Article approuvé avec succès!');
    } catch (err) {
      setError(err.message || 'Impossible d\'approuver l\'article.');
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Rejeter un article
   */
  const handleReject = async (articleId) => {
    try {
      setIsUpdating(true);
      setError(null);
      const updatedArticle = await updateArticleStatus(articleId, 'Rejected');
      
      // Mettre à jour l'article dans la liste
      setArticles(prevArticles =>
        prevArticles.map(article =>
          article.id === articleId ? updatedArticle : article
        )
      );

      // Mettre à jour l'article sélectionné
      if (selectedArticle?.id === articleId) {
        setSelectedArticle(updatedArticle);
      }

      showSuccessMessage('❌ Article rejeté.');
    } catch (err) {
      setError(err.message || 'Impossible de rejeter l\'article.');
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Afficher un message de succès temporaire
   */
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  /**
   * Ouvrir le détail d'un article
   */
  const handleCardClick = (article) => {
    setSelectedArticle(article);
  };

  /**
   * Fermer le modal de détail
   */
  const handleCloseDetail = () => {
    setSelectedArticle(null);
  };

  // État de chargement initial (chargement complet de l'app)
  if (loading && articles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-premium flex items-center justify-center">
        <div className="text-center glass-effect p-12 rounded-2xl shadow-premium">
          <Loader2 className="w-20 h-20 text-primary-500 animate-spin mx-auto mb-6 drop-shadow-glow-primary" />
          <p className="text-2xl font-bold text-gray-100 mb-2">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-premium">
      {/* Header Premium */}
      <header className="glass-effect border-b border-dark-600 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-teal-500 rounded-xl blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-br from-primary-600 to-accent-teal-500 p-3 rounded-xl shadow-glow-primary">
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Advocate Engine Dashboard
                </h1>
                <p className="text-gray-400 text-sm font-medium">
                  Gestion intelligente des articles curés • CMS Platform
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="glass-effect-light px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-teal-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300 font-medium">En ligne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages d'erreur et de succès */}
        {error && (
          <div className="mb-6 glass-effect border-l-4 border-red-500 rounded-xl p-5 flex items-start gap-3 animate-fade-in shadow-premium">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-red-400 mb-2 text-lg">Erreur</h3>
              <p className="text-gray-300">{error}</p>
              {!isConfigValid() && (
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-400 transition-all text-sm font-semibold shadow-lg hover:shadow-xl"
                >
                  Recharger la page
                </button>
              )}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 glass-effect border-l-4 border-accent-teal-500 rounded-xl p-5 flex items-center gap-3 animate-fade-in shadow-glow-teal">
            <CheckCircle className="w-6 h-6 text-accent-teal-400" />
            <p className="text-gray-100 font-semibold text-lg">{successMessage}</p>
          </div>
        )}

        {/* Stats Dashboard */}
        <Stats articles={articles} />

        {/* Filtres */}
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          industryFilter={industryFilter}
          setIndustryFilter={setIndustryFilter}
          sentimentFilter={sentimentFilter}
          setSentimentFilter={setSentimentFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          availableIndustries={availableIndustries}
        />

        {/* Résultats */}
        <div className="mb-6 flex items-center justify-between glass-effect-light rounded-xl p-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-1">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
            </h2>
            <p className="text-sm text-gray-400 font-medium">
              Trouvé{filteredArticles.length !== 1 ? 's' : ''} dans votre base de données
            </p>
          </div>
          <button
            onClick={loadArticles}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:from-primary-500 hover:to-primary-400 transition-all font-semibold shadow-glow-primary hover:shadow-glow-primary"
          >
            <Loader2 className="w-5 h-5" />
            Actualiser
          </button>
        </div>

        {/* Grille d'articles */}
        {loading || filtering ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {[...Array(6)].map((_, i) => (
              <ArticleSkeleton key={i} />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="glass-effect rounded-2xl shadow-premium p-16 text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-primary-600 blur-2xl opacity-30 animate-pulse"></div>
              <Newspaper className="relative w-20 h-20 text-gray-600 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-200 mb-3">Aucun article trouvé</h3>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Essayez de modifier vos filtres ou ajoutez de nouveaux articles dans Airtable.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {paginatedArticles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg glass-effect border border-dark-600 transition-all ${
                    currentPage === 1 
                      ? 'opacity-50 cursor-not-allowed text-gray-600' 
                      : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-medium">Page</span>
                  <span className="px-4 py-1 bg-primary-600/20 border border-primary-500/30 rounded-lg text-primary-400 font-bold">
                    {currentPage}
                  </span>
                  <span className="text-gray-400 font-medium">sur {totalPages}</span>
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg glass-effect border border-dark-600 transition-all ${
                    currentPage === totalPages 
                      ? 'opacity-50 cursor-not-allowed text-gray-600' 
                      : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal de détail */}
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={handleCloseDetail}
          onApprove={handleApprove}
          onReject={handleReject}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
}

export default App;


