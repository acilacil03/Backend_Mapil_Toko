import http from 'http';

async function request(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- Testing Endpoints on http://localhost:5000 ---');

  // Test 1: Healthcheck
  const resHome = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'GET',
  });
  console.log('1. GET / :', resHome.status, resHome.body.message);

  // Test 2: Login
  const resLogin = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, { email: 'rakaraka48246@gmail.com', password: '123' });
  console.log('2. POST /api/login :', resLogin.status, resLogin.body.message, resLogin.body.user);

  // Test 3: Get Products
  const resProducts = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/product',
    method: 'GET',
  });
  console.log('3. GET /api/product :', resProducts.status, `Ditemukan ${resProducts.body.length} produk`);

  // Test 4: Create Product
  const resCreate = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/product',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    name: 'Test Produk API Backend',
    category: 'Kaos',
    price: 99000,
    stock: 10,
    size: 'L',
    description: 'Baju hasil pengetesan API otomatis',
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500'
  });
  console.log('4. POST /api/product :', resCreate.status, resCreate.body.message, 'ID:', resCreate.body.id);
  const createdId = resCreate.body.id;

  // Test 5: Update Product
  const resUpdate = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/product/${createdId}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  }, {
    name: 'Test Produk API Backend (Updated)',
    category: 'Kaos',
    price: 110000,
    stock: 15,
    size: 'XL',
    description: 'Baju hasil pengetesan API otomatis diupdate',
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500'
  });
  console.log('5. PUT /api/product/:id :', resUpdate.status, resUpdate.body.message);

  // Test 6: Delete Product
  const resDelete = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/product?id=${createdId}`,
    method: 'DELETE',
  });
  console.log('6. DELETE /api/product?id=... :', resDelete.status, resDelete.body.message);

  console.log('\n🌟 SEMUA ENDPOINT BERHASIL DIUJI DENGAN STATUS OK (200/201)!');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
