import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { FoodOption } from 'src/food-options/schemas/food-option.schema';

export type FoodDocument = HydratedDocument<Food>;

@Schema({
  collection: 'foods',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class Food {
  @Prop({ required: true, unique: true })
  food_id: string;

  @Prop({ required: true, maxlength: 45 })
  food_name: string;

  @Prop({ required: true })
  food_price: number;

  @Prop({ required: true })
  food_price_discount: number;

  @Prop({ required: true })
  food_description: string;

  @Prop({ maxlength: 255 })
  food_image_url?: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop()
  category_id?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: FoodOption.name }],
  })
  food_options: FoodOption[];
}

export const FoodSchema = SchemaFactory.createForClass(Food);
