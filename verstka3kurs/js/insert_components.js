// Функция для загрузки компонентов
function loadComponent(componentId, filePath) {
    console.log(`Loading ${componentId} from ${filePath}`);
    
    fetch(filePath)
        .then(response => {
            console.log(`Response status for ${filePath}:`, response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(componentId);
            if (element) {
                element.innerHTML = data;
                console.log(`Component ${componentId} loaded successfully`);
            } else {
                console.error(`Element with id ${componentId} not found`);
            }
        })
        .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// Загружаем все компоненты при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, loading components...');
    loadComponent('header', 'components/header.html');
    loadComponent('menu', 'components/menu.html');
    loadComponent('footer', 'components/footer.html');
});