import { Role } from './role';

export class EditorRole extends Role {
  constructor() {
    super();
    this.permissions.push(
      'topic_list',
      'topic_read',
      'topic_create',
      'topic_update',
      'topic_shortest_path',
      'resouce_list',
      'resouce_read',
      'resource_create',
      'resource_update',
    );
  }
}
