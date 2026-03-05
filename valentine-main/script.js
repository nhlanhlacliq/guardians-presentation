gsap.registerPlugin(ScrollTrigger);

// ===== FLOATING PARTICLES SYSTEM =====
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = this.canvas.height + Math.random() * 100;
    this.size = Math.random() * 15 + 8;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.3 + 0.2;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 2 - 1;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    if (this.y + this.size < 0) {
      this.reset();
    }

    if (this.x < -this.size || this.x > this.canvas.width + this.size) {
      this.x = Math.random() * this.canvas.width;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);

    // Draw heart shape
    ctx.fillStyle = "#ff7eb3";
    ctx.beginPath();
    const size = this.size;
    ctx.moveTo(0, size / 4);
    ctx.bezierCurveTo(-size / 2, -size / 4, -size, size / 8, 0, size);
    ctx.bezierCurveTo(size, size / 8, size / 2, -size / 4, 0, size / 4);
    ctx.fill();

    ctx.restore();
  }
}

const particlesCanvas = document.getElementById("particles-canvas");
const particlesCtx = particlesCanvas.getContext("2d");
const particles = [];
const particleCount = 30;

function initParticles() {
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;

  particles.length = 0;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(particlesCanvas));
  }
}

function animateParticles() {
  particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw(particlesCtx);
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", initParticles);

// ===== ANIMATED RADIAL GRADIENT =====
const radialBg = document.querySelector(".radial-background");

// Breathing animation
gsap.to(radialBg, {
  scale: 1.1,
  duration: 3,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
});

// Color shift based on scroll
gsap.to(radialBg, {
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
  background:
    "radial-gradient(circle at 50% 50%, rgba(255, 126, 179, 0.08) 0%, transparent 60%)",
  ease: "none",
});

// ===== ENTER SCREEN & BACKGROUND MUSIC =====
const enterScreen = document.getElementById("enter-screen");
const enterButton = document.getElementById("enter-button");
const bgMusic = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
let isMusicPlaying = false;

// Set volume (0.0 to 1.0) - adjust this value to your preference
bgMusic.volume = 0.3; // 30% volume

// Enter button click - starts the experience
enterButton.addEventListener("click", () => {
  // Hide enter screen
  enterScreen.classList.add("hidden");

  // Start music
  bgMusic.play().then(() => {
    isMusicPlaying = true;
    musicToggle.classList.remove("muted");
  }).catch((err) => {
    console.log("Audio play failed:", err);
    musicToggle.classList.add("muted");
  });
});

// Music toggle button
musicToggle.addEventListener("click", () => {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.classList.add("muted");
  } else {
    bgMusic.play().catch((err) => console.log("Audio play failed:", err));
    musicToggle.classList.remove("muted");
  }
  isMusicPlaying = !isMusicPlaying;
});

// ===== TEXT SPLITTING FOR STAGGERED REVEALS =====
function splitTextIntoWords(element) {
  const html = element.innerHTML.trim();

  // Replace multiple whitespaces with single space, but preserve HTML tags
  const normalized = html.replace(/\s+/g, " ");

  // Split by spaces but keep HTML tags intact
  let result = "";
  let currentWord = "";
  let inTag = false;

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];

    if (char === "<") {
      inTag = true;
      currentWord += char;
    } else if (char === ">") {
      inTag = false;
      currentWord += char;
    } else if (char === " " && !inTag) {
      if (currentWord.trim()) {
        result += `<span class="word">${currentWord}</span> `;
        currentWord = "";
      }
    } else {
      currentWord += char;
    }
  }

  // Add last word
  if (currentWord.trim()) {
    result += `<span class="word">${currentWord}</span>`;
  }

  element.innerHTML = result;
  return element.querySelectorAll(".word");
}

// ===== GLOBAL TIMING CONTROLS =====
// Adjust these to control when sections fade in/out
const FADE_START = "top 90%"; // When fade animations start
const FADE_END = "top 30%"; // When fade animations complete
const FADE_IN_END = "top 50%"; // When fade-in completes

// Message section specific timing
const MESSAGE_FADE_START = "top 80%";
const MESSAGE_FADE_END = "top 50%";

// Cycling nicknames in hero title
const nicknames = [
  "Teddy Bear",
  "Potato",
  "Trouble",
  "Mrs. M",
  "Gangsta",
  "Nomu",
  "Tall Stuff",
];
let currentIndex = 0;
const dynamicName = document.querySelector(".dynamic-name");

// Cycling her nicknames for subtitle
const subtitleNicknames = [
  "Bad Boy",
  "Ghost",
  "Chef",
  "Mr",
  "Scam",
  "Drama King",
];
let currentSubtitleIndex = 0;
const dynamicSubtitle = document.querySelector(".dynamic-subtitle");

function cycleNickname() {
  gsap.to(dynamicName, {
    opacity: 0,
    y: -20,
    duration: 0.5,
    onComplete: () => {
      currentIndex = (currentIndex + 1) % nicknames.length;
      dynamicName.textContent = nicknames[currentIndex];
      gsap.to(dynamicName, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      });
    },
  });
}

function cycleSubtitle() {
  gsap.to(dynamicSubtitle, {
    opacity: 0,
    y: -10,
    duration: 0.4,
    onComplete: () => {
      currentSubtitleIndex =
        (currentSubtitleIndex + 1) % subtitleNicknames.length;
      dynamicSubtitle.textContent = subtitleNicknames[currentSubtitleIndex];
      gsap.to(dynamicSubtitle, {
        opacity: 1,
        y: 0,
        duration: 0.4,
      });
    },
  });
}

// Start cycling after initial load
setInterval(cycleNickname, 3000);
setInterval(cycleSubtitle, 3500);

// Hero animations - initial entrance
gsap.from("h1", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".subtitle", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.3,
  ease: "power3.out",
});

gsap.from(".scroll-indicator", {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 0.6,
  ease: "power3.out",
});

// Pin and fade hero section
const heroSection = document.querySelector(".hero");
const firstNicknameSection = document.querySelector(".nickname-section");

ScrollTrigger.create({
  trigger: heroSection,
  start: "top top",
  end: "bottom top",
  pin: true,
  pinSpacing: false,
});

// Fade out hero when first nickname section approaches
gsap
  .timeline({
    scrollTrigger: {
      trigger: firstNicknameSection,
      start: FADE_START,
      end: FADE_END,
      scrub: 1,
    },
  })
  .to(
    [
      heroSection.querySelector("h1"),
      heroSection.querySelector(".subtitle"),
      heroSection.querySelector(".scroll-indicator"),
    ],
    {
      opacity: 0,
      y: -50,
      ease: "none",
    },
    0,
  );

// Handle all nickname sections
const allNicknameSections = document.querySelectorAll(".nickname-section");
const messageSection = document.querySelector(".message-section");

allNicknameSections.forEach((section, index) => {
  const emoji = section.querySelector(".nickname-emoji");
  const title = section.querySelector(".nickname-title");
  const description = section.querySelector(".nickname-description");
  const nextSection = allNicknameSections[index + 1];
  const isLastSection = index === allNicknameSections.length - 1;

  // Pin each section
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: nextSection ? "bottom top" : "+=50%",
    pin: true,
    pinSpacing: false,
  });

  // Split text for staggered reveal
  const titleWords = splitTextIntoWords(title);
  const descriptionWords = splitTextIntoWords(description);

  // Fade in animation with staggered text (using toggleActions, not scrub)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 60%",
      toggleActions: "play none none reverse",
    },
  });

  tl.from(
    emoji,
    {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    },
    0,
  )
    .from(
      titleWords,
      {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out",
      },
      0.2,
    )
    .from(
      descriptionWords,
      {
        opacity: 0,
        y: 10,
        stagger: 0.02,
        duration: 0.6,
        ease: "power3.out",
      },
      0.5,
    );

  // Fade out when next section approaches (using scrub for smooth scroll-tied fade)
  if (nextSection) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: nextSection,
          start: FADE_START,
          end: FADE_END,
          scrub: 1,
        },
      })
      .to([emoji, title, description], { opacity: 0, y: -50, ease: "none" }, 0);
  } else if (isLastSection && messageSection) {
    // Fade out last nickname section when message section comes up
    gsap
      .timeline({
        scrollTrigger: {
          trigger: messageSection,
          start: MESSAGE_FADE_START,
          end: MESSAGE_FADE_END,
          scrub: 1,
        },
      })
      .to([emoji, title, description], { opacity: 0, y: -50, ease: "none" }, 0);
  }
});

// Message section animations with staggered text
document.querySelectorAll(".message-block").forEach((block) => {
  const paragraph = block.querySelector("p");
  const words = splitTextIntoWords(paragraph);

  gsap.from(words, {
    scrollTrigger: {
      trigger: block,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 20,
    stagger: 0.03,
    duration: 0.8,
    ease: "power3.out",
  });
});

// Signature animation
gsap.from(".signature", {
  scrollTrigger: {
    trigger: ".signature",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: 50,
  duration: 1,
  ease: "power3.out",
});

// Footer animation
gsap.from(".footer-text", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power3.out",
});

// ===== POLAROID GALLERY ANIMATIONS =====
gsap.from(".gallery-title", {
  scrollTrigger: {
    trigger: ".gallery-section",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
});

document.querySelectorAll(".polaroid").forEach((polaroid, index) => {
  // Stagger polaroid entrance
  gsap.from(polaroid, {
    scrollTrigger: {
      trigger: polaroid,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 60,
    rotation: Math.random() * 20 - 10,
    duration: 0.8,
    delay: index * 0.1,
    ease: "back.out(1.2)",
  });

  // Floating animation - each polaroid moves randomly
  const floatAnimation = () => {
    gsap.to(polaroid, {
      x: `+=${Math.random() * 40 - 20}`,
      y: `+=${Math.random() * 40 - 20}`,
      rotation: `+=${Math.random() * 6 - 3}`,
      duration: 4 + Math.random() * 3,
      ease: "sine.inOut",
      onComplete: floatAnimation,
    });
  };

  // Start floating after entrance animation
  setTimeout(() => {
    floatAnimation();
  }, 1000 + index * 100);
});

// ===== SPECIAL ENDING EFFECT =====
let particleBurstActive = false;

ScrollTrigger.create({
  trigger: ".gallery-section",
  start: "top 50%",
  onEnter: () => {
    if (!particleBurstActive) {
      particleBurstActive = true;

      // Multiply particles for burst effect
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(particlesCanvas));
      }

      // Intensify radial gradient
      gsap.to(radialBg, {
        background:
          "radial-gradient(circle at 50% 50%, rgba(255, 56, 106, 0.15) 0%, rgba(255, 126, 179, 0.05) 50%, transparent 80%)",
        duration: 2,
        ease: "power2.out",
      });

      // Pulse particles
      gsap.to(particlesCanvas, {
        scale: 1.1,
        duration: 0.5,
        yoyo: true,
        repeat: 3,
        ease: "sine.inOut",
      });
    }
  },
  onLeaveBack: () => {
    if (particleBurstActive) {
      particleBurstActive = false;

      // Reset particles
      particles.splice(particleCount, particles.length - particleCount);

      // Reset gradient
      gsap.to(radialBg, {
        background:
          "radial-gradient(circle at 50% 50%, rgba(255, 126, 179, 0.08) 0%, transparent 60%)",
        duration: 1.5,
        ease: "power2.out",
      });
    }
  },
});
