import { Body, Controller, Post } from '@nestjs/common';
import { WordType } from './type';
import { WordService } from './word.service';
@Controller('gather')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post('word')
  async wordPost(@Body() body) {
    const word = body.word;
    // const getWord = await this.wordService.findOneForWord(word);
    const getWord: WordType | null =
      await this.wordService.findOneForWord(word);
    // const getWord = await this.wordService.findAll();

    return getWord;
  }
}
