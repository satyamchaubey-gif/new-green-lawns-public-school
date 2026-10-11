/**
 * Admission Enquiry & Fast Inquiry Manager
 * Handles multi-step admissions wizard, quick enquiry form,
 * application reference generation, prospectus requests, and feedback toasts.
 */

class EnquiryManager {
  constructor() {
    this.currentStep = 1;
    this.formData = {
      studentName: '',
      studentDob: '',
      gender: '',
      grade: 'Nursery',
      stream: 'Science',
      parentName: '',
      email: '',
      phone: '',
      city: 'Noida',
      visitDate: '',
      visitSlot: 'Morning (10:00 AM - 12:00 PM)',
      transportNeeded: 'Yes'
    };

    this.initEventListeners();
  }

  initEventListeners() {
    // Open Modal Triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-enquiry]');
      if (trigger) {
        e.preventDefault();
        const prefilledGrade = trigger.getAttribute('data-grade');
        if (prefilledGrade) {
          this.formData.grade = prefilledGrade;
        }
        this.openModal();
      }

      // Close Modal Triggers
      const closeBtn = e.target.closest('[data-close-enquiry]');
      if (closeBtn) {
        e.preventDefault();
        this.closeModal();
      }

      // Quick Prospectus Download
      const prospectusBtn = e.target.closest('[data-download-prospectus]');
      if (prospectusBtn) {
        e.preventDefault();
        this.downloadProspectusMock();
      }
    });

    // Handle Quick Enquiry Form submission in "Join Our Legacy" banner
    document.addEventListener('submit', (e) => {
      if (e.target && e.target.id === 'quick-enquiry-form') {
        e.preventDefault();
        this.handleQuickEnquirySubmit(e.target);
      }

      if (e.target && e.target.id === 'modal-enquiry-form') {
        e.preventDefault();
        this.handleStepNext();
      }

      if (e.target && e.target.id === 'full-admission-form') {
        e.preventDefault();
        this.handleFullAdmissionSubmit(e.target);
      }
    });

    // Close on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        const facilityModal = document.getElementById('facility-modal');
        if (facilityModal) facilityModal.classList.remove('is-open');
        const searchModal = document.getElementById('search-modal');
        if (searchModal) searchModal.classList.remove('is-open');
      }
    });
  }

  openModal() {
    const modal = document.getElementById('enquiry-modal');
    if (!modal) return;
    this.currentStep = 1;
    this.updateStepUI();
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.getElementById('enquiry-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  setStep(step) {
    this.currentStep = step;
    this.updateStepUI();
  }

  updateStepUI() {
    // Update step numbers indicator
    for (let i = 1; i <= 3; i++) {
      const stepDot = document.getElementById(`step-dot-${i}`);
      const stepPane = document.getElementById(`enquiry-step-pane-${i}`);
      if (stepDot) {
        if (i === this.currentStep) {
          stepDot.className = 'enquiry-step-pill active';
        } else if (i < this.currentStep) {
          stepDot.className = 'enquiry-step-pill completed';
        } else {
          stepDot.className = 'enquiry-step-pill';
        }
      }
      if (stepPane) {
        stepPane.style.display = (i === this.currentStep) ? 'block' : 'none';
      }
    }

    const successPane = document.getElementById('enquiry-success-pane');
    if (successPane) {
      successPane.style.display = (this.currentStep === 4) ? 'block' : 'none';
    }
  }

  handleStepNext() {
    if (this.currentStep === 1) {
      // Validate Step 1
      const sName = document.getElementById('enq-student-name');
      const sGrade = document.getElementById('enq-grade');
      if (!sName || !sName.value.trim()) {
        this.showToast('Please enter the student\'s full name', 'warning');
        if (sName) sName.focus();
        return;
      }
      this.formData.studentName = sName.value.trim();
      this.formData.grade = sGrade ? sGrade.value : 'Nursery';
      this.currentStep = 2;
      this.updateStepUI();
    } else if (this.currentStep === 2) {
      // Validate Step 2
      const pName = document.getElementById('enq-parent-name');
      const email = document.getElementById('enq-email');
      const phone = document.getElementById('enq-phone');

      if (!pName || !pName.value.trim()) {
        this.showToast('Please enter parent/guardian name', 'warning');
        if (pName) pName.focus();
        return;
      }
      if (!phone || !phone.value.match(/^[0-9+ -]{8,15}$/)) {
        this.showToast('Please enter a valid 10-digit phone number', 'warning');
        if (phone) phone.focus();
        return;
      }
      if (!email || !email.value.includes('@')) {
        this.showToast('Please enter a valid email address', 'warning');
        if (email) email.focus();
        return;
      }

      this.formData.parentName = pName.value.trim();
      this.formData.phone = phone.value.trim();
      this.formData.email = email.value.trim();
      this.currentStep = 3;
      this.updateStepUI();
    } else if (this.currentStep === 3) {
      // Complete submission
      const date = document.getElementById('enq-visit-date');
      const slot = document.getElementById('enq-visit-slot');
      if (date && date.value) this.formData.visitDate = date.value;
      if (slot && slot.value) this.formData.visitSlot = slot.value;

      this.submitEnquiry();
    }
  }

  submitEnquiry() {
    const refId = `NGLPS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Fill success pane
    const refElem = document.getElementById('enquiry-generated-ref');
    const nameElem = document.getElementById('enquiry-summary-name');
    const gradeElem = document.getElementById('enquiry-summary-grade');
    const phoneElem = document.getElementById('enquiry-summary-phone');

    if (refElem) refElem.textContent = refId;
    if (nameElem) nameElem.textContent = this.formData.studentName;
    if (gradeElem) gradeElem.textContent = this.formData.grade;
    if (phoneElem) phoneElem.textContent = this.formData.phone;

    this.currentStep = 4;
    this.updateStepUI();

    this.showToast(`Enquiry Submitted Successfully! Reference: ${refId}`, 'success');
  }

  handleQuickEnquirySubmit(form) {
    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const gradeInput = form.querySelector('[name="grade"]');

    if (!nameInput.value.trim()) {
      this.showToast('Please enter your full name', 'warning');
      nameInput.focus();
      return;
    }
    if (!phoneInput.value.match(/^[0-9+ -]{8,15}$/)) {
      this.showToast('Please enter a valid phone number', 'warning');
      phoneInput.focus();
      return;
    }

    const refId = `NGLPS-${Math.floor(10000 + Math.random() * 90000)}`;
    this.showToast(`Thank you ${nameInput.value}! Your enquiry (#${refId}) has been received. Our Admissions Counsellor will contact you within 24 hours.`, 'success');

    form.reset();
  }

  handleFullAdmissionSubmit(form) {
    const refId = `ADM-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const studentName = form.querySelector('[name="student_name"]')?.value || 'Applicant';

    this.showToast(`Application #${refId} for ${studentName} successfully registered! Download confirmation below.`, 'success');

    const resultBox = document.getElementById('application-success-box');
    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.scrollIntoView({ behavior: 'smooth' });
      const refBox = document.getElementById('app-generated-number');
      if (refBox) refBox.textContent = refId;
    }
  }

  downloadProspectusMock() {
    this.showToast('Generating official 2026-2027 School Prospectus PDF...', 'info');
    setTimeout(() => {
      // Create mock downloadable prospectus text file blob
      const content = `=====================================================
NEW GREEN LAWNS PUBLIC SCHOOL (ESTD. 1994)
Affiliated to CBSE, New Delhi | Affiliation No: 2130849
Sector 62, Institutional Area, Noida - 201301 (U.P.)
Contact: +91 120 4000 000 | info@newgreenlawns.edu.in
=====================================================

OFFICIAL INFORMATION PROSPECTUS 2026-2027
"Where Every Child's Potential Takes Flight"

1. PHILOSOPHY & VISION
New Green Lawns Public School is dedicated to nurturing
curious, confident, and compassionate global leaders through
an integrated CBSE curriculum, world-class sports academies,
and hands-on STEM & Robotics innovation.

2. ACADEMIC HIGHLIGHTS
- 100% CBSE Board Examination Success Rate
- 85+ Digitally Enabled Air-Conditioned Classrooms
- Student to Teacher Ratio: 18:1
- 40+ National Olympiad Medals in 2025-2026

3. ADMISSIONS TIMELINE (SESSION 2026-2027)
- Registration Starts: October 2025
- Campus Walkthroughs: Tuesday & Saturday
- Interactive Orientation: 1st & 3rd Weekend of Every Month
- Academic Session Commences: April 2026

For personalised campus visits or queries, please contact
Admissions Office at +91 120 4000 000.
=====================================================`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'New_Green_Lawns_Public_School_Prospectus_2026-27.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.showToast('Prospectus downloaded successfully!', 'success');
    }, 600);
  }

  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    const icon = type === 'success' ? '✓' : (type === 'warning' ? '⚠' : 'ℹ');
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
}

window.EnquiryManager = EnquiryManager;
