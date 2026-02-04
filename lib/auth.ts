import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

const COOKIE_NAME = 'auth-token';

export interface JWTPayload {
    userId: string;
    username: string;
    role: 'admin' | 'user';
    exp?: number;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

// Create JWT token
export async function createToken(payload: Omit<JWTPayload, 'exp'>): Promise<string> {
    return new SignJWT(payload as unknown as Record<string, unknown>)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);
}

// Verify JWT token
export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as unknown as JWTPayload;
    } catch {
        return null;
    }
}

// Set auth cookie
export async function setAuthCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

// Clear auth cookie
export async function clearAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

// Get current user from cookie
export async function getCurrentUser(): Promise<JWTPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    return verifyToken(token);
}

// Get user from database by username
export async function getUserByUsername(username: string) {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

    return result[0] || null;
}

// Authenticate user
export async function authenticateUser(
    username: string,
    password: string
): Promise<{ success: boolean; user?: JWTPayload; error?: string }> {
    const user = await getUserByUsername(username);

    if (!user) {
        return { success: false, error: 'Invalid credentials' };
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
        return { success: false, error: 'Invalid credentials' };
    }

    const payload: JWTPayload = {
        userId: user.id,
        username: user.username,
        role: user.role,
    };

    const token = await createToken(payload);
    await setAuthCookie(token);

    return { success: true, user: payload };
}

// Check if user is admin
export async function isAdmin(): Promise<boolean> {
    const user = await getCurrentUser();
    return user?.role === 'admin';
}
