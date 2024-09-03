import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionChoiceDto } from './create-option-choice.dto';

export class UpdateOptionChoiceDto extends PartialType(CreateOptionChoiceDto) {}
