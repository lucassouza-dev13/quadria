
export type Story = {
  id: number
  slug: string
  title: string
  author: string
  genre: string
  image: string
  synopsis: string
  status: 'Em andamento' | 'Concluída'
  chapters: {
    id: number
    title: string
    pages?: string[]
  }[]
}

export const stories: Story[] = [
  {
    id: 1,
    slug: 'sombras-do-abismo',
    title: 'Sombras do Abismo',
    author: 'Akira Santos',
    genre: 'Fantasia',
    image: '/covers/sombras-do-abismo.png',
    synopsis:
      'Em um mundo dominado por criaturas das sombras, um jovem guerreiro descobre que seu destino está ligado ao poder que ameaça destruir tudo ao seu redor.',
    status: 'Em andamento',
    chapters: [
      { id: 1, title: 'O Despertar' },
      { id: 2, title: 'Ecos da Escuridão' },
      { id: 3, title: 'O Primeiro Confronto' },
    ],
  },
  {
    id: 2,
    slug: 'alem-das-estrelas',
    title: 'Além das Estrelas',
    author: 'Marina Costa',
    genre: 'Ficção científica',
    image: '/covers/alem-das-estrelas.png',
    synopsis:
      'Durante uma missão espacial, uma jovem exploradora encontra sinais de uma civilização desconhecida e embarca em uma jornada que pode mudar o futuro da humanidade.',
    status: 'Em andamento',
    chapters: [
      { id: 1, title: 'Partida' },
      { id: 2, title: 'Sinais do Desconhecido' },
    ],
  },
  {
    id: 3,
    slug: 'lua-carmesim',
    title: 'Lua Carmesim',
    author: 'Rafael Oliveira',
    genre: 'Ação',
    image: '/covers/lua-carmesim.png',
    synopsis:
      'Sob uma lua vermelha, um guerreiro enfrenta inimigos sobrenaturais enquanto tenta descobrir a origem de uma antiga maldição.',
    status: 'Em andamento',
    chapters: [
      { id: 1, title: 'A Lua Vermelha' },
      { id: 2, title: 'O Caçador' },
      { id: 3, title: 'Sangue e Honra' },
    ],
  },
  {
    id: 4,
    slug: 'coracoes-em-neon',
    title: 'Corações em Neon',
    author: 'Yuna Martins',
    genre: 'Romance',
    image: '/covers/coracoes-em-neon.png',
    synopsis:
      'Em uma cidade iluminada por neon, dois jovens de mundos diferentes descobrem que alguns encontros podem transformar suas vidas.',
    status: 'Em andamento',
    chapters: [
      { id: 1, title: 'Um Encontro Inesperado' },
      { id: 2, title: 'Entre Luzes e Sentimentos' },
    ],
  },
  {
    id: 5,
    slug: 'o-ultimo-ronin',
    title: 'O Último Ronin',
    author: 'Kenji Almeida',
    genre: 'Aventura',
    image: '/covers/o-ultimo-ronin.png',
    synopsis:
      'Após perder seu mestre, um samurai errante atravessa terras perigosas em busca de respostas, enquanto enfrenta os fantasmas de seu passado.',
    status: 'Concluída',
    chapters: [
      {
        id: 1,
        title: 'O Caminho Solitário',
        pages: [
          '/chapters/o-ultimo-ronin/capitulo-1/01.webp',
          '/chapters/o-ultimo-ronin/capitulo-1/02.webp',
          '/chapters/o-ultimo-ronin/capitulo-1/03.webp',
          '/chapters/o-ultimo-ronin/capitulo-1/04.webp',
          '/chapters/o-ultimo-ronin/capitulo-1/05.webp',
        ],
      },
      {
        id: 2,
        title: 'Sombras do Passado',
      },
      {
        id: 3,
        title: 'A Última Batalha',
      },
    ],
  },
]
