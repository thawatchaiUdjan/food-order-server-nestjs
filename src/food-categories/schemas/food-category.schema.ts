import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodCategoryDocument = HydratedDocument<FoodCategory>;

@Schema({
  collection: 'food_categories',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class FoodCategory {
  @Prop({ required: true, unique: true })
  category_id: string;

  @Prop({ required: true, maxlength: 45 })
  category_name: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const FoodCategorySchema = SchemaFactory.createForClass(FoodCategory);
