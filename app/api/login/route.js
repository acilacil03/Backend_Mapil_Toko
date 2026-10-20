import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi!' },
        { status: 400 }
      );
    }

    const [rows] = await pool.query(
      'SELECT id, name, email, role FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Email atau password salah!' },
        { status: 401 }
      );
    }

    const user = rows[0];

    return NextResponse.json(
      { success: 'Login berhasil!', user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
