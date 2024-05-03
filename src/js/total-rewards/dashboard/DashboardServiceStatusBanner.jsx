import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import ConnectionAlertBanner from '../ConnectionAlertBanner.jsx';
import { registerCustomElement } from '../../app/registerCustomElement.js';
import store from '../../store.js';
import { useGetDashboardDataQuery } from '../../dux/totalRewardsApi.js';

export const ServiceStatus = () => {
  const { isError } = useGetDashboardDataQuery('totals');

  return isError && <ConnectionAlertBanner />;
};

class BannerAlertClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(
      <Provider store={store}>
        <ServiceStatus />
      </Provider>
    );
  }
}

/**Registers class to define it as a handler for specific element */
registerCustomElement('total-rewards-dashboard-alert-banner', BannerAlertClass);
