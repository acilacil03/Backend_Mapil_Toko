import { query } from './lib/db.js';

async function testConnection() {
  console.log('Testing MySQL Connection...');
  try {
    const tables = await query('SHOW TABLES');
    console.log('✅ Berhasil terhubung ke database MySQL!');
    console.log('Tabel yang tersedia:', tables);

    const products = await query('SELECT id, name, category, price FROM products LIMIT 3');
    console.log(`✅ Data produk (${products.length} item):`, products);

    const users = await query('SELECT id, name, email FROM users LIMIT 3');
    console.log(`✅ Data user (${users.length} item):`, users);

    console.log('\n🎉 Semua tes koneksi database BERHASIL!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Gagal terhubung ke database:', error.message);
    process.exit(1);
  }
}

testConnection();
