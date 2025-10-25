import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URI || "mongodb://localhost:27017/cinecircle",
      }),
    }),
  ],
})
export class DatabaseModule {}
