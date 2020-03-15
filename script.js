// Header
let navLinks = document.querySelectorAll('.navbar a')
navLinks.forEach(it => it.addEventListener('click', handleClickNavLink, false))

function handleClickNavLink (e) {
  let item = e.target
  navLinks.forEach(a => a.style.color = 'white')
  item.style.color = '#f06c64'
  let hashVal = item.getAttribute('href')
  let target = document.querySelector(hashVal)
  target.scrollIntoView({
    block: 'start'
  })
  window.scrollBy(0, -document.querySelector('.header').clientHeight)
  history.pushState(null, null, hashVal)
  e.preventDefault()
}

// Slider. Переключение слайдов
const SLIDER = document.getElementById('slider')
let slides = document.querySelectorAll('.slide_single')
const SLIDER_LEFT = 830
let current = 0
let sliderBlocked = false

function slider_init () {
  let offset = 0
  let slide2 = (current === 0) ? 1 : 0
  SLIDER.innerHTML = ''
  let elem = slides[slide2].cloneNode(true)
  elem.style.left = offset * SLIDER_LEFT - SLIDER_LEFT + 'px'
  slides[current].style.left = offset * SLIDER_LEFT + 'px'
  offset += 1
  slides[slide2].style.left = offset * SLIDER_LEFT + 'px'
  SLIDER.appendChild(elem)
  SLIDER.appendChild(slides[current])
  SLIDER.appendChild(slides[slide2])
}

function slide (isLeft) {
  if (!sliderBlocked) {
    sliderBlocked = true
    let slides2 = document.querySelectorAll('.slide_single')
    let offset2 = -1
    for (let i = 0; i < slides2.length; i += 1) {
      if (isLeft) {
        slides2[i].style.left = offset2 * SLIDER_LEFT + SLIDER_LEFT + 'px'
      } else {
        slides2[i].style.left = offset2 * SLIDER_LEFT - SLIDER_LEFT + 'px'
      }
      offset2 += 1
    }
    current += 1
    if (current >= slides.length) {
      current = 0
    }
    if (current === 1) {
      document.getElementById('slider_main').classList.add('slide2bg')
    } else {
      document.getElementById('slider_main').classList.remove('slide2bg')
    }
  }
}

SLIDER.addEventListener('transitionend', function () {
  slider_init()
  sliderBlocked = false
})
document.getElementById('arrow_left').addEventListener('click', () => {slide(true)})
document.getElementById('arrow_right').addEventListener('click', () => {slide(false)})
slider_init()

// Slider. Активация экранов телефонов
document.getElementById('iPhone_Vert').addEventListener('click', event => {
  const display = document.getElementById('iPhone_Vert').querySelector('div')
  if (display.classList.contains('display-off')) {
    display.classList.remove('display-off')
  } else {
    display.classList.add('display-off')
  }
  event.preventDefault()
})
document.getElementById('iPhone_Hor').addEventListener('click', event => {
  const display = document.getElementById('iPhone_Hor').querySelector('div')
  if (display.classList.contains('display-off')) {
    display.classList.remove('display-off')
  } else {
    display.classList.add('display-off')
  }
  event.preventDefault()
})

// Portfolio. Переключение табов
let imageDivs = document.querySelectorAll('.portfolio-items')
let buttons = document.querySelectorAll('.button')
let imgIndex = 0
buttons.forEach(it => it.addEventListener('click', handleClickButton, false))

function handleClickButton (e) {
  let item = e.target
  buttons.forEach(btn => btn.classList.remove('button-active'))
  item.classList.add('button-active')
  let imgParent = imageDivs[0].parentNode
  imageDivs.forEach(img => {
    imgParent.removeChild(img)
  })
  if (imgIndex > imageDivs.length - 1) {
    imgIndex = 0
  } else {
    imgIndex++
  }
  for (let i = imgIndex; i < imageDivs.length; i++) {
    const imgDiv = imageDivs[i]
    imgParent.appendChild(imgDiv)
  }
  for (let i = 0; i < imgIndex; i++) {
    const imgDiv = imageDivs[i]
    imgParent.appendChild(imgDiv)
  }
  e.preventDefault()
}

// Portfolio. Взаимодействие с картинками
let images = document.querySelectorAll('.portfolio-image')
images.forEach(it => it.addEventListener('click', handleClickImage, false))

function handleClickImage (e) {
  let item = e.target
  images.forEach(a => a.classList.remove('image-selected'))
  item.classList.add('image-selected')
  e.preventDefault()
}

// Get a quote
const FORM = document.getElementById('contacts-form')
FORM.addEventListener('submit', event => {
  event.preventDefault()
  if (FORM.checkValidity()) {
    document.getElementById('pop-up-subject').innerHTML
      = (document.getElementById('form-input-subject').value) ? '<b>Тема:</b> '
      + document.getElementById('form-input-subject').value : 'Без темы'
    document.getElementById('pop-up-message').innerHTML
      = (document.getElementById('form-area-message').value) ? '<b>Описание:</b> '
      + ((document.getElementById('form-area-message').value.length > 230) ?
        document.getElementById('form-area-message').value.substring(0, 230) + '...'
        : document.getElementById('form-area-message').value) : 'Без описания'
    document.getElementById('pop-up-msg').classList.remove('pop-up-hidden')
  }
  FORM.reset()
  return false
})

const MODAL_BLOCK = document.getElementById('pop-up-msg')
const MODAL_CLOSE = document.getElementById('btn-close')

function popup_close (event) {
  if (event.target === MODAL_BLOCK || event.target === MODAL_CLOSE) {
    MODAL_BLOCK.classList.add('pop-up-hidden')
  }
}

MODAL_BLOCK.addEventListener('click', popup_close)
MODAL_CLOSE.addEventListener('click', popup_close)