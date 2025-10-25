import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  clerkId!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true, index: true })
  email!: string;

  @Prop()
  avatarUrl?: string;

  @Prop()
  bio?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "User" }], default: [] })
  followers!: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: "User" }], default: [] })
  following!: Types.ObjectId[];

  @Prop({
    type: [
      {
        movieId: { type: Types.ObjectId, required: true },
        addedAt: { type: Date, default: () => new Date() },
      },
    ],
    default: [],
  })
  watchlist!: { movieId: Types.ObjectId; addedAt: Date }[];

  @Prop({ type: [{ type: Types.ObjectId }], default: [] })
  cineboardsCreated!: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
