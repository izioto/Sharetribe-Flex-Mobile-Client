import { types, flow, getEnv } from 'mobx-state-tree';
import AuthStore from './AuthStore';
import ViewerStore from './ViewerStore';
import { NavigationService } from '../services';
import ListingsStore from './ListingsStore';

const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),
    listings: types.optional(ListingsStore, {}),
  })
  .actions((store) => ({
    bootstrap: flow(function* bootstrap() {
      const authInfo = yield getEnv(store).Api.isAuthenticated();

      if (authInfo && authInfo.grantType === 'refresh_token') {
        store.auth.setAuthorizationStatus(true);
        NavigationService.navigateToApp();
      } else {
        NavigationService.navigateToAuth();
      }
    }),
  }));

export default RootStore;
