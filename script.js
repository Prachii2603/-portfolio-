// Simple test function
function testLogin() {
  alert("Button clicked! Testing...");
  console.log("testLogin called");
  
  const modal = document.getElementById("loginModal");
  console.log("Modal found:", modal);
  
  if (modal) {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    
    // Check for panels
    const setupPanel = document.getElementById("setupPanel");
    const loginPanel = document.getElementById("loginPanel");
    
    console.log("Setup panel:", setupPanel);
    console.log("Login panel:", loginPanel);
    
    // Show setup panel by default
    if (setupPanel) setupPanel.classList.remove("hidden");
    if (loginPanel) loginPanel.classList.add("hidden");
    
    alert("Modal should be open now!");
  } else {
    alert("Modal not found!");
  }
}

const filterButtons = document.querySelectorAll(".filter-btn");
const loginModal = document.getElementById("loginModal");
const openLoginBtn = document.getElementById("openLoginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const closeLoginBtn = document.getElementById("closeLoginBtn");
const loginForm = document.getElementById("loginForm");
const setupForm = document.getElementById("setupForm");
const setupPanel = document.getElementById("setupPanel");
const loginPanel = document.getElementById("loginPanel");
const forgotPasswordPanel = document.getElementById("forgotPasswordPanel");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const googleSignInBtn = document.getElementById("googleSignInBtn");
const backToLoginBtn = document.getElementById("backToLoginBtn");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const bookingForm = document.getElementById("bookingForm");
const portfolioGrid = document.getElementById("portfolioGrid");
const addWorkForm = document.getElementById("addWorkForm");
const adminTools = document.getElementById("adminTools");
const adminStatus = document.getElementById("adminStatus");
const profilePhoto = document.getElementById("profilePhoto");
const changePhotoBtn = document.getElementById("changePhotoBtn");
const changeCredentialsForm = document.getElementById("changeCredentialsForm");
const portfolioDetailModal = document.getElementById("portfolioDetailModal");
const closePortfolioDetailBtn = document.getElementById("closePortfolioDetailBtn");

// Profile dropdown elements
const profileDropdown = document.getElementById("profileDropdown");
const profileDropdownBtn = document.getElementById("profileDropdownBtn");
const profileDropdownMenu = document.getElementById("profileDropdownMenu");
const navProfilePhoto = document.getElementById("navProfilePhoto");
const dropdownProfilePhoto = document.getElementById("dropdownProfilePhoto");
const dropdownEmail = document.getElementById("dropdownEmail");
const changeProfilePhotoBtn = document.getElementById("changeProfilePhotoBtn");
const changeCredentialsBtn = document.getElementById("changeCredentialsBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const helpBtn = document.getElementById("helpBtn");
const dropdownLogoutBtn = document.getElementById("dropdownLogoutBtn");
const credentialsModal = document.getElementById("credentialsModal");
const closeCredentialsBtn = document.getElementById("closeCredentialsBtn");

const STORAGE_KEY = "artisan_custom_works_v1";
const AUTH_KEY = "artisan_admin_session_v1";
const PROFILE_PHOTO_KEY = "artisan_profile_photo_v1";
const CREDENTIALS_KEY = "artisan_admin_credentials_v1";
const BOOKINGS_KEY = "artisan_bookings_v1";

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter(btn.dataset.filter);
  });
});

if (closeLoginBtn) {
  closeLoginBtn.onclick = function() {
    console.log("Close login button clicked");
    loginModal.classList.add("hidden");
    loginModal.setAttribute("aria-hidden", "true");
  };
}

if (loginModal) {
  loginModal.onclick = function(event) {
    if (event.target === loginModal) {
      console.log("Clicked outside modal - closing");
      loginModal.classList.add("hidden");
      loginModal.setAttribute("aria-hidden", "true");
    }
  };
}

if (forgotPasswordBtn) {
  forgotPasswordBtn.onclick = function() {
    loginPanel.classList.add("hidden");
    forgotPasswordPanel.classList.remove("hidden");
  };
}

if (backToLoginBtn) {
  backToLoginBtn.onclick = function() {
    forgotPasswordPanel.classList.add("hidden");
    loginPanel.classList.remove("hidden");
  };
}

if (googleSignInBtn) {
  googleSignInBtn.onclick = function() {
    alert("Google Sign-In integration would be implemented here. For demo purposes, this will log you in as admin.");
    localStorage.setItem(AUTH_KEY, "session-google-" + Date.now());
    setAdminUIState(true);
    loginModal.classList.add("hidden");
    loginModal.setAttribute("aria-hidden", "true");
  };
}

if (forgotPasswordForm) {
  forgotPasswordForm.onsubmit = function(event) {
    event.preventDefault();
    const email = document.getElementById("resetEmail").value.trim();
    alert(`Password reset link would be sent to ${email}. For demo purposes, use the default credentials.`);
    forgotPasswordForm.reset();
    forgotPasswordPanel.classList.add("hidden");
    loginPanel.classList.remove("hidden");
  };
}

if (changePhotoBtn) {
  changePhotoBtn.onclick = function() {
    console.log("Change photo button clicked");
    if (!isAdminLoggedIn()) {
      alert("Please login as admin first.");
      return;
    }
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log("File selected:", file.name);
        const imageDataUrl = await fileToDataUrl(file);
        localStorage.setItem(PROFILE_PHOTO_KEY, imageDataUrl);
        updateAllProfilePhotos(imageDataUrl);
        alert("Profile photo updated.");
      }
    };
    input.click();
  };
}

// Profile dropdown functionality
if (profileDropdownBtn) {
  profileDropdownBtn.onclick = function() {
    profileDropdownMenu.classList.toggle("hidden");
    profileDropdownBtn.classList.toggle("active");
  };
}

// Close dropdown when clicking outside
document.onclick = function(event) {
  if (profileDropdown && !profileDropdown.contains(event.target)) {
    if (profileDropdownMenu) profileDropdownMenu.classList.add("hidden");
    if (profileDropdownBtn) profileDropdownBtn.classList.remove("active");
  }
};

if (changeProfilePhotoBtn) {
  changeProfilePhotoBtn.onclick = function() {
    profileDropdownMenu.classList.add("hidden");
    profileDropdownBtn.classList.remove("active");
    
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageDataUrl = await fileToDataUrl(file);
        localStorage.setItem(PROFILE_PHOTO_KEY, imageDataUrl);
        updateAllProfilePhotos(imageDataUrl);
        alert("Profile photo updated.");
      }
    };
    input.click();
  };
}

if (changeCredentialsBtn) {
  changeCredentialsBtn.onclick = function() {
    profileDropdownMenu.classList.add("hidden");
    profileDropdownBtn.classList.remove("active");
    credentialsModal.classList.remove("hidden");
    credentialsModal.setAttribute("aria-hidden", "false");
    populateCredentialFields();
  };
}

if (closeCredentialsBtn) {
  closeCredentialsBtn.onclick = function() {
    credentialsModal.classList.add("hidden");
    credentialsModal.setAttribute("aria-hidden", "true");
  };
}

if (themeToggleBtn) {
  themeToggleBtn.onclick = function() {
    profileDropdownMenu.classList.add("hidden");
    profileDropdownBtn.classList.remove("active");
    
    const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
    if (currentTheme === "dark") {
      document.body.classList.add("light-theme");
      themeToggleBtn.innerHTML = '<span class="dropdown-icon">☀️</span>Light Theme';
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-theme");
      themeToggleBtn.innerHTML = '<span class="dropdown-icon">🌙</span>Dark Theme';
      localStorage.setItem("theme", "dark");
    }
  };
}

if (helpBtn) {
  helpBtn.onclick = function() {
    profileDropdownMenu.classList.add("hidden");
    profileDropdownBtn.classList.remove("active");
    alert("Help & Support\n\n• Click profile photo to change it\n• Use Login Settings to update credentials\n• Toggle between light/dark themes\n• Contact: manojbodade@gmail.com\n• Phone: +91 7385524077");
  };
}

if (dropdownLogoutBtn) {
  dropdownLogoutBtn.onclick = function() {
    profileDropdownMenu.classList.add("hidden");
    profileDropdownBtn.classList.remove("active");
    localStorage.removeItem(AUTH_KEY);
    setAdminUIState(false);
    alert("Logged out successfully.");
  };
}

if (loginForm) {
  loginForm.onsubmit = async function(event) {
    console.log("Login form submitted");
    event.preventDefault();
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;
    console.log("Login attempt with email:", email);

    try {
      const ok = await verifyLogin(email, password);
      console.log("Login verification result:", ok);
      if (!ok) {
        alert("Invalid email or password.");
        return;
      }
      localStorage.setItem(AUTH_KEY, "session-" + Date.now());
      setAdminUIState(true);
      alert("Login successful.");
      loginModal.classList.add("hidden");
      loginModal.setAttribute("aria-hidden", "true");
      loginForm.reset();
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Login failed.");
    }
  };
}

if (setupForm) {
  setupForm.onsubmit = async function(event) {
    console.log("Setup form submitted");
    event.preventDefault();
    if (hasCredentials()) {
      alert("Admin account already exists. Use Login.");
      return;
    }

    const email = document.getElementById("setupEmail").value.trim();
    const password = document.getElementById("setupPassword").value;
    const password2 = document.getElementById("setupPassword2").value;
    console.log("Setup attempt with email:", email);

    if (password !== password2) {
      alert("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    await saveCredentials(email, password);
    localStorage.setItem(AUTH_KEY, "session-" + Date.now());
    setAdminUIState(true);
    loginModal.classList.add("hidden");
    loginModal.setAttribute("aria-hidden", "true");
    setupForm.reset();
    alert("Admin account created. You are now logged in.");
  };
}

// Netlify Forms handles form submission - JavaScript handler disabled
/*
if (bookingForm) {
  bookingForm.onsubmit = function(event) {
    event.preventDefault();
    const fd = new FormData(bookingForm);
    const entry = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      projectType: String(fd.get("projectType") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      at: new Date().toISOString(),
    };
    
    // Save to local storage for admin dashboard
    const bookings = getBookings();
    bookings.push(entry);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    updateDashboardStats();
    
    // Send email notification
    sendEmailNotification(entry);
    
    alert("Thank you! Your booking request was received. We'll contact you within 24 hours.");
    bookingForm.reset();
  };
}
*/

if (addWorkForm) {
  addWorkForm.onsubmit = async function(event) {
    event.preventDefault();
    if (!isAdminLoggedIn()) {
      alert("Please login as admin first.");
      return;
    }
    const title = document.getElementById("workTitle").value.trim();
    const category = document.getElementById("workCategory").value;
    const description = document.getElementById("workDescription").value.trim();
    const file = document.getElementById("workImage").files[0];

    if (!file) {
      alert("Please select an image.");
      return;
    }

    const imageDataUrl = await fileToDataUrl(file);
    const workItem = { title, category, description, image: imageDataUrl };
    appendPortfolioCard(workItem);
    saveCustomWorks([...getCustomWorks(), workItem]);
    addWorkForm.reset();
    applyFilter(getActiveFilter());
    updateDashboardStats();
    alert("Work added successfully.");
  };
}

if (logoutBtn) {
  logoutBtn.onclick = function() {
    localStorage.removeItem(AUTH_KEY);
    setAdminUIState(false);
    alert("Logged out.");
  };
}

if (changeCredentialsForm) {
  changeCredentialsForm.onsubmit = async function(event) {
    event.preventDefault();
    if (!isAdminLoggedIn()) {
      alert("Please login first.");
      return;
    }

    const cred = getCredentials();
    if (!cred) {
      alert("No credentials found. Refresh and create admin account again.");
      return;
    }

    const currentPassword = document.getElementById("credCurrentPassword").value;
    const ok = await verifyLogin(cred.email, currentPassword);
    if (!ok) {
      alert("Current password is incorrect.");
      return;
    }

    const newEmailRaw = document.getElementById("credNewEmail").value.trim();
    const newPass = document.getElementById("credNewPassword").value;
    const newPass2 = document.getElementById("credNewPassword2").value;

    const newEmail = newEmailRaw || cred.email;

    if (newPass || newPass2) {
      if (newPass !== newPass2) {
        alert("New passwords do not match.");
        return;
      }
      if (newPass.length < 6) {
        alert("New password must be at least 6 characters.");
        return;
      }
      await saveCredentials(newEmail, newPass);
    } else {
      const updated = { email: newEmail.toLowerCase(), passwordHash: cred.passwordHash };
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(updated));
    }

    document.getElementById("credCurrentPassword").value = "";
    document.getElementById("credNewEmail").value = "";
    document.getElementById("credNewPassword").value = "";
    document.getElementById("credNewPassword2").value = "";
    populateCredentialFields();
    alert("Login details updated. Use your new email/password next time you log in.");
  };
}

portfolioGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".portfolio-card");
  if (!card || card.classList.contains("hidden")) return;
  openPortfolioDetail(card);
});

if (closePortfolioDetailBtn) {
  closePortfolioDetailBtn.addEventListener("click", () => {
    portfolioDetailModal.classList.add("hidden");
    portfolioDetailModal.setAttribute("aria-hidden", "true");
  });
}

portfolioDetailModal.addEventListener("click", (event) => {
  if (event.target === portfolioDetailModal) {
    portfolioDetailModal.classList.add("hidden");
    portfolioDetailModal.setAttribute("aria-hidden", "true");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && portfolioDetailModal && !portfolioDetailModal.classList.contains("hidden")) {
    portfolioDetailModal.classList.add("hidden");
    portfolioDetailModal.setAttribute("aria-hidden", "true");
  }
});

// Initialize everything when page loads
window.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded - setting up login button");
  
  const openLoginBtn = document.getElementById("openLoginBtn");
  console.log("Found login button:", openLoginBtn);
  
  if (openLoginBtn) {
    openLoginBtn.addEventListener('click', function() {
      console.log("Login button clicked!");
      openAuthModal();
    });
    console.log("Login button event listener added");
  }
  
  // Initialize other functions
  loadCustomWorks();
  loadProfilePhoto();
  setAdminUIState(isAdminLoggedIn());
  applyFilter("all");
  updateDashboardStats();
});

// Backup initialization
document.addEventListener('DOMContentLoaded', function() {
  // Double-check login button setup
  setTimeout(function() {
    const btn = document.getElementById("openLoginBtn");
    if (btn && !btn.onclick) {
      btn.onclick = function() {
        openAuthModal();
      };
      console.log("Backup login handler attached");
    }
  }, 500);
});

function openAuthModal() {
  console.log("openAuthModal called");
  console.log("loginModal:", loginModal);
  console.log("setupPanel:", setupPanel);
  console.log("loginPanel:", loginPanel);
  
  if (!loginModal) {
    console.error("loginModal not found!");
    alert("Login system error. Please refresh the page.");
    return;
  }
  
  loginModal.classList.remove("hidden");
  loginModal.setAttribute("aria-hidden", "false");
  
  const hasCredentialsResult = hasCredentials();
  console.log("Has credentials:", hasCredentialsResult);
  
  if (hasCredentialsResult) {
    console.log("Has credentials - showing login panel");
    if (setupPanel) setupPanel.classList.add("hidden");
    if (loginPanel) loginPanel.classList.remove("hidden");
  } else {
    console.log("No credentials - showing setup panel");
    if (setupPanel) setupPanel.classList.remove("hidden");
    if (loginPanel) loginPanel.classList.add("hidden");
  }
}

function hasCredentials() {
  const raw = localStorage.getItem(CREDENTIALS_KEY);
  if (!raw) return false;
  try {
    const c = JSON.parse(raw);
    return Boolean(c && c.email && c.passwordHash);
  } catch {
    return false;
  }
}

function getCredentials() {
  const raw = localStorage.getItem(CREDENTIALS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function saveCredentials(email, password) {
  const passwordHash = await sha256Hex(password);
  const data = {
    email: email.toLowerCase().trim(),
    passwordHash,
  };
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(data));
}

async function verifyLogin(email, password) {
  const cred = getCredentials();
  if (!cred) return false;
  const hash = await sha256Hex(password);
  return cred.email === email.toLowerCase().trim() && cred.passwordHash === hash;
}

async function sha256Hex(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function appendPortfolioCard({ title, category, description, image }) {
  const card = document.createElement("article");
  card.className = "portfolio-card";
  card.dataset.category = category;
  card.innerHTML = `
    <img src="${image}" alt="${escapeHtml(title)}" />
    <div class="portfolio-overlay">
      <h3>${escapeHtml(title)}</h3>
      <p class="portfolio-category">${formatCategory(category)}</p>
      <p class="portfolio-desc">${escapeHtml(description)}</p>
      <span class="view-details-link">View Details</span>
    </div>
  `;
  portfolioGrid.prepend(card);
}

function applyFilter(filter) {
  const cards = document.querySelectorAll(".portfolio-card");
  cards.forEach((card) => {
    const category = card.dataset.category;
    const shouldShow = filter === "all" || category === filter;
    card.classList.toggle("hidden", !shouldShow);
  });
}

function getActiveFilter() {
  const activeBtn = document.querySelector(".filter-btn.active");
  return activeBtn ? activeBtn.dataset.filter : "all";
}

function loadCustomWorks() {
  const works = getCustomWorks();
  works.forEach(appendPortfolioCard);
}

function getCustomWorks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCustomWorks(works) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
}

function isAdminLoggedIn() {
  return Boolean(localStorage.getItem(AUTH_KEY));
}

function setAdminUIState(isLoggedIn) {
  adminTools.classList.toggle("hidden", !isLoggedIn);
  changePhotoBtn.classList.toggle("hidden", !isLoggedIn);
  
  // Toggle between login button and profile dropdown
  if (openLoginBtn) openLoginBtn.classList.toggle("hidden", isLoggedIn);
  if (logoutBtn) logoutBtn.classList.add("hidden"); // Always hide old logout button
  if (profileDropdown) profileDropdown.classList.toggle("hidden", !isLoggedIn);
  
  adminStatus.textContent = isLoggedIn
    ? "Admin is logged in. Use the profile menu in the top-right corner to manage settings."
    : "Admin is logged out. Login with your email and password to manage the site.";
  
  if (isLoggedIn) {
    updateProfileDropdownInfo();
    loadTheme();
  }
}

function updateProfileDropdownInfo() {
  const cred = getCredentials();
  if (cred && dropdownEmail) {
    dropdownEmail.textContent = cred.email;
  }
  
  // Update profile photos
  const savedPhoto = localStorage.getItem(PROFILE_PHOTO_KEY);
  if (savedPhoto) {
    updateAllProfilePhotos(savedPhoto);
  }
}

function updateAllProfilePhotos(imageDataUrl) {
  if (profilePhoto) profilePhoto.src = imageDataUrl;
  if (navProfilePhoto) navProfilePhoto.src = imageDataUrl;
  if (dropdownProfilePhoto) dropdownProfilePhoto.src = imageDataUrl;
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = '<span class="dropdown-icon">☀️</span>Light Theme';
    }
  }
}

function populateCredentialFields() {
  const cred = getCredentials();
  const el = document.getElementById("credCurrentEmail");
  if (el && cred) {
    el.value = cred.email;
  }
}

function loadProfilePhoto() {
  const savedPhoto = localStorage.getItem(PROFILE_PHOTO_KEY);
  if (savedPhoto) {
    updateAllProfilePhotos(savedPhoto);
  } else {
    const defaultPhoto = "./assets/profile-placeholder.svg";
    updateAllProfilePhotos(defaultPhoto);
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read image file."));
    reader.readAsDataURL(file);
  });
}

function formatCategory(category) {
  const map = {
    murals: "Murals",
    interiors: "Interiors",
    sculptures: "Sculptures",
    paintings: "Paintings",
  };
  return map[category] || category;
}

function sendEmailNotification(entry) {
  // Initialize EmailJS (you'll need to set this up)
  if (typeof emailjs !== 'undefined') {
    const templateParams = {
      to_email: 'manojbodade@gmail.com', // Admin email
      from_name: entry.name,
      from_email: entry.email,
      phone: entry.phone || 'Not provided',
      project_type: entry.projectType,
      message: entry.message,
      submission_date: new Date(entry.at).toLocaleString()
    };
    
    // You need to replace these with your EmailJS credentials
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
      .then(function(response) {
        console.log('Email sent successfully:', response);
      })
      .catch(function(error) {
        console.log('Email failed to send:', error);
        // Fallback: show admin a popup with the details
        showAdminNotification(entry);
      });
  } else {
    // Fallback if EmailJS is not available
    showAdminNotification(entry);
  }
}

function showAdminNotification(entry) {
  // Create a notification for admin
  const notification = document.createElement('div');
  notification.className = 'admin-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <h4>🔔 New Booking Request!</h4>
      <p><strong>Name:</strong> ${entry.name}</p>
      <p><strong>Email:</strong> ${entry.email}</p>
      <p><strong>Phone:</strong> ${entry.phone || 'Not provided'}</p>
      <p><strong>Project:</strong> ${entry.projectType}</p>
      <p><strong>Message:</strong> ${entry.message}</p>
      <button onclick="this.parentElement.parentElement.remove()">Close</button>
    </div>
  `;
  document.body.appendChild(notification);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 10000);
}
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getBookings() {
  const raw = localStorage.getItem(BOOKINGS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function countPortfolioCards() {
  return document.querySelectorAll("#portfolioGrid .portfolio-card").length;
}

function updateDashboardStats() {
  const total = countPortfolioCards();
  const bookings = getBookings();
  const bookingCount = bookings.length;
  const active =
    total > 0 ? Math.min(20, Math.max(1, Math.round(total * 0.12))) : 0;

  const elTotal = document.getElementById("statTotal");
  const elActive = document.getElementById("statActive");
  const elClient = document.getElementById("statClient");
  const elBookings = document.getElementById("statBookings");
  const elCta = document.getElementById("totalWorksCta");

  if (elTotal) elTotal.textContent = String(total);
  if (elActive) elActive.textContent = String(active);
  if (elClient) elClient.textContent = String(bookingCount);
  if (elBookings) elBookings.textContent = String(bookingCount);
  if (elCta) elCta.textContent = String(total);
  
  // Update bookings display
  updateBookingsDisplay(bookings);
}

function updateBookingsDisplay(bookings) {
  const container = document.getElementById("bookingsContainer");
  if (!container) return;
  
  if (bookings.length === 0) {
    container.innerHTML = '<p class="no-bookings">No booking requests yet.</p>';
    return;
  }
  
  const bookingsHtml = bookings
    .sort((a, b) => new Date(b.at) - new Date(a.at)) // Sort by newest first
    .slice(0, 10) // Show only last 10
    .map(booking => `
      <div class="booking-card">
        <div class="booking-header">
          <h4>${escapeHtml(booking.name)}</h4>
          <span class="booking-date">${new Date(booking.at).toLocaleDateString()}</span>
        </div>
        <div class="booking-details">
          <p><strong>📧 Email:</strong> <a href="mailto:${escapeHtml(booking.email)}">${escapeHtml(booking.email)}</a></p>
          ${booking.phone ? `<p><strong>📞 Phone:</strong> <a href="tel:${escapeHtml(booking.phone)}">${escapeHtml(booking.phone)}</a></p>` : ''}
          <p><strong>🎨 Project:</strong> ${escapeHtml(booking.projectType)}</p>
          <p><strong>💬 Message:</strong> ${escapeHtml(booking.message)}</p>
        </div>
        <div class="booking-actions">
          <button class="btn btn-sm" onclick="replyToBooking('${escapeHtml(booking.email)}', '${escapeHtml(booking.name)}')">Reply</button>
          <button class="btn btn-sm btn-outline" onclick="markAsContacted('${booking.at}')">Mark as Contacted</button>
        </div>
      </div>
    `).join('');
  
  container.innerHTML = bookingsHtml;
}

function replyToBooking(email, name) {
  const subject = `Re: Your Project Inquiry - Artisan Studio`;
  const body = `Dear ${name},\n\nThank you for your interest in Artisan Studio. I'd be happy to discuss your project requirements.\n\nBest regards,\nManoj Janardhan Bodade\nArtisan Studio\n+91 7385524077`;
  
  window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
}

function markAsContacted(timestamp) {
  const bookings = getBookings();
  const updatedBookings = bookings.map(booking => {
    if (booking.at === timestamp) {
      return { ...booking, contacted: true };
    }
    return booking;
  });
  
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
  updateDashboardStats();
  alert("Marked as contacted!");
}

function openPortfolioDetail(card) {
  const img = card.querySelector("img");
  const titleEl = card.querySelector("h3");
  const catEl = card.querySelector(".portfolio-category");
  const descEl = card.querySelector(".portfolio-desc");

  const title = titleEl ? titleEl.textContent.trim() : "";
  const category = catEl ? catEl.textContent.trim() : "";
  const desc = descEl ? descEl.textContent.trim() : "";

  if (!img) return;

  document.getElementById("portfolioDetailImg").src = img.src;
  document.getElementById("portfolioDetailImg").alt = title;
  document.getElementById("portfolioDetailCategory").textContent = category;
  document.getElementById("portfolioDetailTitle").textContent = title;
  document.getElementById("portfolioDetailDesc").textContent = desc || "No description.";

  portfolioDetailModal.classList.remove("hidden");
  portfolioDetailModal.setAttribute("aria-hidden", "false");
}
function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}