import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface FileInterface {
  id?: string;
  name: string;
  path: string;
  code: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface FileGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  path?: string;
  code?: string;
  organization_id?: string;
}
