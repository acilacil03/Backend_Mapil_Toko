import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Semua field (nama, email, password) wajib diisi!' },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar!' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    return NextResponse.json(
      { success: 'Registrasi berhasil!', userId: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
