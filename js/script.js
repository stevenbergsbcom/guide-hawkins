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
  isOpen: false,

  init() {
    if (!DOM.navToggle || !DOM.navMenu) return;
    
    // Toggle au clic sur le bouton burger
    DOM.navToggle.addEventListener('click', this.toggle.bind(this));

    // Fermer au clic sur un lien du menu
    const navLinks = DOM.navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', this.close.bind(this));
    });

    // Fermer au clic sur le dropdown links
    const dropdownLinks = DOM.navMenu.querySelectorAll('.nav-dropdown__link');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', this.close.bind(this));
    });

    // Fermer avec la touche Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Fermer si on redimensionne au-delà du breakpoint mobile
    window.addEventListener('resize', utils.throttle(() => {
      if (window.innerWidth >= 1024 && this.isOpen) {
        this.close();
      }
    }, 100));
  },

  toggle() {
    this.isOpen = !this.isOpen;
    this.updateState();
  },

  open() {
    this.isOpen = true;
    this.updateState();
  },

  close() {
    this.isOpen = false;
    this.updateState();
  },

  updateState() {
    DOM.navMenu.classList.toggle('is-open', this.isOpen);
    DOM.navToggle.setAttribute('aria-expanded', this.isOpen);
    DOM.navToggle.setAttribute('aria-label', this.isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('nav-open', this.isOpen);
  },
};

/**
 * Gestion des onglets de la section Places
 */
const PlacesTabs = {
  // Données des différents lieux
  data: {
    starcourt: {
      image: 'images/starcourt.webp',
      alt: 'Vue du Starcourt Mall',
      label: 'Centre commercial',
      title: 'Le cœur battant de Hawkins',
      text: 'Starcourt Mall était autrefois le lieu de rendez-vous préféré des jeunes de la ville. Ses arcades, ses restaurants et ses boutiques incarnent l\'esprit des années 80.',
    },
    lab: {
      image: 'images/HawkinsLab.webp',
      alt: 'Vue du Hawkins Lab',
      label: 'Laboratoire',
      title: 'Les secrets du laboratoire',
      text: 'Le laboratoire national de Hawkins cache bien des mystères. Des expériences secrètes aux portails interdimensionnels, ce lieu est au cœur des événements étranges de la ville.',
    },
    forest: {
      image: 'images/Foret-de-Hawkins.jpg',
      alt: 'Vue de la Forêt de Hawkins',
      label: 'Nature',
      title: 'La forêt mystérieuse',
      text: 'La forêt de Hawkins est bien plus qu\'une simple étendue d\'arbres. C\'est ici que des disparitions inexpliquées ont eu lieu et que le voile entre les mondes semble le plus fin.',
    },
  },

  // Éléments DOM
  elements: {
    tabs: null,
    image: null,
    label: null,
    title: null,
    text: null,
  },

  // Onglet actif
  activeTab: 'starcourt',

  init() {
    // Récupérer les éléments DOM
    this.elements.tabs = document.querySelectorAll('.places__tab');
    this.elements.image = document.getElementById('places-image');
    this.elements.label = document.getElementById('places-content-label');
    this.elements.title = document.getElementById('places-content-title');
    this.elements.text = document.getElementById('places-content-text');
    this.elements.tabpanel = document.getElementById('tabpanel-places');

    // Vérifier que les éléments existent
    if (!this.elements.tabs.length || !this.elements.image) return;

    // Ajouter les event listeners sur les onglets
    this.elements.tabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
      tab.addEventListener('keydown', (e) => this.handleKeyDown(e, tab));
    });
  },

  handleKeyDown(e, currentTab) {
    const tabs = Array.from(this.elements.tabs);
    const currentIndex = tabs.indexOf(currentTab);
    let newIndex;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    // Mettre à jour les tabindex
    tabs.forEach((tab, i) => {
      tab.setAttribute('tabindex', i === newIndex ? '0' : '-1');
    });

    // Focus et activation du nouvel onglet
    tabs[newIndex].focus();
    this.switchTab(tabs[newIndex].dataset.tab);
  },

  switchTab(tabId) {
    // Ne rien faire si c'est déjà l'onglet actif
    if (tabId === this.activeTab) return;

    // Récupérer les données du nouvel onglet
    const newData = this.data[tabId];
    if (!newData) return;

    // Map des IDs de tabs
    const tabIdMap = {
      starcourt: 'tab-starcourt',
      lab: 'tab-lab',
      forest: 'tab-forest',
    };

    // Mettre à jour l'onglet actif visuellement
    this.elements.tabs.forEach(tab => {
      const isActive = tab.dataset.tab === tabId;
      tab.classList.toggle('places__tab--active', isActive);
      tab.setAttribute('aria-selected', isActive);
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    // Mettre à jour le tabpanel
    if (this.elements.tabpanel) {
      this.elements.tabpanel.setAttribute('aria-labelledby', tabIdMap[tabId]);
    }

    // Animation fade out
    this.elements.image.classList.add('is-fading');
    const content = document.getElementById('places-content');
    if (content) content.classList.add('is-fading');

    // Après la transition, changer le contenu et fade in
    setTimeout(() => {
      // Mettre à jour l'image
      this.elements.image.src = newData.image;
      this.elements.image.alt = newData.alt;

      // Mettre à jour le texte
      if (this.elements.label) this.elements.label.textContent = newData.label;
      if (this.elements.title) this.elements.title.textContent = newData.title;
      if (this.elements.text) this.elements.text.textContent = newData.text;

      // Animation fade in
      this.elements.image.classList.remove('is-fading');
      if (content) content.classList.remove('is-fading');

      // Mettre à jour l'onglet actif
      this.activeTab = tabId;
    }, CONFIG.animationDuration);
  },
};

/**
 * Gestion des cartes Experience avec effet hover
 */
const ExperienceCards = {
  cards: null,
  defaultCard: null,

  init() {
    this.cards = document.querySelectorAll('.experience__card');
    
    if (!this.cards.length) return;

    // Le premier article est actif par défaut
    this.defaultCard = this.cards[0];

    // Ajouter les event listeners sur chaque carte
    this.cards.forEach(card => {
      card.addEventListener('mouseenter', () => this.handleMouseEnter(card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave());
    });
  },

  handleMouseEnter(hoveredCard) {
    // Retirer la classe active de toutes les cartes
    this.cards.forEach(card => {
      card.classList.remove('experience__card--active');
    });
    
    // Ajouter la classe active sur la carte survolée
    hoveredCard.classList.add('experience__card--active');
  },

  handleMouseLeave() {
    // Retirer la classe active de toutes les cartes
    this.cards.forEach(card => {
      card.classList.remove('experience__card--active');
    });
    
    // Remettre la classe active sur la première carte
    if (this.defaultCard) {
      this.defaultCard.classList.add('experience__card--active');
    }
  },
};

/**
 * Gestion des cartes Unique avec effet hover et navigation clavier (page À propos)
 */
const UniqueCards = {
  cards: null,
  defaultCard: null,
  currentIndex: 0,

  init() {
    this.cards = document.querySelectorAll('.unique__card');
    
    if (!this.cards.length) return;

    // Le premier article est actif par défaut
    this.defaultCard = this.cards[0];

    // Rendre les cartes focusables
    this.cards.forEach((card, index) => {
      card.setAttribute('tabindex', index === 0 ? '0' : '-1');
      card.addEventListener('mouseenter', () => this.handleMouseEnter(card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave());
      card.addEventListener('focus', () => this.handleFocus(card, index));
      card.addEventListener('keydown', (e) => this.handleKeyDown(e, index));
    });
  },

  handleMouseEnter(hoveredCard) {
    // Retirer la classe active de toutes les cartes
    this.cards.forEach(card => {
      card.classList.remove('unique__card--active');
    });
    
    // Ajouter la classe active sur la carte survolée
    hoveredCard.classList.add('unique__card--active');
  },

  handleMouseLeave() {
    // Retirer la classe active de toutes les cartes
    this.cards.forEach(card => {
      card.classList.remove('unique__card--active');
    });
    
    // Remettre la classe active sur la première carte
    if (this.defaultCard) {
      this.defaultCard.classList.add('unique__card--active');
    }
  },

  handleFocus(card, index) {
    this.currentIndex = index;
    // Retirer la classe active de toutes les cartes
    this.cards.forEach(c => c.classList.remove('unique__card--active'));
    // Ajouter la classe active sur la carte focusée
    card.classList.add('unique__card--active');
  },

  handleKeyDown(e, currentIndex) {
    const cardsArray = Array.from(this.cards);
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (currentIndex + 1) % cardsArray.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = (currentIndex - 1 + cardsArray.length) % cardsArray.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = cardsArray.length - 1;
        break;
      default:
        return;
    }

    // Mettre à jour les tabindex
    cardsArray.forEach((card, i) => {
      card.setAttribute('tabindex', i === newIndex ? '0' : '-1');
    });

    // Focus sur la nouvelle carte
    cardsArray[newIndex].focus();
  },
};

/**
 * Gestion de l'accordéon FAQ
 */
const FAQAccordion = {
  items: null,
  questions: null,

  init() {
    this.items = document.querySelectorAll('.faq__item');
    this.questions = document.querySelectorAll('.faq__question');
    
    if (!this.items.length) return;

    // Ajouter les event listeners sur chaque question
    this.items.forEach(item => {
      const question = item.querySelector('.faq__question');
      if (question) {
        question.addEventListener('click', () => this.toggleItem(item));
        question.addEventListener('keydown', (e) => this.handleKeyDown(e, question));
      }
    });
  },

  handleKeyDown(e, currentQuestion) {
    const questions = Array.from(this.questions);
    const currentIndex = questions.indexOf(currentQuestion);
    let newIndex;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        newIndex = (currentIndex + 1) % questions.length;
        break;
      case 'ArrowUp':
        e.preventDefault();
        newIndex = (currentIndex - 1 + questions.length) % questions.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = questions.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.toggleItem(currentQuestion.closest('.faq__item'));
        return;
      default:
        return;
    }

    // Focus sur la nouvelle question
    questions[newIndex].focus();
  },

  toggleItem(clickedItem) {
    const isActive = clickedItem.classList.contains('faq__item--active');
    
    // Fermer tous les items
    this.items.forEach(item => {
      item.classList.remove('faq__item--active');
      const question = item.querySelector('.faq__question');
      if (question) {
        question.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Si l'item cliqué n'était pas actif, l'ouvrir
    if (!isActive) {
      clickedItem.classList.add('faq__item--active');
      const question = clickedItem.querySelector('.faq__question');
      if (question) {
        question.setAttribute('aria-expanded', 'true');
      }
    }
  },
};

/**
 * Animations au scroll avec Intersection Observer
 */
const ScrollAnimations = {
  init() {
    // Sélecteurs des sections à animer
    const animatedSelectors = '.places, .experience, .faq, .cta, .newsletter, .site-footer';

    // Vérifier si Intersection Observer est supporté
    if (!('IntersectionObserver' in window)) {
      // Fallback : rendre tout visible immédiatement
      document.querySelectorAll(animatedSelectors).forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    // Créer l'observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Arrêter d'observer une fois visible
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Déclencher quand 15% visible
        rootMargin: '0px',
      }
    );

    // Observer toutes les sections animées
    const animatedSections = document.querySelectorAll(animatedSelectors);
    animatedSections.forEach(section => {
      observer.observe(section);
    });
  },
};

// ===================================
// INITIALISATION
// ===================================

function init() {
  Header.init();
  Navigation.init();
  PlacesTabs.init();
  ExperienceCards.init();
  UniqueCards.init();
  FAQAccordion.init();
  ScrollAnimations.init();
  Particles.init();
  CounterAnimation.init();
  AproposAnimations.init();
}

/**
 * Configuration et initialisation de Particles.js
 * Effet Upside Down / Stranger Things
 */
const Particles = {
  config: {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#E50914', '#0A84FF', '#ffffff']
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.5,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#E50914',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  },

  init() {
    // Vérifier si particlesJS est disponible
    if (typeof particlesJS === 'undefined') return;

    // Initialiser particles.js pour la section Lieux
    if (document.getElementById('particles-lieux')) {
      particlesJS('particles-lieux', this.config);
    }

    // Initialiser particles.js pour la section FAQ
    if (document.getElementById('particles-questions')) {
      particlesJS('particles-questions', this.config);
    }

    // Initialiser particles.js pour la section Chiffres (page À propos)
    if (document.getElementById('particles-chiffres')) {
      particlesJS('particles-chiffres', this.config);
    }
  },
};

// ===================================
// COMPTEURS ANIMÉS (Page À propos)
// ===================================

const CounterAnimation = {
  animated: false,

  animateCounters() {
    if (this.animated) return;
    this.animated = true;

    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      const duration = 2000; // 2 secondes
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        counter.textContent = current;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      requestAnimationFrame(updateCounter);
    });
  },

  init() {
    const statsSection = document.querySelector('.chiffres, .stats-section');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  },
};

// ===================================
// ANIMATIONS PAGE À PROPOS
// ===================================

const AproposAnimations = {
  init() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  },
};

// Lancer quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

