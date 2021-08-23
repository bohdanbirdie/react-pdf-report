import { deserializeSchema } from '@react-pdf/components';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Readable } from 'stream';

import { CreatePdfDto } from './dto/create-pdf.dto';
import { SchemaRendererService } from './schema-renderer.service';

@Injectable()
export class PdfService {
  constructor(private readonly schemaRendererService: SchemaRendererService) {}

  create(createPdfDto: CreatePdfDto): Promise<Buffer> {
    let schema: ReturnType<typeof deserializeSchema>;

    try {
      schema = deserializeSchema(createPdfDto.schema);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }

    return this.schemaRendererService.renderPDF(
      schema,
      createPdfDto.data
    );
  }

  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }
}
