import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET: Ambil semua produk
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Get Products Error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data produk' },
      { status: 500 }
    );
  }
}

// POST: Tambah produk baru
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price, description, image_url } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: 'Nama dan harga produk wajib diisi!' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      'INSERT INTO products (name, price, description, image_url) VALUES (?, ?, ?, ?)',
      [name, price, description || '', image_url || '']
    );

    return NextResponse.json(
      { success: 'Produk berhasil ditambahkan', productId: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create Product Error:', error);
    return NextResponse.json(
      { error: 'Gagal menambahkan produk' },
      { status: 500 }
    );
  }
}
