// DOM Elements
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const typingTextElement = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');

// Sample project data - replace with your actual projects
const projects = [
  {
    title: 'NEScan',
    description: 'A fast and reliable network scanning tool for identifying devices, open ports, and potential vulnerabilities.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1334&q=80',
    tags: ['Python', 'Network Security', 'Port Scanning', 'Vulnerability Detection'],
    liveLink: '#',
    codeLink: 'https://github.com/awiones/NEScan'
  },
  {
    title: 'TentroLink',
    description: 'Network stress testing and security assessment toolkit for authorized penetration testing. Evaluate infrastructure resilience with customizable multi-protocol testing capabilities and comprehensive analytics.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    tags: ['Security Testing', 'Network Analysis', 'Penetration Testing', 'Analytics'],
    liveLink: '#',
    codeLink: 'https://github.com/awiones/TentroLink'
  },
  {
    title: 'RemotelyPy',
    description: 'A secure Python-based remote management system for controlling multiple VPS instances through a central controller with SSL encryption and interactive CLI.',
    image: 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    tags: ['Python', 'VPS Management', 'SSL Encryption', 'CLI'],
    liveLink: '#',
    codeLink: 'https://github.com/awiones/RemotelyPy'
  }
];

// Navigation toggle
function toggleNav() {
  nav.classList.toggle('active');
  burger.classList.toggle('nav-active');
  
  // Animate links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });
}

burger.addEventListener('click', toggleNav);

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      toggleNav();
    }
  });
});

// Scroll effects
window.addEventListener('scroll', () => {
  // Header shadow on scroll
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Highlight active nav link based on scroll position
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.querySelector('a').classList.remove('active');
    if (link.querySelector('a').getAttribute('href') === `#${current}`) {
      link.querySelector('a').classList.add('active');
    }
  });
  
  // Add fade-in animation to elements when they come into view
  const fadeElements = document.querySelectorAll('.fade-trigger');
  fadeElements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('fade-in');
    }
  });
});

// Typing effect
const phrases = [
  'Full-Stack Developer',
  'Network Security Specialist',
  'AI Enthusiast',
  'Technical Writer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 1000; // Pause at the end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500; // Pause before typing next phrase
  }
  
  setTimeout(typeEffect, typingSpeed);
}

// Start the typing effect when the page loads
window.addEventListener('load', () => {
  setTimeout(typeEffect, 1000);
  
  // Add fade-in class to elements
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-trigger');
  });
  
  // Generate project cards
  generateProjects();
  
  // Set up contact form
  setupContactForm();
});

// Generate project cards
function generateProjects() {
  const projectsGrid = document.querySelector('.projects-grid');
  
  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card fade-trigger';
    
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.liveLink}" class="project-link" target="_blank">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>
          <a href="${project.codeLink}" class="project-link" target="_blank">
            <i class="fab fa-github"></i> View Code
          </a>
        </div>
      </div>
    `;
    
    projectsGrid.appendChild(projectCard);
  });
}

// Contact form handling
function setupContactForm() {
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For now, we'll just log it and show a success message
      console.log('Form submitted:', { name, email, message });
      
      // Show success message
      const formGroups = document.querySelectorAll('.form-group');
      formGroups.forEach(group => group.style.display = 'none');
      
      const submitBtn = document.querySelector('.btn');
      submitBtn.style.display = 'none';
      
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <i class="fas fa-check-circle" style="color: #28a745; font-size: 3rem; margin-bottom: 1rem;"></i>
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out, ${name}. I'll get back to you soon!</p>
      `;
      successMessage.style.textAlign = 'center';
      successMessage.style.padding = '2rem 0';
      
      contactForm.appendChild(successMessage);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        formGroups.forEach(group => group.style.display = 'block');
        submitBtn.style.display = 'inline-block';
        successMessage.remove();
        contactForm.reset();
      }, 5000);
    });
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});