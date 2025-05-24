function newElement() {
    const inputElement = document.getElementById('myInput');
    const inputValue = inputElement.value.trim();
  
    //checking if input value is empty
    if (inputValue === '') {
      alert('Please enter a task!');
      inputElement.focus();
      return; //stop function if no input
    }
  
    //create list item
    const li = document.createElement('li');
  
    //create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        li.classList.toggle('checked', this.checked);
    });
  
    const textSpan = document.createElement('span');
    textSpan.textContent = inputValue;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function() {
        li.remove();
    });
   
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteButton);

    document.getElementById('list').appendChild(li);
  
    inputElement.value = '';
    inputElement.focus();
  }
  
  const mainInputField = document.getElementById('myInput');
  if (mainInputField) {
    mainInputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            newElement();
        }
    });
  }