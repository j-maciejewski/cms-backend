
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum RoleEnum {
    USER = "USER",
    ADMIN = "ADMIN"
}

export class ArticlesGridInput {
    limit?: Nullable<number>;
    page?: Nullable<number>;
    filter?: Nullable<ArticlesGridInputFilter>;
}

export class ArticlesGridInputFilter {
    categoryId?: Nullable<string>;
    categorySlug?: Nullable<string>;
    authorId?: Nullable<string>;
    fullText?: Nullable<string>;
}

export class ArticleFilterInput {
    id?: Nullable<string>;
    slug?: Nullable<string>;
}

export class CreateArticleInput {
    title: string;
    leadImage: string;
    content: string;
    slug?: Nullable<string>;
    categoryId: string;
}

export class UpdateArticleInput {
    title?: Nullable<string>;
    leadImage?: Nullable<string>;
    content?: Nullable<string>;
    slug?: Nullable<string>;
    isHidden?: Nullable<boolean>;
    isHighlighted?: Nullable<boolean>;
    categoryId?: Nullable<string>;
}

export class CreateCategoryInput {
    name: string;
    slug?: Nullable<string>;
}

export class UpdateCategoryInput {
    name?: Nullable<string>;
    slug?: Nullable<string>;
    isHidden?: Nullable<boolean>;
}

export class MessagesGridInput {
    limit?: Nullable<number>;
    page?: Nullable<number>;
}

export class CreateMessageInput {
    name: string;
    email: string;
    content: string;
}

export class UpdateMessageInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    content?: Nullable<string>;
}

export class UsersGridInput {
    limit?: Nullable<number>;
    page?: Nullable<number>;
}

export class CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
}

export class UpdateUserInput {
    email?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    avatar?: Nullable<string>;
    role?: Nullable<RoleEnum>;
    isSuspended?: Nullable<boolean>;
    isAnonymous?: Nullable<boolean>;
}

export class PublicArticle {
    id: string;
    title: string;
    leadImage: string;
    content: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    author?: Nullable<User>;
    category?: Nullable<PublicCategory>;
}

export class Article {
    id: string;
    title: string;
    leadImage: string;
    content: string;
    slug: string;
    isHidden: boolean;
    isHighlighted: boolean;
    assets: Nullable<string>[];
    createdAt: string;
    updatedAt: string;
    author?: Nullable<User>;
    category?: Nullable<Category>;
}

export class PublicArticlesListResponse {
    total: number;
    rows: PublicArticle[];
}

export class ArticlesListResponse {
    total: number;
    rows: Article[];
}

export abstract class IQuery {
    abstract publicArticles(grid?: Nullable<ArticlesGridInput>): PublicArticlesListResponse | Promise<PublicArticlesListResponse>;

    abstract publicArticle(filter: ArticleFilterInput): Nullable<PublicArticle> | Promise<Nullable<PublicArticle>>;

    abstract publicHomePageArticles(): PublicCategory[] | Promise<PublicCategory[]>;

    abstract publicHighlightedArticles(): PublicArticle[] | Promise<PublicArticle[]>;

    abstract articles(grid?: Nullable<ArticlesGridInput>): ArticlesListResponse | Promise<ArticlesListResponse>;

    abstract article(filter: ArticleFilterInput): Nullable<Article> | Promise<Nullable<Article>>;

    abstract activeUser(): User | Promise<User>;

    abstract publicCategories(): PublicCategory[] | Promise<PublicCategory[]>;

    abstract categories(): Category[] | Promise<Category[]>;

    abstract category(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract messages(grid?: Nullable<MessagesGridInput>): MessagesListResponse | Promise<MessagesListResponse>;

    abstract message(id: string): Nullable<Message> | Promise<Nullable<Message>>;

    abstract users(grid?: Nullable<UsersGridInput>): UsersListResponse | Promise<UsersListResponse>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createArticle(createArticleInput: CreateArticleInput): Article | Promise<Article>;

    abstract updateArticle(id: string, updateArticleInput: UpdateArticleInput): Article | Promise<Article>;

    abstract deleteArticle(id: string): Nullable<Article> | Promise<Nullable<Article>>;

    abstract login(email: string, password: string): LoginResponse | Promise<LoginResponse>;

    abstract logout(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract refreshToken(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createCategory(createCategoryInput: CreateCategoryInput): Category | Promise<Category>;

    abstract updateCategory(id: string, updateCategoryInput: UpdateCategoryInput): Category | Promise<Category>;

    abstract deleteCategory(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract createMessage(createMessageInput: CreateMessageInput): boolean | Promise<boolean>;

    abstract updateMessage(id: string, updateMessageInput: UpdateMessageInput): Message | Promise<Message>;

    abstract deleteMessage(id: string): Nullable<Message> | Promise<Nullable<Message>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class LoginResponse {
    accessToken: string;
}

export class PublicCategory {
    id: string;
    name: string;
    slug: string;
    articles: PublicArticle[];
}

export class Category {
    id: string;
    name: string;
    slug: string;
    isHidden: boolean;
    createdAt: string;
    articles: Article[];
    articlesCount: number;
}

export class Message {
    id: string;
    name: string;
    email: string;
    content: string;
    replySent: string;
    createdAt: string;
}

export class MessagesListResponse {
    total: number;
    rows: Message[];
}

export class PublicUser {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: Nullable<string>;
    isAnonymous: boolean;
}

export class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: Nullable<string>;
    role: RoleEnum;
    isSuspended: boolean;
    isAnonymous: boolean;
    createdAt: string;
    articles?: Nullable<Article[]>;
}

export class UsersListResponse {
    total: number;
    rows: User[];
}

type Nullable<T> = T | null;
