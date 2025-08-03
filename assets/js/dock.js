/**
 * Dock de navigation - Gestion des interactions
 * Version: 1.0.0
 * Taille: < 1kB minifié
 */

(function() {
  'use strict';
  
  // Variables globales
  let isReducedMotion = false;
  let dock = null;
  let dockButtons = [];
  
  /**
   * Détecte si l'utilisateur préfère les animations réduites
   */
  function detectReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion = mediaQuery.matches;
    
    // Écoute les changements de préférence
    mediaQuery.addEventListener('change', function(e) {
      isReducedMotion = e.matches;
      updateAnimationDuration();
    });
  }
  
  /**
   * Met à jour la durée des animations selon les préférences
   */
  function updateAnimationDuration() {
    const duration = isReducedMotion ? '50ms' : '150ms';
    document.documentElement.style.setProperty('--dock-transition', `${duration} ease-out`);
  }
  
  /**
   * Ajoute la classe hover sur un bouton
   */
  function addHoverState(button) {
    if (!button) return;
    button.classList.add('is-hovered');
  }
  
  /**
   * Retire la classe hover d'un bouton
   */
  function removeHoverState(button) {
    if (!button) return;
    button.classList.remove('is-hovered');
  }
  
  /**
   * Gère l'événement mouseenter sur un bouton
   */
  function handleMouseEnter(event) {
    const button = event.currentTarget;
    addHoverState(button);
    
    // Effet optionnel sur les boutons adjacents (scale 1.1)
    const siblings = getSiblingButtons(button);
    siblings.forEach(sibling => {
      sibling.style.transform = 'scale(1.05)';
    });
  }
  
  /**
   * Gère l'événement mouseleave sur un bouton
   */
  function handleMouseLeave(event) {
    const button = event.currentTarget;
    removeHoverState(button);
    
    // Remet les boutons adjacents à l'état normal
    const siblings = getSiblingButtons(button);
    siblings.forEach(sibling => {
      sibling.style.transform = '';
    });
  }
  
  /**
   * Gère l'événement focus sur un bouton
   */
  function handleFocus(event) {
    const button = event.currentTarget;
    addHoverState(button);
  }
  
  /**
   * Gère l'événement blur sur un bouton
   */
  function handleBlur(event) {
    const button = event.currentTarget;
    removeHoverState(button);
  }
  
  /**
   * Gère les événements clavier
   */
  function handleKeyDown(event) {
    const button = event.currentTarget;
    
    // Activation avec Entrée ou Espace
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      
      // Ajoute un feedback visuel
      button.style.transform = 'scale(1.15)';
      
      // Déclenche le clic après une courte animation
      setTimeout(() => {
        button.style.transform = '';
        if (button.href) {
          window.location.href = button.href;
        } else {
          button.click();
        }
      }, 100);
    }
    
    // Navigation avec les flèches
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      navigateWithArrows(button, event.key);
    }
  }
  
  /**
   * Navigation avec les flèches du clavier
   */
  function navigateWithArrows(currentButton, direction) {
    const currentIndex = dockButtons.indexOf(currentButton);
    let nextIndex;
    
    if (direction === 'ArrowLeft') {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : dockButtons.length - 1;
    } else {
      nextIndex = currentIndex < dockButtons.length - 1 ? currentIndex + 1 : 0;
    }
    
    const nextButton = dockButtons[nextIndex];
    if (nextButton) {
      nextButton.focus();
    }
  }
  
  /**
   * Récupère les boutons adjacents à un bouton donné
   */
  function getSiblingButtons(button) {
    const index = dockButtons.indexOf(button);
    const siblings = [];
    
    // Bouton précédent
    if (index > 0) {
      siblings.push(dockButtons[index - 1]);
    }
    
    // Bouton suivant
    if (index < dockButtons.length - 1) {
      siblings.push(dockButtons[index + 1]);
    }
    
    return siblings;
  }
  
  /**
   * Gère le scroll horizontal sur mobile
   */
  function handleMobileScroll() {
    if (window.innerWidth > 767) return;
    
    const dockList = dock.querySelector('.dock-list');
    if (!dockList) return;
    
    // Scroll fluide vers le centre au focus d'un élément
    dockButtons.forEach(button => {
      button.addEventListener('focus', function() {
        const buttonRect = button.getBoundingClientRect();
        const listRect = dockList.getBoundingClientRect();
        const scrollLeft = dockList.scrollLeft;
        
        const targetScroll = scrollLeft + buttonRect.left - listRect.left - (listRect.width / 2) + (buttonRect.width / 2);
        
        dockList.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      });
    });
  }
  
  /**
   * Ajoute les event listeners à tous les boutons
   */
  function attachEventListeners() {
    dockButtons.forEach(button => {
      // Événements souris
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
      
      // Événements focus/blur
      button.addEventListener('focus', handleFocus);
      button.addEventListener('blur', handleBlur);
      
      // Événements clavier
      button.addEventListener('keydown', handleKeyDown);
      
      // Amélioration pour les appareils tactiles
      button.addEventListener('touchstart', function(e) {
        addHoverState(button);
      }, { passive: true });
      
      button.addEventListener('touchend', function(e) {
        setTimeout(() => removeHoverState(button), 150);
      }, { passive: true });
    });
  }
  
  /**
   * Initialise le dock
   */
  function initDock() {
    dock = document.getElementById('dock');
    if (!dock) {
      console.warn('Dock non trouvé dans le DOM');
      return;
    }
    
    // Récupère tous les boutons du dock
    dockButtons = Array.from(dock.querySelectorAll('.dock-button'));
    
    if (dockButtons.length === 0) {
      console.warn('Aucun bouton trouvé dans le dock');
      return;
    }
    
    // Attache les event listeners
    attachEventListeners();
    
    // Gère le scroll mobile
    handleMobileScroll();
    
    // Détecte les préférences d'animation
    detectReducedMotion();
    updateAnimationDuration();
    
    // Gère le redimensionnement de la fenêtre
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleMobileScroll, 100);
    });
    
    console.log(`Dock initialisé avec ${dockButtons.length} boutons`);
  }
  
  /**
   * Point d'entrée principal
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDock);
    } else {
      initDock();
    }
  }
  
  // Démarre l'initialisation
  init();
  
  // Export pour tests ou utilisation externe (optionnel)
  window.DockNavigation = {
    addHoverState,
    removeHoverState,
    reinit: initDock
  };
  
})();
