import { Role } from './role';

export class ViewerRole extends Role {
  constructor() {
    super();
    this.permissions.push(
      'topic_list',
      'topic_read',
      'topic_shortest_path',
      'resouce_list',
      'resouce_read',
    );
  }
}
