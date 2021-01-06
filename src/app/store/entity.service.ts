import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {filter, first, tap} from 'rxjs/operators';
import {UpdateAddress} from './address/address.actions';
import {Address} from './address/address.model';
import {UpdateCompany} from './company/company.actions';
import {Company} from './company/company.model';
import {rootAddress, rootCompany, State, rootUser} from './reducers';
import {UpdateUser} from './user/user.actions';
import {User} from './user/user.model';

@Injectable()
export class EntityService {
  constructor(protected readonly store: Store<State>) {}

  public changeUser(id: string): void {
    this.store
      .select(rootUser(), id)
      .pipe(
        filter((v): v is User => !!v),
        first(),
        tap(entity => {
          const index = entity.lastName.match(/\d+$/)?.[0] || '0';
          this.store.dispatch(
            new UpdateUser({
              user: {
                id,
                changes: {
                  lastName: `Changed User ${parseInt(index[0], 10) + 1}`,
                },
              },
            }),
          );
        }),
      )
      .subscribe();
  }

  public changeCompany(id: string): void {
    this.store
      .select(rootCompany(), id)
      .pipe(
        filter((v): v is Company => !!v),
        first(),
        tap(entity => {
          const index = entity.name.match(/\d+$/)?.[0] || '0';
          this.store.dispatch(
            new UpdateCompany({
              company: {
                id,
                changes: {
                  name: `Changed Company ${parseInt(index[0], 10) + 1}`,
                },
              },
            }),
          );
        }),
      )
      .subscribe();
  }

  public changeAddress(id: string): void {
    this.store
      .select(rootAddress(), id)
      .pipe(
        filter((v): v is Address => !!v),
        first(),
        tap(entity => {
          const index = entity.street.match(/\d+$/)?.[0] || '0';
          this.store.dispatch(
            new UpdateAddress({
              address: {
                id,
                changes: {
                  street: `Changed Address ${parseInt(index[0], 10) + 1}`,
                },
              },
            }),
          );
        }),
      )
      .subscribe();
  }
}
