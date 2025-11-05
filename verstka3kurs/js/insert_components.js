// Функция для загрузки компонентов
function loadComponent(componentId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(componentId).innerHTML = data;
            console.log(`Component ${componentId} loaded`);
        })
        .catch(error => console.error('Error loading component:', error));
}

// Загружаем все компоненты при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, loading components...');
    loadComponent('header', 'components/header.html');
    loadComponent('menu', 'components/menu.html');
    loadComponent('footer', 'components/footer.html');
});


