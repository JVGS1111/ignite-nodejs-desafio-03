import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const userData = await this.repository.findOne(user_id, {
      relations: ['games']
    })

    return userData!
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query(`
      SELECT * 
      FROM
        users
      ORDER BY
        first_name ASC;
    `); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query(`
      SELECT 
        email,
        first_name,
        last_name
      FROM users
      WHERE
        first_name ILIKE '${first_name}' AND
        last_name ILIKE '${last_name}';`); // Complete usando raw query
  }
}
