import { Module } from '@nestjs/common';
import { OptionChoicesService } from './option-choices.service';
import { OptionChoicesController } from './option-choices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OptionChoice,
  OptionChoiceSchema,
} from './schemas/option-choice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OptionChoice.name,
        schema: OptionChoiceSchema,
      },
    ]),
  ],
  controllers: [OptionChoicesController],
  providers: [OptionChoicesService],
})
export class OptionChoicesModule {}
