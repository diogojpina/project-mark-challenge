import { TopicComponent } from '../entities/interface/topic.component.interface';

export class DirectionGraph {
  //bfs search to find the shortestpath, then print the path
  public static shortestPath(
    topics: TopicComponent[],
    from: TopicComponent,
    to: TopicComponent,
  ): TopicComponent[] {
    let found = false;
    const saw: string[] = [from.getIdentifier()];
    const queue: TopicComponent[] = [from];
    const parents = new Map<string, TopicComponent>();

    while (queue.length > 0) {
      const node = queue.shift();

      for (const child of node.getChildren()) {
        const cNode = topics.find(
          (t) => t.getIdentifier() === child.getIdentifier(),
        );
        if (!cNode) continue;

        parents.set(child.getIdentifier(), node);
        if (child.getIdentifier() === to.getIdentifier()) {
          found = true;
          break;
        }

        if (!saw.find((id) => id === child.getIdentifier())) {
          queue.push(cNode);
          saw.push(node.getIdentifier());
        }
      }
    }

    if (!found) return [];

    const path: TopicComponent[] = [];

    let cNode = to;
    while (cNode) {
      path.unshift(cNode);
      cNode = parents.get(cNode.getIdentifier());
    }

    return path;
  }
}
