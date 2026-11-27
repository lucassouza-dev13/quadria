
const fs = require("node:fs");
const path = require("node:path");
const AdmZip = require("adm-zip");
const sharp = require("sharp");

const INPUT_DIR = path.join(__dirname, "input");
const TEMP_DIR = path.join(__dirname, "temp");

const FRONTEND_DIR = path.join(__dirname, "..", "frontend");

const CHAPTERS_DIR = path.join(
  FRONTEND_DIR,
  "public",
  "chapters"
);

const MANIFEST_PATH = path.join(
  FRONTEND_DIR,
  "src",
  "data",
  "importedChapters.json"
);

const CATALOG_PATH = path.join(
  FRONTEND_DIR,
  "src",
  "data",
  "catalog.json"
);

const ALLOWED_EXTENSIONS = [".zip", ".cbz"];

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
];

const MAX_PAGES = 500;
const MAX_IMAGE_SIZE = 30 * 1024 * 1024;
const MAX_TOTAL_SIZE = 500 * 1024 * 1024;

function publishChapter(outputDir, publicationDir, pages) {
  fs.mkdirSync(path.dirname(publicationDir), {
    recursive: true,
  });

  fs.mkdirSync(publicationDir);

  try {
    for (const page of pages) {
      fs.copyFileSync(
        path.join(outputDir, page.fileName),
        path.join(publicationDir, page.fileName),
        fs.constants.COPYFILE_EXCL
      );
    }

    console.log("\nCapítulo publicado com sucesso!");
    console.log(`Destino: ${publicationDir}`);
  } catch (error) {
    fs.rmSync(publicationDir, {
      recursive: true,
      force: true,
    });

    throw error;
  }
}

function updateManifest(storySlug, chapterId, pages) {
  const manifest = JSON.parse(
    fs.readFileSync(MANIFEST_PATH, "utf8")
  );

  if (!Object.hasOwn(manifest, storySlug)) {
    manifest[storySlug] = {};
  }

  if (Object.hasOwn(manifest[storySlug], chapterId)) {
    throw new Error(
      "Este capítulo já está registrado no manifesto."
    );
  }

  manifest[storySlug][chapterId] = pages.map(
    (page) =>
      `/chapters/${storySlug}/capitulo-${chapterId}/${page.fileName}`
  );

  const tempManifestPath = `${MANIFEST_PATH}.tmp`;

  try {
    fs.writeFileSync(
      tempManifestPath,
      JSON.stringify(manifest, null, 2),
      "utf8"
    );

    fs.renameSync(tempManifestPath, MANIFEST_PATH);
  } catch (error) {
    fs.rmSync(tempManifestPath, { force: true });
    throw error;
  }

  console.log("Manifesto atualizado com sucesso!");
}

function validateChapter(storySlug, chapterId) {
  const catalog = JSON.parse(
    fs.readFileSync(CATALOG_PATH, "utf8")
  );

  const story = catalog.find(
    (item) => item.slug === storySlug
  );

  if (!story) {
    throw new Error(
      `Obra não encontrada no catálogo: ${storySlug}`
    );
  }

  if (!story.chapters.includes(Number(chapterId))) {
    throw new Error(
      `Capítulo ${chapterId} não encontrado na obra ${storySlug}.`
    );
  }

  console.log("Obra e capítulo validados com sucesso!");
}

async function importChapter() {
  const fileName = process.argv[2];
const storySlug = process.argv[3];
const chapterId = process.argv[4];

const shouldPublish =
  storySlug !== undefined || chapterId !== undefined;

if (shouldPublish) {
  if (!storySlug || !chapterId) {
    throw new Error(
      "Informe o identificador da obra e o número do capítulo."
    );
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(storySlug)) {
    throw new Error("Identificador da obra inválido.");
  }

  if (
    !/^[1-9]\d*$/.test(chapterId) ||
    !Number.isSafeInteger(Number(chapterId))
  ) {
    throw new Error("Número do capítulo inválido.");
  }
}

  if (!fileName) {
    throw new Error(
      'Informe o arquivo. Exemplo: node import-chapter.js "capitulo-1.cbz"'
    );
  }

  if (
    fileName !== path.basename(fileName) ||
    fileName.includes("\\") ||
    fileName.includes("/")
  ) {
    throw new Error("Informe apenas o nome do arquivo.");
  }

  const extension = path.extname(fileName).toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error("Formato inválido. Utilize ZIP ou CBZ.");
  }

  const filePath = path.join(INPUT_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo não encontrado: ${filePath}`);
  }

  if (!fs.statSync(filePath).isFile()) {
    throw new Error("O caminho informado não é um arquivo.");
  }

  if (fs.statSync(filePath).size > MAX_TOTAL_SIZE) {
    throw new Error("Arquivo compactado muito grande.");
  }

  console.log("\nIniciando importação...");
  console.log(`Arquivo: ${fileName}`);

    let publicationDir = null;

  if (shouldPublish) {
    validateChapter(storySlug, chapterId);

    publicationDir = path.join(
      CHAPTERS_DIR,
      storySlug,
      `capitulo-${chapterId}`
    );

    if (fs.existsSync(publicationDir)) {
      throw new Error(
        "Este capítulo já possui uma pasta de publicação."
      );
    }
  }

  const zip = new AdmZip(filePath);

  // Identificar e ordenar as imagens.
  const imageEntries = zip
    .getEntries()
    .filter((entry) => {
      if (entry.isDirectory) {
        return false;
      }

      const entryName = entry.entryName.replace(/\\/g, "/");

      if (
        entryName.startsWith("__MACOSX/") ||
        path.posix.basename(entryName).startsWith(".")
      ) {
        return false;
      }

      const imageExtension = path
        .extname(entryName)
        .toLowerCase();

      return IMAGE_EXTENSIONS.includes(imageExtension);
    })
    .sort((a, b) => {
      return a.entryName.localeCompare(
        b.entryName,
        "pt-BR",
        {
          numeric: true,
          sensitivity: "base",
        }
      );
    });

  if (imageEntries.length === 0) {
    throw new Error("Nenhuma imagem encontrada no arquivo.");
  }

  if (imageEntries.length > MAX_PAGES) {
    throw new Error("Limite de páginas excedido.");
  }

  // Validar os tamanhos declarados no ZIP.
  let totalSize = 0;

  for (const entry of imageEntries) {
    const size = entry.header.size;

    if (
      !Number.isSafeInteger(size) ||
      size <= 0 ||
      size > MAX_IMAGE_SIZE
    ) {
      throw new Error(
        `Imagem com tamanho inválido: ${entry.entryName}`
      );
    }

    totalSize += size;

    if (totalSize > MAX_TOTAL_SIZE) {
      throw new Error("Limite de extração excedido.");
    }
  }

  console.log(
    `Imagens encontradas: ${imageEntries.length}`
  );

  // Criar pasta temporária.
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  const outputDir = fs.mkdtempSync(
    path.join(TEMP_DIR, "chapter-")
  );

  // Lista única para armazenar todas as páginas.
  const pages = [];

  try {
    // Processar as imagens.
    for (const [index, entry] of imageEntries.entries()) {
      const pageName =
        String(index + 1).padStart(3, "0") + ".webp";

      const outputPath = path.join(outputDir, pageName);

      const imageData = entry.getData();

      if (imageData.length !== entry.header.size) {
        throw new Error(
          `Tamanho inconsistente: ${entry.entryName}`
        );
      }

      const imageInfo = await sharp(imageData, {
        limitInputPixels: 40_000_000,
      })
        .rotate()
        .resize({
          width: 1600,
          withoutEnlargement: true,
        })
        .webp({
          quality: 90,
          effort: 4,
        })
        .toFile(outputPath);

      // Registrar os metadados da página.
      pages.push({
        number: index + 1,
        fileName: pageName,
        width: imageInfo.width,
        height: imageInfo.height,
        size: imageInfo.size,
      });

      console.log(
        `Processada: ${entry.entryName} -> ${pageName}`
      );
    }

    // Gerar os metadados do capítulo.
    const metadata = {
      sourceFile: fileName,
      totalPages: pages.length,
      format: "webp",
      importedAt: new Date().toISOString(),
      pages,
    };

    const metadataPath = path.join(
      outputDir,
      "metadata.json"
    );

    fs.writeFileSync(
      metadataPath,
      JSON.stringify(metadata, null, 2),
      "utf8"
    );

    console.log(`\nMetadados gerados: ${metadataPath}`);

    if (shouldPublish) {
  publishChapter(outputDir, publicationDir, pages);

  try {
    updateManifest(storySlug, chapterId, pages);
  } catch (error) {
    fs.rmSync(publicationDir, {
      recursive: true,
      force: true,
    });

    throw error;
  }
}

    console.log("\nImportação concluída com sucesso!");
    console.log(`Total de páginas: ${pages.length}`);
    console.log(`Pasta temporária: ${outputDir}`);

  } catch (error) {
    // Remover arquivos incompletos em caso de erro.
    fs.rmSync(outputDir, {
      recursive: true,
      force: true,
    });

    throw error;
  }
}

importChapter().catch((error) => {
  console.error(`\nErro: ${error.message}`);
  process.exitCode = 1;
});
