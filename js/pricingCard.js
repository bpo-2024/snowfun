
// 變數
let stage = 'half';
let tempHalfData = null;
let selectedResortsText = '';
let selectedResortsValue = [];
let isEditMode = false;
let currentEditingCard = null; 
let resortSelectorModalMode = ''; // 'append' 表示為增加相同雪場模式


// 雪場選擇
function openResortSelectorModal(editMode = false) {
  isEditMode = editMode;
  setResortSelectorMode(editMode);

  const modalEl = document.getElementById('resortSelectorModal');
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();

  console.log('🔔 打開雪場選擇 Modal, editMode:', editMode);
}

function setSelectedResortsFromValue(values) {
  selectedResortsValue = values;
  const allOptions = document.querySelectorAll('#resortSelectorModal .btn-check');
  allOptions.forEach(input => {
    input.checked = values.includes(input.value);
  });
  selectedResortsText = Array.from(allOptions).filter(input => input.checked).map(input => input.getAttribute('data-label')).join(', ');
  document.getElementById('resortSelectDisplay').value = selectedResortsText.split(', ')[0] || '';

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
    document.getElementById('resortSelectDisplay').value = selectedResortsText.split(', ')[0] || '';
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

  card.className = 'price-card rounded card mb-3';
  card.innerHTML = `
  <div class="price-box rounded p-3 position-relative">
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
      <div class="mt-3 badge-container">
      ${resorts.map(label => `<span class="badge bg-secondary me-1">${label}</span>`).join('')}
        <button class="btn btn-sm btn-outline-secondary btn-add-resort">＋ 增加相同收費雪場</button>

      </div>
      <div class="position-absolute top-0 end-0 mt-2 me-2">
        <span class="insurance insurance-followUp" onclick="editCard(this)">接續填寫</span>
        <i class="bi bi-trash text-danger" role="button" ></i>
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
  renderResortOptions();
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

  // ✅ 修正重點：取 tempHalfData.resorts（append 模式會更新它）
  const resorts = isEditMode && tempHalfData
    ? tempHalfData.resorts  // 👈 這裡保證使用使用者最後一次勾選
    : selectedResortsValue;

  if (currentEditingCard) {
    updateCardContent(currentEditingCard, offData, peakData, resorts);
    updateCardBadge(currentEditingCard, resorts);  // ✅ 新增：同步更新 badge
    currentEditingCard = null;
    isEditMode = false;
  } else if (tempHalfData) {
    createPricingCard('half', tempHalfData.off, tempHalfData.peak, tempHalfData.resorts);
    tempHalfData = null;
    createPricingCard('full', offData, peakData, resorts);
  } else {
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

}
document.getElementById('priceModal').addEventListener('show.bs.modal', function () {
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
  document.getElementById('resortSelectDisplay').value = selectedResortsText.split(', ')[0] || '';

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

  setResortSelectorMode(true); 

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
    const clone = input.cloneNode(true);
    clone.type = 'checkbox';
    clone.name = isMultiSelect ? '' : 'resort';

    clone.addEventListener('change', function () {
      if (!isMultiSelect && this.checked) {
        const all = container.querySelectorAll('.btn-check');
        all.forEach(other => {
          if (other !== this) other.checked = false;
        });
      }

      const checked = Array.from(container.querySelectorAll('.btn-check:checked'));
      selectedResortsValue = checked.map(el => el.value);
      selectedResortsText = checked.map(el => el.getAttribute('data-label')).join(', ');
      document.getElementById('resortSelectDisplay').value = selectedResortsText.split(', ')[0] || '';
    });

    input.parentNode.replaceChild(clone, input);
  });
}
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn-add-resort');
  if (!btn) return;

  const card = btn.closest('.price-card');
  if (!card) return;

  currentEditingCard = card; 
  isEditMode = true;
  resortSelectorModalMode = 'append';
  openResortSelectorModal(true);
});

function confirmResortSelection() {
  const checkedButtons = document.querySelectorAll('#resortSelectorModal .btn-check:checked');
  const newTexts = Array.from(checkedButtons).map(btn => btn.getAttribute('data-label'));
  const newValues = Array.from(checkedButtons).map(btn => btn.value);

  console.log('🔎 confirmResortSelection called', {
    mode: resortSelectorModalMode,
    card: currentEditingCard,
    newTexts,
    newValues
  });

  if (resortSelectorModalMode === 'append' && currentEditingCard) {
    const updatedLabels = newTexts; 
    selectedResortsValue = newValues;
    selectedResortsText = updatedLabels.join(', ');

    
  updateCardBadge(currentEditingCard, updatedLabels);

  if (isEditMode && tempHalfData) {
    tempHalfData.resorts = updatedLabels;
  }

  const resortDisplayInput = document.getElementById('resortSelectDisplay').value = selectedResortsText.split(', ')[0] || '';
  if (resortDisplayInput) resortDisplayInput.value = updatedLabels[0] || '';

  bootstrap.Modal.getInstance(document.getElementById('resortSelectorModal')).hide();
  resortSelectorModalMode = '';
  return;
  }
 

  selectedResortsText = newTexts.join(', ');
  selectedResortsValue = newValues;
  document.getElementById('resortSelectDisplay').value = selectedResortsText.split(', ')[0] || '';


  bootstrap.Modal.getInstance(document.getElementById('resortSelectorModal')).hide();
  document.getElementById('resortSelectorModal').addEventListener('hidden.bs.modal', function () {
    resortSelectorModalMode = '';
  });
}
function updateCardBadge(card, resortLabels) {
  const badgeContainer = card.querySelector('.badge-container');
  badgeContainer.innerHTML = `
    ${resortLabels.map(text => `<span class="badge bg-secondary me-1">${text}</span>`).join('')}
    <button class="btn btn-sm btn-outline-secondary btn-add-resort">＋ 增加相同收費雪場</button>
  `;
  badgeContainer.querySelector('.btn-add-resort')?.addEventListener('click', function () {
    currentEditingCard = badgeContainer.closest('.price-card');
    isEditMode = true;
    resortSelectorModalMode = 'append';
    openResortSelectorModal(true);
  });
}

// ---------------------- 雪場資料 ----------------------
const resortData = [
  {
    region: "北海道",
    resorts: [
      { id: "resort1", label: "Sahoro" },
      { id: "resort2", label: "Moiwa" },
      { id: "resort3", label: "Annupur" },
      { id: "resort4", label: "Grand HIRAFU" },
      { id: "resort5", label: "札幌手稻" },
      { id: "resort6", label: "札幌國際" },
      { id: "resort7", label: "喜樂樂" },
      { id: "resort8", label: "富良野" }
    ]
  },
  {
    region: "東北",
    resorts: [
      { id: "resort101", label: "Moiwa" },
      { id: "resort102", label: "Sahoro" },
      { id: "resort103", label: "藏王溫泉滑雪場" }
    ]
  }
];

function renderResortOptions() {
  const container = document.getElementById("resortOptionsContainer");
  container.innerHTML = "";

  resortData.forEach(group => {
    const titleWrapper = document.createElement("div");
    titleWrapper.className = "selectPlaceLine-box";

    const titleDiv = document.createElement("div");
    titleDiv.innerText = group.region;

    const selectLineDiv = document.createElement("div");
    selectLineDiv.className = "selectPlaceLine";
    titleDiv.appendChild(selectLineDiv);

    titleWrapper.appendChild(titleDiv);

    const btnGroup = document.createElement("div");
    btnGroup.className = "mb-3 d-flex flex-wrap gap-2";

    group.resorts.forEach(resort => {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "btn-check";
      input.id = resort.id;
      input.value = `${group.region}-${resort.label}`;
      input.setAttribute("autocomplete", "off");
      input.setAttribute("data-label", resort.label);

      const label = document.createElement("label");
      label.className = "btn btn-outline-secondary";
      label.htmlFor = resort.id;
      label.innerText = resort.label;

      btnGroup.appendChild(input);
      btnGroup.appendChild(label);
    });

    container.appendChild(titleWrapper);
    container.appendChild(btnGroup);
  });
}

