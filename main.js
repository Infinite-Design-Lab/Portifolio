const barsHeader = document.getElementById('barsHeader')
const barsNav = document.getElementById('barsNav')
const menu = document.querySelector('.navbar')
const header = document.querySelector('header')
const btnMenu = document.querySelectorAll('.navbar .menu .menu-btn')
const btnUp = document.querySelector('.scroll-up-btn')
const form = document.querySelector('form')
const buttonForm = document.querySelector('input[type="submit"]')
const inputForm = document.querySelectorAll('.inputForm')
let click = false

barsHeader.addEventListener('click', toggleMenu)
barsNav.addEventListener('click', toggleMenu)

function toggleMenu() {
  if (click) {
    menu.classList.remove('open')
    menu.classList.add('close')
    click = false
  } else {
    menu.classList.remove('close')
    menu.classList.add('open')
    click = true
  }
}

var typed = new Typed(".typing", {
    strings: ['Designer Gráfico', 'Designer Visual', 'Web Design'],
    typeSpeed: 100,
    backSpeed: 30,
    loop: true
})

window.addEventListener('scroll', function() {

  if (window.scrollY > 20) {
    header.classList.add('open')
  } else {
    header.classList.remove('open')
  }
  
  if (window.scrollY > 500) {
    btnUp.classList.add('show')
  } else {
    btnUp.classList.remove('show')
  }
})

btnMenu.forEach(item => {
  item.addEventListener('click', () => {
    menu.classList.remove('add')
    menu.classList.add('close')
    click = false
  })
})

btnUp.addEventListener('click', function() {
  scrollToTop()

  document.documentElement.style.scrollBehavior = "auto"
})

function scrollToTop() {
  const currentPosition = window.scrollY
  const scrollStep = currentPosition / 50

  function smoothScroll() {
    if (window.scrollY > 0) {
      window.scrollTo(0, Math.max(0, window.scrollY - scrollStep))
      requestAnimationFrame(smoothScroll)
    }
  }

  if (currentPosition > 0) {
    smoothScroll()
  }
}



document.querySelectorAll('.navbar .menu li a').forEach(function(link) {
  link.addEventListener('click', function() {
    
    document.documentElement.style.scrollBehavior = "smooth"

    setTimeout(function() {
      document.documentElement.style.scrollBehavior = "auto"
    }, 1000)
  })
})


function showSuccessAlert(msg) {
  const successAlert = document.getElementById('successAlert')
  successAlert.style.display = 'block'
  successAlert.innerText = msg

  setTimeout(() => {
    successAlert.style.display = 'none'
  }, 3000) // Exibir por 3 segundos, ajuste conforme necessário
}

function showErrorAlert(msg) {
  const errorAlert = document.getElementById('errorAlert')
  errorAlert.style.display = 'block'
  errorAlert.innerText = msg
  document.querySelector('.contact').style.height = '1500px'
}

buttonForm.addEventListener('click', (event) => {
  let firstEmptyInput

  Array.from(inputForm).some(function(input, index) {
    let name = capitalizeFirstLetter(input.name)
    let id = input.id

    if (id === "nome" || id === "email" || id === "assunto" || id === "mensagem") {
      if (!firstEmptyInput && input.value === '') {
        event.preventDefault()
        firstEmptyInput = input
        input.style.borderColor = 'red'
        showErrorAlert('Campo "' + name + '" não pode estar vazio!')
      } else {
        input.style.borderColor = 'green'
      }
    }
    
    if (id === "nome") {
      if (input.value === '') {
        event.preventDefault()
        showErrorAlert('Campo "Nome" não pode estar vazio!')
        input.style.borderColor = 'red'
      } else {
        if (input.value.length < 3) {
          event.preventDefault()
          showErrorAlert('Insira um nome de no mínimo 3 letras!')
          input.style.borderColor = 'red'
        } else {
          input.style.borderColor = 'green'
        }
      }
    }

    if (id === "email") {
      if (input.value === '') {
        event.preventDefault()
        showErrorAlert('Campo "E-mail" não pode estar vazio!')
        input.style.borderColor = 'red'
      } else {
        const emailValidationResult = validarEmail(input.value)
        if (emailValidationResult !== 'Endereço de e-mail válido!') {
          event.preventDefault()
          showErrorAlert(emailValidationResult)
          input.style.borderColor = 'red'
        } else {
          input.style.borderColor = 'green'
        }
      }
    }

    return input.value === '' // Se encontrou um input vazio, encerra o loop
  })
})


function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function validarEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if (regexEmail.test(email)) {
        return 'Endereço de e-mail válido!'
    } else {
        if (/\s/.test(email)) {
            return 'E-mail inválido. Não é permitido espaço no endereço de e-mail.'
        } else if (!/^[a-zA-Z0-9._-]+/.test(email)) {
            return 'E-mail inválido. O nome de usuário deve conter apenas letras, números, pontos, sublinhados ou hífens.'
        } else if (!/@[a-zA-Z0-9.-]/.test(email)) {
            return 'E-mail inválido. É necessário incluir o símbolo "@" e um domínio válido após o símbolo.\nExemplo: @gmail.com, @hotmail.com, etc.'
        } else if (!email.includes(".com")) {
            return 'E-mail inválido. É necessário incluir uma extensão como ".com" após o ponto no endereço.'
        } else if (/(\.\.)|(@\.)|(\.@)|(\.\.)|(\.\-)|(\-\.)|(\.\s)|(\s\.)/.test(email)) {
            return 'E-mail inválido. Verifique a posição e a quantidade de pontos (.) e o uso correto do símbolo "@" no endereço.'
        } else {
            return 'E-mail inválido. Verifique o formato geral do endereço de e-mail.'
        }
    }
}

if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
  // Este é um dispositivo móvel (smartphone).
} else {
  // Redirecionar para a página informando que não há versão para computadores
  const link = document.createElement('a');
        link.href = "https://infinite-design-lab.github.io/Portifolio/incompatible.html";
        link.click();
}

let emManutencao = false

function verificarStatusManutencao() {
  if (emManutencao) {
    const link = document.createElement('a');
        link.href = "https://infinite-design-lab.github.io/Portifolio/maintenance.html";
        link.click();
  }
}

verificarStatusManutencao()
