import Adapters, { TypeORMUserModel } from 'next-auth/adapters';
import { EntitySchema } from 'typeorm';

export default class User extends (Adapters.TypeORM.Models.User.model as typeof TypeORMUserModel) {
  level: number;
  currentExperience: number;
  challengesCompleted: number;

  constructor(
    name: string,
    email: string,
    image: string,
    emailVerified: Date
  ) {
    super(name, email, image, emailVerified);

    this.level = 1;
    this.currentExperience = 0;
    this.challengesCompleted = 0;
  }
}

export const UserSchema: EntitySchema['options'] = {
  name: 'User',
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    level: {
      type: 'int',
      default: 0,
    }, 
    current_experience: {
      type: 'int',
      default: 0,
    },
    challenges_completed: {
      type: 'int',
      default: 0,
    }
  }
}