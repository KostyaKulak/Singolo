window.onload = () => {
  // Header
  const MENU = document.getElementById('main_menu')
  let avgHeight = 0
  const SECTIONS = document.querySelectorAll('section')
  SECTIONS.forEach(el => { avgHeight += el.offsetHeight })
  let ScrollOffset = document.documentElement.clientHeight - parseInt((avgHeight / SECTIONS.length).toString())
  ScrollOffset = (ScrollOffset < 30) ? document.querySelector('header').offsetHeight : ScrollOffset

  document.addEventListener('scroll', () => {
    let curPos = window.scrollY + ScrollOffset
    const elList = document.querySelectorAll('section')
    const menuList = MENU.querySelectorAll('li')
    elList.forEach(el => {
      if ((el.offsetTop) <= curPos && (el.offsetTop + el.offsetHeight - 60) > curPos) {
        menuList.forEach(li => {
          li.classList.remove('navigation_active')
          if (el.getAttribute('id') === li.querySelector('a')
            .getAttribute('href')
            .substring(1)) {
            li.classList.add('navigation_active')
          }
        })
      }
    })

    if (document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
      MENU.querySelector('li.navigation_active').classList.remove('navigation_active')
      menuList[menuList.length - 1].classList.add('navigation_active')
    }
    if (MENU.querySelector('li.navigation_active') === null) {
      menuList[0].classList.add('navigation_active')
    }
  })

  // Slider. Переключение слайдов
  const SLIDER = document.getElementById('slider')
  let slidesStart = document.querySelectorAll('.slide_single')
  let sliderWidth = SLIDER.offsetWidth
  let current = 0
  let sliderBlocked = false

  function slider_init () {
    let offset = 0
    let slideIndex = (current === 0) ? 1 : 0
    SLIDER.innerHTML = ''
    let elem = slidesStart[slideIndex].cloneNode(true)
    elem.style.left = offset * sliderWidth - sliderWidth + 'px'
    slidesStart[current].style.left = offset * sliderWidth + 'px'
    offset += 1
    slidesStart[slideIndex].style.left = offset * sliderWidth + 'px'
    SLIDER.appendChild(elem)
    SLIDER.appendChild(slidesStart[current])
    SLIDER.appendChild(slidesStart[slideIndex])
  }

  function slide (isLeft) {
    if (!sliderBlocked) {
      sliderBlocked = true
      let slides = document.querySelectorAll('.slide_single')
      let slideOffset = -1
      for (let i = 0; i < slides.length; i += 1) {
        if (isLeft) {
          slides[i].style.left = slideOffset * sliderWidth + sliderWidth + 'px'
        } else {
          slides[i].style.left = slideOffset * sliderWidth - sliderWidth + 'px'
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
  document.getElementById('arrow_left')
    .addEventListener('click', () => { slide(true) })
  document.getElementById('arrow_right')
    .addEventListener('click', () => { slide(false) })
  slider_init()

  // Slider. Активация экранов телефонов
  const IPHONES = [
    document.getElementById('iPhone_Vert').querySelector('img'),
    document.getElementById('iPhone_Hor').querySelector('img')
  ]
  IPHONES.forEach(iPhone => iPhone.addEventListener('click', event => {
    iPhone.classList.toggle('phone-disp-off')
    event.preventDefault()
  }))

  // Portfolio. Переключение табов
  let imageDivs = document.querySelectorAll('.portfolio-image')
  let buttons = document.querySelectorAll('.buttons-bar button')
  let imgIndex = 0
  buttons.forEach(it => it.addEventListener('click', handleClickButton, false))

  function handleClickButton (e) {
    let item = e.target
    buttons.forEach(btn => btn.classList.remove('button_active'))
    item.classList.add('button_active')
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
    images.forEach(a => a.classList.remove('portfolio-selected'))
    item.classList.add('portfolio-selected')
    e.preventDefault()
  }

  // Get a quote
  const FORM = document.getElementById('contacts-form')
  FORM.addEventListener('submit', event => {
    event.preventDefault()
    let subject = document.getElementById('form-input-subject').value
    document.getElementById('pop-up-subject').innerHTML =
      subject ? '<b>Тема:</b> ' + ((subject.length > 100) ? subject.substring(0, 100) + '...' : subject) : 'Без темы'
    let message = document.getElementById('form-area-message').value
    document.getElementById('pop-up-message').innerHTML =
      message ? '<b>Описание:</b> ' + ((message.length > 230) ? message.substring(0, 230) + '...' : message) : 'Без описания'
    document.getElementById('pop-up_msg').classList.remove('pop-up_hidden')
    FORM.reset()
    return false
  })

  const POP_UP_BLOCK = document.getElementById('pop-up_msg')
  const POP_UP_CLOSE = document.getElementById('btn-close')

  function popup_close (event) {
    if (event.target === POP_UP_BLOCK || event.target === POP_UP_CLOSE) {
      POP_UP_BLOCK.classList.add('pop-up_hidden')
    }
  }

  POP_UP_BLOCK.addEventListener('click', popup_close)
  POP_UP_CLOSE.addEventListener('click', popup_close)

  window.addEventListener('resize', () => {
    sliderWidth = SLIDER.offsetWidth
    slider_init()
  })
}