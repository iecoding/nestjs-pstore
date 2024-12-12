import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';

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
  @Get(':productId')
  getProduct(@Param() params: any) {
    return {
      message: `product ${params.productId}`,
    };
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
}
