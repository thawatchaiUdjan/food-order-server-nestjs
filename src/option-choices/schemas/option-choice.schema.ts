import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type OptionChoiceDocument = HydratedDocument<OptionChoice>;

@Schema({
  collection: 'option_choices',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class OptionChoice extends Document {
  @Prop({ required: true, maxlength: 48 })
  choice_name: string;

  @Prop({ required: true, default: 0 })
  choice_price: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const OptionChoiceSchema = SchemaFactory.createForClass(OptionChoice);
