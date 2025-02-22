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
import { TopicComponent } from './interface/topic.component.interface';

@Entity()
export class Topic extends TopicComponent {
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

  getIdentifier(): string {
    return 'topic-' + this.id;
  }

  getChildren(): TopicComponent[] {
    return this.children || [];
  }

  shortestPath(to: TopicComponent): TopicComponent[] {
    console.log('to', to);
    return [];
  }
}
