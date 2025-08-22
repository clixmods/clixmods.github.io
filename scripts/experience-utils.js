/**
 * Utilitaires pour calculer automatiquement les champs d'expérience
 */

/**
 * Calcule la durée entre deux dates
 * @param {Date} startDate - Date de début
 * @param {Date} endDate - Date de fin (optionnelle, utilise aujourd'hui si non fournie)
 * @returns {string} - Durée formatée (ex: "2 ans", "6 mois", "1 an 3 mois")
 */
function calculateDuration(startDate, endDate = null) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffDays / 30.44); // Moyenne de jours par mois
  
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  
  if (years === 0) {
    return months === 1 ? "1 mois" : `${months} mois`;
  } else if (months === 0) {
    return years === 1 ? "1 an" : `${years} ans`;
  } else {
    const yearText = years === 1 ? "1 an" : `${years} ans`;
    const monthText = months === 1 ? "1 mois" : `${months} mois`;
    return `${yearText} ${monthText}`;
  }
}

/**
 * Calcule la période depuis les dates
 * @param {Date} startDate - Date de début
 * @param {Date} endDate - Date de fin (optionnelle)
 * @returns {string} - Période formatée (ex: "2023 - 2025", "2023 - Présent")
 */
function calculatePeriod(startDate, endDate = null) {
  const start = new Date(startDate);
  const startYear = start.getFullYear();
  
  if (endDate) {
    const end = new Date(endDate);
    const endYear = end.getFullYear();
    return `${startYear} - ${endYear}`;
  } else {
    return `${startYear} - Présent`;
  }
}

/**
 * Calcule le statut depuis les dates
 * @param {Date} startDate - Date de début
 * @param {Date} endDate - Date de fin (optionnelle)
 * @returns {string} - "current" ou "completed"
 */
function calculateStatus(startDate, endDate = null) {
  const now = new Date();
  
  if (!endDate) {
    return "current";
  }
  
  const end = new Date(endDate);
  return end > now ? "current" : "completed";
}

/**
 * Met à jour automatiquement tous les champs calculés d'une expérience
 * @param {Object} experience - Objet expérience avec start_date et end_date
 * @returns {Object} - Expérience mise à jour
 */
function updateExperienceFields(experience) {
  const { start_date, end_date } = experience;
  
  return {
    ...experience,
    period: calculatePeriod(start_date, end_date),
    duration: calculateDuration(start_date, end_date),
    status: calculateStatus(start_date, end_date)
  };
}

module.exports = {
  calculateDuration,
  calculatePeriod,
  calculateStatus,
  updateExperienceFields
};
