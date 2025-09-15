import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ExampleController],
})
export class ExampleModule {}