const input = document.querySelector('input#todo-title');
const sectionResponse = document.querySelector('section#response');
const inputSearch = document.getElementById('todo-search')
const storageKey = '@to.do-example';

function getTodos() {
  const data = localStorage.getItem(storageKey);

  if (data) {
    const dataParsed = JSON.parse(data);

    return dataParsed.todos
  }

  return [];
}

function removeAllTodos() {
  const articles = sectionResponse.querySelectorAll('article')

  articles.forEach(article => sectionResponse.removeChild(article))
}

inputSearch.addEventListener('keyup', (e) => {
  removeAllTodos()

  const todosList = getTodos()

  const todosFiltered = todosList.filter(todo => todo.title.toLowerCase().includes(e.target.value.toLowerCase()))

  for (const todo of todosFiltered) {
    addTodo(todo)
  }
})

function saveTodos(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function filterTodos(data) {
  const article = document.createElement('article');
  const articleDiv = document.createElement('div');
  const divCheck = document.createElement('div');
  const p = document.createElement('p');
  const buttonDelete = document.createElement('button');
  const img = document.createElement('img');

  divCheck.className = 'check';
  buttonDelete.type = 'button';
  buttonDelete.id = 'button-delete';
  img.src = './assets/trash.svg';
  p.innerText = data.title;

  if (data.isDone) {
    divCheck.style.background = '#28b463'
    article.classList.add('done');
  }

  buttonDelete.appendChild(img);
  article.id = data.id;
  article.appendChild(articleDiv);
  articleDiv.appendChild(divCheck);
  articleDiv.appendChild(p);
  article.appendChild(buttonDelete);
  sectionResponse.appendChild(article);

  divCheck.addEventListener('click', () => changeDone(data.id));
  buttonDelete.addEventListener('click', () => removeTodo(data.id));
}

function addTodo(data) {
  const article = document.createElement('article');
  const articleDiv = document.createElement('div');
  const divCheck = document.createElement('div');
  const p = document.createElement('p');
  const buttonDelete = document.createElement('button');
  const img = document.createElement('img');

  divCheck.className = 'check';
  buttonDelete.type = 'button';
  buttonDelete.id = 'button-delete';
  img.src = './assets/trash.svg';
  p.innerText = data.title;

  if (data.isDone) {
    divCheck.style.background = '#28b463'
    article.classList.add('done');
  }

  buttonDelete.appendChild(img);
  article.id = data.id;
  article.appendChild(articleDiv);
  articleDiv.appendChild(divCheck);
  articleDiv.appendChild(p);
  article.appendChild(buttonDelete);
  sectionResponse.appendChild(article);

  divCheck.addEventListener('click', () => changeDone(data.id));
  buttonDelete.addEventListener('click', () => removeTodo(data.id));
}

function handleAddTodo() {
  if (!input.value) {
    alert('Digite o nome da tarefa!');
    return;
  }

  const id = Math.random();

  const newTodo = {
    id,
    title: input.value,
    isDone: false,
  };

  addTodo(newTodo);

  const todos = getTodos();
  todos.push(newTodo);

  saveTodos({ todos });

  input.value = '';
  input.focus();
}

function changeDone(id) {
  const article = document.getElementById(id);
  const divCheck = article.querySelector('div.check')

  const todos = getTodos();

  if (article.classList.contains('done')) {
    divCheck.style.background = '#ecf0f1'
    article.classList.remove('done');

    const todosMapped = todos.map((todoMapped) => {
      if (todoMapped.id === id) {
        return {
          ...todoMapped,
          isDone: false,
        };
      }

      return {
        ...todoMapped,
      };
    });

    saveTodos({ todos: todosMapped })
  } else {
    divCheck.style.background = '#28b463'
    article.classList.add('done');

    const todosMapped = todos.map((todoMapped) => {
      if (todoMapped.id === id) {
        return {
          ...todoMapped,
          isDone: true,
        };
      }

      return {
        ...todoMapped,
      };
    });

    saveTodos({ todos: todosMapped })
  }
}

function removeTodo(id) {
  const articleToRemove = document.getElementById(id);

  const todos = getTodos()

  const todosFiltered = todos.filter(todo => todo.id !== id)

  saveTodos({ todos: todosFiltered })

  sectionResponse.removeChild(articleToRemove);
}

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleAddTodo()
  }
})

function loadTodos() {
  const todosList = getTodos();

  for (const todo of todosList) {
    addTodo(todo);
  }
}

loadTodos();



