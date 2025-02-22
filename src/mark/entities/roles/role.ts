export abstract class Role {
  protected permissions: string[] = [];

  public hasPermission(code: string): boolean {
    if (this.permissions.find((pCode) => pCode === code)) return true;

    return false;
  }
}
