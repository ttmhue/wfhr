import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExecptionFilter } from './common/http.execption.filter';
import { ResponseInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExecptionFilter())
  await app.listen(3000);
}
bootstrap();