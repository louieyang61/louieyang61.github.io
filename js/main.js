document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // 1. Sidebar Toggle + Overlay
  // ============================================
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  function openSidebar() {
    sidebar.classList.add('show');
    menuToggle.classList.add('active');
    document.body.classList.add('sidebar-open');
    if (overlay) overlay.classList.add('show');
  }

  function closeSidebar() {
    sidebar.classList.remove('show');
    menuToggle.classList.remove('active');
    document.body.classList.remove('sidebar-open');
    if (overlay) overlay.classList.remove('show');
  }

  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (sidebar.classList.contains('show')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Close sidebar when a nav link is clicked (mobile)
  const navLinks = document.querySelectorAll('#navMenu a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 900) {
        closeSidebar();
      }
    });
  });

  // Click overlay to close
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Click outside sidebar to close (mobile)
  document.addEventListener('click', function(event) {
    var isClickInsideSidebar = sidebar.contains(event.target);
    var isClickOnMenuToggle = menuToggle.contains(event.target);
    if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains('show')) {
      closeSidebar();
    }
  });

  // Close sidebar on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (sidebar.classList.contains('show')) closeSidebar();
      var modal = document.getElementById('projectModal');
      if (modal && modal.classList.contains('show')) closeModal();
    }
  });

  // ============================================
  // 2. Scroll Animations (Intersection Observer)
  // ============================================
  var animateElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && animateElements.length > 0) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    animateElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // ============================================
  // 3. Project Card Modal
  // ============================================
  var projectCards = document.querySelectorAll('.project-card');
  var modal = document.getElementById('projectModal');
  var modalClose = document.getElementById('modalClose');

  projectCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      // Don't intercept link clicks inside the card
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
      }
      e.preventDefault();
      openModal(card);
    });
  });

  function openModal(card) {
    if (!modal) return;

    var title = card.getAttribute('data-title') || '';
    var subtitle = card.getAttribute('data-subtitle') || '';
    var image = card.getAttribute('data-image') || '';
    var link = card.getAttribute('data-link') || '';

    // Gather list items from the card's project-info
    var listItems = card.querySelectorAll('.project-info li');
    var detailsHtml = '';
    listItems.forEach(function(li) {
      detailsHtml += '<li>' + li.innerHTML + '</li>';
    });

    // Populate modal
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalSubtitle').innerHTML = subtitle;
    var modalImg = document.getElementById('modalImg');
    if (image) {
      modalImg.src = image;
      modalImg.alt = title;
      modalImg.style.display = 'block';
    } else {
      modalImg.style.display = 'none';
    }
    document.getElementById('modalDetails').innerHTML = detailsHtml;

    // Link button
    var linkContainer = document.getElementById('modalLinkContainer');
    if (link) {
      linkContainer.innerHTML = '<a href="' + link + '" target="_blank" class="btn">Visit Project →</a>';
    } else {
      linkContainer.innerHTML = '';
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // ============================================
  // 4. Contact Link Click Feedback
  // ============================================
  var contactLinks = document.querySelectorAll('.contact-link');
  contactLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      // Brief visual feedback
      var textSpan = link.querySelector('span:last-child');
      var originalText = textSpan ? textSpan.textContent : '';
      if (textSpan && originalText) {
        textSpan.textContent = 'Opening...';
        link.style.pointerEvents = 'none';
        setTimeout(function() {
          textSpan.textContent = originalText;
          link.style.pointerEvents = '';
        }, 1200);
      }
    });
  });

  // ============================================
  // 5. Resume Button Click Feedback
  // ============================================
  var resumeBtn = document.querySelector('.profile-photo .btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
      var originalText = resumeBtn.textContent;
      resumeBtn.textContent = 'Opening...';
      setTimeout(function() {
        resumeBtn.textContent = originalText;
      }, 1500);
    });
  }

});
