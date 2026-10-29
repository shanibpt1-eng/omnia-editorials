(function () {
  'use strict';

  // 1. Reading Progress Bar
  const progressBar = document.querySelector('.progress');
  function updateProgress() {
    if (!progressBar) return;
    const doc = document.documentElement;
    const scrollMax = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pct = Math.min(100, Math.max(0, (window.scrollY / scrollMax) * 100));
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // 2. Intersection Observer for Reveal Elements
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('on'));
  }

  // 3. Currency Switcher (AED / SAR Synchronizer)
  const savedCurrency = localStorage.getItem('luxury_currency') || 'AED';
  function setCurrency(curr) {
    localStorage.setItem('luxury_currency', curr);
    document.querySelectorAll('.currency-segmented .curr-pill').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-curr') === curr);
    });
    document.querySelectorAll('.price-val').forEach((priceEl) => {
      const aed = priceEl.getAttribute('data-aed');
      const sar = priceEl.getAttribute('data-sar');
      if (curr === 'SAR' && sar) {
        priceEl.textContent = 'SAR ' + sar;
      } else if (aed) {
        priceEl.textContent = 'AED ' + aed;
      }
    });
  }
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.curr-pill');
    if (btn) {
      const c = btn.getAttribute('data-curr');
      if (c) setCurrency(c);
    }
  });
  setCurrency(savedCurrency);

  // 4. Luxury Dark / Light Theme Toggle
  const savedTheme = localStorage.getItem('luxury_theme') || 'light';
  function applyTheme(theme) {
    localStorage.setItem('luxury_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }
  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('#headerThemeToggle');
    if (toggle) {
      const currentIsDark = document.documentElement.classList.contains('dark');
      applyTheme(currentIsDark ? 'light' : 'dark');
    }
  });
  applyTheme(savedTheme);

  // 5. Audio Dispatch Player Simulation
  let isPlayingAudio = false;
  let audioTimer = null;
  let playSeconds = 0;
  const audioBtn = document.getElementById('audioPlayerBtn');
  if (audioBtn) {
    const label = audioBtn.querySelector('.audio-label');
    const playSvg = audioBtn.querySelector('.play-svg');
    const pauseSvg = audioBtn.querySelector('.pause-svg');

    audioBtn.addEventListener('click', function () {
      isPlayingAudio = !isPlayingAudio;
      audioBtn.classList.toggle('is-playing', isPlayingAudio);
      if (playSvg) playSvg.style.display = isPlayingAudio ? 'none' : 'block';
      if (pauseSvg) pauseSvg.style.display = isPlayingAudio ? 'block' : 'none';

      if (isPlayingAudio) {
        audioTimer = setInterval(function () {
          playSeconds++;
          const m = Math.floor(playSeconds / 60);
          const s = String(playSeconds % 60).padStart(2, '0');
          if (label) label.textContent = 'Playing Brief (' + m + ':' + s + ' / 3:45)';
          if (playSeconds >= 225) {
            clearInterval(audioTimer);
            isPlayingAudio = false;
            audioBtn.classList.remove('is-playing');
            if (playSvg) playSvg.style.display = 'block';
            if (pauseSvg) pauseSvg.style.display = 'none';
            if (label) label.textContent = 'Replay Briefing (3:45)';
            playSeconds = 0;
          }
        }, 1000);
      } else {
        clearInterval(audioTimer);
        if (label) label.textContent = 'Resume Briefing (3:45)';
      }
    });
  }

  // 6. Font Scaler (A- / A+)
  let fontDelta = 0;
  const articleEl = document.querySelector('.article');
  const standfirstEl = document.querySelector('.standfirst');
  const baseArticleSize = 18;
  const baseStandfirstSize = 19;

  document.addEventListener('click', function (e) {
    if (e.target.closest('#fontIncBtn')) {
      if (fontDelta < 4) {
        fontDelta += 2;
        if (articleEl) articleEl.style.fontSize = (baseArticleSize + fontDelta) + 'px';
        if (standfirstEl) standfirstEl.style.fontSize = (baseStandfirstSize + fontDelta) + 'px';
      }
    }
    if (e.target.closest('#fontDecBtn')) {
      if (fontDelta > -2) {
        fontDelta -= 2;
        if (articleEl) articleEl.style.fontSize = (baseArticleSize + fontDelta) + 'px';
        if (standfirstEl) standfirstEl.style.fontSize = (baseStandfirstSize + fontDelta) + 'px';
      }
    }
  });

  // 7. Copy Article Link
  document.addEventListener('click', function (e) {
    const copyBtn = e.target.closest('#copyArticleLink');
    if (copyBtn) {
      const textSpan = copyBtn.querySelector('.copy-text') || copyBtn.querySelector('span');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(function () {
          if (textSpan) {
            const original = textSpan.textContent;
            textSpan.textContent = '✓ Copied!';
            setTimeout(function () {
              textSpan.textContent = original;
            }, 2000);
          }
        });
      }
    }
  });

  // 8. Floating VIP Ribbon Dismiss
  const dismissBtn = document.getElementById('dismissVipRibbon');
  const vipRibbon = document.getElementById('floatingVipRibbon');
  if (dismissBtn && vipRibbon) {
    dismissBtn.addEventListener('click', function () {
      vipRibbon.style.display = 'none';
    });
  }

  // 10. Occasion Styling Quiz / Matcher
  const quizData = {
    bridal: {
      title: 'Kalina White Royal Bridal Full Set (925 Silver)',
      desc: 'Handcrafted royal bridal choker, cascade earrings, and matching bracelet set with Grade-AAA simulated diamonds.',
      priceAed: '3620',
      priceSar: '3692',
      img: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Unknown_5aff2b85-b687-47d4-ba09-aed5858a45bf.jpg?v=1790186920',
      url: 'https://omniastores.com/collections/luxury-sets'
    },
    henna: {
      title: 'Nadirra Ruby Red Luxury Bridal Full Set',
      desc: 'Regal crimson cushion-cut simulated stones in Italian rhodium-plated sterling silver for grand engagement & henna evenings.',
      priceAed: '970',
      priceSar: '989',
      img: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Nadirra_Ruby_Red_Luxury_Bridal_Full_Set_with_High-Quality_Zircon_Stones_Premium_Rhodium_Plating_ON_MODEL.jpg?v=1791811504',
      url: 'https://omniastores.com/products/nadirra-ruby-red-luxury-bridal-full-set-with-high-quality-zircon-stones-premium-rhodium-plating'
    },
    gala: {
      title: 'Omnia Audrey Blue Luxury Cushion Cut Set',
      desc: 'Deep royal sapphire-tone simulated gems handset in 925 sterling silver for black-tie galas and regional red carpets.',
      priceAed: '700',
      priceSar: '714',
      img: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Omnia_Audrey_Blue_Luxury_Bridal_Full_Set_in_High_Quality_Simulated_Diamonds_Premium_Rhodium_Plated_with_Cushion_Cut_Stones.jpg?v=1791973615',
      url: 'https://omniastores.com/products/omnia-audrey-blue-luxury-bridal-full-set-in-high-quality-simulated-diamonds-premium-rhodium-plated-with-cushion-cut-stones'
    },
    minimalist: {
      title: 'Maha Sky Blue 925 Tennis Bracelet with Certificate',
      desc: 'Refined 5-carat equivalent micro-prong tennis bracelet in certified DCL-hallmarked sterling silver.',
      priceAed: '2220',
      priceSar: '2264',
      img: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Maha_Sky_Blue_Bracelet_with_Certificate_High-Quality_Simulated_Diamonds_in_925_Sterling_Silver.jpg?v=1792504266',
      url: 'https://omniastores.com/products/maha-sky-blue-bracelet-with-certificate-high-quality-simulated-diamonds-in-925-sterling-silver'
    }
  };

  document.addEventListener('click', function (e) {
    const tab = e.target.closest('.quiz-tab');
    if (tab) {
      const occasion = tab.getAttribute('data-occasion');
      const data = quizData[occasion];
      if (!data) return;
      document.querySelectorAll('.quiz-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const card = document.querySelector('.quiz-result-card');
      if (card) {
        const curr = localStorage.getItem('luxury_currency') || 'AED';
        card.querySelector('.quiz-img-wrap img').src = data.img;
        card.querySelector('.quiz-info h4').textContent = data.title;
        card.querySelector('.quiz-info p').textContent = data.desc;
        const priceEl = card.querySelector('.quiz-price');
        priceEl.setAttribute('data-aed', data.priceAed);
        priceEl.setAttribute('data-sar', data.priceSar);
        priceEl.textContent = (curr === 'SAR' ? 'SAR ' + data.priceSar : 'AED ' + data.priceAed);
        card.querySelector('.quiz-buy-link').href = data.url;
      }
    }
  });

  // 11. Hallmark Assay Certificate Modal
  document.addEventListener('click', function (e) {
    if (e.target.closest('#openHallmarkModalBtn') || e.target.closest('.cert-verify-btn')) {
      const modal = document.getElementById('hallmarkModalOverlay');
      if (modal) modal.classList.add('open');
    }
    if (e.target.closest('#closeHallmarkModalBtn') || e.target.id === 'hallmarkModalOverlay') {
      const modal = document.getElementById('hallmarkModalOverlay');
      if (modal) modal.classList.remove('open');
    }
  });

  // 12. Sidebar Animated Luxury Ad Carousel
  const sidebarAds = [
    {
      img: 'assets/ads/01_timeless-elegance.png',
      tag: 'OMNIA STORES ATELIER',
      title: 'Timeless Elegance Collection',
      desc: 'Handcrafted royal bridal choker & cascade earrings in certified 925 sterling silver.',
      url: 'https://omniastores.com/collections/luxury-sets'
    },
    {
      img: 'assets/ads/03_royal-allure.png',
      tag: 'HAUTE JOAILLERIE',
      title: 'Royal Allure Grand Suite',
      desc: 'Italian micro-prong brilliant simulated diamonds designed for high-profile galas.',
      url: 'https://omniastores.com/collections/luxury-sets'
    },
    {
      img: 'assets/ads/09_regal-rubies.png',
      tag: 'CEREMONIAL EDIT',
      title: 'Regal Ruby Crimson Suite',
      desc: 'Cushion-cut ruby red simulated gems handset in DCL-hallmarked silver.',
      url: 'https://omniastores.com/collections/silver-sets'
    },
    {
      img: 'assets/ads/10_emerald-grandeur.png',
      tag: 'GCC BRIDAL SPECIAL',
      title: 'Emerald Grandeur Masterpiece',
      desc: 'Imperial green emerald-cut stones with anti-tarnish Italian rhodium plating.',
      url: 'https://omniastores.com/collections/luxury-sets'
    }
  ];

  let currentSidebarAd = 0;
  function updateSidebarAd(index) {
    currentSidebarAd = index % sidebarAds.length;
    const adData = sidebarAds[currentSidebarAd];
    const imgEl = document.getElementById('sidebarAdImg');
    const titleEl = document.getElementById('sidebarAdTitle');
    const descEl = document.getElementById('sidebarAdDesc');
    const dots = document.querySelectorAll('.ad-dot');

    if (imgEl && adData) {
      imgEl.style.opacity = '0.4';
      setTimeout(function () {
        imgEl.src = adData.img;
        if (titleEl) titleEl.textContent = adData.title;
        if (descEl) descEl.textContent = adData.desc;
        imgEl.style.opacity = '1';
      }, 250);
    }
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === currentSidebarAd);
    });
  }

  // Auto-cycle every 5 seconds
  let adInterval = setInterval(function () {
    updateSidebarAd(currentSidebarAd + 1);
  }, 5000);

  document.addEventListener('click', function (e) {
    const dot = e.target.closest('.ad-dot');
    if (dot) {
      clearInterval(adInterval);
      const idx = parseInt(dot.getAttribute('data-ad'), 10);
      if (!isNaN(idx)) updateSidebarAd(idx);
    }
  });

  // 13. Sidebar FAQ Accordion Toggle
  document.addEventListener('click', function (e) {
    const qBtn = e.target.closest('.sidebar-faq-q');
    if (qBtn) {
      const item = qBtn.closest('.sidebar-faq-item');
      if (item) {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.sidebar-faq-item').forEach(function (i) {
          i.classList.remove('open');
        });
        if (!isOpen) {
          item.classList.add('open');
        }
      }
    }
  });

  // 14. VIP Collector's Circle Voucher Unlock & Copy
  window.unlockVipVoucher = function (form) {
    const card = document.getElementById('vipUnlockedCard');
    if (card) {
      card.classList.add('show');
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  document.addEventListener('click', function (e) {
    const copyBtn = e.target.closest('#vipCopyBtn');
    if (copyBtn) {
      const code = 'OMNIA-VIP15';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(function () {
          copyBtn.textContent = 'Copied! ✓';
          setTimeout(function () {
            copyBtn.textContent = 'Copy Code';
          }, 2500);
        });
      } else {
        copyBtn.textContent = 'Copied! ✓';
      }
    }
  });
})();
