import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags
} from '@nestjs/swagger';
import { Response } from 'express';

import { CreatePdfDto } from './dto/create-pdf.dto';
import { PdfService } from './pdf.service';

@Controller('pdf')
@ApiTags('PDF')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Generate PDF for the template schema and data'
  })
  @ApiInternalServerErrorResponse({
    description: 'At some point of PDF generation process has failed'
  })
  @ApiBadRequestResponse({
    description: 'Invalid body'
  })
  @ApiBody({ type: CreatePdfDto })
  async create(
    @Body() createPdfDto: CreatePdfDto,
    @Res() res: Response
  ) {
    const buffer = await this.pdfService.create(createPdfDto);
    const stream = this.pdfService.getReadableStream(buffer);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
      'Content-Disposition': 'attachment;filename=result.pdf'
    });

    stream.pipe(res);
    return;
  }
}
