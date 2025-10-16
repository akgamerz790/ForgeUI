// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Use in-memory theme storage instead of localStorage
let currentTheme = 'auto';
html.setAttribute('data-bs-theme', currentTheme);

// Update button icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'bi bi-moon-fill';
    } else {
        icon.className = 'bi bi-sun-fill';
    }
}

updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-bs-theme', newTheme);
    currentTheme = newTheme;
    updateThemeIcon(newTheme);
});

// Form Validation
const forms = document.querySelectorAll('.needs-validation');
forms.forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    });
});

// Password Toggle Function
function togglePassword() {
    const passwordInput = document.getElementById('userPassword');
    const toggleIcon = document.getElementById('passwordToggle');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'bi bi-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'bi bi-eye';
    }
}

// Range Input Update
function updateRange(value) {
    document.getElementById('rangeValue').textContent = value + ' years';
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Chart.js Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Sales',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Traffic Chart
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx) {
        new Chart(trafficCtx, {
            type: 'doughnut',
            data: {
                labels: ['Direct', 'Social', 'Referral', 'Email'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#6366f1',
                        '#8b5cf6',
                        '#10b981',
                        '#f59e0b'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.card, .stats-card, .feature-icon').forEach(el => {
    observer.observe(el);
});

// Mobile Sidebar Toggle (for responsive design)
const sidebarToggle = document.createElement('button');
sidebarToggle.className = 'btn btn-primary d-md-none position-fixed';
sidebarToggle.style.cssText = 'top: 80px; left: 10px; z-index: 1000;';
sidebarToggle.innerHTML = '<i class="bi bi-list"></i>';

// Add click handler for mobile sidebar
sidebarToggle.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
});

// Add button to dashboard section only
const dashboardSection = document.querySelector('#dashboard');
if (dashboardSection) {
    dashboardSection.appendChild(sidebarToggle);
}

// Initialize tooltips and popovers
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});

// Add loading states to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.form && this.form.checkValidity()) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="spinner-border spinner-border-sm me-2"></i>Loading.';
            this.disabled = true;

            // Simulate loading time
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

console.log('BootstrapUI Pro Framework Loaded Successfully!');
