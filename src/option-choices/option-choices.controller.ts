import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionChoicesService } from './option-choices.service';
import { CreateOptionChoiceDto } from './dto/create-option-choice.dto';
import { UpdateOptionChoiceDto } from './dto/update-option-choice.dto';

@Controller('option-choices')
export class OptionChoicesController {
  constructor(private readonly optionChoicesService: OptionChoicesService) {}

  @Post()
  create(@Body() createOptionChoiceDto: CreateOptionChoiceDto) {
    return this.optionChoicesService.create(createOptionChoiceDto);
  }

  @Get()
  findAll() {
    return this.optionChoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionChoicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionChoiceDto: UpdateOptionChoiceDto) {
    return this.optionChoicesService.update(+id, updateOptionChoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionChoicesService.remove(+id);
  }
}
