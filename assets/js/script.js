// ========== 全局变量 ==========
let isScrolling = false;

// ========== DOM加载完成后执行 ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeParticles();
    initializeFilters();
    initializeAnimations();
    initializeBackToTop();
    initializeMobileMenu();
});

// ========== 导航栏功能 ==========
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 平滑滚动到目标section
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 更新活跃导航链接
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // 滚动时更新活跃导航链接
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            updateActiveNavLinkOnScroll();
        }
    });
}

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// ========== 移动端菜单 ==========
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 点击菜单项时关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========== 粒子效果 ==========
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 20 + 10}s infinite linear;
    `;
    
    container.appendChild(particle);
}

// CSS动画添加到样式表
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== 滚动动画 ==========
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('.essay-card, .academic-card, .gallery-item, .about-card, .profile-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ========== 筛选功能 ==========
function initializeFilters() {
    // 学术分享筛选
    initializeAcademicFilter();
    
    // 作品集筛选
    initializeGalleryFilter();
}

function initializeAcademicFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const academicCards = document.querySelectorAll('.academic-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // 更新按钮状态
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 筛选卡片
            academicCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 筛选项目
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========== 其他动画效果 ==========
function initializeAnimations() {
    // 统计数字动画
    animateCounters();
    
    // 技能标签动画
    animateSkillTags();
    
    // 卡片悬停效果
    initializeCardEffects();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.7
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 40);
}

function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.style.animation = 'fadeInScale 0.6s ease forwards';
    });
    
    // 添加动画样式
    const skillAnimationStyle = document.createElement('style');
    skillAnimationStyle.textContent = `
        @keyframes fadeInScale {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        .skill-tag {
            opacity: 0;
        }
    `;
    document.head.appendChild(skillAnimationStyle);
}

function initializeCardEffects() {
    const cards = document.querySelectorAll('.essay-card, .academic-card, .about-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ========== 返回顶部按钮 ==========
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== 打字机效果 ==========
function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const text = '你好，我是 Gemorion';
    let index = 0;
    
    typingText.textContent = '';
    
    function typeChar() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, 150);
        }
    }
    
    setTimeout(typeChar, 1000);
}

// ========== 滚动进度条 ==========
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ========== 懒加载图片 ==========
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========== 页面加载完成后执行额外初始化 ==========
window.addEventListener('load', () => {
    initializeTypingEffect();
    initializeScrollProgress();
    initializeLazyLoading();
    
    // 创建默认头像
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.onerror = function() {
            this.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = 'white';
            this.style.fontSize = '3rem';
            this.style.fontWeight = 'bold';
            this.innerHTML = 'Gemorion';
        };
        
        // 触发错误事件以显示默认头像
        profileImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }
});

// ========== 性能优化：节流函数 ==========
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== 工具函数 ==========
function getRandomColor() {
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
}

// ========== 导出函数供外部使用 ==========
window.WebsiteUtils = {
    animateCounter,
    throttle,
    getRandomColor,
    formatDate
};
