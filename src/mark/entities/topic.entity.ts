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
import { TopicVersion } from './topic.version.entity';

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

  @OneToMany(() => TopicVersion, (version) => version.topic, { cascade: true })
  versions: TopicVersion[];

  @Column()
  name: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  getVersion(): TopicVersion {
    const topicVersion = this.versions.reduce(function (prev, current) {
      return prev && prev.id > current.id ? prev : current;
    });
    return this.versions.find((v) => v.id === topicVersion.id);
  }

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
