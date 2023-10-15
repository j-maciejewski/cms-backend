import { FileValidator } from '@nestjs/common';
import * as fileType from 'file-type-mime';

const VALID_UPLOADS_MIME_TYPES = ['image/jpeg', 'image/png'];

export interface UploadTypeValidatorOptions {
  fileType: string[];
}

export class UploadFileTypeValidator extends FileValidator {
  constructor() {
    super(VALID_UPLOADS_MIME_TYPES);
  }

  public isValid(file?: Express.Multer.File): boolean {
    const response = fileType.parse(file.buffer);
    return VALID_UPLOADS_MIME_TYPES.includes(response.mime);
  }

  public buildErrorMessage(): string {
    return `Upload not allowed. Upload only files of type: ${VALID_UPLOADS_MIME_TYPES.join(
      ', ',
    )}`;
  }
}
