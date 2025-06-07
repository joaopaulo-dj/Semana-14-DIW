const filmes = [
  { titulo: 'Cidade de Deus', genero: 'acao', descricao: 'Um filme sobre a vida em uma comunidade do Rio de Janeiro.', imagem: 'cidadededeus.jpg' },
  { titulo: 'Tropa de Elite', genero: 'acao', descricao: 'Policiais militares enfrentando as gangues do Rio.', imagem: 'tropadeelite.jpg' },
  { titulo: 'O Auto da Compadecida', genero: 'comedia', descricao: 'A dupla luta para sobreviver aplicando golpes.', imagem: 'auto.jpg' },
  { titulo: 'Central do Brasil', genero: 'drama', descricao: 'Ex-professora escreve cartas para analfabetos.', imagem: 'central.jpg' },
  { titulo: 'Ricos de Amor', genero: 'romance', descricao: 'Filho de empresário tenta viver de forma simples.', imagem: 'ricos.jpg' },
  { titulo: 'Xingu', genero: 'aventura', descricao: 'História dos irmãos Villas-Bôas.', imagem: 'xingu.jpg' },
  { titulo: 'O Lobo Atrás da Porta', genero: 'suspense', descricao: 'Sequestro de criança leva a uma investigação.', imagem: 'lobo.jpg' },
  { titulo: 'Cidade de Deus - 10 Anos Depois', genero: 'documentario', descricao: 'Revisita os atores 10 anos após o sucesso.', imagem: 'deus.jpg' },
  { titulo: 'Carrossel: O Filme', genero: 'infantil', descricao: 'Alunos em aventura no acampamento Panapaná.', imagem: 'carrosel.jpg' },
  { titulo: 'Turma da Mônica: Laços', genero: 'fantasia', descricao: 'Busca pelo Floquinho desaparecido.', imagem: 'monica.jpg' },
];

let favoritos = [];

const filmesSection = document.getElementById('filmes');
const favoritosSection = document.getElementById('listaFavoritos');

function mostrarFilmes(filtrarGenero = null) {
  filmesSection.innerHTML = '';
  const lista = filmes.filter(f => !filtrarGenero || f.genero === filtrarGenero);
  lista.forEach(filme => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card p-3 mb-3">
        <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
        <div class="card-body">
          <h5 class="card-title">${filme.titulo}</h5>
          <p class="card-text">${filme.descricao}</p>
          <p class="card-text"><strong>Gênero:</strong> ${filme.genero}</p>
          <button class="btn btn-warning" onclick='adicionarFavorito("${filme.titulo}")'>💛 Favoritar</button>
        </div>
      </div>
    `;
    filmesSection.appendChild(card);
  });
}

function adicionarFavorito(titulo) {
  if (!favoritos.includes(titulo)) {
    favoritos.push(titulo);
    atualizarFavoritos();
  }
}

function removerFavorito(titulo) {
  favoritos = favoritos.filter(f => f !== titulo);
  atualizarFavoritos();
}

function atualizarFavoritos() {
  favoritosSection.innerHTML = '';
  favoritos.forEach(titulo => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card p-3 mb-3">
        <h5 class="card-title">${titulo}</h5>
        <button class="btn btn-danger" onclick='removerFavorito("${titulo}")'>❌ Remover</button>
      </div>
    `;
    favoritosSection.appendChild(card);
  });
}

function pesquisarFilmes(texto) {
  const resultado = filmes.filter(filme =>
    filme.titulo.toLowerCase().includes(texto.toLowerCase())
  );
  filmesSection.innerHTML = '';
  resultado.forEach(filme => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card p-3 mb-3">
        <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
        <div class="card-body">
          <h5 class="card-title">${filme.titulo}</h5>
          <p class="card-text">${filme.descricao}</p>
          <p class="card-text"><strong>Gênero:</strong> ${filme.genero}</p>
          <button class="btn btn-warning" onclick='adicionarFavorito("${filme.titulo}")'>💛 Favoritar</button>
        </div>
      </div>
    `;
    filmesSection.appendChild(card);
  });
}

function gerarGraficoPizza() {
  const contagemGeneros = {};

  filmes.forEach(filme => {
    contagemGeneros[filme.genero] = (contagemGeneros[filme.genero] || 0) + 1;
  });

  const generos = Object.keys(contagemGeneros);
  const quantidades = Object.values(contagemGeneros);

  new Chart(document.getElementById('graficoPizza'), {
    type: 'pie',
    data: {
      labels: generos,
      datasets: [{
        label: 'Distribuição de Filmes por Gênero',
        data: quantidades,
        backgroundColor: [
          '#f39c12', '#3498db', '#2ecc71',
          '#9b59b6', '#e74c3c', '#1abc9c',
        ]
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#ffffff' 
          }
        },
        tooltip: {
          bodyColor: '#ffffff', 
          titleColor: '#ffffff'
        }
      }
    }
  });
}


mostrarFilmes();
gerarGraficoPizza();


  