import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Resource } from './resource.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Topic, (parent) => parent.children, { nullable: true })
  parent: Topic;

  @OneToMany(() => Topic, (children) => children.parent)
  children: Topic[];

  @OneToMany(() => Resource, (resource) => resource.topic)
  resources: Resource[];

  @Column()
  name: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
