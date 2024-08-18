// Получаем ссылки на элементы
const itemSelect = document.getElementById('itemSelect');
const itemInput = document.getElementById('itemInput');
const saveButton = document.getElementById('saveButton');

// Функция для обновления поля ввода при выборе элемента из списка
itemSelect.addEventListener('change', () => {
    const selectedItemText = itemSelect.options[itemSelect.selectedIndex].text;
    itemInput.value = selectedItemText;
    itemInput.classList.remove('error'); 
    itemInput.placeholder = '';
});

// Изначальное заполнение поля ввода текстом выбранного элемента
itemInput.value = itemSelect.options[itemSelect.selectedIndex].text;

// Функция для сохранения изменений и обновления текста в списке
saveButton.addEventListener('click', () => {
    let newText = itemInput.value.trim();

    if (newText === '') {
        itemInput.classList.add('error'); 
        itemInput.placeholder = 'Введите текст';
        return;
    }

    const selectedIndex = itemSelect.selectedIndex;

    // Обновляем текст в выпадающем списке
    itemSelect.options[selectedIndex].text = newText;

    itemInput.classList.remove('error'); 
    itemInput.placeholder = '';
});
