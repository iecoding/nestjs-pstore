import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  // http://localhost:3000/products?brand=xyz
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    };
  }
  // estático primero
  @Get('filter')
  getProductFilter() {
    return {
      message: `Soy un filter`,
    };
  }

  // lo dinámico despues de lo estático
  /* Estilo NestJS
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param() params: any) {
    return {
      message: `product ${params.productId}`,
    };
  } */

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Res() response: Response, @Param('productId') productId: string) {
    response.status(200).send({
      // estilo Express.js
      message: `product ${productId}`,
    });
  }

  @Get(':productId')
  getProduct2(@Param('productId') productId: string) {
    return {
      message: `product ${productId}`,
    };
  }

  /*
  //http://localhost:3000/products?limit=100&offset=50
  @Get('products')
  getProducts(@Query() params: any) {
    const { limit, offset } = params;
    return `products: limit=> ${limit} offset=> ${offset}`;
  }
  */

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'action create',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      message: 'action update',
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}
