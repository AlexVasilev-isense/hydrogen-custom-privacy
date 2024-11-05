  import {
    useAnalytics,
    getCustomerPrivacy
  } from '@shopify/hydrogen';
  import { useEffect } from 'react';
  
  const consentmoConsentSdkUrl = 'https://consentmo-dev.com/webroot/js/solidjs/dist/bundle.js';
  let areSettingsSet = false;

  export default function ConsentmoConsent({ store, customer_id = 0 }) {
    const consent = getCustomerPrivacy();
    const { register } = useAnalytics();
    const { ready } = register('ConsentmoConsent');

    useEffect(() => {
      if (!consent || !consent?.setTrackingConsent) {
        return;
      }

      if(!areSettingsSet) {
        window.iSenseAppSettings = {
            shop: store,
            customer_id: customer_id || 0,
            AdminBarInjector: true,
            loadFeature: ''
        }
        areSettingsSet = true;

        const script = document.createElement('script');
        script.src = consentmoConsentSdkUrl;
        document.body.appendChild(script);

        ready();
      }
    }, [consent]);
  
    return null;
  }
  
  export function getThirdPartyConsentStatus(type) {
    try {
      return true;
    } catch (e) {
      return false;
    }
  }
  
  