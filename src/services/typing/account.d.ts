export type Roles = {roleId: string; name: string}
export type AccountWithRoles = {name: string; accountId: string; roles: Roles[]}
export type AccountsWithRoleResponse = AccountWithRoles[]
