// 翻訳データ (増えるにつれて外部JSONファイルなどに分割することを推奨)
const translations = {
    'ja': {
        'home': 'Home',
        'about_us': 'About us',
        'for_japan': 'For Japan',
        'for_overseas': 'For overseas',
        'partners': 'Partners',
        'contact': 'お問い合わせ ✉', // Contactボタンのテキストも翻訳
        'current_lang_display': '日本語', // ドロップダウンボタンに表示されるテキスト
        'hero_h1': 'Bridging Global Innovation to Japan',
        'hero_p': '海外AI・SaaS企業の日本展開を最速で支援'
    },
    'en': {
        'home': 'Home',
        'about_us': 'About us',
        'for_japan': 'For Japan',
        'for_overseas': 'For overseas',
        'partners': 'Partners',
        'contact': 'Contact ✉',
        'current_lang_display': 'English',
        'hero_h1': 'Bridging Global Innovation to Japan',
        'hero_p': 'Accelerating market entry for overseas AI/SaaS companies in Japan'
    }
};

// --- ドロップダウンメニューの制御 ---
const langToggleButton = document.getElementById('lang-toggle-button');
const langDropdown = document.getElementById('lang-dropdown');
const currentLangDisplay = document.getElementById('current-lang-display');

// langToggleButton がnullでないことを確認してからイベントリスナーを追加
if (langToggleButton) {
    langToggleButton.addEventListener('click', (event) => {
        event.stopPropagation(); // ドキュメントのクリックイベントが発火しないようにする
        if (langDropdown) {
            langDropdown.classList.toggle('show');
        }
    });
}


// ドロップダウン以外の場所をクリックしたら閉じる
document.addEventListener('click', (event) => {
    // langToggleButton と langDropdown が両方とも存在するか確認
    if (langToggleButton && langDropdown) {
        if (!langToggleButton.contains(event.target) && !langDropdown.contains(event.target)) {
            langDropdown.classList.remove('show');
        }
    }
});


// --- 言語切り替えロジック ---
function applyTranslations(lang) {
    // 現在の言語表示を更新
    if (currentLangDisplay) {
        currentLangDisplay.textContent = translations[lang]['current_lang_display'];
    }

    // ナビゲーションリンクのテキストを更新
    const navItems = document.querySelectorAll('.main-nav li a');
    if (navItems[0]) navItems[0].textContent = translations[lang]['home'];
    if (navItems[1]) navItems[1].textContent = translations[lang]['about_us'];
    if (navItems[2]) navItems[2].textContent = translations[lang]['for_japan'];
    if (navItems[3]) navItems[3].textContent = translations[lang]['for_overseas'];
    if (navItems[4]) navItems[4].textContent = translations[lang]['partners'];
    
    // Contactボタンのテキストを更新
    const contactButton = document.querySelector('.contact-button');
    if (contactButton) {
        contactButton.textContent = translations[lang]['contact'];
    }

    // ヒーローセクションのテキストを更新
    const heroH1 = document.querySelector('.hero-text h1');
    const heroP = document.querySelector('.hero-text p');
    if (heroH1) {
        heroH1.textContent = translations[lang]['hero_h1'];
    }
    if (heroP) {
        heroP.textContent = translations[lang]['hero_p'];
    }

    // HTMLタグのlang属性も更新 (SEOにも影響)
    document.documentElement.lang = lang;
    
    // ドロップダウンを閉じる
    if (langDropdown) {
        langDropdown.classList.remove('show');
    }
}

// 言語オプションクリック時の処理
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault(); // デフォルトのリンク動作をキャンセル
        const newLang = option.dataset.lang;
        localStorage.setItem('selectedLang', newLang); // 選択された言語を保存
        applyTranslations(newLang); // 翻訳を適用
    });
});

// ページ読み込み時に保存された言語、またはデフォルト言語を適用
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'en'; // デフォルトは英語
    applyTranslations(savedLang);
});