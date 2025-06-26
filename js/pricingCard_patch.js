function initStaticCardTabs() {
  document.querySelectorAll('.price-card').forEach(card => {
    const navLinks = card.querySelectorAll('.nav-link[data-tab-target]');
    if (navLinks.length === 0) return;

    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('data-tab-target');

        navLinks.forEach(l => l.classList.toggle('active', l === this));
        card.querySelectorAll('.tab-pane[data-tab]').forEach(pane => {
          const isMatch = pane.getAttribute('data-tab') === target;
          pane.classList.toggle('show', isMatch);
          pane.classList.toggle('active', isMatch);
        });
      });
    });
  });
}

(function patchConfirmResortSelection() {
  const oldFunc = window.confirmResortSelection;
  window.confirmResortSelection = function () {
    const checkedButtons = document.querySelectorAll('#resortSelectorModal .btn-check:checked');
    if (checkedButtons.length === 0) {
      alert('請至少選擇一個雪場');
      return;
    }
    oldFunc.call(this);
  };
})();

(function patchOpenModal() {
  const oldOpen = window.openResortSelectorModal;
  window.openResortSelectorModal = function (editMode) {
    oldOpen(editMode);
    setTimeout(() => {
      if (!window.currentEditingCard) return;
      const badgeLabels = Array.from(currentEditingCard.querySelectorAll('.badge')).map(b => b.dataset.label);
      const allInputs = document.querySelectorAll('#resortSelectorModal .btn-check');
      allInputs.forEach(input => {
        input.checked = badgeLabels.includes(input.getAttribute('data-label'));
      });
      window.selectedResortsValue = badgeLabels;
      window.selectedResortsText = badgeLabels.join(', ');
      const display = document.getElementById('resortSelectDisplay');
      if (display) display.textContent = badgeLabels[0] || '請選擇適用雪場';
    }, 200);
  };
})();

function arraysEqualUnordered(a, b) {
  if (a.length !== b.length) return false;
  return a.every(item => b.includes(item)) && b.every(item => a.includes(item));
}

function syncBadgeAcrossStages(currentCard, resortLabels) {
  const thisStage = currentCard.getAttribute('data-stage');
  const targetStage = thisStage === 'half' ? 'full' : 'half';

  const allCards = document.querySelectorAll(`.price-card[data-stage="${targetStage}"]`);
  allCards.forEach(card => {
    const otherLabels = Array.from(card.querySelectorAll('.badge')).map(b => b.dataset.label);
    if (arraysEqualUnordered(otherLabels, resortLabels)) {
      updateCardBadge(card, resortLabels);
    }
  });
}

(function enableBadgeSync() {
  const originalUpdateBadge = window.updateCardBadge;
  window.updateCardBadge = function (card, labels) {
    originalUpdateBadge(card, labels);
    card.setAttribute('data-resorts', labels.join(','));

    const thisStage = card.getAttribute('data-stage');
    const otherStage = thisStage === 'half' ? 'full' : 'half';

    const allCards = document.querySelectorAll(`.price-card[data-stage="${otherStage}"]`);
    allCards.forEach(otherCard => {
      const otherLabels = Array.from(otherCard.querySelectorAll('.badge')).map(b => b.dataset.label);
      const matched = labels.length && labels.every(l => otherLabels.includes(l));
      if (matched) {
        originalUpdateBadge(otherCard, labels);
      }
    });
  };
})();

document.addEventListener('DOMContentLoaded', initStaticCardTabs);
