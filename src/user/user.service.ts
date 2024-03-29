import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entities';
import { UserType } from './type';
import { cloneDeep } from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private catsRepository: Repository<UserType>,
  ) {}
  private user: UserType[] = [];

  getUser(): UserType[] {
    return this.user;
  }
  setUser(value: UserType[]): void {
    this.user = cloneDeep(value);
  }
  findAll(): Promise<UserType[]> {
    return this.catsRepository.find();
  }

  findOneForId(id: number): Promise<UserType> {
    return this.catsRepository.findOne({ where: { user_id: id } });
  }

  findOneForName(username: string): Promise<UserType> {
    return this.catsRepository.findOne({ where: { username } });
  }

  async remove(id: number, username: string): Promise<void> {
    await this.catsRepository.delete({ user_id: id, username });
  }

  async create(user: UserType): Promise<void> {
    await this.catsRepository.save(user);
  }
}
