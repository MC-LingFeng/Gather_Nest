import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entities';
import { UserType } from '../entities/type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private catsRepository: Repository<UserType>,
  ) {}

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
