import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as UsersFeature from './users.reducer';
import * as UsersActions from './users.actions';
import { concat, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {

  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(()=> {
      if(this.localStorageService.isValidToken){
        const userId = this.localStorageService.getUserIdFromToken()
        if(userId){
          return this.usersService.getUser(userId).pipe(
            map((user) => {
              return UsersActions.buildUserSessionSuccess({user: user})
            }), 
            catchError(() => of(UsersActions.buildUserSessionFailed()))
          );
        } else{
          return of(UsersActions.buildUserSessionFailed())
        }
      } else {
        return of(UsersActions.buildUserSessionFailed())
      }
    })
  ))

  constructor(
    private actions$: Actions,
    private localStorageService : LocalstorageService,
    private usersService : UsersService
    ) {}
  
}