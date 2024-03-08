import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './word.entities';
import { WordType } from './type';
import { cloneDeep } from 'lodash';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private catsRepository: Repository<WordType>,
  ) {}
  private user: WordType[] = [];

  get(): WordType[] {
    return this.user;
  }
  set(value: WordType[]): void {
    this.user = cloneDeep(value);
  }
  findAll(): Promise<WordType[]> {
    return this.catsRepository.find();
  }

  findOneForId(id: number): Promise<WordType> {
    const where = { id };
    return this.catsRepository.findOne({ where });
  }

  findOneForWord(word: string): Promise<WordType> {
    return this.catsRepository.findOne({ where: { word } });
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete({ id });
  }

  async create(user: WordType): Promise<void> {
    await this.catsRepository.save(user);
  }
}
