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

  // Problem Section
  setText('.problem-section .section-eyebrow', content.problem.eyebrow);
  setHTML('.problem-section .section-title', content.problem.title);

  // Populate problem points
  const problemPoints = document.querySelectorAll('.problem-point p');
  content.problem.points.forEach((point, index) => {
    if (problemPoints[index]) {
      problemPoints[index].textContent = point;
    }
  });

  // Vision Section (COMMENTED OUT - section removed)
  // setText('.vision-section .section-eyebrow', content.vision.eyebrow);
  // setHTML('.vision-statement', content.vision.statement);
  // setText('.vision-description', content.vision.description);

  // Video Section
  setText('.video-section .section-eyebrow', content.video.eyebrow);
  const videoElement = document.querySelector('.scroll-video');
  if (videoElement) {
    videoElement.src = content.video.videoUrl;
  }

  // Understood Section (COMMENTED OUT - section removed)
  // setHTML('.understood-statement', content.understood.statement);

  // Populate pillars
  // const pillars = document.querySelectorAll('.pillar');
  // content.understood.pillars.forEach((pillar, index) => {
  //   if (pillars[index]) {
  //     const numEl = pillars[index].querySelector('.pillar-num');
  //     const titleEl = pillars[index].querySelector('h3');
  //     const descEl = pillars[index].querySelector('p');
  //     if (numEl) numEl.textContent = pillar.number;
  //     if (titleEl) titleEl.textContent = pillar.title;
  //     if (descEl) descEl.textContent = pillar.description;
  //   }
  // });

  // Features Section
  setText('.features-section .section-eyebrow', content.features.eyebrow);
  setHTML('.features-section .section-title', content.features.title);

  // Populate features
  const featureCards = document.querySelectorAll('.feature-card');
  content.features.features.forEach((feature, index) => {
    if (featureCards[index]) {
      const numEl = featureCards[index].querySelector('.feature-num');
      const titleEl = featureCards[index].querySelector('h3');
      const descEl = featureCards[index].querySelector('p');
      if (numEl) numEl.textContent = feature.number;
      if (titleEl) titleEl.textContent = feature.title;
      if (descEl) descEl.textContent = feature.description;
    }
  });

  // Amara Section
  setText('.amara-section .section-eyebrow', content.amara.eyebrow);
  setHTML('.amara-section .section-title', content.amara.title);

  // Populate Amara cards
  const amaraCards = document.querySelectorAll('.amara-card');
  content.amara.cards.forEach((card, index) => {
    if (amaraCards[index]) {
      const numEl = amaraCards[index].querySelector('.card-num');
      const titleEl = amaraCards[index].querySelector('.card-title');
      const bodyEl = amaraCards[index].querySelector('.card-body');
      const asideEl = amaraCards[index].querySelector('.card-aside');
      if (numEl) numEl.innerHTML = card.number;
      if (titleEl) titleEl.textContent = card.title;
      if (bodyEl) bodyEl.innerHTML = card.body;
      if (asideEl) asideEl.textContent = card.aside;
    }
  });

  // The Build Section (Tech + Timeline Combined)
  setText('.build-section .section-eyebrow', 'The Build');
  setHTML('.build-section .section-title', 'How we\'ll <em>make it real</em>');

  // Populate tech stack
  const techLayers = document.querySelectorAll('.tech-layer');
  content.tech.stack.forEach((layer, index) => {
    if (techLayers[index]) {
      const titleEl = techLayers[index].querySelector('h4');
      const techEl = techLayers[index].querySelector('p');
      if (titleEl) titleEl.textContent = layer.layer;
      if (techEl) techEl.textContent = layer.technologies;
    }
  });

  // Populate timeline phases
  const timelinePhases = document.querySelectorAll('.timeline-phase');
  content.timeline.phases.forEach((phase, index) => {
    if (timelinePhases[index]) {
      const monthEl = timelinePhases[index].querySelector('.phase-month');
      const titleEl = timelinePhases[index].querySelector('h4');
      const descEl = timelinePhases[index].querySelector('p');
      if (monthEl) monthEl.textContent = phase.month;
      if (titleEl) titleEl.textContent = phase.phase;
      if (descEl) descEl.textContent = phase.description;
    }
  });

  // Pilot Section (COMMENTED OUT - section removed)
  // setText('.pilot-section .section-eyebrow', content.pilot.eyebrow);
  // setHTML('.pilot-section .section-title', content.pilot.title);

  // Populate pilot steps
  // const pilotSteps = document.querySelectorAll('.pilot-step');
  // content.pilot.steps.forEach((step, index) => {
  //   if (pilotSteps[index]) {
  //     const titleEl = pilotSteps[index].querySelector('h3');
  //     const descEl = pilotSteps[index].querySelector('p');
  //     if (titleEl) titleEl.textContent = step.title;
  //     if (descEl) descEl.textContent = step.description;
  //   }
  // });

  // Metrics Section (COMMENTED OUT - section removed)
  // setText('.metrics-section .section-eyebrow', content.metrics.eyebrow);
  // setHTML('.metrics-section .section-title', content.metrics.title);

  // Populate metrics
  // const metricCards = document.querySelectorAll('.metric-card');
  // content.metrics.metrics.forEach((metric, index) => {
  //   if (metricCards[index]) {
  //     const labelEl = metricCards[index].querySelector('.metric-label');
  //     const descEl = metricCards[index].querySelector('p');
  //     if (labelEl) labelEl.textContent = metric.label;
  //     if (descEl) descEl.textContent = metric.description;
  //   }
  // });
  // setText('.metrics-note', content.metrics.note);

  // Team Section
  setText('.team-section .section-eyebrow', content.team.eyebrow);
  setText('.team-section .section-title', content.team.title);

  // Populate team members
  const teamCards = document.querySelectorAll('.team-card');
  content.team.members.forEach((member, index) => {
    if (teamCards[index]) {
      const initialEl = teamCards[index].querySelector('.team-initial');
      const nameEl = teamCards[index].querySelector('.team-name');
      const roleEl = teamCards[index].querySelector('.team-role');
      if (initialEl) initialEl.textContent = member.initial;
      if (nameEl) nameEl.textContent = member.name;
      if (roleEl) roleEl.textContent = member.role;

      // Populate skills
      const skillsContainer = teamCards[index].querySelector('.team-skills');
      if (skillsContainer) {
        skillsContainer.innerHTML = member.skills
          .map(skill => `<span>${skill}</span>`)
          .join('');
      }
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

  // Initialize text split animations after content is loaded
  // Use requestAnimationFrame to ensure DOM has updated
  requestAnimationFrame(() => {
    // initUnderstoodAnimations removed - section deleted
    // if (window.initUnderstoodAnimations) {
    //   window.initUnderstoodAnimations();
    // }

    if (window.initClosingAnimations) {
      window.initClosingAnimations();
    }

    // Refresh ScrollTrigger after content loads and animations are set up
    // Add a small delay to ensure all content is rendered
    setTimeout(() => {
      if (window.ScrollTrigger) {
        console.log('Refreshing ScrollTrigger...');
        window.ScrollTrigger.refresh();
      }
    }, 100);
  });
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
