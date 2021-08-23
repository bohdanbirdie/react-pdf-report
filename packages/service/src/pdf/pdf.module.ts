import { Module } from '@nestjs/common';

import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { SchemaRendererService } from './schema-renderer.service';

@Module({
  controllers: [PdfController],
  providers: [PdfService, SchemaRendererService]
})
export class PdfModule {}
