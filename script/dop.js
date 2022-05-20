const imgCityNewYork = document.querySelectorAll('.img_newYork .img img');
const NYPrev = document.querySelector('.img_newYork .arr_prev');
const NYNext = document.querySelector('.img_newYork .arr_next');

imgCityNewYork[0].classList.add('_active');
imgCityNewYork[0].classList.add('_activeOpacity');
let numNYActive = searchActive(imgCityNewYork);

const imgCityKazan = document.querySelectorAll('.img_kazan .img img');
const kazanPrev = document.querySelector('.img_kazan .arr_prev');
const kazanNext = document.querySelector('.img_kazan .arr_next');

imgCityKazan[0].classList.add('_active');
imgCityKazan[0].classList.add('_activeOpacity');
let numKazanActive = searchActive(imgCityKazan);

const imgCityLondon = document.querySelectorAll('.img_london .img img');
const londonPrev = document.querySelector('.img_london .arr_prev');
const londonNext = document.querySelector('.img_london .arr_next');

imgCityLondon[0].classList.add('_active');
imgCityLondon[0].classList.add('_activeOpacity');
let numLondonActive = searchActive(imgCityLondon);

const imgCitySydney = document.querySelectorAll('.img_sydney .img img');
const sydneyPrev = document.querySelector('.img_sydney .arr_prev');
const sydneyNext = document.querySelector('.img_sydney .arr_next');

imgCitySydney[0].classList.add('_active');
imgCitySydney[0].classList.add('_activeOpacity');
let numSydneyActive = searchActive(imgCitySydney);

imgSlide(imgCityNewYork, NYPrev, NYNext, numNYActive);
imgSlide(imgCityKazan, kazanPrev, kazanNext, numKazanActive);
imgSlide(imgCityLondon, londonPrev, londonNext, numLondonActive);
imgSlide(imgCitySydney, sydneyPrev, sydneyNext, numSydneyActive);