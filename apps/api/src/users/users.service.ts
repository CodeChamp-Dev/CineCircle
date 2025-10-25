import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User } from "./users.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async upsertByClerkId(payload: {
    clerkId: string;
    name: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
  }): Promise<User | null> {
    const { clerkId, ...rest } = payload;
    return this.userModel
      .findOneAndUpdate({ clerkId }, { $set: { clerkId, ...rest } }, { new: true, upsert: true })
      .exec();
  }

  async deleteByClerkId(clerkId: string): Promise<void> {
    await this.userModel.deleteOne({ clerkId }).exec();
  }

  async findByClerkId(clerkId: string): Promise<User | null> {
    return this.userModel.findOne({ clerkId }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserCount(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }
}
