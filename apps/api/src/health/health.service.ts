import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  status() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: require('../../../package.json').version || '0.0.0'
    };
  }
}
