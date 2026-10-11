/**
 * Interactive School Fee Calculator for Session 2026-2027
 * Calculates itemized annual and quarterly fees with optional transport,
 * meal programs, and sibling concessions.
 */

function initFeeCalculator() {
  const gradeSelect = document.getElementById('calc-grade');
  const transportSelect = document.getElementById('calc-transport');
  const siblingSelect = document.getElementById('calc-sibling');
  const mealCheckbox = document.getElementById('calc-meal');

  if (!gradeSelect) return;

  const feeTable = {
    'prenursery': { name: 'Pre-Nursery / Nursery / KG', tuition: 64000, activity: 12000, lab: 0, admission: 25000, caution: 10000 },
    'primary': { name: 'Primary Wing (Classes I - V)', tuition: 76000, activity: 14000, lab: 4000, admission: 25000, caution: 10000 },
    'middle': { name: 'Middle Wing (Classes VI - VIII)', tuition: 84000, activity: 15000, lab: 8000, admission: 25000, caution: 10000 },
    'secondary': { name: 'Secondary Wing (Classes IX - X)', tuition: 94000, activity: 16000, lab: 12000, admission: 25000, caution: 10000 },
    'senior-sci': { name: 'Senior Sec. Science (XI - XII)', tuition: 108000, activity: 18000, lab: 22000, admission: 25000, caution: 10000 },
    'senior-com': { name: 'Senior Sec. Commerce & Arts (XI - XII)', tuition: 98000, activity: 18000, lab: 8000, admission: 25000, caution: 10000 }
  };

  const transportRates = {
    'none': 0,
    'zone1': 22000, // 0 - 5 km
    'zone2': 28000, // 5 - 10 km
    'zone3': 34000  // 10+ km (Greater Noida / East Delhi)
  };

  function update() {
    const gradeKey = gradeSelect.value || 'primary';
    const base = feeTable[gradeKey] || feeTable.primary;
    const transportKey = transportSelect ? transportSelect.value : 'none';
    const transportFee = transportRates[transportKey] || 0;
    const siblingDiscountRatio = siblingSelect ? parseFloat(siblingSelect.value) : 0;
    const mealFee = (mealCheckbox && mealCheckbox.checked) ? 18000 : 0;

    // Calculation
    const tuitionDiscount = Math.round(base.tuition * siblingDiscountRatio);
    const netTuition = base.tuition - tuitionDiscount;
    const annualTotal = base.admission + base.caution + netTuition + base.activity + base.lab + transportFee + mealFee;
    const quarterlyRecurring = Math.round((netTuition + base.activity + base.lab + transportFee + mealFee) / 4);

    // Update UI elements
    const setElem = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setElem('fee-tuition', `₹${base.tuition.toLocaleString('en-IN')}`);
    setElem('fee-activity', `₹${base.activity.toLocaleString('en-IN')}`);
    setElem('fee-lab', `₹${base.lab.toLocaleString('en-IN')}`);
    setElem('fee-admission', `₹${base.admission.toLocaleString('en-IN')}`);
    setElem('fee-caution', `₹${base.caution.toLocaleString('en-IN')} (Refundable)`);
    setElem('fee-transport', transportFee > 0 ? `₹${transportFee.toLocaleString('en-IN')}` : 'Not Opted');
    setElem('fee-meal', mealFee > 0 ? `₹${mealFee.toLocaleString('en-IN')}` : 'Not Opted');
    
    if (tuitionDiscount > 0) {
      setElem('fee-concession-row', `Visible`);
      const row = document.getElementById('fee-concession-item');
      if (row) row.style.display = 'flex';
      setElem('fee-concession', `- ₹${tuitionDiscount.toLocaleString('en-IN')}`);
    } else {
      const row = document.getElementById('fee-concession-item');
      if (row) row.style.display = 'none';
    }

    setElem('fee-annual-total', `₹${annualTotal.toLocaleString('en-IN')}`);
    setElem('fee-quarterly-total', `₹${quarterlyRecurring.toLocaleString('en-IN')}`);
  }

  gradeSelect.addEventListener('change', update);
  if (transportSelect) transportSelect.addEventListener('change', update);
  if (siblingSelect) siblingSelect.addEventListener('change', update);
  if (mealCheckbox) mealCheckbox.addEventListener('change', update);

  update();
}

window.initFeeCalculator = initFeeCalculator;
