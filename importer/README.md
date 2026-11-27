
 Quadria — Importador de Capítulos

Ferramenta CLI desenvolvida em Node.js para automatizar
a importação e publicação de capítulos na plataforma Quadria.

 Tecnologias

- Node.js
- AdmZip
- Sharp

 Funcionalidades

- Importação de arquivos ZIP e CBZ.
- Suporte a imagens JPG, JPEG, PNG e WebP.
- Ordenação numérica automática das páginas.
- Conversão e otimização de imagens para WebP.
- Redimensionamento sem ampliação das imagens.
- Geração automática de metadados.
- Publicação de capítulos no frontend.
- Atualização automática do manifesto de capítulos.
- Validação de obras e capítulos existentes.
- Proteção contra sobrescrita de capítulos.
- Tratamento de erros e limpeza de arquivos incompletos.

 Instalação

Execute dentro da pasta importer:

```bash
npm install
```

 Utilização

Coloque o arquivo ZIP ou CBZ dentro da pasta input.
Caso ela não exista, crie-a.

 Processamento temporário

```bash
node import-chapter.js capitulo.zip
```

As imagens processadas e o arquivo metadata.json
serão armazenados em uma subpasta de temp.

 Publicação de um capítulo

```bash
node import-chapter.js capitulo.cbz o-ultimo-ronin 2
```

Argumentos:

1. Nome do arquivo ZIP ou CBZ.
2. Slug da obra.
3. Número do capítulo.

A obra e o capítulo devem existir no catálogo.
O capítulo não pode possuir uma pasta de publicação.

 Integração com o frontend

As imagens são publicadas em:

frontend/public/chapters/{slug}/capitulo-{id}/

O manifesto é atualizado automaticamente em:

frontend/src/data/importedChapters.json

O catálogo de obras e capítulos é validado através de:

frontend/src/data/catalog.json

O arquivo stories.ts utiliza o manifesto para disponibilizar
as imagens importadas no leitor da Quadria.

Configurações de imagem

- Formato final: WebP.
- Largura máxima: 1600 pixels.
- Qualidade: 90.
- Effort: 4.
- Limite de pixels por imagem: 40 milhões.

 Limites de importação

- Máximo de 500 páginas por capítulo.
- Máximo de 30 MiB por imagem de entrada.
- Máximo de 500 MiB de tamanho compactado.
- Máximo de 500 MiB de tamanho declarado das imagens.

 Testes

Para gerar um arquivo CBZ com diferentes formatos
de imagem e páginas fora de ordem:

```bash
node generate-test.js
node import-chapter.js teste-ordenacao.cbz
```

O gerador utiliza as imagens existentes do primeiro
capítulo de O Último Ronin.

 Limitações atuais

O importador funciona localmente através do terminal.

O catalog.json deve permanecer sincronizado com stories.ts.

As pastas temporárias de importações bem-sucedidas
podem ser removidas manualmente quando não forem necessárias.

A integração com banco de dados, armazenamento remoto
e painel de autores será implementada futuramente.

As validações atuais não substituem uma auditoria
de segurança para uploads públicos.

Importe apenas conteúdos próprios ou autorizados.

 Projeto

Quadria — Plataforma de mangás, quadrinhos e webtoons.
