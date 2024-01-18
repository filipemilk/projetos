
//myDate.value = palavraChave
//const dados = window.document.getElementById('dados')
//const myDate = new Date(Date.now()).toLocaleString().split(',')[0]

//dados.innerHTML += myDate.value
//Se myDate estiver vazio pegue a palavraChave = New Date
var myDate = window.document.querySelector('input#data') // A palavra que você está procurando (Data)
var res = document.querySelector('div#res')
var a = window.document.getElementById('area')
var d = window.document.getElementById('dados')
var arq = window.document.getElementById('arquivo')

//________________________________________________________________________________

document.addEventListener('keypress', function(e) {
  if(e.key === "Enter") {
    const btn = document.getElementById('but')
    btn.click()
    e.preventDefault() //Parar o evento.
  }
})

//________________________________________________________________________________

function dataHoje() { 
  // Obtém a data atual
  const dataAtual = new Date();

  // Formata a data no formato YYYY-MM-DD para definir o valor do input
  const ano = dataAtual.getFullYear();
  const mes = String(dataAtual.getMonth() + 1).padStart(2, "0"); // +1 porque janeiro é mês 0
  const dia = String(dataAtual.getDate()).padStart(2, "0");

  const dataFormatada = `${ano}-${mes}-${dia}`;

  // Define o valor do input para a data atual formatada
  myDate.value = dataFormatada
}

//________________________________________________________________________________

function abrirArquivo() {
  fetch(`${arq.value}.txt`)
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then(response => response.text())
    .then(text => {
      const lista = text.split('\n')
      const filtrado = lista.filter(x => x.substring(0,4) === 'http')      //O método trim() remove os espaços das tags vazias.
      consultar(filtrado)
    })
    .catch(error => {
      window.alert(`Arquivo inválido!`)
    })
}
//________________________________________________________________________________

function consultar(sites) {

  var palavraChave = myDate.value.split('-').reverse().join('/')
  var siteAberto = 0
  var item = 0

  if (myDate.value != '') {
    d.style.borderBottom = '1px solid #000'
    res.innerHTML = `<p>Total de Processos: ${sites.length}</p>`
    sites.forEach(site => {
      fetch(site)
        .then(response => response.text())
        .then(text => {
          //Verificador de sites repetidos!
          if(sites.indexOf(sites[item]) != item) {
            res.innerHTML += `<p>Endereço repetido:</p> ${sites[item]}`
            a.style.maxWidth = '1000px'
            d.style.textAlign = 'center'
          }
          item++

          if (text.includes(palavraChave)) {
            // console.log(`A palavra "${palavraChave}" foi encontrada no site ${site}.`);
            window.open(site, '_blank') // Abre o site em uma nova aba
            siteAberto++
            window.alert(`Total de sites abertos: ${siteAberto}`)
          } else if (siteAberto == 0 && item == sites.length) {
            // console.log(`A palavra "${palavraChave}" não foi encontrada no site ${site}.`);
            window.alert(`Não há processo tramitado nesta data: ${palavraChave}.`)
          }
        })
        .catch(error => {
          //console.error(`Ocorreu um erro ao acessar o site ${site}:`, error);
          res.innerHTML += `<p>O endereço de site está inválido:</p> ${site}`
          a.style.maxWidth = '1000px'
          d.style.textAlign = 'center'
        });
    })
  } else {
    window.alert(`Insira uma data válida!`)
  }
}
