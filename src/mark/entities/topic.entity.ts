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
import { TopicComponent } from './components/topic.component';

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
    return [...this.children, ...this.resources];
  }

  shortestPath(
    to: TopicComponent,
    topicComponents: TopicComponent[],
  ): TopicComponent[] {
    if (this.getIdentifier() === to.getIdentifier()) return [this];

    for (const child of this.getChildren()) {
      const cChild = topicComponents.find(
        (tc) => tc.getIdentifier() === child.getIdentifier(),
      );
      if (!cChild) continue;

      const path = cChild.shortestPath(to, topicComponents);
      if (path.length > 0) {
        path.unshift(this);
        return path;
      }
    }
    return [];
  }
}
