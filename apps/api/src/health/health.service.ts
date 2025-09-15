import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
  status() {
    return {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "0.0.0",
    };
  }
}
