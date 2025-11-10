const translations = {
    'ja': {
        'home': 'ホーム',
        'about_us': '会社概要',
        'products': '製品', // HTMLに合わせたキー
        'news': 'ニュース',   // HTMLに合わせたキー
        'recruit': '採用情報', // HTMLに合わせたキー
        'contact': 'お問い合わせ ✉',
        'current_lang_display': '日本語',
        'hero_h1': 'Bridging Global Innovation to Japan',
        'hero_p': '海外AI・SaaS企業の日本展開を最速で支援'
    },
    'en': {
        'home': 'Home',
        'about_us': 'About us',
        'products': 'Products',
        'news': 'News',
        'recruit': 'Recruit',
        'contact': 'Contact ✉',
        'current_lang_display': 'English',
        'hero_h1': 'Bridging Global Innovation to Japan',
        'hero_p': 'Accelerating market entry for overseas AI/SaaS companies in Japan'
    }
};

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. 要素の取得 ---
    
    // ハンバーガーメニュー
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.main-nav');

    // PC版の言語選択要素
    const langToggleButtonDesktop = document.getElementById('lang-toggle-button-desktop');
    const langDropdownDesktop = document.getElementById('lang-dropdown-desktop');

    // モバイル版の言語選択要素
    const langToggleButtonMobile = document.getElementById('lang-toggle-button-mobile');
    const langDropdownMobile = document.getElementById('lang-dropdown-mobile');


    // --- 2. ハンバーガーメニューの制御 (開閉機能) ---
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('open');
            document.body.classList.toggle('no-scroll', nav.classList.contains('open'));
            
            // ハンバーガーメニューを閉じるときに、モバイルドロップダウンを閉じる
            if (!nav.classList.contains('open') && langDropdownMobile) {
                langDropdownMobile.classList.remove('show');
            }
        });
    }


    // --- 3. ドロップダウン機能の設定 (PC/モバイル共通) ---

    // ドロップダウン機能の共通関数
    function setupDropdown(button, dropdown, otherDropdown) {
        if (button && dropdown) {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdown.classList.toggle('show'); 
                
                if (otherDropdown && otherDropdown.classList.contains('show')) {
                    otherDropdown.classList.remove('show');
                }
            });
        }
    }

    setupDropdown(langToggleButtonDesktop, langDropdownDesktop, langDropdownMobile);
    setupDropdown(langToggleButtonMobile, langDropdownMobile, langDropdownDesktop);


    // --- 4. ドキュメントクリックで閉じる処理 ---
    document.addEventListener('click', (event) => {
        // PC版を閉じる
        if (langToggleButtonDesktop && langDropdownDesktop) {
            if (!langToggleButtonDesktop.contains(event.target) && !langDropdownDesktop.contains(event.target)) {
                langDropdownDesktop.classList.remove('show');
            }
        }
        // モバイル版を閉じる
        if (langToggleButtonMobile && langDropdownMobile) {
            if (!langToggleButtonMobile.contains(event.target) && !langDropdownMobile.contains(event.target)) {
                langDropdownMobile.classList.remove('show');
            }
        }
    });


    // --- 5. 言語切り替えロジック ---
    function applyTranslations(lang) {
        // 現在の言語表示を更新 (両方)
        const desktopLangDisplay = document.getElementById('current-lang-display-desktop');
        if (desktopLangDisplay) {
            desktopLangDisplay.textContent = translations[lang]['current_lang_display'];
        }

        const mobileLangDisplay = document.getElementById('current-lang-display-mobile');
        if (mobileLangDisplay) {
            mobileLangDisplay.textContent = translations[lang]['current_lang_display'];
        }

        // ★★★ ナビゲーションリンクのテキストを更新 (HTMLとキーを同期) ★★★
        const navItems = document.querySelectorAll('.main-nav li a');
        if (navItems[0]) navItems[0].textContent = translations[lang]['home'];
        if (navItems[1]) navItems[1].textContent = translations[lang]['about_us'];
        if (navItems[2]) navItems[2].textContent = translations[lang]['products'];
        if (navItems[3]) navItems[3].textContent = translations[lang]['news'];
        if (navItems[4]) navItems[4].textContent = translations[lang]['recruit'];
        
        // Contactボタンのテキストを更新 (両方)
        const contactButtonDesktop = document.querySelector('.contact-button.desktop-only');
        const contactButtonMobile = document.querySelector('.contact-button.mobile-only');
        if (contactButtonDesktop) contactButtonDesktop.textContent = translations[lang]['contact'];
        if (contactButtonMobile) contactButtonMobile.textContent = translations[lang]['contact'];
        
        // ヒーローセクションのテキストを更新
        const heroH1 = document.querySelector('.hero-text h1');
        const heroP = document.querySelector('.hero-text p');
        if (heroH1) heroH1.textContent = translations[lang]['hero_h1'];
        if (heroP) heroP.textContent = translations[lang]['hero_p'];
        
        document.documentElement.lang = lang;
        
        // ドロップダウンを閉じる (両方)
        if (langDropdownDesktop) langDropdownDesktop.classList.remove('show');
        if (langDropdownMobile) langDropdownMobile.classList.remove('show');
    }

    // 言語オプションクリック時の処理
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (event) => {
            event.preventDefault(); 
            const newLang = option.dataset.lang;
            localStorage.setItem('selectedLang', newLang);
            applyTranslations(newLang);
        });
    });

    // ページ読み込み時に言語を適用
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    applyTranslations(savedLang);

});