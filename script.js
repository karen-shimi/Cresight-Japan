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
        'hero_p': '海外AI・SaaS企業の日本展開を最速で支援',
        'about-us-p1': 'Cresight Japanは、「世界の革新を、言語の壁なく日本へ」という理念のもと、海外のSaaS・AI企業と日本企業をつなぐ架け橋として設立されました。私たちは、海外で生まれた最先端のテクノロジーを日本の企業が活用できるよう、販売支援、ローカライゼーション、PoC(概念実証)による市場検証を包括的に行っています。',
        'about-us-p2': '日本では優れた海外ソリューションが数多く存在しながらも、言語や文化、契約の壁によって導入が進まないという課題があります。Cresight Japanはその障壁を取り払い、世界中の革新的な製品をスムーズに日本市場へ届けることを目指しています。',
        'about-us-p3': '私たちは、単なる販売代理ではなく「共に市場を創るパートナー」であることにこだわります。海外企業には日本での長期的な成長基盤を、日本企業には海外テクノロジーを最速で取り入れる手段を提供し、双方向の価値創造を実現します。',
        'about-us-p4': 'Cresight Japanは、世界のテクノロジーが日本の課題を解決し、日本から再び世界へと革新が循環していく未来を描いています。その橋の上に立ち、変化を実行するのが、私たちの役割です。'
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
        'hero_p': 'Accelerating market entry for overseas AI/SaaS companies in Japan',
        'about-us-p1': 'Cresight Japan was founded with the mission of “Delivering global innovation to Japan without language barriers.”We serve as a bridge between overseas SaaS and AI companies and Japanese enterprises, providing comprehensive support that includes sales representation, localization, and market validation through Proof of Concept (PoC) projects.',
        'about-us-p2': 'While Japan has a strong appetite for cutting-edge technology, many overseas products struggle to enter the market due to language, cultural, and procedural barriers. Cresight Japan eliminates those barriers and enables global solutions to reach Japan faster and more effectively.',
        'about-us-p3': 'We do not position ourselves merely as a distributor, but as a long-term partner who co-creates markets.For global companies, we help establish a sustainable presence in Japan. For Japanese enterprises, we provide seamless access to world-class technologies. Together, we create mutual value across borders.',
        'about-us-p4': 'At Cresight Japan, we envision a future where innovation circulates freely—global technologies solving Japan’s challenges, and Japanese innovation inspiring the world once again. Standing on that bridge, we turn this vision into reality.'
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
        

        // ★★★ About Us セクションのテキストを更新 ★★★
        const aboutUsTitle = document.getElementById('about-us-title');
        const aboutUsP1 = document.getElementById('about-us-p1');
        const aboutUsP2 = document.getElementById('about-us-p2');
        const aboutUsP3 = document.getElementById('about-us-p3');
        const aboutUsP4 = document.getElementById('about-us-p4');

        if (aboutUsTitle) aboutUsTitle.textContent = translations[lang]['about_us_title'];
        if (aboutUsP1) aboutUsP1.textContent = translations[lang]['about_us_p1'];
        if (aboutUsP2) aboutUsP2.textContent = translations[lang]['about-us-p2'];
        if (aboutUsP3) aboutUsP3.textContent = translations[lang]['about-us-p3'];
        if (aboutUsP4) aboutUsP4.textContent = translations[lang]['about-us-p4'];
        
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