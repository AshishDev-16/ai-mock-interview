import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('mockId').notNull(),
    difficulty:varchar('difficulty').default('Medium'),
    questionCount:varchar('questionCount').default('7'),
})

export const UserAnswer=pgTable('UserAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),  
})

export const UserUsage = pgTable('userUsage', {
    id: serial('id').primaryKey(),
    userEmail: varchar('userEmail').notNull().unique(),
    interviewCount: integer('interviewCount').default(0).notNull(),
    createdAt: varchar('createdAt').notNull(),
})