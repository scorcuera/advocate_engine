/**
 * Service Airtable pour gérer les articles d'Employee Advocacy
 */

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = 'Content_Articles';
// Encoder le nom de la table pour gérer les espaces et caractères spéciaux
const encodedTableName = encodeURIComponent(TABLE_NAME);
const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodedTableName}`;

/**
 * Headers pour les requêtes Airtable
 */
const getHeaders = () => ({
  'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
  'Content-Type': 'application/json',
});

/**
 * Récupère tous les articles depuis Airtable
 * @returns {Promise<Array>} Liste des articles formatés
 */
export const fetchArticles = async () => {
  try {
    let allRecords = [];
    let offset = null;
    let pageCount = 0;

    // Paginar hasta obtener todos los registros
    do {
      pageCount++;
      // Construir URL con offset si existe
      const url = offset 
        ? `${BASE_URL}?offset=${offset}` 
        : BASE_URL;

      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401) {
          throw new Error('Erreur d\'authentification (401): Vérifiez votre clé API Airtable.');
        }
        if (response.status === 404) {
          throw new Error(`Table non trouvée (404): Vérifiez que la table "${TABLE_NAME}" existe.`);
        }
        if (response.status === 403) {
          throw new Error('Accès refusé (403): Votre clé API n\'a pas les permissions nécessaires.');
        }
        
        throw new Error(`Erreur API Airtable (${response.status}): ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      // Agregar registros de esta página
      allRecords = allRecords.concat(data.records);
      
      // Actualizar offset para siguiente página
      offset = data.offset || null;

    } while (offset); // Continuar mientras haya más páginas    
    // Formatear los datos para la aplicación
    return allRecords.map(record => ({
      id: record.id,
      title: record.fields.Title || '',
      url: record.fields.URL || '',
      source: record.fields.Source || '',
      contentPreview: record.fields.Content_Preview || '',
      publicationDate: record.fields.Publication_Date || '',
      industry: record.fields.Industry || [],
      relevanceScore: record.fields.Relevance_Score || 0,
      aiSummary: record.fields.AI_Summary || '',
      aiKeyPoints: record.fields.AI_Key_Points || '',
      sentiment: record.fields.Sentiment || 'Neutral',
      status: record.fields.Status || 'New',
      linkedinCopy: record.fields.LinkedIn_Copy || '',
      twitterCopy: record.fields.Twitter_Copy || '',
      intranetCopy: record.fields.Intranet_Copy || '',
      tags: record.fields.Tags || [],
    }));
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des articles:', error);
    
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      throw new Error('Erreur de connexion: Impossible de contacter Airtable. Vérifiez votre connexion Internet.');
    }
    
    throw error;
  }
};

/**
 * Met à jour le statut d'un article
 * @param {string} recordId - ID de l'enregistrement Airtable
 * @param {string} newStatus - Nouveau statut (New, Analyzed, Approved, Rejected)
 * @returns {Promise<Object>} Article mis à jour
 */
export const updateArticleStatus = async (recordId, newStatus) => {
  try {
    const response = await fetch(`${BASE_URL}/${recordId}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({
        fields: {
          Status: newStatus,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      id: data.id,
      title: data.fields.Title || '',
      url: data.fields.URL || '',
      source: data.fields.Source || '',
      contentPreview: data.fields.Content_Preview || '',
      publicationDate: data.fields.Publication_Date || '',
      industry: data.fields.Industry || [],
      relevanceScore: data.fields.Relevance_Score || 0,
      aiSummary: data.fields.AI_Summary || '',
      aiKeyPoints: data.fields.AI_Key_Points || '',
      sentiment: data.fields.Sentiment || 'Neutral',
      status: data.fields.Status || 'New',
      linkedinCopy: data.fields.LinkedIn_Copy || '',
      twitterCopy: data.fields.Twitter_Copy || '',
      intranetCopy: data.fields.Intranet_Copy || '',
      tags: data.fields.Tags || [],
    };
  } catch (error) {
    throw new Error('Impossible de mettre à jour le statut de l\'article.');
  }
};

/**
 * Récupère les analytics récentes depuis la table Analytics_Log
 * @returns {Promise<Object>} Analytics agrégées
 */
export const fetchAnalytics = async () => {
  try {
    const analyticsTableName = 'Analytics_Log';
    const encodedAnalyticsTable = encodeURIComponent(analyticsTableName);
    const analyticsUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodedAnalyticsTable}?sort[0][field]=Date&sort[0][direction]=desc&maxRecords=1`;
        
    const response = await fetch(analyticsUrl, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 404) {
        console.warn('⚠️ Table Analytics_Log non trouvée.');
        return null;
      }
      
      throw new Error(`Erreur analytics: ${response.status}`);
    }

    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      return null;
    }

    const latest = data.records[0].fields;

    // ✅ CORREGIDO: Nombres que coinciden con el componente Analytics
    return {
      totalArticlesFetched: latest.Total_Articles_Fetched || 0,  // ✅ Cambiado
      totalArticlesAnalyzed: latest.Articles_Analyzed || 0,      // ✅ Cambiado
      averageScore: latest.Average_Relevance_Score || 0,
      topIndustry: latest.Top_Industry || 'N/A',
      articlesApproved: latest.Articles_Approved || 0,
      lastExecution: latest.Date || null,
      lastExecutionTime: 0, // Placeholder (ya eliminamos este campo de la tabla)
    };
  } catch (error) {
    return null;
  }
};

/**
 * Vérifie si la configuration Airtable est valide
 * @returns {boolean} True si la configuration est complète
 */
export const isConfigValid = () => {
  return !!(AIRTABLE_API_KEY && AIRTABLE_BASE_ID);
};

