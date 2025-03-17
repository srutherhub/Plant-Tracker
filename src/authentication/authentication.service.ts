import { Injectable, UnauthorizedException } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { EmailNotConfirmedException } from "src/errors/email-not-confirmed.exception";

@Injectable()
export class AuthenticationService {
  private supabase: SupabaseClient;
  constructor() {
    const db_url = process.env.DB_URL;
    const db_key = process.env.DB_KEY;
    this.supabase = createClient(db_url, db_key);
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      if (error.message.includes("Email address"))
        throw new UnauthorizedException(error.message);
      if (error.message.includes("requires a valid password"))
        throw new UnauthorizedException(error.message);
      else throw new Error(error.message);
    }
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (error.message.includes("Invalid login credentials"))
        throw new UnauthorizedException(error.message);
      if (error.message.includes("Email not confirmed"))
        throw new EmailNotConfirmedException("Email address not confirmed");
      else throw new Error(error.message);
    }

    return data;
  }

  async getUser() {
    const user = await this.supabase.auth.getUser();
    return user;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }

  async dbConnection() {
    return this.supabase;
  }
}
