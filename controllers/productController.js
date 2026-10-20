import { query } from '../lib/db.js';

// GET: Ambil semua produk / cari produk
export const getProducts = async (req, res) => {
  try {
    const search = req.query.search || '';
    const category = req.query.category || '';

    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (name LIKE ? OR description LIKE ? OR category LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (category && category !== 'Semua') {
      sql += ' AND category = ?';
      params.push(category);
    }

    sql += ' ORDER BY id DESC';

    const products = await query(sql, params);
    return res.status(200).json(products);
  } catch (error) {
    console.error('Get Products Error:', error);
    return res.status(500).json({
      message: error.message || 'Gagal mengambil data produk',
    });
  }
};

// GET: Ambil detail produk berdasarkan ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await query('SELECT * FROM products WHERE id = ? LIMIT 1', [id]);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    return res.status(200).json(products[0]);
  } catch (error) {
    console.error('Get Product By ID Error:', error);
    return res.status(500).json({
      message: error.message || 'Gagal mengambil detail produk',
    });
  }
};

// POST: Tambah produk baru
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category = 'Kaos',
      price,
      stock = 0,
      size = 'M',
      description = '',
      image_url = '',
    } = req.body;

    if (!name || price === undefined || price === null || price === '') {
      return res.status(400).json({
        message: 'Nama dan harga produk wajib diisi!',
      });
    }

    const result = await query(
      'INSERT INTO products (name, category, price, stock, size, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, category, Number(price), Number(stock), size, description, image_url]
    );

    return res.status(201).json({
      message: 'Produk berhasil ditambahkan',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Create Product Error:', error);
    return res.status(500).json({
      message: error.message || 'Gagal menambahkan produk baru',
    });
  }
};

// PUT: Perbarui produk (bisa lewat /api/product/:id atau /api/product dengan id di body)
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    const {
      name,
      category = 'Kaos',
      price,
      stock = 0,
      size = 'M',
      description = '',
      image_url = '',
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID produk dibutuhkan untuk update' });
    }

    await query(
      'UPDATE products SET name=?, category=?, price=?, stock=?, size=?, description=?, image_url=? WHERE id=?',
      [name, category, Number(price), Number(stock), size, description, image_url, id]
    );

    return res.status(200).json({ message: 'Produk berhasil diubah' });
  } catch (error) {
    console.error('Update Product Error:', error);
    return res.status(500).json({
      message: error.message || 'Gagal mengubah produk',
    });
  }
};

// DELETE: Hapus produk (bisa lewat /api/product/:id atau /api/product?id=...)
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;

    if (!id) {
      return res.status(400).json({ message: 'ID produk dibutuhkan' });
    }

    await query('DELETE FROM products WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error('Delete Product Error:', error);
    return res.status(500).json({
      message: error.message || 'Gagal menghapus produk',
    });
  }
};
