gsap.registerPlugin(ScrollTrigger);

// Expose ScrollTrigger globally for use in other scripts
window.ScrollTrigger = ScrollTrigger;

// ══════════════════════════════════════════════
// INTRO: Rotating Logo → Grows to White Background
// ══════════════════════════════════════════════

const introSection = document.querySelector(".intro-section");
const rotatingLogo = document.querySelector(".rotating-logo");
const rotatingLogo2 = document.querySelector(".rotating-logo-2");
const introOverlay = document.querySelector(".intro-overlay");

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

// On scroll, expand the logo and transition to white
gsap
  .timeline({
    scrollTrigger: {
      trigger: introSection,
      start: "top top",
      end: "+=100%",
      scrub: 1,
      pin: true,
      pinSpacing: true,
    },
  })
  // Grow the logo
  .to(rotatingLogo, {
    scale: 15,
    // opacity: 0.3,
    duration: 1,
    ease: "power2.in",
  })
  // Expand white overlay from center
  // .to(introOverlay, {
  //   scale: 20,
  //   duration: 1,
  //   ease: 'power2.inOut',
  // }, '<0.3')
  // Fade out the entire intro section
  .to(
    introSection,
    {
      opacity: 0,
      duration: 0.3,
    },
    "-=0.1",
  )
  // Remove from display after animation completes
  .set(introSection, { display: "none" });

// ══════════════════════════════════════════════
// HERO SECTION: Fade In
// ══════════════════════════════════════════════

gsap.from(".hero-content", {
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 60,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".hero-eyebrow", {
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.3,
  ease: "power3.out",
});

gsap.from(".hero-title-line", {
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 1,
  delay: 0.5,
  ease: "power3.out",
});

gsap.from(".hero-subtitle", {
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 40,
  duration: 1,
  delay: 0.9,
  ease: "power3.out",
});

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
  // Wait for video metadata to load
  scrollVideo.addEventListener("loadedmetadata", () => {
    // Scrub through seconds 30 to 60 of the video
    const startTime = 40;
    const endTime = Math.min(70, scrollVideo.duration);

    // Set video to start at 30 seconds
    scrollVideo.currentTime = startTime;

    gsap.to(scrollVideo, {
      currentTime: endTime,
      ease: "none",
      scrollTrigger: {
        trigger: videoSection,
        start: "top bottom", // Start when section enters viewport
        end: "bottom top", // End when section exits viewport
        scrub: 1,
      },
    });
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

gsap.from(".feature-card", {
  scrollTrigger: {
    trigger: ".features-grid",
    start: "top 80%",
    toggleActions: "play none none reverse",
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
