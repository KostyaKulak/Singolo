window.onload = () => {
  // Header
  const MENU = document.getElementById('main_menu');
  let avgHeight = 0;
  const SECTIONs = document.querySelectorAll('section');
  SECTIONs.forEach(el => {
    avgHeight += el.offsetHeight;
  });
  let ScrollOffset = document.documentElement.clientHeight - parseInt(avgHeight / SECTIONs.length);
  ScrollOffset = (ScrollOffset < 30) ? document.querySelector('header').offsetHeight : ScrollOffset;

  document.addEventListener('scroll', event => {
    let curPos = window.scrollY + ScrollOffset;
    const elList = document.querySelectorAll('section');
    const menuList = MENU.querySelectorAll('li');
    elList.forEach(el => {
      if ((el.offsetTop) <= curPos && (el.offsetTop + el.offsetHeight - 60) > curPos) {
        menuList.forEach(li => {
          li.classList.remove('menu_active');
          if (el.getAttribute('id') === li.querySelector('a').getAttribute('href').substring(1)) {
            li.classList.add('menu_active');
          }
        });
      }
    });

    if (document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
      MENU.querySelector('li.menu_active').classList.remove('menu_active');
      menuList[menuList.length - 1].classList.add('menu_active');
    }
    if (MENU.querySelector('li.menu_active') === null) {
      menuList[0].classList.add('menu_active');
    }
  });

  // Slider. Переключение слайдов
  const SLIDER = document.getElementById('slider')
  let slidesStart = document.querySelectorAll('.slide_single')
  const SLIDER_WIDTH = 830
  let current = 0
  let sliderBlocked = false

  function slider_init() {
    let offset = 0
    let slideIndex = (current === 0) ? 1 : 0
    SLIDER.innerHTML = ''
    let elem = slidesStart[slideIndex].cloneNode(true)
    elem.style.left = offset * SLIDER_WIDTH - SLIDER_WIDTH + 'px'
    slidesStart[current].style.left = offset * SLIDER_WIDTH + 'px'
    offset += 1
    slidesStart[slideIndex].style.left = offset * SLIDER_WIDTH + 'px'
    SLIDER.appendChild(elem)
    SLIDER.appendChild(slidesStart[current])
    SLIDER.appendChild(slidesStart[slideIndex])
  }

  function slide(isLeft) {
    if (!sliderBlocked) {
      sliderBlocked = true
      let slides = document.querySelectorAll('.slide_single')
      let slideOffset = -1
      for (let i = 0; i < slides.length; i += 1) {
        if (isLeft) {
          slides[i].style.left = slideOffset * SLIDER_WIDTH + SLIDER_WIDTH + 'px'
        } else {
          slides[i].style.left = slideOffset * SLIDER_WIDTH - SLIDER_WIDTH + 'px'
        }
        slideOffset += 1
      }
      current += 1
      if (current >= slidesStart.length) {
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
  document.getElementById('arrow_left').addEventListener('click', () => { slide(true) })
  document.getElementById('arrow_right').addEventListener('click', () => { slide(false) })
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

  function handleClickButton(e) {
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

  function handleClickImage(e) {
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

  const POP_UP = document.getElementById('pop-up-msg')
  const POP_UP_CLOSE = document.getElementById('btn-close')

  function popup_close(event) {
    if (event.target === POP_UP || event.target === POP_UP_CLOSE) {
      POP_UP.classList.add('pop-up-hidden')
    }
  }

  POP_UP.addEventListener('click', popup_close)
  POP_UP_CLOSE.addEventListener('click', popup_close)

}