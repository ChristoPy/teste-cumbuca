import { TaxId } from "../../models/user";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  taxId: TaxId;
}
