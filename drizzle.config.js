/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview_owner:3vfjkrO0CxJa@ep-icy-cake-a54o0025.us-east-2.aws.neon.tech/ai-interview?sslmode=require',
    }
  };