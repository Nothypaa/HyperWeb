import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export interface ContactSubmission {
  id?: number;
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message?: string;
  created_at?: string;
  ip_address?: string;
}

export async function initDatabase(): Promise<Database> {
  if (db) {
    return db;
  }

  const dbPath = process.env.DATABASE_PATH || './data/contacts.db';
  const absolutePath = path.resolve(dbPath);
  
  db = await open({
    filename: absolutePath,
    driver: sqlite3.Database
  });

  // Create contacts table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      ip_address TEXT
    )
  `);

  // Create rate limiting table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS rate_limits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip_address TEXT NOT NULL,
      submission_count INTEGER DEFAULT 1,
      last_reset DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(ip_address)
    )
  `);

  // Create admin login attempts table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS admin_login_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip_address TEXT NOT NULL,
      attempt_count INTEGER DEFAULT 1,
      last_attempt DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_blocked BOOLEAN DEFAULT 0,
      blocked_until DATETIME,
      UNIQUE(ip_address)
    )
  `);

  // Create audit log table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      details TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

export async function insertContact(contact: ContactSubmission): Promise<number> {
  const database = await initDatabase();
  
  const result = await database.run(
    `INSERT INTO contacts (full_name, email, phone, subject, message, ip_address)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [contact.full_name, contact.email, contact.phone, contact.subject, contact.message, contact.ip_address]
  );

  return result.lastID as number;
}

export async function checkRateLimit(ipAddress: string, maxPerHour: number = 5): Promise<boolean> {
  const database = await initDatabase();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  // Get current rate limit record
  const record = await database.get(
    'SELECT * FROM rate_limits WHERE ip_address = ?',
    [ipAddress]
  );

  if (!record) {
    // First submission from this IP
    await database.run(
      'INSERT INTO rate_limits (ip_address, submission_count) VALUES (?, 1)',
      [ipAddress]
    );
    return true;
  }

  // Check if we need to reset the counter (more than 1 hour has passed)
  if (record.last_reset < oneHourAgo) {
    await database.run(
      'UPDATE rate_limits SET submission_count = 1, last_reset = CURRENT_TIMESTAMP WHERE ip_address = ?',
      [ipAddress]
    );
    return true;
  }

  // Check if under rate limit
  if (record.submission_count < maxPerHour) {
    await database.run(
      'UPDATE rate_limits SET submission_count = submission_count + 1 WHERE ip_address = ?',
      [ipAddress]
    );
    return true;
  }

  return false; // Rate limit exceeded
}

export async function getAllContacts(): Promise<ContactSubmission[]> {
  const database = await initDatabase();
  return await database.all('SELECT * FROM contacts ORDER BY created_at DESC');
}

export async function getContactById(id: number): Promise<ContactSubmission | undefined> {
  const database = await initDatabase();
  return await database.get('SELECT * FROM contacts WHERE id = ?', [id]);
}

export async function checkAdminRateLimit(ipAddress: string, maxAttempts: number = 3): Promise<boolean> {
  const database = await initDatabase();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const record = await database.get(
    'SELECT * FROM admin_login_attempts WHERE ip_address = ?',
    [ipAddress]
  );

  if (!record) {
    await database.run(
      'INSERT INTO admin_login_attempts (ip_address, attempt_count) VALUES (?, 1)',
      [ipAddress]
    );
    return true;
  }

  if (record.blocked_until && new Date(record.blocked_until) > new Date()) {
    return false;
  }

  if (record.last_attempt < oneHourAgo) {
    await database.run(
      'UPDATE admin_login_attempts SET attempt_count = 1, last_attempt = CURRENT_TIMESTAMP, is_blocked = 0, blocked_until = NULL WHERE ip_address = ?',
      [ipAddress]
    );
    return true;
  }

  if (record.attempt_count >= maxAttempts) {
    const blockUntil = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await database.run(
      'UPDATE admin_login_attempts SET is_blocked = 1, blocked_until = ? WHERE ip_address = ?',
      [blockUntil, ipAddress]
    );
    return false;
  }

  await database.run(
    'UPDATE admin_login_attempts SET attempt_count = attempt_count + 1, last_attempt = CURRENT_TIMESTAMP WHERE ip_address = ?',
    [ipAddress]
  );
  return true;
}

export async function resetAdminRateLimit(ipAddress: string): Promise<void> {
  const database = await initDatabase();
  await database.run(
    'UPDATE admin_login_attempts SET attempt_count = 0, is_blocked = 0, blocked_until = NULL WHERE ip_address = ?',
    [ipAddress]
  );
}

export async function logAuditEvent(eventType: string, ipAddress: string, userAgent?: string, details?: string): Promise<void> {
  const database = await initDatabase();
  await database.run(
    'INSERT INTO audit_logs (event_type, ip_address, user_agent, details) VALUES (?, ?, ?, ?)',
    [eventType, ipAddress, userAgent || null, details || null]
  );
}