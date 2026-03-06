gsap.registerPlugin(ScrollTrigger);

// Expose ScrollTrigger globally for use in other scripts
window.ScrollTrigger = ScrollTrigger;

// ══════════════════════════════════════════════
// INTRO: Rotating Logo + Hero Text Grow Together
// ══════════════════════════════════════════════

const heroSection = document.querySelector(".hero-section");
const introOverlay = document.querySelector(".intro-overlay");
const introBlackBg = document.querySelector(".intro-black-bg");
const rotatingLogo = document.querySelector(".rotating-logo");
const rotatingLogo2 = document.querySelector(".rotating-logo-2");
const heroEyebrow = document.querySelector(".hero-eyebrow");
const heroTitleLine1 = document.querySelector(".hero-title-line:nth-child(1)");
const heroTitleLine2 = document.querySelector(".hero-title-line:nth-child(2)");
const heroSubtitle = document.querySelector(".hero-subtitle");

// Continuous rotation animation
gsap.to(rotatingLogo, {
  rotation: 360,
  duration: 8,
  ease: "linear",
  repeat: -1,
});

// Continuous rotation animation
gsap.to(rotatingLogo2, {
  rotation: 360,
  duration: 8,
  ease: "linear",
  repeat: -1,
});

// Set initial state for hero text and intro elements
gsap.set([heroEyebrow, heroTitleLine1], { scale: 0.067 });
gsap.set([heroTitleLine2, heroSubtitle], { scale: 0, opacity: 0 });
gsap.set(introBlackBg, { scale: 20 });

// Pin hero section and animate intro reveal (reverse of outro)
gsap
  .timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: "+=150%",
      scrub: 1,
      pin: true,
      pinSpacing: true,
    },
  })
  // Grow logo, shrink black circle, grow text - all simultaneously (reverse of outro)
  .to(rotatingLogo, {
    scale: 15,
    duration: 1,
    ease: "power2.in",
  })
  .to(
    introBlackBg,
    {
      scale: 1.5,
      duration: 1,
      ease: "power2.in",
    },
    "<"
  )
  .to(
    [heroEyebrow, heroTitleLine1],
    {
      scale: 1,
      duration: 1,
      ease: "power2.in",
    },
    "<"
  )
  // Fade out intro overlay completely
  .to(
    introOverlay,
    {
      opacity: 0,
      duration: 0.3,
    },
    "-=0.2"
  )
  .set(introOverlay, { display: "none" })
  // Sequentially grow "of the future" line
  .to(
    heroTitleLine2,
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    },
    "-=0.1"
  )
  // Subtitle starts growing while "of the future" is still growing
  .to(heroSubtitle, {
    scale: 1,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out",
  }, "-=0.3");

// ══════════════════════════════════════════════
// HERO SECTION: Animations handled in intro timeline
// ══════════════════════════════════════════════

// Hero animations are now part of the intro timeline above
// No separate hero section animations needed

// ══════════════════════════════════════════════
// PROBLEM SECTION
// ══════════════════════════════════════════════

gsap.from(".problem-container .section-eyebrow", {
  scrollTrigger: {
    trigger: ".problem-section",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -30,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".problem-section .section-title", {
  scrollTrigger: {
    trigger: ".problem-section",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
});

gsap.from(".problem-point", {
  scrollTrigger: {
    trigger: ".problem-points",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -40,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out",
});

// ══════════════════════════════════════════════
// VISION SECTION (COMMENTED OUT)
// ══════════════════════════════════════════════

// gsap.from(".vision-container .section-eyebrow", {
//   scrollTrigger: {
//     trigger: ".vision-section",
//     start: "top 75%",
//     toggleActions: "play none none reverse",
//   },
//   opacity: 0,
//   y: 30,
//   duration: 0.8,
//   ease: "power3.out",
// });

// gsap.from(".vision-statement", {
//   scrollTrigger: {
//     trigger: ".vision-section",
//     start: "top 70%",
//     toggleActions: "play none none reverse",
//   },
//   opacity: 0,
//   y: 50,
//   duration: 1.2,
//   delay: 0.2,
//   ease: "power3.out",
// });

// gsap.from(".vision-description", {
//   scrollTrigger: {
//     trigger: ".vision-section",
//     start: "top 65%",
//     toggleActions: "play none none reverse",
//   },
//   opacity: 0,
//   y: 40,
//   duration: 1,
//   delay: 0.5,
//   ease: "power3.out",
// });

// ══════════════════════════════════════════════
// VIDEO SECTION: Scroll-Scrubbed Playback
// ══════════════════════════════════════════════

const videoSection = document.querySelector(".video-section");
const scrollVideo = document.querySelector(".scroll-video");

if (scrollVideo && videoSection) {
  // Set video to start at 40 seconds
  scrollVideo.currentTime = 40;

  // Autoplay video when scrolled into view, pause when out of view
  ScrollTrigger.create({
    trigger: videoSection,
    start: "top center",
    end: "bottom center",
    onEnter: () => scrollVideo.play(),
    onLeave: () => scrollVideo.pause(),
    onEnterBack: () => scrollVideo.play(),
    onLeaveBack: () => scrollVideo.pause(),
  });

  // Fade in video container
  gsap.from(".video-container .section-eyebrow", {
    scrollTrigger: {
      trigger: videoSection,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(scrollVideo, {
    scrollTrigger: {
      trigger: videoSection,
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    scale: 0.95,
    duration: 1,
    ease: "power3.out",
  });
}

// ══════════════════════════════════════════════
// UNDERSTOOD SECTION
// ══════════════════════════════════════════════

// Split statement into words for staggered animation
function splitTextIntoWords(element) {
  const text = element.innerHTML;
  const words = text.split(" ");
  element.innerHTML = words
    .map((word) => {
      // Preserve HTML tags like <em>
      if (word.includes("<")) {
        return word;
      }
      return `<span class="word" style="display: inline-block; opacity: 0;">${word}</span>`;
    })
    .join(" ");
  return element.querySelectorAll(".word");
}

// Function to initialize understood section animations (called after content loads)
function initUnderstoodAnimations() {
  const understoodStatement = document.querySelector(".understood-statement");
  if (!understoodStatement) return;

  const words = splitTextIntoWords(understoodStatement);

  gsap.to(words, {
    scrollTrigger: {
      trigger: ".understood-section",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    stagger: 0.03,
    duration: 0.6,
    ease: "power3.out",
  });

  gsap.from(".pillar", {
    scrollTrigger: {
      trigger: ".understood-pillars",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 60,
    stagger: 0.15,
    duration: 0.9,
    ease: "power3.out",
  });
}

// Expose function globally so it can be called from load-content.js
window.initUnderstoodAnimations = initUnderstoodAnimations;

// ══════════════════════════════════════════════
// FEATURES SECTION
// ══════════════════════════════════════════════

gsap.from(".features-container .section-eyebrow", {
  scrollTrigger: {
    trigger: ".features-section",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -30,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".features-section .section-title", {
  scrollTrigger: {
    trigger: ".features-section",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
});

// Ensure cards start visible, then animate
gsap.set(".feature-card", { opacity: 1, y: 0 });

gsap.from(".feature-card", {
  scrollTrigger: {
    trigger: ".features-grid",
    start: "top 85%",
    toggleActions: "play none none reverse",
    // markers: true, // Uncomment to debug
  },
  opacity: 0,
  y: 60,
  stagger: 0.15,
  duration: 0.9,
  ease: "power3.out",
});

// ══════════════════════════════════════════════
// AMARA SECTION: Horizontal Scroll (Edge-to-Edge)
// ══════════════════════════════════════════════

const amaraSection = document.querySelector(".amara-section");
const amaraCardsTrack = document.querySelector(".amara-cards-track");
const amaraCards = document.querySelectorAll(".amara-card");

// Calculate total scroll distance
const totalCards = amaraCards.length;
const scrollDistance = (totalCards - 1) * window.innerWidth;

// Pin the section and horizontally scroll the cards
gsap.to(amaraCardsTrack, {
  x: -scrollDistance,
  ease: "none",
  scrollTrigger: {
    trigger: amaraSection,
    start: "top top",
    end: `+=${scrollDistance * 1.5}`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
  },
});

// Fade in header
gsap.from(".amara-header", {
  scrollTrigger: {
    trigger: amaraSection,
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
});

// Animate individual card content as they come into view
amaraCards.forEach((card) => {
  const cardNum = card.querySelector(".card-num");
  const cardTitle = card.querySelector(".card-title");
  const cardBody = card.querySelector(".card-body");
  const cardAside = card.querySelector(".card-aside");

  // Initial state - set all cards to visible
  gsap.set([cardNum, cardTitle, cardBody, cardAside], {
    opacity: 1,
    x: 0,
  });

  // Optional: Add fade-in animation on scroll if desired
  // gsap.fromTo(
  //   [cardNum, cardTitle, cardBody, cardAside],
  //   { opacity: 0, x: 50 },
  //   {
  //     opacity: 1,
  //     x: 0,
  //     stagger: 0.1,
  //     duration: 0.8,
  //     ease: "power3.out",
  //     scrollTrigger: {
  //       trigger: card,
  //       start: "left 80%",
  //       toggleActions: "play none none reverse",
  //       containerAnimation: gsap.to(amaraCardsTrack, { x: -scrollDistance }),
  //     },
  //   }
  // );
});

// ══════════════════════════════════════════════
// THE BUILD SECTION (Tech + Timeline Combined)
// ══════════════════════════════════════════════

gsap.from(".build-container .section-eyebrow", {
  scrollTrigger: {
    trigger: ".build-section",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -30,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".build-section .section-title", {
  scrollTrigger: {
    trigger: ".build-section",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
});

gsap.from(".build-column", {
  scrollTrigger: {
    trigger: ".build-grid",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 60,
  stagger: 0.2,
  duration: 0.9,
  ease: "power3.out",
});

gsap.from(".tech-layer", {
  scrollTrigger: {
    trigger: ".build-grid",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -40,
  stagger: 0.1,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".timeline-phase", {
  scrollTrigger: {
    trigger: ".build-grid",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: 40,
  stagger: 0.1,
  duration: 0.8,
  ease: "power3.out",
});

// ══════════════════════════════════════════════
// TEAM SECTION
// ══════════════════════════════════════════════

gsap.from(".team-container .section-eyebrow", {
  scrollTrigger: {
    trigger: ".team-section",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -30,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".team-container .section-title", {
  scrollTrigger: {
    trigger: ".team-section",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
});

gsap.from(".team-card", {
  scrollTrigger: {
    trigger: ".team-grid",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 80,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
});

// Animate team initials with rotation
gsap.from(".team-initial", {
  scrollTrigger: {
    trigger: ".team-grid",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  scale: 0,
  rotation: -180,
  stagger: 0.2,
  duration: 0.8,
  delay: 0.3,
  ease: "back.out(1.7)",
});

// ══════════════════════════════════════════════
// INVESTMENT SECTION
// ══════════════════════════════════════════════

gsap.from(".investment-container .section-eyebrow", {
  scrollTrigger: {
    trigger: ".investment-section",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -30,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".investment-container .section-title", {
  scrollTrigger: {
    trigger: ".investment-section",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
});

gsap.from(".investment-breakdown", {
  scrollTrigger: {
    trigger: ".investment-section",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 60,
  duration: 1,
  delay: 0.4,
  ease: "power3.out",
});

gsap.from(".investment-row", {
  scrollTrigger: {
    trigger: ".investment-breakdown",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -50,
  stagger: 0.1,
  duration: 0.7,
  delay: 0.5,
  ease: "power3.out",
});

gsap.from(".investment-total", {
  scrollTrigger: {
    trigger: ".investment-total",
    start: "top 90%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  scale: 0.9,
  y: 40,
  duration: 0.9,
  ease: "back.out(1.4)",
});

gsap.from(".invest-note", {
  scrollTrigger: {
    trigger: ".invest-note",
    start: "top 95%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 20,
  duration: 0.7,
  delay: 0.3,
  ease: "power3.out",
});

// ══════════════════════════════════════════════
// CLOSING SECTION
// ══════════════════════════════════════════════

// Function to initialize closing section animations (called after content loads)
function initClosingAnimations() {
  const closingLine = document.querySelector(".closing-line");
  if (!closingLine) return;

  const closingWords = splitTextIntoWords(closingLine);

  gsap.to(closingWords, {
    scrollTrigger: {
      trigger: ".closing-section",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    stagger: 0.05,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".closing-sub", {
    scrollTrigger: {
      trigger: ".closing-section",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.6,
    ease: "power3.out",
  });

  gsap.from(".closing-team", {
    scrollTrigger: {
      trigger: ".closing-section",
      start: "top 65%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.9,
    ease: "power3.out",
  });
}

// Expose function globally so it can be called from load-content.js
window.initClosingAnimations = initClosingAnimations;

// ══════════════════════════════════════════════
// OUTRO: Pin Closing + Shrink Logo (Reverse of Intro)
// ══════════════════════════════════════════════

const closingSection = document.querySelector(".closing-section");
const outroOverlay = document.querySelector(".outro-overlay");
const outroLogo = document.querySelector(".outro-logo");
const outroBlackCircle = document.querySelector(".outro-black-circle");
const closingLine = document.querySelector(".closing-line");
const closingSub = document.querySelector(".closing-sub");
const closingTeam = document.querySelector(".closing-team");

if (closingSection && outroOverlay && outroLogo && outroBlackCircle) {
  // Set initial state: overlay hidden
  gsap.set(outroOverlay, { opacity: 0 });
  gsap.set(outroLogo, { scale: 15 });
  gsap.set(outroBlackCircle, { scale: 20 });

  // Continuous counter-clockwise rotation (reverse of intro)
  gsap.to(outroLogo, {
    rotation: -360,
    duration: 8,
    ease: "linear",
    repeat: -1,
  });

  // Pin closing section and animate outro reveal
  gsap
    .timeline({
      scrollTrigger: {
        trigger: closingSection,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    })
    // Fade in the outro overlay
    .to(outroOverlay, {
      opacity: 1,
      duration: 0.3,
    })
    // Shrink logo, black circle, and closing text simultaneously
    .to(
      outroLogo,
      {
        scale: 1,
        duration: 1,
        ease: "power2.out",
      },
      "<"
    )
    .to(
      outroBlackCircle,
      {
        scale: 1.5,
        duration: 1,
        ease: "power2.out",
      },
      "<"
    )
    .to(
      [closingLine, closingSub, closingTeam],
      {
        scale: 0.067,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      },
      "<"
    );
}

// ══════════════════════════════════════════════
// SMOOTH SCROLLING
// ══════════════════════════════════════════════

// Optional: Add smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth";

// Update ScrollTrigger on window resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

console.log("🎨 Guardians of the Future - Presentation Loaded");
console.log("📊 Total Scroll Triggers:", ScrollTrigger.getAll().length);
