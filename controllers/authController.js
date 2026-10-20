import { query } from '../lib/db.js';

// POST: Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    const users = await query(
      'SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (!users || users.length === 0) {
      return res.status(401).json({ message: 'Email tidak ditemukan' });
    }

    const user = users[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Password salah' });
    }

    return res.status(200).json({
      message: 'Login berhasil!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login Controller Error:', error);
    return res.status(500).json({
      message: error.message || 'Terjadi kesalahan pada server saat login',
    });
  }
};

// POST: Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Semua data (nama, email, password) harus diisi',
      });
    }

    // Cek apakah email sudah terdaftar
    const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing && existing.length > 0) {
      return res.status(409).json({
        message: 'Email sudah terdaftar. Silakan gunakan email lain atau login.',
      });
    }

    // Simpan user baru
    const result = await query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    return res.status(201).json({
      message: 'Registrasi berhasil!',
      user: {
        id: result.insertId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error('Register Controller Error:', error);
    return res.status(500).json({
      message: error.message || 'Terjadi kesalahan pada server saat registrasi',
    });
  }
};
