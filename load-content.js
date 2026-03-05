// ══════════════════════════════════════════════
// CONTENT LOADER
// Loads content from content.json into the HTML
// ══════════════════════════════════════════════

async function loadContent() {
  try {
    const response = await fetch('content.json');
    const content = await response.json();

    populateContent(content);
    console.log('✅ Content loaded from content.json');
  } catch (error) {
    console.error('❌ Error loading content:', error);
  }
}

function populateContent(content) {
  // Meta
  document.title = content.meta.title;

  // Hero Section
  setText('.hero-eyebrow', content.hero.eyebrow);
  setText('.hero-title-line:nth-child(1)', content.hero.title.line1);
  setText('.hero-title-line:nth-child(2)', content.hero.title.line2);
  setText('.hero-subtitle', content.hero.subtitle);

  // Understood Section
  setHTML('.understood-statement', content.understood.statement);

  // Populate pillars
  const pillars = document.querySelectorAll('.pillar');
  content.understood.pillars.forEach((pillar, index) => {
    if (pillars[index]) {
      setText(pillars[index].querySelector('.pillar-num'), pillar.number);
      setText(pillars[index].querySelector('h3'), pillar.title);
      setText(pillars[index].querySelector('p'), pillar.description);
    }
  });

  // Amara Section
  setText('.amara-section .section-eyebrow', content.amara.eyebrow);
  setHTML('.amara-section .section-title', content.amara.title);

  // Populate Amara cards
  const amaraCards = document.querySelectorAll('.amara-card');
  content.amara.cards.forEach((card, index) => {
    if (amaraCards[index]) {
      setHTML(amaraCards[index].querySelector('.card-num'), card.number);
      setText(amaraCards[index].querySelector('.card-title'), card.title);
      setHTML(amaraCards[index].querySelector('.card-body'), card.body);
      setText(amaraCards[index].querySelector('.card-aside'), card.aside);
    }
  });

  // Team Section
  setText('.team-section .section-eyebrow', content.team.eyebrow);
  setText('.team-section .section-title', content.team.title);

  // Populate team members
  const teamCards = document.querySelectorAll('.team-card');
  content.team.members.forEach((member, index) => {
    if (teamCards[index]) {
      setText(teamCards[index].querySelector('.team-initial'), member.initial);
      setText(teamCards[index].querySelector('.team-name'), member.name);
      setText(teamCards[index].querySelector('.team-role'), member.role);

      // Populate skills
      const skillsContainer = teamCards[index].querySelector('.team-skills');
      skillsContainer.innerHTML = member.skills
        .map(skill => `<span>${skill}</span>`)
        .join('');
    }
  });

  // Investment Section
  setText('.investment-section .section-eyebrow', content.investment.eyebrow);
  setText('.investment-section .section-title', content.investment.title);

  // Populate investment phases
  const investmentBreakdown = document.querySelector('.investment-breakdown');
  investmentBreakdown.innerHTML = content.investment.phases
    .map(phase => `
      <div class="investment-row ${phase.isRetainer ? 'investment-retainer' : ''}">
        <span class="invest-phase">${phase.name}</span>
        <span class="invest-when">${phase.timeline}</span>
        <span class="invest-amount">${phase.amount}</span>
      </div>
    `)
    .join('');

  setText('.invest-total-label', content.investment.total.label);
  setText('.invest-total-amount', content.investment.total.amount);
  setText('.invest-note', content.investment.note);

  // Closing Section
  setText('.closing-line', content.closing.line);
  setText('.closing-sub', content.closing.subtitle);
  setText('.closing-team', content.closing.team);
}

// Helper functions
function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = text;
  }
}

function setHTML(selector, html) {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = html;
  }
}

// Load content when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadContent);
} else {
  loadContent();
}
