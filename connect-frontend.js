import fs from 'fs';

function updateFile(filePath, replacer) {
  if (!fs.existsSync(filePath)) {
    console.warn('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  content = replacer(content);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Updated:', filePath);
}

const frontendDir = 'C:/MAPIL/project_mapil_crud/project_mapil_crud';

// 1. login
updateFile(`${frontendDir}/app/login/page.jsx`, (c) =>
  c.replace(
    "fetch('/api/login'",
    "fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/login'"
  )
);

// 2. register
updateFile(`${frontendDir}/app/register/page.jsx`, (c) =>
  c.replace(
    "fetch('/api/register'",
    "fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/register'"
  )
);

// 3. page.jsx (Home)
updateFile(`${frontendDir}/app/page.jsx`, (c) =>
  c
    .replace(
      "fetch('/api/product')",
      "fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/product')"
    )
    .replace(
      "fetch(`/api/product?id=${id}`",
      "fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/product?id=${id}`"
    )
);

// 4. profile
updateFile(`${frontendDir}/app/profile/page.jsx`, (c) =>
  c
    .replace(
      "fetch('/api/product')",
      "fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/product')"
    )
    .replace(
      "fetch(`/api/product?id=${id}`",
      "fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/product?id=${id}`"
    )
);

// 5. ProductModal
updateFile(`${frontendDir}/components/ProductModal.jsx`, (c) =>
  c.replace(
    "fetch('/api/product'",
    "fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/product'"
  )
);

console.log('🎉 Semua file frontend berhasil disambungkan ke Backend Express!');
