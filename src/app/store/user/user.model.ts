import {Company} from '../company/company.model';

export interface User {
  id: string;
  firstName: string;
  lastName: string;

  company?: Company;
  companyId?: string;
}
