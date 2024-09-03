import { Injectable } from '@nestjs/common';
import { CreateOptionChoiceDto } from './dto/create-option-choice.dto';
import { UpdateOptionChoiceDto } from './dto/update-option-choice.dto';

@Injectable()
export class OptionChoicesService {
  create(createOptionChoiceDto: CreateOptionChoiceDto) {
    return 'This action adds a new optionChoice';
  }

  findAll() {
    return `This action returns all optionChoices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optionChoice`;
  }

  update(id: number, updateOptionChoiceDto: UpdateOptionChoiceDto) {
    return `This action updates a #${id} optionChoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} optionChoice`;
  }
}
