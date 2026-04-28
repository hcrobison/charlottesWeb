(function () {
  const page = document.body.dataset.page;
  const chatApiMeta = document.querySelector('meta[name="chat-api-base-url"]');
  const chatApiBaseUrl =
    (chatApiMeta && chatApiMeta.content && chatApiMeta.content.trim()) ||
    'https://your-vercel-project.vercel.app';

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

  function setupChatbot() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatStatus = document.getElementById('chat-status');
    const sendButton = document.getElementById('chat-send-btn');

    if (!chatForm || !chatInput || !chatMessages || !chatStatus || !sendButton) {
      return;
    }

    const sessionStorageKey = 'charlotteChatSessionId';
    let sessionId = window.localStorage.getItem(sessionStorageKey);

    if (!sessionId) {
      sessionId = `session-${Date.now()}`;
      window.localStorage.setItem(sessionStorageKey, sessionId);
    }

    function appendMessage(role, text) {
      const wrapper = document.createElement('article');
      wrapper.className = `chat-message ${role}`;
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      wrapper.appendChild(paragraph);
      chatMessages.appendChild(wrapper);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function setPendingState(isPending) {
      sendButton.disabled = isPending;
      chatInput.disabled = isPending;
      if (isPending) {
        chatStatus.textContent = 'Charlotte is thinking...';
      }
    }

    chatForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const message = chatInput.value.trim();
      if (!message) {
        return;
      }

      appendMessage('user', message);
      chatInput.value = '';
      setPendingState(true);

      try {
        const response = await fetch(`${chatApiBaseUrl}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            sessionId,
          }),
        });

        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.error || 'The chat service returned an error.');
        }

        appendMessage('bot', payload.reply);
        chatStatus.textContent = `Intent detected: ${payload.intent}`;
      } catch (error) {
        const fallbackText =
          error instanceof Error ? error.message : 'Unable to reach Charlotte right now.';
        appendMessage('bot', `Sorry, I missed that. ${fallbackText}`);
        chatStatus.textContent = 'Chat error. Check API URL or CORS settings.';
      } finally {
        setPendingState(false);
        chatInput.focus();
      }
    });
  }

  if (page) {
    setActiveNav(page);
  }

  setupPetCounter();
  setupAchievementFilter();
  setupChatbot();
})();
