/**
 * HICHAM EDD — MULTI-PAGE APPLICATION JAVASCRIPT (INTERNATIONAL ENGLISH)
 * Handles English Language Initialization across all HTML pages,
 * Custom Sprint Estimator, Modals, Sliders, and Scroll Animations.
 */

(function () {
  'use strict';

  const WHATSAPP_PHONE = "212653342503";
  let currentLang = 'en';

  let currentBrandbookIndex = 0;

  // Social Carousel (1080x1350) Dataset
  const socialSlides = [
    {
      num: 1,
      title: { en: "Slide 1: Primary Hook & Launch Offer" },
      desc: { en: "Scroll-stopping hero visual with crisp product cutout and bold headline typography." }
    },
    {
      num: 2,
      title: { en: "Slide 2: Core Pain Point Solved" },
      desc: { en: "Highlighting customer frustrations with high-contrast visual storytelling." }
    },
    {
      num: 3,
      title: { en: "Slide 3: Key Benefits & Features" },
      desc: { en: "Clean infographic breakdown with custom vector icons and macro detail highlights." }
    },
    {
      num: 4,
      title: { en: "Slide 4: Social Proof & Reviews" },
      desc: { en: "Verified 5-star customer testimonials and authentic product-in-use imagery." }
    },
    {
      num: 5,
      title: { en: "Slide 5: Before / After Comparison" },
      desc: { en: "Clear visual proof demonstrating tangible results after product use." }
    },
    {
      num: 6,
      title: { en: "Slide 6: Call-to-Action & Offer Code" },
      desc: { en: "High-contrast action button with launch offer details and direct link prompt." }
    }
  ];

  let currentSocialIndex = 0;

  // =========================================================================
  // INITIALIZATION ON ANY HTML PAGE
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    highlightActivePageNav();
    initScrollObserver();
    initCalculator();
    initFAQ();
    initContactForm();
    initSliders();
    if (typeof window.initAudit === 'function' && document.getElementById('audit-questions-view')) {
      window.initAudit();
    }
  });

  // =========================================================================
  // LANGUAGE SYSTEM (ENGLISH-ONLY INTERNATIONAL VERSION)
  // =========================================================================
  function initLanguage() {
    currentLang = 'en';
    applyLanguage('en');
  }

  window.toggleLanguage = function () {
    applyLanguage('en');
  };

  function applyLanguage(lang) {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    if (!window.translations) {
      updateAllWhatsAppLinks();
      return;
    }
    const dict = window.translations[lang] || window.translations.en || window.translations.fr || window.translations.darija;
    if (!dict) return;

    document.documentElement.lang = 'en';
    document.documentElement.dir = dict.dir || 'ltr';
    if (dict.siteTitle) document.title = dict.siteTitle;

    // Translate all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getNestedValue(dict, key);
      if (val !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.innerHTML = val;
        }
      }
    });

    // Call dedicated blog translations if present
    if (typeof window.applyBlogArticleTranslations === 'function') {
      window.applyBlogArticleTranslations('en');
    }

    // Re-render Calculator if present on page
    if (typeof calculateRate === 'function' && document.getElementById('calc-discounted-price')) {
      calculateRate();
    }

    // Re-render Brandbook & Social Slides if present
    if (document.getElementById('brandbook-slide-wrapper')) {
      renderBrandbookSlide();
    }
    if (document.getElementById('social-slide-wrapper')) {
      renderSocialSlide();
    }

    updateAllWhatsAppLinks();
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: 'en' } }));
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : undefined, obj);
  }

  // =========================================================================
  // NAVBAR ACTIVE STATE IN MULTI-PAGE ARCHITECTURE
  // =========================================================================
  function highlightActivePageNav() {
    const path = window.location.pathname.toLowerCase();
    let pageName = 'home';

    if (path.includes('services.html')) pageName = 'services';
    else if (path.includes('blog.html') || path.includes('/blog/')) pageName = 'blog';
    else if (path.includes('about.html')) pageName = 'about';
    else if (path.includes('contact.html')) pageName = 'contact';
    else if (path.includes('challenge.html')) pageName = 'challenge';
    else if (path.includes('audit.html')) pageName = 'audit';
    else if (path.includes('privacy.html') || path.includes('terms.html')) pageName = '';
    else if (path !== '/' && !path.endsWith('/index.html') && !path.endsWith('/')) {
      pageName = 'portfolio';
    }

    document.querySelectorAll('.nav-link-btn').forEach(btn => {
      const target = btn.getAttribute('data-page');
      if (target === pageName) {
        btn.classList.add('text-brand-gold', 'bg-brand-card');
        btn.classList.remove('text-gray-300');
      } else {
        btn.classList.remove('text-brand-gold', 'bg-brand-card');
        btn.classList.add('text-gray-300');
      }
    });

    const chalBtn = document.getElementById('nav-challenge-btn');
    if (chalBtn) {
      if (pageName === 'challenge') {
        chalBtn.classList.add('ring-2', 'ring-brand-gold');
      } else {
        chalBtn.classList.remove('ring-2', 'ring-brand-gold');
      }
    }
  }

  window.toggleMobileMenu = function () {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  };

  // Close mobile drawer when clicking any link inside it
  document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu || mobileMenu.classList.contains('hidden')) return;

    if (e.target.closest('#mobile-menu a')) {
      mobileMenu.classList.add('hidden');
    }
  });

  // =========================================================================
  // INTERACTIVE SPRINT SCOPE ESTIMATOR (INTERNATIONAL CUSTOM QUOTE)
  // =========================================================================
  let selectedServiceType = 'design';
  let selectedSprintDays = 1;

  function initCalculator() {
    if (!document.getElementById('calc-discounted-price')) return;

    window.selectServiceModule = function (type) {
      if (type !== 'design' && type !== 'video') type = 'design';
      selectedServiceType = type;

      document.querySelectorAll('.calc-service-btn').forEach(btn => {
        if (btn.getAttribute('data-service') === type) {
          btn.classList.add('border-brand-gold', 'bg-brand-gold/10', 'text-white');
          btn.classList.remove('border-brand-border', 'bg-brand-card', 'text-gray-300');
        } else {
          btn.classList.remove('border-brand-gold', 'bg-brand-gold/10', 'text-white');
          btn.classList.add('border-brand-border', 'bg-brand-card', 'text-gray-300');
        }
      });
      calculateRate();
    };

    window.selectSprintDays = function (days) {
      selectedSprintDays = parseInt(days, 10) || 1;
      if (selectedSprintDays < 1) selectedSprintDays = 1;
      if (selectedSprintDays > 5) selectedSprintDays = 5;

      document.querySelectorAll('.calc-day-btn').forEach(btn => {
        if (parseInt(btn.getAttribute('data-days'), 10) === selectedSprintDays) {
          btn.classList.add('bg-brand-gold', 'text-black', 'font-extrabold', 'border-brand-gold');
          btn.classList.remove('bg-brand-surface', 'text-gray-300', 'border-brand-border');
        } else {
          btn.classList.remove('bg-brand-gold', 'text-black', 'font-extrabold', 'border-brand-gold');
          btn.classList.add('bg-brand-surface', 'text-gray-300', 'border-brand-border');
        }
      });
      calculateRate();
    };

    calculateRate();
  }

  function calculateRate() {
    const elOriginal = document.getElementById('calc-original-price');
    const elDiscounted = document.getElementById('calc-discounted-price');
    const elSavings = document.getElementById('calc-savings-badge');
    const elSummaryService = document.getElementById('calc-summary-service');
    const elSummaryDays = document.getElementById('calc-summary-days');
    const elWhatsappBtn = document.getElementById('calc-whatsapp-btn');

    const dayWord = selectedSprintDays === 1 ? '1 Day' : `${selectedSprintDays} Days`;
    const serviceName = selectedServiceType === 'design'
      ? "Graphic & Brand Design"
      : "Motion & Campaign Production";

    if (elOriginal) {
      elOriginal.innerText = "Tailored Scope";
      elOriginal.className = "text-sm text-gray-400 font-semibold font-mono";
    }
    if (elDiscounted) {
      elDiscounted.innerText = "Custom Quote";
      elDiscounted.className = "price-new text-3xl sm:text-4xl font-black text-emerald-400 font-mono";
    }
    if (elSavings) {
      elSavings.className = "px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono";
      elSavings.innerHTML = "Official Invoice, Source Files & NDA Available";
    }
    if (elSummaryService) elSummaryService.innerText = serviceName;
    if (elSummaryDays) elSummaryDays.innerText = dayWord;

    if (elWhatsappBtn) {
      const msg = `Hi Hicham, I'd like to request a custom quote for a ${dayWord} [${serviceName}] sprint (with official invoice). What is your availability this week?`;
      elWhatsappBtn.onclick = () => {
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
      };
    }
  }

  // =========================================================================
  // MODALS & SLIDERS
  // =========================================================================
  function initSliders() {
    if (document.getElementById('brandbook-slide-wrapper')) renderBrandbookSlide();
    if (document.getElementById('social-slide-wrapper')) renderSocialSlide();
  }

  function renderSocialSlide() {
    const slide = socialSlides[currentSocialIndex];
    const wrapper = document.getElementById('social-slide-wrapper');
    if (!wrapper || !slide) return;
    wrapper.innerHTML = `
      <div class="p-6 text-white">
        <h4 class="text-lg font-bold">${slide.title.en}</h4>
        <p class="text-sm text-gray-300 mt-2">${slide.desc.en}</p>
      </div>
    `;
  }

  window.openBrandbookModal = function () {
    const modal = document.getElementById('brandbook-modal');
    if (modal) modal.classList.remove('hidden');
    currentBrandbookIndex = 0;
    updateBrandbookView();
  };

  window.closeBrandbookModal = function () {
    const modal = document.getElementById('brandbook-modal');
    if (modal) modal.classList.add('hidden');
  };

  window.nextBrandbookSlide = function () {
    currentBrandbookIndex = (currentBrandbookIndex + 1) % brandbookGalleryImages.length;
    updateBrandbookView();
  };

  window.prevBrandbookSlide = function () {
    currentBrandbookIndex = (currentBrandbookIndex - 1 + brandbookGalleryImages.length) % brandbookGalleryImages.length;
    updateBrandbookView();
  };

  function renderBrandbookSlide() {
    if (typeof brandbookSlides === 'undefined' || !brandbookSlides.length) return;
    const slide = brandbookSlides[currentBrandbookIndex];
    const wrapper = document.getElementById('brandbook-slide-wrapper');
    const counter = document.getElementById('brandbook-slide-counter');

    if (counter) {
      counter.innerText = `Page ${slide.page} of ${brandbookSlides.length}`;
    }

    if (wrapper) {
      wrapper.innerHTML = `
        <div class="w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#0A0A0A] text-white">
          <div class="flex items-center justify-between border-b border-brand-border pb-3">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">${slide.subtitle.en || slide.subtitle.fr}</span>
              <h4 class="text-base sm:text-lg font-bold text-white">${slide.title.en || slide.title.fr}</h4>
            </div>
            <span class="text-xs font-mono px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-gold">
              ${slide.tag}
            </span>
          </div>

          <div class="my-auto py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div class="md:col-span-5 flex justify-center">
              <div class="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-blue-950/40 border-2 border-blue-500/30 flex flex-col items-center justify-center p-4 text-center shadow-xl">
                <span class="text-3xl sm:text-4xl font-black text-blue-400">LOGIS</span>
                <span class="text-[10px] text-cyan-300 font-mono tracking-widest uppercase mt-1">OCEAN CONNECT</span>
              </div>
            </div>
            <div class="md:col-span-7 space-y-3">
              <span class="text-xs font-semibold text-brand-gold uppercase tracking-wider block">Specs &amp; Guidelines</span>
              <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
                ${slide.desc.en || slide.desc.fr}
              </p>
              <div class="flex flex-wrap gap-2 pt-2 text-[11px] font-mono text-gray-400">
                <span class="px-2.5 py-1 rounded bg-brand-surface border border-brand-border">CMYK / Pantone</span>
                <span class="px-2.5 py-1 rounded bg-brand-surface border border-brand-border">Vector SVG/AI</span>
                <span class="px-2.5 py-1 rounded bg-brand-surface border border-brand-border">High Resolution</span>
              </div>
            </div>
          </div>

          <div class="border-t border-brand-border pt-3 flex items-center justify-between text-xs text-gray-400">
            <span>Logistocean Corporate Brandbook</span>
            <div class="flex items-center gap-1.5">
              ${brandbookSlides.map((_, idx) => `
                <span class="w-2 h-2 rounded-full transition-all ${idx === currentBrandbookIndex ? 'bg-brand-gold w-5' : 'bg-white/20'}"></span>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
  }

  // =========================================================================
  // SCROLL ANIMATIONS
  // =========================================================================
  function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px"
    });

    document.querySelectorAll('.reveal-item').forEach(el => {
      observer.observe(el);
    });
  }

  // =========================================================================
  // FAQ ACCORDION
  // =========================================================================
  function initFAQ() {
    window.toggleFAQ = function (button) {
      const item = button.closest('.faq-item');
      if (!item) return;

      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('active');
      });

      if (!isOpen) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    };
  }

  // =========================================================================
  // CONTACT FORM
  // =========================================================================
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value || "";
      const email = document.getElementById('form-email')?.value || "";
      const phone = document.getElementById('form-phone')?.value || "";
      const service = document.getElementById('form-service')?.value || "";
      const message = document.getElementById('form-message')?.value || "";

      const msg = `Hi Hicham, I'm reaching out from your website:%0A- Name: ${encodeURIComponent(name)}%0A- Email: ${encodeURIComponent(email)}%0A- Phone: ${encodeURIComponent(phone)}%0A- Service: ${encodeURIComponent(service)}%0A- Project: ${encodeURIComponent(message)}`;

      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, '_blank', 'noopener,noreferrer');
    });
  }

  function updateAllWhatsAppLinks() {
    const generalLinks = document.querySelectorAll('.whatsapp-general-link');
    generalLinks.forEach(link => {
      const msg = "Hi Hicham, I'd like to book a creative sprint and request a custom quote. What is your availability this week?";
      link.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    });
  }

  // =========================================================================
  // ULTRA-SMOOTH MULTI-PAGE TRANSITIONS
  // =========================================================================
  let isTransitioning = false;

  function handleLinkClick(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      href.includes('wa.me') ||
      link.target === '_blank' ||
      link.hasAttribute('download') ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0
    ) {
      if (href.startsWith('#') && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (err) {
      return;
    }

    if (url.origin !== window.location.origin && window.location.protocol !== 'file:') {
      return;
    }

    if (url.pathname === window.location.pathname && url.search === window.location.search) {
      if (url.hash) {
        e.preventDefault();
        const targetEl = document.querySelector(url.hash);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    e.preventDefault();
    navigateTo(link.href, true);
  }

  function navigateTo(targetUrl, shouldPushState) {
    if (isTransitioning) return;
    isTransitioning = true;

    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }

    const main = document.querySelector('main');

    if (main) {
      main.classList.remove('page-transition-in');
      main.classList.add('page-transition-out');
    }

    if (window.location.protocol === 'file:') {
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 180);
      return;
    }

    fetch(targetUrl)
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const newMain = doc.querySelector('main');
        if (!newMain) {
          window.location.href = targetUrl;
          return;
        }

        setTimeout(() => {
          document.title = doc.title;

          if (shouldPushState) {
            window.history.pushState({ url: targetUrl }, '', targetUrl);
          }

          const currentHeader = document.querySelector('header');
          const newHeader = doc.querySelector('header');
          if (currentHeader && newHeader) {
            currentHeader.innerHTML = newHeader.innerHTML;
          }

          const currentFooter = document.querySelector('footer');
          const newFooter = doc.querySelector('footer');
          if (currentFooter && newFooter) {
            currentFooter.innerHTML = newFooter.innerHTML;
          }

          if (main) {
            main.innerHTML = newMain.innerHTML;
            main.className = newMain.className;
          }

          initLanguage();
          highlightActivePageNav();
          initScrollObserver();
          initCalculator();
          initFAQ();
          initContactForm();
          initSliders();
          updateAllWhatsAppLinks();
          if (typeof window.initAudit === 'function' && document.getElementById('audit-questions-view')) {
            window.initAudit();
          }

          const urlObj = new URL(targetUrl, window.location.href);
          if (urlObj.hash) {
            const targetEl = document.querySelector(urlObj.hash);
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
            else window.scrollTo({ top: 0, behavior: 'instant' });
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }

          if (main) {
            main.classList.remove('page-transition-out');
            main.classList.add('page-transition-in');
          }

          if (typeof finishProgressBar === 'function') finishProgressBar();
          isTransitioning = false;
        }, 180);
      })
      .catch(err => {
        console.warn('Seamless transition fallback to direct navigation:', err);
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 160);
      });
  }

  // =========================================================================
  // REEL & VIDEO PLAYER MODAL (FOR PORTFOLIO PROJECTS)
  // =========================================================================
  const reelModalData = {
    reels: {
      badge: { en: "AI PRODUCTION & PRO EDITING" },
      title: { en: "Promotional Spot & Reels — Baklawa.ma" },
      desc: {
        en: "Vertical 9:16 promotional campaign crafted for TikTok and Instagram Reels featuring dynamic pacing, color grading, and crisp sound design."
      },
      poster: "assets/images/reels.jpg",
      videoSrc: "assets/videos/video-rentech.mp4"
    },
    social: {
      badge: { en: "SOCIAL MEDIA CAMPAIGN & CAROUSELS" },
      title: { en: "Social Media & Ad Creatives — Nihao Brand" },
      desc: {
        en: "High-contrast 1080×1350 social media series featuring Photoshop compositing and conversion-focused visual hierarchy."
      },
      poster: "assets/images/branding.jpg",
      videoSrc: ""
    },
    brandbook: {
      badge: { en: "BRAND GUIDELINES & VISUAL IDENTITY" },
      title: { en: "Complete Brandbook — Logistocean" },
      desc: {
        en: "Comprehensive corporate identity manual covering logo construction, color palette, typography, and real-world applications."
      },
      poster: "assets/images/studio.jpg",
      videoSrc: ""
    }
  };

  window.openReelModal = function (key) {
    const data = reelModalData[key] || reelModalData.reels;
    const modal = document.getElementById('reel-modal');
    if (!modal) return;

    const bBadge = document.getElementById('reel-modal-badge');
    const mTitle = document.getElementById('reel-modal-title');
    const mDesc = document.getElementById('reel-modal-desc');
    const mVideo = document.getElementById('reel-modal-video');
    const mSource = document.getElementById('reel-modal-source');
    const waLink = document.getElementById('reel-modal-whatsapp');

    if (bBadge) bBadge.innerText = data.badge.en;
    if (mTitle) mTitle.innerText = data.title.en;
    if (mDesc) mDesc.innerText = data.desc.en;
    if (mVideo) {
      mVideo.poster = data.poster;
      if (mSource) mSource.src = data.videoSrc;
      mVideo.load();
      mVideo.play().catch(err => console.log('Autoplay prevented:', err));
    }
    if (waLink) {
      const msg = `Hi Hicham, I saw your project [${data.title.en}] and would like to request a custom quote for a similar project.`;
      waLink.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    }

    modal.classList.remove('hidden');
  };

  window.closeReelModal = function () {
    const modal = document.getElementById('reel-modal');
    if (modal) {
      const video = document.getElementById('reel-modal-video');
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      modal.classList.add('hidden');
    }
  };

  // =========================================================================
  // CERTIFICATE IMAGE DOWNLOAD (HTML2CANVAS + NATIVE CANVAS FALLBACK)
  // =========================================================================
  window.downloadCertificateImage = function (cardId, filename) {
    const card = document.getElementById(cardId);
    if (!card) return;

    const btn = window.event ? window.event.currentTarget : null;
    const originalText = btn ? btn.innerHTML : "";
    if (btn) btn.innerHTML = "⏳ Preparing...";

    function finish() {
      if (btn) btn.innerHTML = originalText;
    }

    if (window.html2canvas) {
      window.html2canvas(card, {
        backgroundColor: '#0D0D0D',
        scale: 2,
        useCORS: true,
        logging: false
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = filename || 'certificate-hichamedd.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        finish();
      }).catch(err => {
        console.warn("html2canvas fallback:", err);
        generateFallbackCertificate(cardId, filename);
        finish();
      });
    } else {
      generateFallbackCertificate(cardId, filename);
      finish();
    }
  };

  function generateFallbackCertificate(cardId, filename) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    const isAudit = cardId.includes('audit');

    ctx.fillStyle = '#0D0D0D';
    ctx.fillRect(0, 0, 1200, 800);

    ctx.strokeStyle = '#F5B700';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 1140, 740);

    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = 'rgba(245, 183, 0, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 1110, 710);
    ctx.setLineDash([]);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#F5B700';
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('OFFICIAL CERTIFICATE • 2026 •', 600, 95);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(isAudit ? 'BRAND AUDIT CERTIFICATE' : 'CREATIVE EXCELLENCE CERTIFICATE', 600, 155);

    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText(isAudit ? 'Officially awarded to the brand:' : 'Officially awarded to:', 600, 220);

    const nameEl = isAudit ? document.getElementById('cert-company-display') : document.getElementById('cr-cert-player-name');
    const recipientName = nameEl ? nameEl.innerText.trim() : 'Brand Partner';
    ctx.fillStyle = '#F5B700';
    ctx.font = 'bold 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(recipientName, 600, 290);

    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#D1D5DB';
    if (isAudit) {
      const fEl = document.getElementById('cert-founder-display');
      const fName = fEl ? fEl.innerText.trim() : '';
      if (fName) {
        ctx.fillText('Directed by: ' + fName, 600, 345);
      }
    }

    const pEl = document.getElementById('cert-pct-display');
    const scorePct = pEl ? pEl.innerText.trim() : '0%';
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 42px "JetBrains Mono", monospace';
    ctx.fillText('OFFICIAL SCORE: ' + scorePct, 600, 440);

    const badgeEl = document.getElementById('cert-badge-display');
    const badgeVal = badgeEl ? badgeEl.innerText.trim() : '';
    if (badgeVal) {
      ctx.fillStyle = '#FBBF24';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(badgeVal, 600, 500);
    }

    ctx.strokeStyle = '#2A2A2A';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, 620);
    ctx.lineTo(1100, 620);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#F5B700';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Hicham Eddarhmoumi', 100, 665);
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Senior Graphic & Brand Designer • Official Invoice & NDA', 100, 695);

    ctx.textAlign = 'right';
    const dateEl = document.getElementById('cert-date-display');
    const dateStr = dateEl ? dateEl.innerText.trim() : new Date().toLocaleDateString('en-US');
    ctx.fillStyle = '#F5B700';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(dateStr, 1100, 665);
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Verified: en.hichamedd.com', 1100, 695);

    const a = document.createElement('a');
    a.download = filename || 'certificate-hichamedd.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  }

  // =========================================================================
  // POSTS & CAROUSEL IMAGE GALLERY
  // =========================================================================
  const postGalleryImages = [
    "assets/images/posts/image1.webp",
    "assets/images/posts/image2.webp",
    "assets/images/posts/image3.webp",
    "assets/images/posts/image4.webp",
    "assets/images/posts/image5.webp",
    "assets/images/posts/image6.webp",
    "assets/images/posts/image7.webp",
    "assets/images/posts/image8.webp",
    "assets/images/posts/image9.webp",
    "assets/images/posts/image10.webp",
    "assets/images/posts/image11.webp",
    "assets/images/posts/image12.webp",
    "assets/images/posts/image13.webp",
    "assets/images/posts/image14.webp",
    "assets/images/posts/image15.webp",
    "assets/images/posts/image16.webp",
    "assets/images/posts/image17.webp",
    "assets/images/posts/image18.webp",
    "assets/images/posts/image19.webp",
    "assets/images/posts/image20.webp",
    "assets/images/posts/image21.webp",
    "assets/images/posts/image22.webp",
    "assets/images/posts/image23.webp",
    "assets/images/posts/image24.webp",
    "assets/images/posts/image25.webp"
  ];

  let currentGalleryIndex = 0;

  window.openPostsGallery = function () {
    const modal = document.getElementById('posts-gallery-modal');
    if (!modal) return;
    currentGalleryIndex = 0;
    updateGalleryView();
    modal.classList.remove('hidden');
  };

  window.closePostsGallery = function () {
    const modal = document.getElementById('posts-gallery-modal');
    if (modal) modal.classList.add('hidden');
  };

  window.nextGalleryImage = function () {
    currentGalleryIndex = (currentGalleryIndex + 1) % postGalleryImages.length;
    updateGalleryView();
  };

  window.prevGalleryImage = function () {
    currentGalleryIndex = (currentGalleryIndex - 1 + postGalleryImages.length) % postGalleryImages.length;
    updateGalleryView();
  };

  function updateGalleryView() {
    const img = document.getElementById('gallery-current-img');
    const counter = document.getElementById('gallery-counter');
    const dotsContainer = document.getElementById('gallery-dots');

    if (img) {
      img.style.opacity = '0.3';
      setTimeout(() => {
        img.src = postGalleryImages[currentGalleryIndex];
        img.style.opacity = '1';
      }, 150);
    }

    if (counter) {
      counter.innerText = `Post ${currentGalleryIndex + 1} of ${postGalleryImages.length}`;
    }

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      postGalleryImages.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = idx === currentGalleryIndex
          ? 'w-6 h-2 rounded-full bg-brand-gold transition-all'
          : 'w-2 h-2 rounded-full bg-brand-border hover:bg-gray-400 transition-all';
        dot.onclick = () => {
          currentGalleryIndex = idx;
          updateGalleryView();
        };
        dotsContainer.appendChild(dot);
      });
    }
  }

  // =========================================================================
  // FULLSCREEN IMAGE ZOOM (100% LIGHTBOX)
  // =========================================================================
  window.openFullscreenImage = function () {
    const currentImg = document.getElementById('gallery-current-img');
    const fsModal = document.getElementById('gallery-fullscreen-lightbox');
    const fsImg = document.getElementById('gallery-fullscreen-img');

    if (currentImg && fsModal && fsImg) {
      fsImg.src = currentImg.src;
      fsModal.classList.remove('hidden');
    }
  };

  window.closeFullscreenImage = function () {
    const fsModal = document.getElementById('gallery-fullscreen-lightbox');
    if (fsModal) fsModal.classList.add('hidden');
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeFullscreenImage();
    }
  });

  // =========================================================================
  // BRANDBOOK WIDE SLIDER (12 SLIDES)
  // =========================================================================
  const brandbookGalleryImages = [
    "assets/images/logistocean/img1.webp",
    "assets/images/logistocean/img2.webp",
    "assets/images/logistocean/img3.webp",
    "assets/images/logistocean/img4.webp",
    "assets/images/logistocean/img5.webp",
    "assets/images/logistocean/img6.webp",
    "assets/images/logistocean/img7.webp",
    "assets/images/logistocean/img8.webp",
    "assets/images/logistocean/img9.webp",
    "assets/images/logistocean/img10.webp",
    "assets/images/logistocean/img11.webp",
    "assets/images/logistocean/img12.webp"
  ];

  window.openBrandbookModal = function () {
    const modal = document.getElementById('brandbook-modal');
    if (!modal) return;
    currentBrandbookIndex = 0;
    updateBrandbookView();
    modal.classList.remove('hidden');
  };

  window.closeBrandbookModal = function () {
    const modal = document.getElementById('brandbook-modal');
    if (modal) modal.classList.add('hidden');
  };

  window.nextBrandbookSlide = function () {
    currentBrandbookIndex = (currentBrandbookIndex + 1) % brandbookGalleryImages.length;
    updateBrandbookView();
  };

  window.prevBrandbookSlide = function () {
    currentBrandbookIndex = (currentBrandbookIndex - 1 + brandbookGalleryImages.length) % brandbookGalleryImages.length;
    updateBrandbookView();
  };

  function updateBrandbookView() {
    const img = document.getElementById('brandbook-current-img');
    const counter = document.getElementById('brandbook-counter');
    const dotsContainer = document.getElementById('brandbook-dots');

    if (img) {
      img.style.opacity = '0.3';
      setTimeout(() => {
        img.src = brandbookGalleryImages[currentBrandbookIndex];
        img.style.opacity = '1';
      }, 150);
    }

    if (counter) {
      counter.innerText = `Slide ${currentBrandbookIndex + 1} of ${brandbookGalleryImages.length}`;
    }

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      brandbookGalleryImages.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = idx === currentBrandbookIndex
          ? 'px-3 py-1 rounded-lg bg-brand-gold text-black font-extrabold text-xs shadow-md shadow-brand-gold/20'
          : 'px-3 py-1 rounded-lg bg-brand-surface border border-brand-border text-gray-400 hover:text-white text-xs font-semibold';
        dot.innerText = idx + 1;
        dot.onclick = () => {
          currentBrandbookIndex = idx;
          updateBrandbookView();
        };
        dotsContainer.appendChild(dot);
      });
    }
  }

})();