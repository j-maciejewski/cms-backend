import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { SampleDto } from './sample.dto';
import { UploadFileService } from './upload.service';
import { UploadFileTypeValidator } from './upload.validators';
import { generateFilename, saveImage } from 'src/utils/saveImage';
import { createWriteStream } from 'fs';
import { VALID_UPLOADS_MIME_TYPES } from 'src/consts';
import { join } from 'path';

@Controller()
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-image')
  uploadFileAndPassValidation(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(new UploadFileTypeValidator())
        .build({
          fileIsRequired: true,
        }),
    )
    file?: Express.Multer.File,
  ) {
    const filename = generateFilename(VALID_UPLOADS_MIME_TYPES[file.mimetype]);

    const writeStream = createWriteStream(
      join(__dirname, '..', '..', '..', 'assets', 'images', filename),
    );
    writeStream.write(file.buffer);

    return { filename };
  }
}
