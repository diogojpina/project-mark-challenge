import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ResourceType } from '../enum/resource.type.enum';
import { Topic } from './topic.entity';
import { TopicComponent } from './components/topic.component';

@Entity()
export class Resource extends TopicComponent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Topic, (topic) => topic.resources)
  topic: Topic;

  @Column()
  url: string;

  @Column()
  description: string;

  @Column()
  type: ResourceType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  getIdentifier(): string {
    return 'resource-' + this.id;
  }

  getChildren(): TopicComponent[] {
    return [];
  }

  shortestPath(
    to: TopicComponent,
    topicComponents: TopicComponent[],
  ): TopicComponent[] {
    if (this.getIdentifier() === to.getIdentifier()) return [this];
    return [];
  }
}
