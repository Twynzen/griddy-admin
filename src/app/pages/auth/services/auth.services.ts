import { Injectable } from "@angular/core";
import { SupabaseClient,Session , createClient, User, AuthApiError, UserAttributes, SignInWithPasswordCredentials, AuthError } from "@supabase/supabase-js";
import { BehaviorSubject, Observable } from "rxjs";
import { USER_STORAGE_KEY } from "src/app/shared/constants/constants";
import { environment } from "src/environments/environment";

type supabaseResponse = User | Session |AuthApiError | null;


@Injectable({providedIn: 'root'})

export class AuthService  {

  private supabaseClient: SupabaseClient;
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    this.supabaseClient = createClient(environment.supabase.url, environment.supabase.url);
  }

  get user$():Observable<User | null>{
    return this.userSubject.asObservable();
  }

  async signIn(credentials: SignInWithPasswordCredentials): Promise <supabaseResponse> {
    try {
      const {data ,error, ...rest} = await this.supabaseClient.auth.signInWithPassword(credentials)
      // TODO: SET USER
      this.setUser();
      console.log(data ,rest);

      return data.user;
    } catch (error) {
      console.log(error);
      return error as AuthApiError
    }
  }

  async signUp(credentials: SignInWithPasswordCredentials): Promise <supabaseResponse> {
    try {
      const {data ,error, ...rest} = await this.supabaseClient.auth.signUp(credentials)
      // TODO: SET USER
      this.setUser();
      console.log(data ,rest);

      return data.user;
    } catch (error) {
      console.log(error);
      return error as AuthApiError
    }
  }

  singOut(): Promise<{error: AuthError | null}> {
    this.userSubject.next(null);
    return this.supabaseClient.auth.signOut();
  }

  private setUser(): void {
    const session = localStorage.getItem(USER_STORAGE_KEY) as unknown as User;
    this.userSubject.next(session);
  }

}
