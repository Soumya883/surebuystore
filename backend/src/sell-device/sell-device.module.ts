import { Module } from '@nestjs/common';
import { SellDeviceService } from './sell-device.service';
import { SellDeviceController } from './sell-device.controller';

@Module({
  providers: [SellDeviceService],
  controllers: [SellDeviceController]
})
export class SellDeviceModule {}
