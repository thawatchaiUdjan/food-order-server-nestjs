import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { OptionChoice } from 'src/option-choices/schemas/option-choice.schema';

export type FoodOptionDocument = HydratedDocument<FoodOption>;

@Schema({
  collection: 'food_options',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class FoodOption {
  @Prop({ required: true, maxlength: 48 })
  option_name: string;

  @Prop({ required: true, default: 100 })
  option_description: string;

  @Prop({ required: true, enum: ['select', 'checkbox'] })
  option_type: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: OptionChoice.name }],
  })
  option_choices: OptionChoice[];

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const FoodOptionSchema = SchemaFactory.createForClass(FoodOption);
