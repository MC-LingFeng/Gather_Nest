import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoutesPath } from './route.entities';
import { RouteType } from './type';
import { cloneDeep } from 'lodash';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(RoutesPath)
    private catsRepository: Repository<RouteType>,
  ) {}
  private route: RouteType[] = [];

  getUser(): RouteType[] {
    return this.route;
  }
  setUser(value: RouteType[]): void {
    this.route = cloneDeep(value);
  }
  findAll(): Promise<RouteType[]> {
    return this.catsRepository.find();
  }

  findOneForId(id: number): Promise<RouteType> {
    return this.catsRepository.findOne({ where: { id: id } });
  }

  findOneForName(name: string): Promise<RouteType> {
    return this.catsRepository.findOne({ where: { name } });
  }

  async remove(id: number, name: string): Promise<void> {
    await this.catsRepository.delete({ id, name });
  }

  async create(user: RouteType): Promise<void> {
    await this.catsRepository.save(user);
  }
}
