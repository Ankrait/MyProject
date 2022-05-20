function dropDown(nameSelect) {


   /*******************
   Создание стилизованного класса select 
   *******************/
   const selectEl = document.querySelector('.' + nameSelect);
   selectEl.classList.add('s__hidden'); // спрятать основной блок select

   const selectElOptions = selectEl.querySelectorAll('option');
   let numOfSelected = 0; // номер выбранного в данный момент элемента

   // Добавление блока с данным списком
   const sSelectEl = document.createElement('div');
   sSelectEl.classList.add("stylized__" + nameSelect);
   sSelectEl.classList.add("stylized__select");

   selectEl.parentNode.after(sSelectEl);
   sSelectEl.innerHTML = `
      <div tabindex = "0" class = "sSelect__button"></div>
      <ul class = "sSelect__options">
      </ul>
   `;

   const sSelectElUl = sSelectEl.querySelector('ul');
   const sSelectElButton = sSelectEl.querySelector('.sSelect__button');

   // Передача информации из option в li
   selectElOptions.forEach((element, index) => {
      const liOption = document.createElement('li');
      liOption.dataset.value = element.value;
      liOption.innerText = element.innerText;

      if (element.selected) {
         sSelectElButton.innerText = element.innerText;
         numOfSelected = index;
      }

      sSelectElUl.append(liOption);
   });

   const sSelectElUlLi = sSelectElUl.querySelectorAll('li');
   sSelectElUlLi.forEach(element => {
      element.classList.add("sSelect__options-items");
   }); // класс для li


   /*******************
   Логика списка 
   *******************/

   // Открыть закрыть список
   sSelectElButton.addEventListener('click', function () {
      // sSelectElUl.classList.toggle('s__hidden-opacity');
      this.classList.add('sSelect__button--focus');
      toggleOpacity(sSelectElUl);
   });


   // Нажатие на элементы списка
   sSelectElUlLi.forEach((element, index) => {
      element.addEventListener('click', function () {
         sSelectElButton.innerText = this.innerText;

         selectEl.selectedIndex = index;

         // sSelectElUl.classList.remove('s__hidden-opacity');
         removeOpacity(sSelectElUl);

         sSelectElButton.focus();

      });
   });


   // Зыкрыть список по нажатию за блок
   document.addEventListener('mousedown', function (e) {
      let mouseClickOn = e.target.closest('.sSelect__options') || e.target.closest('.sSelect__button');

      if (mouseClickOn == null) {
         removeOpacity(sSelectElUl);

         sSelectElButton.classList.remove('sSelect__button--focus');
      }
   });


   // Закрытие на ecs и tab
   document.addEventListener('keydown', function (e) {
      if (e.key == 'Tab' || e.key == 'Escape') {
         //sSelectElUl.classList.remove('s__hidden-opacity');
         removeOpacity(sSelectElUl);

         sSelectElButton.classList.remove('sSelect__button--focus');
      }
   });
}

function addOpacity(element) {
   element.classList.add('s__active');
   setTimeout(() => element.classList.add('s__active-opacity'), 40);
}

function removeOpacity(element) {
   element.classList.remove('s__active-opacity');

   setTimeout(() => element.classList.remove('s__active'), 200);
}

function toggleOpacity(element) {
   if (element.classList.contains('s__active') && element.classList.contains('s__active-opacity')) {
      removeOpacity(element);
   }
   else {
      addOpacity(element);
   }
}

dropDown("select");