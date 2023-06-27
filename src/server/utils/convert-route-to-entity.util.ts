const mapping: Record<string, string> = {
  collaborators: 'collaborator',
  files: 'file',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
