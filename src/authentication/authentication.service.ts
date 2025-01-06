import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class AuthenticationService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      "https://ofpcbhmcwsqxjmfofpuy.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mcGNiaG1jd3NxeGptZm9mcHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNjYwNjMsImV4cCI6MjA1MTc0MjA2M30.yabJlBWOWxaaLIqz9cKDrZFhZPTIcp8BsexglMEvAHU"
    );
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
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
}
