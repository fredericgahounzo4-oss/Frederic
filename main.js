/**
* Portfolio Frédéric Gahounzo
* Version JavaScript Complète et Corrigée
*/

(function() {
  "use strict";

  /**
   * Header toggle pour mobile
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Fermer le menu mobile lors du clic sur un lien
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll (AOS)
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Typed.js pour l'effet de texte qui tape
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== 'undefined') {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    if (typed_strings) {
      typed_strings = typed_strings.split(',');
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  }

  /**
   * PureCounter
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Animer les barres de compétences au scroll
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  if (typeof Waypoint !== 'undefined') {
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function(direction) {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });
  }

  /**
   * GLightbox pour les images
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Isotope Layout (pour portfolio)
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
    }
  });

  /**
   * Swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let configElement = swiperElement.querySelector(".swiper-config");
        if (configElement) {
          let config = JSON.parse(configElement.innerHTML.trim());
          new Swiper(swiperElement, config);
        }
      });
    }
  }
  window.addEventListener("load", initSwiper);

  /**
   * CORRECTION: Navigation Menu Scrollspy - Version Améliorée
   * Détecte la section active et met à jour le menu
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      
      // Position ajustée pour une meilleure détection
      let position = window.scrollY + 200;
      
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        // Retirer la classe active de tous les liens
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        // Ajouter la classe active au lien courant
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * CORRECTION: Scroll fluide au clic sur les liens du menu
   */
  navmenulinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash !== '') {
        e.preventDefault();
        
        const targetId = this.hash;
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = document.querySelector('.header') ? 100 : 0;
          const offsetTop = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Mettre à jour immédiatement le lien actif
          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          this.classList.add('active');
          
          // Mettre à jour l'URL sans recharger la page
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  /**
   * Corriger le scroll au chargement de la page avec hash
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(targetSection).scrollMarginTop;
          window.scrollTo({
            top: targetSection.offsetTop - parseInt(scrollMarginTop) - 100,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Validation du formulaire de contact
   */
  const contactForm = document.querySelector('.php-email-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let thisForm = this;
      let action = thisForm.getAttribute('action');
      
      if (!action) {
        displayError(thisForm, 'Le formulaire n\'a pas d\'action définie!');
        return;
      }
      
      thisForm.querySelector('.loading').style.display = 'block';
      thisForm.querySelector('.error-message').style.display = 'none';
      thisForm.querySelector('.sent-message').style.display = 'none';
      
      let formData = new FormData(thisForm);
      
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`);
        }
      })
      .then(data => {
        thisForm.querySelector('.loading').style.display = 'none';
        if (data.trim() === 'OK') {
          thisForm.querySelector('.sent-message').style.display = 'block';
          thisForm.reset();
        } else {
          throw new Error(data ? data : 'Erreur lors de l\'envoi du formulaire');
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').style.display = 'none';
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').style.display = 'block';
  }

  /**
   * Initialiser la première section comme active au chargement
   */
  window.addEventListener('load', function() {
    // Si aucun hash dans l'URL, activer le premier lien
    if (!window.location.hash) {
      const firstLink = document.querySelector('.navmenu a[href="#hero"]');
      if (firstLink) {
        firstLink.classList.add('active');
      }
    }
  });

  /**
   * Animation des icônes sociales au survol
   */
  const socialLinks = document.querySelectorAll('.social-links a');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  /**
   * Console log pour debug (peut être supprimé en production)
   */
  console.log('Portfolio Frédéric Gahounzo - JavaScript chargé avec succès! 🚀');

})();
