import { randomUUID } from "crypto";

export default class User {
  public constructor(
    public name: string,
    public email: string,
    public id?: string,
  ) {}
}