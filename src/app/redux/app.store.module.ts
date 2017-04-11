import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, AppState, INITIAL_STATE } from './app.reducer';

@NgModule({
    imports: [
        NgReduxModule
    ]
})
export class StoreModule {

    constructor(store: NgRedux<AppState>, devTools: DevToolsExtension) {
        const storeEnhancers = devTools.isEnabled() ? [ devTools.enhancer() ] : [];

        store.configureStore(rootReducer, INITIAL_STATE, [], storeEnhancers);
    }
}
