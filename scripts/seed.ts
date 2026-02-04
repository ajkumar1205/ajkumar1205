import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

async function seed() {
    const connectionString = process.env.DB_URL;

    if (!connectionString) {
        console.error('❌ DB_URL environment variable is not set');
        process.exit(1);
    }

    const client = postgres(connectionString, { max: 1 });
    const db = drizzle(client);

    console.log('🌱 Seeding database...');

    // Generate random password
    const randomPassword = crypto.randomBytes(12).toString('base64').slice(0, 16);
    const hashedPassword = await bcrypt.hash(randomPassword, 12);

    try {
        // Check if admin already exists
        const existingAdmin = await db
            .select()
            .from(users)
            .where(eq(users.username, 'admin'))
            .limit(1);

        if (existingAdmin.length > 0) {
            console.log('⚠️  Admin user already exists. Updating password...');
            // Update existing admin password
            await db
                .update(users)
                .set({ password: hashedPassword, updatedAt: new Date() })
                .where(eq(users.username, 'admin'));
        } else {
            // Create admin user
            await db.insert(users).values({
                username: 'admin',
                email: 'iajkumar1205@gmail.com',
                password: hashedPassword,
                role: 'admin',
                verified: true,
            });
        }

        console.log('\n✅ Admin user created/updated successfully!\n');
        console.log('═══════════════════════════════════════════════');
        console.log('  📧 Email:    iajkumar1205@gmail.com');
        console.log('  👤 Username: admin');
        console.log(`  🔑 Password: ${randomPassword}`);
        console.log('═══════════════════════════════════════════════');
        console.log('\n⚠️  IMPORTANT: Save this password! It will not be shown again.\n');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }

    await client.end();
    process.exit(0);
}

seed();
