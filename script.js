const portfolioItems = [
  {
    image:
      "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/e9064aae2d9e883a5ccfd07c8c05e0d7.jpeg",
    title: "Product Packaging Design",
  },
  {
    image:
      "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/2b59c2df5fccb82a948e445272e7cdcb.jpeg",
    title: "Ladies Night Campaign",
  },
  {
    image:
      "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/5b4c9c60e3d498a17fe3300baf6df848.jpeg",
    title: "Ladies Night Campaign",
  },
  {
    image:
      "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/f1e008baf4af82e2f80ecde89f80f360.jpeg",
    title: "Product Photography",
  },
  {
    image:
      "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/acbb2332457c6997c4275a417dfecf54.png",
    title: "Multi-Device Connection",
  },
  {
    image:
      "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/e90461f78729bcbfc33d64747b00f76a.png",
    title: "Social Media Campaign",
  },
];

function createPortfolioItem(item) {
  return `
<div class="group relative overflow-hidden rounded-lg w-[280px] sm:w-[400px]">
<img src="${item.image}"
alt="Portfolio Item"
class="w-full h-48 sm:h-64 object-cover">
<div class="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<h3 class="text-lg sm:text-xl font-bold text-white text-center px-4">${item.title}</h3>
</div>
</div>
`;
}

function loadPortfolioItems() {
  const container = document.getElementById("portfolioContainer");
  portfolioItems.forEach((item) => {
    container.innerHTML += createPortfolioItem(item);
  });
}

function cloneAndAppendItems() {
  const container = document.getElementById("portfolioContainer");
  const items = Array.from(container.children);
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    container.appendChild(clone);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPortfolioItems();
  const container = document.getElementById("portfolioContainer");
  let scrollPosition = 0;
  let scrollDirection = 1;
  function animate() {
    const maxScroll = container.scrollWidth / 2;
    scrollPosition += scrollDirection;
    if (scrollPosition >= maxScroll) {
      scrollPosition = 0;
    }
    container.style.transform = `translateX(${-scrollPosition}px)`;
    requestAnimationFrame(animate);
  }
  container.addEventListener("mouseenter", () => {
    scrollDirection = 0;
  });
  container.addEventListener("mouseleave", () => {
    scrollDirection = 1;
  });
  cloneAndAppendItems();
  animate();
});

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const logo = document.querySelector(".flex-shrink-0 img");
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    if (!mobileMenu.classList.contains("hidden")) {
      logo.classList.add("h-12");
    } else {
      logo.classList.remove("h-12");
    }
  });

  document.querySelectorAll('a[href="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        logo.classList.remove("h-12");
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
      if (this.textContent.trim() === "Book Free Call") {
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
          const headerOffset = 80;
          const elementPosition = contactSection.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else if (this.textContent.trim() === "View All Projects") {
        const portfolioSection = document.querySelector("#portfolio");
        if (portfolioSection) {
          const headerOffset = 80;
          const elementPosition = portfolioSection.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.classList.contains("stats-count")) {
          animateValue(
            entry.target,
            0,
            parseInt(entry.target.dataset.target),
            2000
          );
        }
      }
    });
  });

  document
    .querySelectorAll(".stats-count")
    .forEach((el) => observer.observe(el));
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.querySelector("div").textContent = Math.floor(
        progress * (end - start) + start
      );
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Initialize EmailJS (Replace 'YOUR_PUBLIC_KEY' with your actual public key)
      emailjs.init("gcULbDlD5aK8ODPg3");

      // Collect form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Send the email using EmailJS
      emailjs
        .send("service_9zk5y8k", "template_o0q7gpv", {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        })
        .then((response) => {
          console.log("Email sent successfully:", response);

          // Show success message
          const successMessage = document.createElement("div");
          successMessage.className =
            "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 translate-x-full";
          successMessage.textContent = "Message sent successfully!";
          document.body.appendChild(successMessage);

          // Slide in success message
          setTimeout(() => {
            successMessage.style.transform = "translateX(0)";
          }, 100);

          // Hide success message after 3 seconds
          setTimeout(() => {
            successMessage.style.transform = "translateX(100%)";
            setTimeout(() => successMessage.remove(), 300);
          }, 3000);

          // Reset form
          document.getElementById("contactForm").reset();
        })
        .catch(
          (error) => {
            console.error("Email sending failed:", error);

            // Show error message
            const errorMessage = document.createElement("div");
            errorMessage.className =
              "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg";
            errorMessage.textContent =
              "Failed to send message. Please try again.";
            document.body.appendChild(errorMessage);

            setTimeout(() => errorMessage.remove(), 3000);
            this.reset();
          },
          (error) => {
            console.error("Failed to send message:", error);
            alert("Failed to send message. Please try again.");
          }
        );
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
  
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  function toggleDarkMode() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
  
  if (darkModeToggleMobile) {
    darkModeToggleMobile.addEventListener('click', toggleDarkMode);
  }
});