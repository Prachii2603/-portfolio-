// Quick fix for admin login button
console.log("Login fix loaded");

// Simple login function
function openAuthModal() {
  console.log("Opening auth modal");
  const modal = document.getElementById("loginModal");
  const setupPanel = document.getElementById("setupPanel");
  const loginPanel = document.getElementById("loginPanel");
  
  if (modal) {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    
    // Check if user has credentials
    const hasCredentials = localStorage.getItem("artisan_admin_credentials_v1");
    
    if (hasCredentials) {
      if (setupPanel) setupPanel.classList.add("hidden");
      if (loginPanel) loginPanel.classList.remove("hidden");
    } else {
      if (setupPanel) setupPanel.classList.remove("hidden");
      if (loginPanel) loginPanel.classList.add("hidden");
    }
  } else {
    alert("Login system not found. Please refresh the page.");
  }
}

// Close modal function
function closeAuthModal() {
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded - setting up login");
  
  // Add click handler to login button
  const loginBtn = document.getElementById("openLoginBtn");
  if (loginBtn) {
    loginBtn.onclick = openAuthModal;
    console.log("Login button handler added");
  }
  
  // Add click handler to close button
  const closeBtn = document.getElementById("closeLoginBtn");
  if (closeBtn) {
    closeBtn.onclick = closeAuthModal;
  }
  
  // Close modal when clicking outside
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.onclick = function(event) {
      if (event.target === modal) {
        closeAuthModal();
      }
    };
  }
});

console.log("Login fix script ready");