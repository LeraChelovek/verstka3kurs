/*
    window.onload = function() {
    // Ждем еще немного для полной гарантии
    setTimeout(initHamburgerMenu, 100);
};

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}*/
  
window.onload = function() {
    console.log('✅ Страница полностью загружена');
    setTimeout(initHamburgerMenu, 100);
};

function initHamburgerMenu() {
    console.log('🚀 Функция initHamburgerMenu запущена');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Найден hamburger:', hamburger);
    console.log('Найден navMenu:', navMenu);
    
    if (hamburger && navMenu) {
        console.log('✅ Оба элемента найдены, вешаем обработчики');
        
        hamburger.addEventListener('click', function() {
            console.log('🎯 Клик по гамбургеру');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            console.log('Hamburger классы:', hamburger.className);
            console.log('NavMenu классы:', navMenu.className);
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        console.log('Найдено navLinks:', navLinks.length);
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('🔗 Клик по ссылке меню');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    } else {
        console.error('❌ Элементы не найдены!');
        console.error('Hamburger:', hamburger);
        console.error('NavMenu:', navMenu);
    }
}