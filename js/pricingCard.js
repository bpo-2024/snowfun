
// 變數
let stage = 'half';
let tempHalfData = null;
let selectedResortsText = '';
let selectedResortsValue = [];
let isEditMode = false;
let currentEditingCard = null; // 用來記錄目前正在編輯的卡片


// 雪場選擇
function openResortSelectorModal(editMode = false) {
  isEditMode = editMode;
  setResortSelectorMode(editMode); // ✅ 單一責任：這裡就決定複選/單選

  const resortSelectorModal = new bootstrap.Modal(document.getElementById('resortSelectorModal'));
  resortSelectorModal.show();
}

function setSelectedResortsFromValue(values) {
  selectedResortsValue = values;
  const allOptions = document.querySelectorAll('#resortSelectorModal .btn-check');
  allOptions.forEach(input => {
    input.checked = values.includes(input.value);
  });
  selectedResortsText = Array.from(allOptions).filter(input => input.checked).map(input => input.getAttribute('data-label')).join(', ');
  document.getElementById('resortSelectDisplay').value = selectedResortsText;
}

// 初始化雪場選項監聽
const resortOptions = document.querySelectorAll('#resortSelectorModal .btn-check');
resortOptions.forEach(option => {
  option.addEventListener('change', function () {
    const selected = Array.from(resortOptions)
      .filter(opt => opt.checked)
      .map(opt => opt.value);
    selectedResortsValue = selected;
    selectedResortsText = selected.join(', ');
    document.getElementById('resortSelectDisplay').value = selectedResortsText;
  });
});

// 雪場彈窗開啟時自動勾選
const resortModal = document.getElementById('resortSelectorModal');
resortModal.addEventListener('show.bs.modal', function () {
  const allOptions = resortModal.querySelectorAll('.btn-check');
  allOptions.forEach(option => {
    option.checked = selectedResortsValue.includes(option.value);
  });
});

// 收費區塊視覺更新
function updateTabVisibility() {
  const tabConfigs = [
    { contentId: 'half' },
    { contentId: 'full' }
  ];

  let hasAnyData = false;

  tabConfigs.forEach(({ contentId }) => {
    const container = document.getElementById(contentId);
    const offSeason = container.querySelector('.off-season');
    const peakSeason = container.querySelector('.peak-season');
    const offTitle = container.querySelector('h6:nth-of-type(1)');
    const peakTitle = container.querySelector('h6:nth-of-type(2)');

    const hasOff = offSeason?.children.length > 0;
    const hasPeak = peakSeason?.children.length > 0;

    if (offTitle && offSeason) {
      offTitle.style.display = hasOff ? '' : 'none';
      offSeason.style.display = hasOff ? '' : 'none';
    }

    if (peakTitle && peakSeason) {
      peakTitle.style.display = hasPeak ? '' : 'none';
      peakSeason.style.display = hasPeak ? '' : 'none';
    }

    if (hasOff || hasPeak) {
      hasAnyData = true;
    }
  });

  const typeTabs = document.getElementById('typeTabs');
  typeTabs.style.display = hasAnyData ? '' : 'none';
}

function appendCardToSection(stage, html) {
  const container = document.getElementById(stage === 'full' ? 'full' : 'half');
  container.insertAdjacentHTML('beforeend', html);
  updateTabVisibility();
}

function handleFormSubmission(stage, values) {
  const targetId = stage === 'full' ? 'full' : 'half';
  const cardHTML = `
    <div class="card mb-2">
      <div class="card-body">
        <h5 class="card-title">${stage === 'full' ? '全天收費' : '半天收費'}</h5>
        <p class="card-text">${values}</p>
      </div>
    </div>`;
  appendCardToSection(stage, cardHTML);
}

// 表單提交與卡片

function createPricingCard(stage, offData, peakData, resorts) {
  const uniqueId = Date.now();
  const card = document.createElement('div');
  const showPeak = document.getElementById('option2').checked;
  const peakTabHtml = showPeak ? `
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="peak-tab-${uniqueId}" data-bs-toggle="tab" data-bs-target="#peak-${uniqueId}" type="button" role="tab">旺季收費</button>
  </li>
` : '';

const peakPaneHtml = showPeak ? `
  <div class="tab-pane fade" id="peak-${uniqueId}" role="tabpanel">
    <div class="row text-center fw-bold mb-3">
      ${peakData.map((v, i) => `
        <div class="col">${i + 1}人/堂<br><div class="fw-normal">${v}</div></div>
      `).join('')}
    </div>
  </div>
` : '';

  card.className = 'price-card card mb-3';
  card.innerHTML = `
  <div class="price-box border border-primary border-2 rounded p-3 position-relative">
  <ul class="nav nav-tabs border-bottom mb-3" id="seasonTab-${uniqueId}" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="off-tab-${uniqueId}" data-bs-toggle="tab" data-bs-target="#off-${uniqueId}" type="button" role="tab">平季收費</button>
    </li>
    ${peakTabHtml}
  </ul>
  <div class="tab-content">
    <div class="tab-pane fade show active" id="off-${uniqueId}" role="tabpanel">
      <div class="row text-center fw-bold mb-3">
        ${offData.map((v, i) => `
          <div class="col">${i + 1}人/堂<br><div class="fw-normal">${v}</div></div>
        `).join('')}
      </div>
    </div>
    ${peakPaneHtml}
  </div>
      <div class="mt-3">
        ${resorts.map(r => `<span class="badge rounded-pill bg-secondary me-1">${r}</span>`).join('')}
        <button class="btn btn-sm btn-outline-secondary">＋ 增加相同收費雪場</button>
      </div>
      <div class="position-absolute top-0 end-0 mt-2 me-2">
        <i class="bi bi-pencil-square text-primary me-2" role="button" onclick="editCard(this)"></i>
        <i class="bi bi-trash text-danger" role="button" onclick="this.closest('.price-card').remove(); updateTabVisibility();"></i>
      </div>
    </div>
  `;
  const container = document.querySelector(`#${stage} .off-season`);
  container.appendChild(card);
  updateTabVisibility();
}

function generatePriceInputs(targetId, prefix, count = 6) {
const container = document.getElementById(targetId);
container.innerHTML = '';
for (let i = 1; i <= count; i++) {
    container.insertAdjacentHTML('beforeend', `
      <div class="input-group mb-2">
        <span class="input-group-text">${i}人/堂</span>
        <button class="btn btn-outline-secondary" type="button" onclick="adjust('${prefix}${i}', -1000)">-</button>
        <input type="number" class="form-control text-center" id="${prefix}${i}" value="6000" min="1000" onblur="validateAndFormat(this)">
        <button class="btn btn-outline-secondary" type="button" onclick="adjust('${prefix}${i}', 1000)">+</button>
      </div>
    `);
  }
}

function adjust(id, delta) {
  const input = document.getElementById(id);
  if (!input) return;
  let value = parseInt(input.value) || 0;
  value = Math.max(1000, Math.round((value + delta) / 1000) * 1000);
  input.value = value;
}

function validateAndFormat(input) {
  let val = parseInt(input.value) || 0;
  if (val < 1000) val = 1000;
  val = Math.round(val / 1000) * 1000;
  input.value = val;
}

function validatePriceInputs(prefix, count = 6) {
  for (let i = 1; i <= count; i++) {
    const val = parseInt(document.getElementById(`${prefix}${i}`).value) || 0;
    if (val < 1000) return false;
  }
  return true;
}

function validateResortsSelected() {
  return selectedResortsValue.length > 0;
}

submitPricingCard = (stage, offData, peakData, resorts) => {
  createPricingCard(stage, offData, peakData, resorts);
};


// Modal 初始化與事件邏輯
document.addEventListener('DOMContentLoaded', function () {
  generatePriceInputs('priceInputs-off', 'off');
  generatePriceInputs('priceInputs-peak', 'peak');
  updateTabVisibility();

  const option2 = document.getElementById('option2');
  function updatePeakSeasonTabVisibility() {
    const isChecked = option2.checked;
    const peakTab = document.getElementById('peakSeason-tab');
    const peakContent = document.getElementById('peakSeasonContent');
    if (!isChecked) {
      peakTab.classList.add('d-none');
      peakContent.classList.remove('show', 'active');
      document.getElementById('offSeason-tab').classList.add('active');
      document.getElementById('offSeasonContent').classList.add('show', 'active');
    } else {
      peakTab.classList.remove('d-none');
    }
  }
  updatePeakSeasonTabVisibility();
  option2.addEventListener('change', updatePeakSeasonTabVisibility);
});

document.getElementById('nextBtn').addEventListener('click', function () {
  if (!validateResortsSelected() || !validatePriceInputs('off') || (document.getElementById('option2').checked && !validatePriceInputs('peak'))) {
    alert('請填寫完整資訊並選擇至少一個雪場');
    return;
  }

  const offDataHalf = collectPrices('off');
  const peakDataHalf = collectPrices('peak');
  function collectPrices(prefix, count = 6) {
    return Array.from({ length: count }, (_, i) => 
      document.getElementById(`${prefix}${i + 1}`).value
    );
  }

  const resorts = selectedResortsValue;

  tempHalfData = {
    off: offDataHalf,
    peak: peakDataHalf,
    resorts: resorts
  };

  stage = 'full';
  document.getElementById('modalTitle').textContent = '全天/五小時收費設定';
  this.classList.add('d-none');
  document.getElementById('backBtn').classList.remove('d-none');
  document.getElementById('confirmBtn').classList.remove('d-none');
  generatePriceInputs('priceInputs-off', 'offFull');
  generatePriceInputs('priceInputs-peak', 'peakFull');
});

const backBtn = document.createElement('button');
backBtn.className = 'btn btn-secondary d-none';
backBtn.id = 'backBtn';
backBtn.textContent = '返回半天設定';
backBtn.addEventListener('click', function () {
  stage = 'half';
  document.getElementById('modalTitle').textContent = '半天/三小時收費設定';
  this.classList.add('d-none');
  document.getElementById('nextBtn').classList.remove('d-none');
  document.getElementById('confirmBtn').classList.add('d-none');
  generatePriceInputs('priceInputs-off', 'off');
  generatePriceInputs('priceInputs-peak', 'peak');

  if (tempHalfData) {
    tempHalfData.off.forEach((val, idx) => {
      const input = document.getElementById(`off${idx + 1}`);
      if (input) input.value = val;
    });
    tempHalfData.peak.forEach((val, idx) => {
      const input = document.getElementById(`peak${idx + 1}`);
      if (input) input.value = val;
    });
    setSelectedResortsFromValue(tempHalfData.resorts);

  }

  document.getElementById('offSeason-tab').classList.add('active');
  document.getElementById('offSeasonContent').classList.add('show', 'active');
  document.getElementById('peakSeason-tab').classList.remove('active');
  document.getElementById('peakSeasonContent').classList.remove('show', 'active');
});
document.querySelector('.modal-footer').insertBefore(backBtn, document.getElementById('confirmBtn'));

// 
document.getElementById('confirmBtn').addEventListener('click', function () {
  if (!validateResortsSelected() || !validatePriceInputs('offFull') || (document.getElementById('option2').checked && !validatePriceInputs('peakFull'))) {
    alert('請填寫完整全天收費資訊並選擇至少一個雪場');
    return;
  }

  const offData = [], peakData = [];
  for (let i = 1; i <= 6; i++) {
    offData.push(document.getElementById('offFull' + i).value);
    peakData.push(document.getElementById('peakFull' + i).value);
  }

  const resorts = selectedResortsValue;

  if (currentEditingCard) {
    // ✅ 編輯狀態：只更新，不新增
    updateCardContent(currentEditingCard, offData, peakData, resorts);
    currentEditingCard = null;
    isEditMode = false; // ✅ 也重設編輯狀態
  } else if (tempHalfData) {
    // ✅ 半天資料來的新增
    createPricingCard('half', tempHalfData.off, tempHalfData.peak, tempHalfData.resorts);
    tempHalfData = null;
    createPricingCard('full', offData, peakData, resorts);
  } else {
    // ✅ 單純新增
    createPricingCard('full', offData, peakData, resorts);
  }

  bootstrap.Modal.getInstance(document.getElementById('priceModal')).hide();
});

function updateCardContent(card, off, peak, resorts) {
  const tabContent = card.querySelector('.tab-content');
  const navTabs = card.querySelector('.nav-tabs');
  const uniqueId = Date.now();
  const hasPeak = document.getElementById('option2').checked;

  navTabs.innerHTML = `
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="off-tab-${uniqueId}" data-bs-toggle="tab" data-bs-target="#off-${uniqueId}" type="button" role="tab">平季收費</button>
      ${hasPeak ? `
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="peak-tab-${uniqueId}" data-bs-toggle="tab" data-bs-target="#peak-${uniqueId}" type="button" role="tab">旺季收費</button>
        </li>` : ''}
  `;

  tabContent.innerHTML = `
    <div class="tab-pane fade show active" id="off-${uniqueId}" role="tabpanel">
      <div class="row text-center fw-bold mb-3">
        ${off.map((v, i) => `
          <div class="col">${i + 1}人/堂<br><div class="fw-normal">${v}</div></div>
        `).join('')}
      </div>
    </div>
    ${hasPeak ? `
    <div class="tab-pane fade" id="peak-${uniqueId}" role="tabpanel">
      <div class="row text-center fw-bold mb-3">
        ${peak.map((v, i) => `
          <div class="col">${i + 1}人/堂<br><div class="fw-normal">${v}</div></div>
        `).join('')}
      </div>
    </div>` : ''}
  `;

  const badgeContainer = card.querySelector('.mt-3');
  badgeContainer.innerHTML = `
    ${resorts.map(r => `<span class="badge rounded-pill bg-secondary me-1">${r}</span>`).join('')}
    <button class="btn btn-sm btn-outline-secondary">＋ 增加相同收費雪場</button>
  `;

  
}

document.getElementById('priceModal').addEventListener('show.bs.modal', function () {
  // isEditMode = false;
  if (isEditMode) {
    setResortSelectorMode(true);
  }else{
    setResortSelectorMode(false);
  }
  
  stage = 'half';
  document.getElementById('modalTitle').textContent = '半天/三小時收費設定';

  // 顯示半天按鈕，隱藏回上一頁與確認
  document.getElementById('nextBtn').classList.remove('d-none');
  document.getElementById('backBtn').classList.add('d-none');
  document.getElementById('confirmBtn').classList.add('d-none');

  // 生成預設價格欄位
  generatePriceInputs('priceInputs-off', 'off');
  generatePriceInputs('priceInputs-peak', 'peak');

  // 清空雪場選擇
  selectedResortsValue = [];
  selectedResortsText = '';
  document.getElementById('resortSelectDisplay').value = '';

  const allOptions = document.querySelectorAll('#resortSelectorModal .btn-check');
  allOptions.forEach(opt => (opt.checked = false));

  // 重設平/旺季 tab 顯示
  ['offSeason', 'peakSeason'].forEach(season => {
    const tab = document.getElementById(`${season}-tab`);
    const content = document.getElementById(`${season}Content`);
    const isOff = season === 'offSeason';
    tab?.classList.toggle('active', isOff);
    content?.classList.toggle('show', isOff);
    content?.classList.toggle('active', isOff);
  });

  initTabState(); // 初始化平旺季 tab 狀態

  // 清除暫存資料
  tempHalfData = null;
});

document.getElementById('priceModal').addEventListener('shown.bs.modal', function () {
  tempHalfData = null;
});

function initTabState() {
  const offTab = document.getElementById('offSeason-tab');
  const offContent = document.getElementById('offSeasonContent');
  const peakTab = document.getElementById('peakSeason-tab');
  const peakContent = document.getElementById('peakSeasonContent');

  [[offTab, offContent, true], [peakTab, peakContent, false]].forEach(([tab, content, isActive]) => {
    if (tab && content) {
      tab.classList.toggle('active', isActive);
      content.classList.toggle('show', isActive);
      content.classList.toggle('active', isActive);
      if (!isActive) {
        tab.classList.remove('active');
        content.classList.remove('show', 'active');
      }
    }
  });
}

function editCard(icon) {
  const card = icon.closest('.price-card');
  const peakTab = card.querySelector('[id^="peak-tab"]');
  const hasPeak = !!peakTab;

  const offValues = Array.from(card.querySelectorAll('[id^="off-"] .fw-normal')).map(el => el.textContent.trim());
  const peakValues = hasPeak
    ? Array.from(card.querySelectorAll('[id^="peak-"] .fw-normal')).map(el => el.textContent.trim())
    : [];

  const resortLabels = Array.from(card.querySelectorAll('.badge')).map(badge => badge.textContent.trim());

  tempHalfData = {
    off: offValues,
    peak: peakValues,
    resorts: resortLabels,
  };

  isEditMode = true;
  currentEditingCard = card;

  setResortSelectorMode(true); // ✅ 切換複選

  const option2 = document.getElementById('option2');
  option2.checked = hasPeak;
  option2.dispatchEvent(new Event('change'));

  const modal = new bootstrap.Modal(document.getElementById('priceModal'));
  modal.show();

  setTimeout(() => {
    offValues.forEach((val, i) => {
      const input = document.getElementById(`off${i + 1}`);
      if (input) input.value = val;
    });

    if (hasPeak) {
      peakValues.forEach((val, i) => {
        const input = document.getElementById(`peak${i + 1}`);
        if (input) input.value = val;
      });
    }

    const allResortInputs = document.querySelectorAll('#resortSelectorModal .btn-check');
    const valueList = Array.from(allResortInputs)
      .filter(btn => resortLabels.includes(btn.getAttribute('data-label')))
      .map(btn => btn.value);

    setSelectedResortsFromValue(valueList);
  }, 300);
  setResortSelectorMode(true)
}
// 專用：將雪場選項從單選切為複選
function setResortSelectorMode(isMultiSelect = false) {
  const container = document.getElementById('resortSelectorModal');
  const oldCheckboxes = container.querySelectorAll('.btn-check');

  oldCheckboxes.forEach(input => {
    const clone = input.cloneNode(true); // 移除舊事件
    clone.type = 'checkbox';
    clone.name = isMultiSelect ? '' : 'resort'; // 單選模式才需要 name

    // ✅ 加入正確的事件：複選 or 模擬單選
    clone.addEventListener('change', function () {
      if (!isMultiSelect && this.checked) {
        const all = container.querySelectorAll('.btn-check');
        all.forEach(other => {
          if (other !== this) other.checked = false;
        });
      }

      // ✅ 同步選擇資料
      const checked = Array.from(container.querySelectorAll('.btn-check:checked'));
      selectedResortsValue = checked.map(el => el.value);
      selectedResortsText = checked.map(el => el.getAttribute('data-label')).join(', ');
      document.getElementById('resortSelectDisplay').value = selectedResortsText;
    });

    input.parentNode.replaceChild(clone, input);
  });
}

function confirmResortSelection() {
  const checkedButtons = document.querySelectorAll('#resortSelectorModal .btn-check:checked');

  selectedResortsText = Array.from(checkedButtons)
    .map(btn => btn.getAttribute('data-label'))
    .join(', ');

  selectedResortsValue = Array.from(checkedButtons).map(btn => btn.value);

  // ✅ 顯示於輸入框
  document.getElementById('resortSelectDisplay').value = selectedResortsText.split(', ')[0] || '';

  // ✅ 關閉 modal
  const resortSelectorModal = bootstrap.Modal.getInstance(document.getElementById('resortSelectorModal'));
  resortSelectorModal.hide();
}