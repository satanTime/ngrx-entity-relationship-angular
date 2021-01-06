import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {reduceFlat, reduceGraph} from 'ngrx-entity-relationship';
import {switchMapTo} from 'rxjs/operators';
import {rootAddress, rootCompany, rootUser} from './reducers';

@Injectable()
export class EntityEffects {
  @Effect()
  public readonly data$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    switchMapTo([
      reduceGraph({
        data: [
          {
            id: '1',
            street: 'Main st.',
            city: 'Town',
            country: 'Land',
          },
        ],
        selector: rootAddress(),
      }),
      reduceGraph({
        data: [
          {
            id: '1',
            name: 'Magic',
            adminId: '2',
            addressId: '1',
          },
        ],
        selector: rootCompany(),
      }),
      reduceFlat({
        data: {
          users: [
            {
              id: '1',
              firstName: 'John',
              lastName: 'Smith',
              companyId: '1',
            },
            {
              id: '2',
              firstName: 'Jack',
              lastName: 'Black',
              companyId: '1',
            },
          ],
        },
        selector: rootUser({
          flatKey: 'users',
        }),
      }),
    ]),
  );

  constructor(protected readonly actions$: Actions) {}
}
