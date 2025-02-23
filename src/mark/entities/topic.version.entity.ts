import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Topic } from './topic.entity';

@Entity()
export class TopicVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Topic, (parent) => parent.versions)
  topic: Topic;

  @Column()
  name: string;

  @Column()
  content: string;
}
