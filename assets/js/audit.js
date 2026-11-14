/**
 * HICHAM EDD — BRAND & MARKETING AUDIT ENGINE
 * International English Version (en.hichamedd.com)
 */

(function () {
  'use strict';

  const WHATSAPP_PHONE = "212653342503";

  let auditStep = 0;
  let auditTotalScore = 0;
  let auditAnswersRecord = [];
  let founderNameVal = "";
  let companyNameVal = "";

  function getLang() {
    return 'en';
  }

  window.updateAuditStrings = function (lang) {
    if (!lang) lang = getLang();

    const titleH = document.getElementById('audit-title-header');
    const stepLbl = document.getElementById('audit-step-label');
    const modalTitle = document.getElementById('modal-lead-title');
    const modalDesc = document.getElementById('modal-lead-desc');
    const lblName = document.getElementById('modal-lbl-name');
    const lblComp = document.getElementById('modal-lbl-company');
    const inpName = document.getElementById('audit-founder-name');
    const inpComp = document.getElementById('audit-company-name');
    const errCapture = document.getElementById('audit-capture-error');
    const btnSubmit = document.getElementById('modal-btn-submit');
    const certTitleTop = document.getElementById('cert-title-top');
    const certYearTag = document.getElementById('cert-year-tag');
    const certHeadingMain = document.getElementById('cert-heading-main');
    const certAwardedLbl = document.getElementById('cert-awarded-to-label');
    const certFounderPre = document.getElementById('cert-founder-prefix');
    const certScoreLbl = document.getElementById('cert-score-label');
    const waCardTag = document.getElementById('wa-card-tag');
    const waCardTitle = document.getElementById('wa-card-title');
    const waCardDesc = document.getElementById('wa-card-desc');
    const waCardBtn = document.getElementById('wa-card-btn-text');
    const btnRestart = document.getElementById('audit-btn-restart');
    const btnDl = document.getElementById('audit-btn-download-cert');
    const screenshotTip = document.getElementById('audit-screenshot-tip');

    if (titleH) titleH.innerText = "Brand Identity & Creative Marketing Audit";
    if (stepLbl) stepLbl.innerText = "Criterion #";
    if (modalTitle) modalTitle.innerText = "Audit Completed Successfully!";
    if (modalDesc) modalDesc.innerText = "Enter your full name and company or brand name to generate your Brand Audit Certificate and prepare your report for WhatsApp:";
    if (lblName) lblName.innerText = "1. Your Full Name: *";
    if (lblComp) lblComp.innerText = "2. Company or Brand Name: *";
    if (inpName) inpName.placeholder = "e.g., Alex Morgan";
    if (inpComp) inpComp.placeholder = "e.g., Nova Labs";
    if (errCapture) errCapture.innerText = "⚠️ Please enter both your name and your company or brand name!";
    if (btnSubmit) btnSubmit.innerText = "Generate Certificate & View Report 🚀";
    if (certTitleTop) certTitleTop.innerText = "Brand Audit & Diagnostic Certificate";
    if (certYearTag) certYearTag.innerText = "VISUAL AUDIT REPORT 2026";
    if (certHeadingMain) certHeadingMain.innerText = "Brand Evaluation Certificate";
    if (certAwardedLbl) certAwardedLbl.innerText = "This official evaluation certificate is awarded to:";
    if (certFounderPre) certFounderPre.innerText = "Directed by:";
    if (certScoreLbl) certScoreLbl.innerText = "Brand Readiness & Consistency Score:";
    if (waCardTag) waCardTag.innerText = "🚀 Next Step — Fix Gaps & Scale:";
    if (waCardTitle) waCardTitle.innerText = "Send Full Report & Review Gaps on WhatsApp";
    if (waCardDesc) waCardDesc.innerText = "Click below to send your 12-point diagnostic report to Hicham on WhatsApp. You'll receive tailored feedback and a custom quote to book a dedicated creative sprint (official invoice & NDA available).";
    if (waCardBtn) waCardBtn.innerText = "Send My Report to Hicham on WhatsApp 📲";
    if (btnRestart) btnRestart.innerText = "🔄 Audit Another Brand";
    if (btnDl) btnDl.innerHTML = "<span>📥</span> <span>Download Certificate (Image)</span>";
    if (screenshotTip) screenshotTip.innerText = "📸 Tip: Download your certificate or take a screenshot to save it for your team!";
  };

  window.initAudit = function () {
    const questionsView = document.getElementById('audit-questions-view');
    if (!questionsView) return;

    auditStep = 0;
    auditTotalScore = 0;
    auditAnswersRecord = [];
    window.updateAuditStrings();
    window.loadAuditQuestion();
  };

  window.loadAuditQuestion = function () {
    if (!window.AUDIT_QUESTIONS || !window.AUDIT_QUESTIONS.length) return;
    const lang = getLang();

    if (auditStep >= window.AUDIT_QUESTIONS.length) {
      const modal = document.getElementById('audit-lead-modal');
      if (modal) modal.classList.remove('hidden');
      return;
    }

    const q = window.AUDIT_QUESTIONS[auditStep];
    const stepNumEl = document.getElementById('audit-step-num');
    const stepIndEl = document.getElementById('audit-step-indicator');
    const catBadge = document.getElementById('audit-cat-badge');
    const iconDisp = document.getElementById('audit-icon-display');
    const qText = document.getElementById('audit-question-text');
    const pBar = document.getElementById('audit-progress-bar');
    const container = document.getElementById('audit-options-container');

    if (stepNumEl) stepNumEl.innerText = auditStep + 1;
    if (stepIndEl) stepIndEl.innerText = (auditStep + 1) + " / 12";
    if (catBadge) catBadge.innerText = q.cat[lang] || q.cat.en || q.cat.fr || q.cat.darija;
    if (iconDisp) iconDisp.innerText = q.icon;
    if (qText) qText.innerText = q.q[lang] || q.q.en || q.q.fr || q.q.darija;

    const pct = Math.round(((auditStep + 1) / window.AUDIT_QUESTIONS.length) * 100);
    if (pBar) pBar.style.width = pct + "%";

    const letters = ['A', 'B', 'C'];

    if (container) {
      container.innerHTML = q.options.map((opt, i) => {
        const text = opt.text[lang] || opt.text.en || opt.text.fr || opt.text.darija;
        const label = opt.label[lang] || opt.label.en || opt.label.fr || opt.label.darija;
        return `
          <div 
            onclick="selectAuditOption(${i}, ${opt.score}, '${label.replace(/'/g, "\\'")}')" 
            id="audit-opt-${i}"
            class="audit-option-card p-4 sm:p-5 rounded-2xl flex items-start gap-4 select-none cursor-pointer transition-all border border-brand-border/60 hover:border-brand-gold bg-brand-card/80 hover:bg-[#1C180E]"
          >
            <span class="w-8 h-8 rounded-xl bg-black/60 border border-brand-border flex items-center justify-center font-mono font-bold text-brand-gold text-xs shrink-0 mt-0.5">
              ${letters[i]}
            </span>
            <div class="flex-grow">
              <p class="text-xs sm:text-sm text-gray-200 leading-relaxed">${text}</p>
            </div>
          </div>
        `;
      }).join('');
    }
  };

  window.selectAuditOption = function (idx, score, label) {
    const card = document.getElementById(`audit-opt-${idx}`);
    if (card) {
      card.classList.add('selected');
      card.style.borderColor = 'var(--color-gold)';
      card.style.background = 'linear-gradient(135deg, #2A210A 0%, #3D2F0E 100%)';
    }

    auditTotalScore += score;
    const lang = getLang();
    const q = window.AUDIT_QUESTIONS[auditStep];

    auditAnswersRecord.push({
      questionNum: auditStep + 1,
      category: q.cat[lang] || q.cat.en || q.cat.fr || q.cat.darija,
      label: label,
      score: score
    });

    setTimeout(() => {
      auditStep++;
      window.loadAuditQuestion();
    }, 280);
  };

  window.submitAuditLead = function () {
    const lang = getLang();
    const fInput = document.getElementById('audit-founder-name');
    const cInput = document.getElementById('audit-company-name');
    const err = document.getElementById('audit-capture-error');

    const fVal = fInput ? fInput.value.trim() : "";
    const cVal = cInput ? cInput.value.trim() : "";

    if (!fVal || !cVal) {
      if (err) err.classList.remove('hidden');
      if (!fVal && fInput) fInput.focus();
      else if (cInput) cInput.focus();
      return;
    }

    if (err) err.classList.add('hidden');
    founderNameVal = fVal;
    companyNameVal = cVal;

    const modal = document.getElementById('audit-lead-modal');
    const qView = document.getElementById('audit-questions-view');
    const rView = document.getElementById('audit-report-view');

    if (modal) modal.classList.add('hidden');
    if (qView) qView.classList.add('hidden');
    if (rView) rView.classList.remove('hidden');

    window.updateAuditStrings(lang);

    const pctScore = Math.round((auditTotalScore / 120) * 100);

    const fDisp = document.getElementById('cert-founder-display');
    const cDisp = document.getElementById('cert-company-display');
    const pDisp = document.getElementById('cert-pct-display');
    const bDisp = document.getElementById('cert-badge-display');
    const aText = document.getElementById('cert-analysis-text');
    const dDisp = document.getElementById('cert-date-display');
    const waBtn = document.getElementById('audit-send-report-wa-btn');

    if (fDisp) fDisp.innerText = fVal;
    if (cDisp) cDisp.innerText = cVal;
    if (pDisp) pDisp.innerText = pctScore + "%";

    let rankLabel = "";
    if (pctScore < 50) {
      rankLabel = "Critical Stage 🚨 (High Conversion Leakage)";
      if (bDisp) {
        bDisp.className = "text-xs font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30";
        bDisp.innerText = rankLabel;
      }
      if (aText) {
        aText.innerHTML = `This audit reveals that <strong class="text-brand-gold">${cVal}</strong> currently faces <strong class="text-red-400">critical visual and structural gaps</strong> (missing editable source files, inconsistent ad creatives, or weak mobile hierarchy). These bottlenecks directly cost conversions to competitors. A focused brand refresh sprint is strongly recommended.`;
      }
    } else if (pctScore <= 80) {
      rankLabel = "Developing Level ⚠️ (Room to Reach 100%)";
      if (bDisp) {
        bDisp.className = "text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30";
        bDisp.innerText = rankLabel;
      }
      if (aText) {
        aText.innerHTML = `<strong class="text-brand-gold">${cVal}</strong> has a solid foundation, but shows <strong class="text-amber-400">performance leakage across ad impact, typographic consistency, and packaging polish</strong>. Closing these gaps will noticeably lift campaign ROI. Reach out to schedule a targeted optimization sprint.`;
      }
    } else {
      rankLabel = "Strong & Market-Ready Brand 🏆 (Excellence)";
      if (bDisp) {
        bDisp.className = "text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
        bDisp.innerText = rankLabel;
      }
      if (aText) {
        aText.innerHTML = `Congratulations! <strong class="text-brand-gold">${cVal}</strong> demonstrates <strong class="text-emerald-400">strong visual governance and high marketing readiness</strong> that build instant trust and support premium positioning. Let's collaborate to sustain this standard as you scale.`;
      }
    }

    const today = new Date();
    if (dDisp) {
      dDisp.innerText = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    let detailedAnswersText = auditAnswersRecord.map(rec =>
      `▫️ *[${rec.category}]*: ${rec.label} (${rec.score} pts)`
    ).join('\n');

    const fullWhatsAppReport = `Hi Hicham! I'm ${fVal} from ${cVal} 👋
I just completed the 12-Point Brand Audit on your website and here is my report:

📊 *Official Score*: ${pctScore}% (${rankLabel})

📋 *12-Criterion Breakdown*:
${detailedAnswersText}

I'd love to review these gaps with you and request a custom quote for a dedicated creative sprint.`;

    if (waBtn) {
      waBtn.href = "https://wa.me/" + WHATSAPP_PHONE + "?text=" + encodeURIComponent(fullWhatsAppReport);
    }
  };

  window.restartAudit = function () {
    auditStep = 0;
    auditTotalScore = 0;
    auditAnswersRecord = [];
    const rView = document.getElementById('audit-report-view');
    const qView = document.getElementById('audit-questions-view');
    if (rView) rView.classList.add('hidden');
    if (qView) qView.classList.remove('hidden');
    window.updateAuditStrings();
    window.loadAuditQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('languageChanged', () => {
    window.updateAuditStrings('en');
    const qView = document.getElementById('audit-questions-view');
    const rView = document.getElementById('audit-report-view');
    if (qView && !qView.classList.contains('hidden')) {
      window.loadAuditQuestion();
    } else if (rView && !rView.classList.contains('hidden') && founderNameVal && companyNameVal) {
      window.submitAuditLead();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    window.initAudit();
  });

})();