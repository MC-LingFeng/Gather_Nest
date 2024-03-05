import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Themes } from './theme.entities';
import { ThemesType } from './type';
import { cloneDeep } from 'lodash';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Themes)
    private catsRepository: Repository<ThemesType>,
  ) {}
  private route: ThemesType[] = [];

  get(): ThemesType[] {
    return this.route;
  }
  set(value: ThemesType[]): void {
    this.route = cloneDeep(value);
  }
  findAll(): Promise<ThemesType[]> {
    return this.catsRepository.find();
  }

  findOneForId(id: number): Promise<ThemesType> {
    return this.catsRepository.findOne({ where: { id: id } });
  }

  findOneForName(name: string): Promise<ThemesType> {
    return this.catsRepository.findOne({ where: { name } });
  }

  async remove(id: number, name: string): Promise<void> {
    await this.catsRepository.delete({ id, name });
  }
  async update(id: number, name: string): Promise<void> {
    await this.catsRepository.update(id, { value: name, name });
  }

  async create(user: ThemesType): Promise<void> {
    await this.catsRepository.save(user);
  }
}
