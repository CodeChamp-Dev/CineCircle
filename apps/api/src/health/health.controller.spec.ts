import { Test, TestingModule } from "@nestjs/testing";

import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";

describe("HealthController", () => {
  let controller: HealthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();
    controller = module.get<HealthController>(HealthController);
  });

  it("returns status object", () => {
    const result = controller.get();
    expect(result.status).toBe("ok");
    expect(typeof result.uptime).toBe("number");
    expect(result.version).toBeDefined();
  });
});
