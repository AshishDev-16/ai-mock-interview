import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './utils/schema.js';

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
const db = drizzle(sql, { schema });

async function main() {
    console.log("Starting data migration for UserUsage...");
    try {
        const interviews = await db.select().from(schema.MockInterview);
        const userMap = {};
        for (const interview of interviews) {
            const email = interview.createdBy;
            if (email) {
                if (!userMap[email]) {
                    userMap[email] = 0;
                }
                userMap[email]++;
            }
        }
        
        for (const email of Object.keys(userMap)) {
            console.log(`Migrating ${email}: ${userMap[email]} interviews`);
            await db.insert(schema.UserUsage)
              .values({
                  userEmail: email,
                  interviewCount: userMap[email],
                  createdAt: new Date().toISOString()
              })
              .onConflictDoUpdate({
                  target: schema.UserUsage.userEmail,
                  set: { interviewCount: userMap[email] }
              });
        }
        console.log("Migration complete.");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

main();
