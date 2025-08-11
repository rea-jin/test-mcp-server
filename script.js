// スムーススクロール機能とエラーハンドリング
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeNavigation();
        initializeCTAButton();
        initializeContactForm();
        initializeScrollEffects();
        initializeAnimations();
        initializeSkillBars();
    } catch (error) {
        console.error('初期化エラー:', error);
    }
});

function initializeNavigation() {
    // ナビゲーションリンクのスムーススクロール
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            try {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // ヘッダーの高さを考慮
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.error('ナビゲーションエラー:', error);
            }
        });
    });
}

function initializeCTAButton() {
    // CTAボタンのクリックイベント
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            try {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    const offsetTop = projectsSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.error('CTAボタンエラー:', error);
            }
        });
    }
}

function initializeContactForm() {
    // フォーム送信イベント
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            try {
                e.preventDefault();
                
                // フォームデータを取得
                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                // 詳細なバリデーション
                if (!validateForm(name, email, message)) {
                    return;
                }
                
                // 実際のプロジェクトでは、ここでサーバーにデータを送信
                showSuccessMessage();
                
                // フォームをリセット
                this.reset();
            } catch (error) {
                console.error('フォーム送信エラー:', error);
                showErrorMessage('送信中にエラーが発生しました。再度お試しください。');
            }
        });
    }
}

function validateForm(name, email, message) {
    if (!name || name.trim().length < 2) {
        showErrorMessage('お名前は2文字以上で入力してください。');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showErrorMessage('有効なメールアドレスを入力してください。');
        return false;
    }
    
    if (!message || message.trim().length < 10) {
        showErrorMessage('メッセージは10文字以上で入力してください。');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    alert('お問い合わせありがとうございます！後ほどご連絡いたします。');
}

function showErrorMessage(message) {
    alert(message);
}

function initializeScrollEffects() {
    // スクロール時のナビゲーションハイライト
    window.addEventListener('scroll', function() {
        try {
            updateActiveNavigation();
        } catch (error) {
            console.error('スクロールエフェクトエラー:', error);
        }
    });
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });
}

function initializeAnimations() {
    // プロジェクトカードのアニメーション
    const projectCards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function initializeSkillBars() {
    // スキルバーのアニメーション
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                try {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    if (width) {
                        progressBar.style.width = width;
                        
                        // aria-valuenowを更新
                        const parentBar = progressBar.closest('.skill-bar');
                        if (parentBar) {
                            const numericValue = parseInt(width);
                            parentBar.setAttribute('aria-valuenow', numericValue);
                        }
                    }
                } catch (error) {
                    console.error('スキルバーアニメーションエラー:', error);
                }
            }
        });
    }, observerOptions);
    
    skillProgressBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ページロード時のアニメーション
window.addEventListener('load', function() {
    try {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
    } catch (error) {
        console.error('ページロードアニメーションエラー:', error);
    }
});

// キーボードナビゲーションのサポート
document.addEventListener('keydown', function(e) {
    try {
        // Enterキーでリンクをアクティベート
        if (e.key === 'Enter' && e.target.tagName === 'A') {
            e.target.click();
        }
        
        // Escキーでフォームをリセット
        if (e.key === 'Escape') {
            const activeForm = document.querySelector('.contact-form');
            if (activeForm && document.activeElement && activeForm.contains(document.activeElement)) {
                activeForm.reset();
            }
        }
    } catch (error) {
        console.error('キーボードイベントエラー:', error);
    }
});
