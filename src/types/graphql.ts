
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
    authorId: string;
    categoryId: string;
}

export class UpdateArticleInput {
    id: string;
    title?: Nullable<string>;
    leadImage?: Nullable<string>;
    content?: Nullable<string>;
    slug?: Nullable<string>;
}

export class CreateCategoryInput {
    name: string;
    slug?: Nullable<string>;
}

export class UpdateCategoryInput {
    id: string;
    name?: Nullable<string>;
    slug?: Nullable<string>;
    isHidden?: Nullable<boolean>;
}

export class CreateUserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class UpdateUserInput {
    id: string;
    email?: Nullable<string>;
    password?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    avatar?: Nullable<string>;
    role?: Nullable<string>;
    isSuspended?: Nullable<boolean>;
    isAnonymous?: Nullable<boolean>;
}

export class Article {
    id: string;
    title: string;
    leadImage: string;
    content: string;
    slug: string;
    isHidden: boolean;
    isHighlighted: boolean;
    createdAt: string;
    updatedAt: string;
    author?: Nullable<User>;
    category?: Nullable<Category>;
}

export class ArticlesListResponse {
    total: number;
    rows: Article[];
}

export abstract class IQuery {
    abstract articles(grid?: Nullable<ArticlesGridInput>): ArticlesListResponse | Promise<ArticlesListResponse>;

    abstract article(filter: ArticleFilterInput): Nullable<Article> | Promise<Nullable<Article>>;

    abstract categories(): Category[] | Promise<Category[]>;

    abstract category(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createArticle(createArticleInput: CreateArticleInput): Article | Promise<Article>;

    abstract updateArticle(updateArticleInput: UpdateArticleInput): Article | Promise<Article>;

    abstract removeArticle(id: string): Nullable<Article> | Promise<Nullable<Article>>;

    abstract createCategory(createCategoryInput: CreateCategoryInput): Category | Promise<Category>;

    abstract updateCategory(updateCategoryInput: UpdateCategoryInput): Category | Promise<Category>;

    abstract removeCategory(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Category {
    id: string;
    name: string;
    slug: string;
    isHidden: boolean;
    articles?: Nullable<Article[]>;
    articlesCount: number;
}

export class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar?: Nullable<string>;
    role: string;
    isSuspended: boolean;
    isAnonymous: boolean;
    articles?: Nullable<Article[]>;
}

type Nullable<T> = T | null;
