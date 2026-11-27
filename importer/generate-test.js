
const fs = require("node:fs");
const path = require("node:path");
const AdmZip = require("adm-zip");
const sharp = require("sharp");

async function generateTest() {
  const sourceDir = path.join(
    __dirname,
    "..",
    "frontend",
    "public",
    "chapters",
    "o-ultimo-ronin",
    "capitulo-1"
  );

  const inputDir = path.join(__dirname, "input");

  fs.mkdirSync(inputDir, { recursive: true });

  const zip = new AdmZip();

  const page1 = await sharp(
    path.join(sourceDir, "01.webp")
  )
    .webp()
    .toBuffer();

  const page2 = await sharp(
    path.join(sourceDir, "02.webp")
  )
    .jpeg({ quality: 90 })
    .toBuffer();

  const page3 = await sharp(
    path.join(sourceDir, "03.webp")
  )
    .png()
    .toBuffer();

  // Adicionar as imagens fora de ordem.
  zip.addFile("10.png", page3);
  zip.addFile("2.jpg", page2);
  zip.addFile("1.webp", page1);

  const outputPath = path.join(
    inputDir,
    "teste-ordenacao.cbz"
  );

  zip.writeZip(outputPath);

  console.log("Arquivo de teste criado com sucesso!");
  console.log(`Destino: ${outputPath}`);
}

generateTest().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
