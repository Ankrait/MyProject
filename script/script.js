"use strict"
//////////////// Блок цифр ////////////////

const numBlock = document.querySelector('.myres_num_block');

numBlock.addEventListener('mouseover', mouseOverNum);
numBlock.addEventListener('mouseout', mouseOutNum);

function mouseOverNum(event) {
   let numBlockEl = event.target.closest('span');
   if (numBlockEl)
      numBlockEl.classList.add('_active');
}

function mouseOutNum(event) {
   let numBlockEl = event.target.closest('span');
   if (numBlockEl)
      numBlockEl.classList.remove('_active');
}
//////////////// Блок цифр ////////////////


//////////////// Пеемещение блока ////////////////

const dragItem = document.querySelector('.drag_block_item');
const dragBlock = document.querySelector('.myres_drag_block')

dragItem.addEventListener("mousedown", mouseOnDrug);

function mouseOnDrug(event) {
   let mDragItemPosX = event.clientX - dragItem.getBoundingClientRect().left;
   let mDragItemPosY = event.clientY - dragItem.getBoundingClientRect().top;

   let dragItemSize = {
      width: dragItem.offsetWidth,
      height: dragItem.offsetHeight
   };

   let dragBlockSize = {
      top: scrollY + dragBlock.getBoundingClientRect().top,
      left: scrollX + dragBlock.getBoundingClientRect().left,
      right: scrollX + dragBlock.getBoundingClientRect().left + dragBlock.offsetWidth,
      bottom: scrollY + dragBlock.getBoundingClientRect().top + dragBlock.offsetHeight,
   };

   dragItem.style.position = 'absolute';
   dragItem.style.zIndex = 1000;
   document.body.append(dragItem);

   function moveDrag(pageX, pageY) {
      let currentDrugItemPosX = pageX - mDragItemPosX;
      let currentDrugItemPosY = pageY - mDragItemPosY;

      if (currentDrugItemPosX >= dragBlockSize.left && currentDrugItemPosX + dragItemSize.width <= dragBlockSize.right)
         dragItem.style.left = `${currentDrugItemPosX}px`;
      else {
         if (currentDrugItemPosX <= dragBlockSize.left)
            dragItem.style.left = `${dragBlockSize.left}px`;

         if (currentDrugItemPosX + dragItemSize.width >= dragBlockSize.right)
            dragItem.style.left = `${dragBlockSize.right - dragItemSize.width}px`;
      }

      if (currentDrugItemPosY >= dragBlockSize.top && currentDrugItemPosY + dragItemSize.height <= dragBlockSize.bottom)
         dragItem.style.top = `${currentDrugItemPosY}px`;
      else {
         if (currentDrugItemPosY <= dragBlockSize.top)
            dragItem.style.top = `${dragBlockSize.top}px`;

         if (currentDrugItemPosY + dragItemSize.height >= dragBlockSize.bottom)
            dragItem.style.top = `${dragBlockSize.bottom - dragItemSize.height}px`;
      }
   }

   moveDrag(event.pageX, event.pageY);

   let currentBox = null;

   function dragOnBox(event) {
      moveDrag(event.pageX, event.pageY)

      dragItem.hidden = true;
      let dragBox = document.elementFromPoint(event.clientX, event.clientY);
      dragItem.hidden = false;

      if (!dragBox) return;
      dragBox = dragBox.closest('.drag_block_box');

      if (currentBox != dragBox) {
         if (currentBox) {
            currentBox.classList.remove('_active');
         }

         currentBox = dragBox;

         if (currentBox) {
            currentBox.classList.add('_active');
         }
      }
   }

   document.addEventListener('mousemove', dragOnBox);
   document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', dragOnBox);
   }, { "once": true });
}

dragItem.addEventListener('dragstart', function (event) {
   event.preventDefault();
});

window.addEventListener("resize", function () {
   let posDragInBlockX = (dragItem.getBoundingClientRect().left - dragBlock.getBoundingClientRect().left) / dragBlock.offsetWidth;
   let posDragInBlockY = (dragItem.getBoundingClientRect().top - dragBlock.getBoundingClientRect().top) / dragBlock.offsetHeight;

   dragBlock.append(dragItem);

   dragItem.style.left = `${posDragInBlockX * 100}%`;
   dragItem.style.top = `${posDragInBlockY * 100}%`;
});
//////////////// Пеемещение блока ////////////////



//////////////// Слайдер фото ////////////////

dragItem.onselectstart = () => false;

const imgCats = document.querySelectorAll('.images_pats_cats .img img');
const imgDogs = document.querySelectorAll('.images_pats_dogs .img img');
const imgOthers = document.querySelectorAll('.images_pats_others .img img');

const imgCatsPrev = document.querySelector('.images_pats_cats .arr_prev');
const imgCatsNext = document.querySelector('.images_pats_cats .arr_next');

const imgDogsPrev = document.querySelector('.images_pats_dogs .arr_prev');
const imgDogsNext = document.querySelector('.images_pats_dogs .arr_next');

const imgOthersPrev = document.querySelector('.images_pats_others .arr_prev');
const imgOthersNext = document.querySelector('.images_pats_others .arr_next');

imgCats[0].classList.add('_active');
imgCats[0].classList.add('_activeOpacity');
imgDogs[0].classList.add('_active');
imgDogs[0].classList.add('_activeOpacity');
imgOthers[0].classList.add('_active');
imgOthers[0].classList.add('_activeOpacity');

let imgActiveCats = searchActive(imgCats),
   imgActiveDogs = searchActive(imgDogs),
   imgActiveOthres = searchActive(imgOthers);

function searchActive(imgPat) {
   for (let i = 0; i < imgPat.length; i++) {

      if (imgPat[i].classList.contains('_active')) {
         return i;
      }
   }
}

function imgSlide(img, imgPrev, imgNext, imgActNum) {
   imgPrev.addEventListener('mouseup', prevImg);
   imgNext.addEventListener('mouseup', nextImg);

   function prevImg() {

      img[imgActNum].classList.remove('_activeOpacity');

      img[imgActNum].addEventListener('transitionend', function () {
         img[imgActNum].classList.remove('_active');

         if (imgActNum == 0) {
            imgActNum = img.length - 1;
            img[imgActNum].classList.add('_active');
            setTimeout(() => img[imgActNum].classList.add('_activeOpacity'), 40);
         }
         else {
            img[--imgActNum].classList.add('_active');
            setTimeout(() => img[imgActNum].classList.add('_activeOpacity'), 40);
         }
      }, { "once": true });
   }

   function nextImg() {
      img[imgActNum].classList.remove('_activeOpacity');

      img[imgActNum].addEventListener('transitionend', function (event) {
         img[imgActNum].classList.remove('_active');

         if (imgActNum == img.length - 1) {
            imgActNum = 0;
            img[imgActNum].classList.add('_active');
            setTimeout(() => img[imgActNum].classList.add('_activeOpacity'), 40);
         }
         else {
            img[++imgActNum].classList.add('_active');
            setTimeout(() => img[imgActNum].classList.add('_activeOpacity'), 40);
         }
      }, { "once": true });
   }
}


imgSlide(imgCats, imgCatsPrev, imgCatsNext, imgActiveCats);
imgSlide(imgDogs, imgDogsPrev, imgDogsNext, imgActiveDogs);
imgSlide(imgOthers, imgOthersPrev, imgOthersNext, imgActiveOthres);


const imgCars = document.querySelectorAll('.images_cars .img img');
const carsPrev = document.querySelector('.images_cars .arr_prev');
const carsNext = document.querySelector('.images_cars .arr_next');

imgCars[0].classList.add('_active');
imgCars[0].classList.add('_activeOpacity');
let numCarsActive = searchActive(imgCars);

imgSlide(imgCars, carsPrev, carsNext, numCarsActive);
//////////////// Слайдер фото ////////////////




//////////////// Форма ////////////////

document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      let formData = new FormData(form);
      formData.append('image', formImage.files[0]);

      if (error == 0) {
         form.classList.add('_sending');
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });

         if (response.ok) {
            let result = await response.json();
            alert(result.message);
            formPreview.innerHTML = '';
            form.reset();
            form.classList.remove('_sending');
         }
         else {
            alert('Ошибка!');
            form.classList.remove('_sending');
         }
      }
      else {
         alert('Заполните обязательные поля!');
      }
   }

   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      formReq.forEach((element) => {
         const input = element;
         formRemoveError(input);

         if (input.classList.contains('_email')) {
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         }
         else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
            formAddError(input);
            error++;
         }
         else if (input.value == '') {
            formAddError(input);
            error++;
         }
      });
      return error;
   }

   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
   //Функция теста email
   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }


   //Получаем инпут file в переменную
   const formImage = document.getElementById('formImage');
   //Получаем див для превью в переменную
   const formPreview = document.getElementById('formPreview');

   //Проверяем изменение в инфуте file
   formImage.addEventListener('change', () => {
      uploadFile(formImage.files[0]);
   });

   function uploadFile(file) {
      if (!file)
         return;
      //Проверяем тип файла
      if (!['image/jpeg', 'image/png', 'image/gif'.includes(file.type)]) {
         alert('Разрешены только изображения!');
         formImage.value = '';
         return;
      }
      //Проверка на размер файла
      if (file.size > 2 * 1024 * 1024) {
         alert('Файл должен быть менее 2МБ.');
         formImage.value = '';
         return;
      }

      var reader = new FileReader();

      reader.onload = function (e) {
         formPreview.innerHTML = `<img src="${reader.result}" alt="Фото">`;
      };
      reader.onerror = function (e) {
         alert('Ошибка!');
      };
      reader.readAsDataURL(file);
   }

});