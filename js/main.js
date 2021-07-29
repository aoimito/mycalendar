'use strict';

 {
   const today = new Date();
   let year = today.getFullYear();
   let month = today.getMonth();

   function getCalendarHead() {
     const dates = [];
     const d = new Date(year, month, 0).getDate();
     const n = new Date(year, month, 1).getDay();

     for (let i = 0; i < n; i++) {
       dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
       });
     }

     return dates;
   }

   function getCalendarBody() {
     const dates = [];
     const lastDate = new Date(year, month + 1, 0).getDate();

     for (let i = 1; i <= lastDate; i++) {
       dates.push({
        date: i,
        isToday: false, 
        isDisabled: false,
       });
     }

     if (year === today.getFullYear() && month === today.getMonth()) {
       dates[today.getDate() - 1].isToday = true;
     }

     return dates;
   }

   function getCalendarTail() {
     const dates = [];
     const lastDay = new Date(year, month + 1, 0).getDay();

     for (let i = 1; i < 7 - lastDay; i++) {
       dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
       });
     }

     return dates;
   }

   function clearCalendar() {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
   }

   function renderTitle() {
    const title = document.getElementById('title');
    title.textContent = `${year}/${String(month + 1).padStart(2, '0')}`;
   }

   function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
       const tr = document.createElement('tr');
       week.forEach(date => {
         const td = document.createElement('td');
         td.textContent = date.date;
         if (date.isToday) {
           td.classList.add('today');
         }
         if (date.isDisabled) {
           td.classList.add('disabled');
         }
         tr.appendChild(td);
       });
       document.querySelector('tbody').appendChild(tr);
     });

   }

   function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();     
   }

   document.getElementById('prev').addEventListener('click', () => {
     month--;
     if (month < 0) {
       year--;
       month = 11;
     }
     createCalendar();
   });

   document.getElementById('next').addEventListener('click', () => {
     month++;
     if (month > 11) {
       year++;
       month = 0;
     }
     createCalendar();
   });

   document.getElementById('today').addEventListener('click', () => {
     year = today.getFullYear();
     month = today.getMonth();
     createCalendar();
   });

   createCalendar();

  //  ModalWindow

   const open = document.getElementById('open');
   const close = document.getElementById('close');
   const mask = document.getElementById('mask');
   const modal = document.getElementById('modal');

   open.addEventListener('click', () => {
     mask.classList.remove('hidden');
     modal.classList.remove('hidden');
   });

   close.addEventListener('click', () => {
     mask.classList.add('hidden');
     modal.classList.add('hidden');
   });

   mask.addEventListener('click', () => {
     mask.classList.add('hidden');
     modal.classList.add('hidden');
   });

  //  Memo

  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const button = document.getElementById('button');
  const ul = document.getElementById('ul');

  const todos = JSON.parse(localStorage.getItem('todos'));

  if(todos) {
    todos.forEach(todo => {
      add(todo);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    add();
  });

  function add(todo) {
    let todoText = input.value;

    if (todo) {
      todoText = todo.text;
    }

    
    
    if (todoText) {
      const li = document.createElement('li');
      li.innerText = todoText;

      if (todo && todo.completed) {
        li.classList.add('completed');
      }

      button.addEventListener('click', (e) => {
        e.preventDefault();
        li.remove();
        saveData();
      });

      li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveData();
      });

      ul.appendChild(li);
      input.value = '';
      saveData();
    }
  }

  function saveData() {
    const lists = document.querySelectorAll('li');
    let todos = [];

    lists.forEach(list => {
      let todo = {
        text: list.innerText,
        completed: list.classList.contains('completed'),
      }
      todos.push(todo);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  
 }