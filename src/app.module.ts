import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { UploadFileController } from './upload/upload.controller';
import { UploadFileService } from './upload/upload.service';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/types/graphql.ts'),
        outputAs: 'class',
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'assets', 'images'),
      serveRoot: '/images',
      serveStaticOptions: {
        index: false,
      },
    }),
    PrismaModule,
    UserModule,
    ArticleModule,
    CategoryModule,
  ],
  controllers: [AppController, UploadFileController],
  providers: [AppService, UploadFileService],
})
export class AppModule {}
