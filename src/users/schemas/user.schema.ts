import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class User {
  @Prop({ required: true, unique: true })
  user_id: string;

  @Prop({ required: true, maxlength: 45 })
  username: string;

  @Prop({ maxlength: 100 })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ maxlength: 45, default: 'user' })
  role: string;

  @Prop({ default: 0 })
  balance: number;

  @Prop()
  location: {
    address: string;
    latlng: {
      lat: number;
      lng: number;
    };
  };

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
