import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../enum/user.role.enum';
import { Role } from './roles/role';
import { AdminRole } from './roles/admin.role';
import { EditorRole } from './roles/editor.role';
import { ViewerRole } from './roles/viewer.role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  roleCode: UserRole;

  private role: Role;

  @CreateDateColumn()
  createdAt: Date;

  public getRole(): Role {
    if (this.role) return this.role;

    switch (this.roleCode) {
      case UserRole.ADMIN:
        this.role = new AdminRole();
        break;
      case UserRole.EDITOR:
        this.role = new EditorRole();
        break;
      case UserRole.VIEWER:
        this.role = new ViewerRole();
        break;
      default:
        throw new Error('Role not set!');
    }

    return this.role;
  }
}
