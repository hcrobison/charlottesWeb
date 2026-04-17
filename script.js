(function () {
  const page = document.body.dataset.page;

  function setActiveNav(currentPage) {
    const navLinks = document.querySelectorAll('[data-nav]');
    navLinks.forEach((link) => {
      if (link.dataset.nav === currentPage) {
        link.classList.add('active');
      }
    });
  }

  function setupPetCounter() {
    const petBtn = document.getElementById('pet-btn');
    const petCount = document.getElementById('pet-count');

    if (!petBtn || !petCount) {
      return;
    }

    const storageKey = 'charlottePetCount';
    const savedValue = window.localStorage.getItem(storageKey);
    let count = Number.parseInt(savedValue || '0', 10);

    if (Number.isNaN(count)) {
      count = 0;
    }

    const render = () => {
      petCount.textContent = `Pets given: ${count}`;
    };

    petBtn.addEventListener('click', () => {
      count += 1;
      window.localStorage.setItem(storageKey, String(count));
      render();
    });

    render();
  }

  function setupAchievementFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.achievement-card');

    if (!filterButtons.length || !cards.length) {
      return;
    }

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const selected = button.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        cards.forEach((card) => {
          const category = card.dataset.category;
          const showCard = selected === 'all' || selected === category;
          card.classList.toggle('hidden', !showCard);
        });
      });
    });
  }

  if (page) {
    setActiveNav(page);
  }

  setupPetCounter();
  setupAchievementFilter();
})();
