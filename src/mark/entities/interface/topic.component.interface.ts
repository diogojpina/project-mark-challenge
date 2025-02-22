export abstract class TopicComponent {
  abstract getIdentifier(): string;
  abstract getChildren(): TopicComponent[];
  abstract shortestPath(to: TopicComponent): TopicComponent[];
}
