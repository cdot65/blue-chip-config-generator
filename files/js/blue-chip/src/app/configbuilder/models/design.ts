import { Config } from "./config";

export class Design {
  avatar: string;
  description: string;
  id: number;
  name: string;
  order: number;
  slug: string;
  title: string;

  configs: Config[] = [];
}
