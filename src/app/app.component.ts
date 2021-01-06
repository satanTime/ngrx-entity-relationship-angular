import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {EntityService} from './store/entity.service';
import {
  relAddressCompany,
  relCompanyAddress,
  relCompanyAdmin,
  relCompanyStaff,
  relUserCompany,
  rootUser,
} from './store/reducers';
import {User} from './store/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly user$: Observable<User>;

  // prettier-ignore
  private readonly user = rootUser(
    relUserCompany(
      // UNCOMMENT THIS
      // relCompanyStaff(
      //   relUserCompany(
      //     relCompanyAdmin(),
      //   ),
      // ),
      relCompanyAddress(
        // UNCOMMENT THIS
        // relAddressCompany(
        //   relCompanyAdmin(
        //     relUserCompany(
        //       relCompanyAddress(),
        //     ),
        //   ),
        // ),
      ),
    ),
  );

  constructor(protected readonly store: Store, public readonly entitiesService: EntityService) {
    this.user$ = this.store.select(this.user, '1').pipe(filter((user): user is User => !!user));
  }

  public ngOnDestroy(): void {
    this.user.release();
  }
}
