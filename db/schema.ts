import {
    pgTable,
    uuid,
    varchar,
    text,
    boolean,
    integer,
    timestamp,
    pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('role', ['admin', 'user']);

// Users table
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    username: varchar('username', { length: 50 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    role: roleEnum('role').notNull().default('user'),
    email: varchar('email', { length: 255 }),
    verified: boolean('verified').notNull().default(false),
    avatarUrl: text('avatar_url'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Blogs table
export const blogs = pgTable('blogs', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    desc: text('desc'),
    content: text('content').notNull(),
    likes: integer('likes').notNull().default(0),
    comments: integer('comments').notNull().default(0),
    views: integer('views').notNull().default(0),
    approved: boolean('approved').notNull().default(false),
    authorId: uuid('author_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Tags table
export const tags = pgTable('tags', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 100 }).notNull().unique(),
    url: text('url'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Blog-Tags junction table (many-to-many)
export const blogTags = pgTable('blog_tags', {
    id: uuid('id').defaultRandom().primaryKey(),
    blogId: uuid('blog_id')
        .notNull()
        .references(() => blogs.id, { onDelete: 'cascade' }),
    tagId: uuid('tag_id')
        .notNull()
        .references(() => tags.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    blogs: many(blogs),
}));

export const blogsRelations = relations(blogs, ({ one, many }) => ({
    author: one(users, {
        fields: [blogs.authorId],
        references: [users.id],
    }),
    blogTags: many(blogTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
    blogTags: many(blogTags),
}));

export const blogTagsRelations = relations(blogTags, ({ one }) => ({
    blog: one(blogs, {
        fields: [blogTags.blogId],
        references: [blogs.id],
    }),
    tag: one(tags, {
        fields: [blogTags.tagId],
        references: [tags.id],
    }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;
