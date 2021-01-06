import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {ngrxEntityRelationshipReducer} from 'ngrx-entity-relationship';

import {AppComponent} from './app.component';
import {EntityEffects} from './store/entity.effects';
import {EntityService} from './store/entity.service';
import {reducers} from './store/reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    StoreModule.forFeature('addresses', reducers.addresses),
    StoreModule.forFeature('companies', reducers.companies),
    StoreModule.forFeature('users', reducers.users),

    StoreModule.forRoot(
      {},
      {
        metaReducers: [ngrxEntityRelationshipReducer],
      },
    ),
    EffectsModule.forRoot([EntityEffects]),
  ],
  bootstrap: [AppComponent],
  providers: [EntityService],
})
export class AppModule {}
