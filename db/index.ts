import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DB_URL!;

// Singleton pattern for connection in development
// This prevents Next.js hot reload from creating multiple connections
const globalForDb = globalThis as unknown as {
    queryClient: ReturnType<typeof postgres> | undefined;
};

// Create connection with connection pool settings
const queryClient = globalForDb.queryClient ?? postgres(connectionString, {
    max: 10, // Maximum connections in pool
    idle_timeout: 20, // Close idle connections after 20 seconds
    connect_timeout: 10, // Connection timeout
});

if (process.env.NODE_ENV !== 'production') {
    globalForDb.queryClient = queryClient;
}

export const db = drizzle(queryClient, { schema });

// For migrations (uses a separate connection)
export const createMigrationClient = () => {
    const migrationClient = postgres(connectionString, { max: 1 });
    return drizzle(migrationClient, { schema });
};
