/**
 * Guide de Hawkins - Script principal
 * @author Guide de Hawkins
 * @version 1.0.0
 */

'use strict';

// ===================================
// CONSTANTES & CONFIGURATION
// ===================================

const CONFIG = {
  scrollThreshold: 50,
  animationDuration: 300,
};

// ===================================
// SÉLECTEURS DOM
// ===================================

const DOM = {
  header: document.querySelector('.site-header'),
  navToggle: document.querySelector('.nav-toggle'),
  navMenu: document.querySelector('.nav-menu'),
};

// ===================================
// FONCTIONS UTILITAIRES
// ===================================

const utils = {
  /**
   * Throttle avec exécution garantie à la fin
   */
  throttle(fn, limit = 100) {
    let lastCall = 0;
    let timeoutId = null;
    
    return (...args) => {
      const now = Date.now();
      const remaining = limit - (now - lastCall);
      
      clearTimeout(timeoutId);
      
      if (remaining <= 0) {
        lastCall = now;
        fn(...args);
      } else {
        // Garantir l'exécution finale
        timeoutId = setTimeout(() => {
          lastCall = Date.now();
          fn(...args);
        }, remaining);
      }
    };
  },
};

// ===================================
// COMPOSANTS
// ===================================

/**
 * Gestion du Header au scroll
 */
const Header = {
  isScrolled: false,
  
  init() {
    if (!DOM.header) return;
    
    // Utiliser passive: true pour de meilleures performances
    window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 50), { passive: true });
    
    // Vérifier l'état initial
    this.handleScroll();
  },

  handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const shouldBeScrolled = scrollY > CONFIG.scrollThreshold;
    
    // Ne modifier le DOM que si l'état change
    if (shouldBeScrolled !== this.isScrolled) {
      this.isScrolled = shouldBeScrolled;
      
      if (shouldBeScrolled) {
        DOM.header.classList.add('site-header--scrolled');
      } else {
        DOM.header.classList.remove('site-header--scrolled');
      }
    }
  },
};

/**
 * Gestion de la Navigation mobile
 */
const Navigation = {
  init() {
    if (!DOM.navToggle) return;
    
    DOM.navToggle.addEventListener('click', this.toggle.bind(this));
  },

  toggle() {
    DOM.navMenu.classList.toggle('is-open');
    const isOpen = DOM.navMenu.classList.contains('is-open');
    DOM.navToggle.setAttribute('aria-expanded', isOpen);
  },
};

// ===================================
// INITIALISATION
// ===================================

function init() {
  Header.init();
  Navigation.init();
}

// Lancer quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

