import {
  useAnalytics,
  getCustomerPrivacy,
  useLoadScript,
} from '@shopify/hydrogen';
import { useEffect, useCallback } from 'react';

const consentmoConsentSdkUrl = `https://consentmo-dev.com/webroot/js/solidjs/dist/bundle.js`;
let areVariablesSet = false;

export default function ConsentmoConsent({ store, customer_id = 0 }) {
  const consent = getCustomerPrivacy();
  const { register } = useAnalytics();
  const { ready } = register('ConsentmoConsent');
  //let consentmoConsentSdkStatus= useLoadScript(consentmoConsentSdkUrl);;

  //const asd = ()=>{consentmoConsentSdkStatus = useLoadScript(consentmoConsentSdkUrl);};

  useEffect(() => {
    if (!consent || !consent?.setTrackingConsent) {
      return;
    }

    if(!areVariablesSet) {
      window.iSenseAppSettings = {
          shop: store,
          customer_id: customer_id || 0,
          AdminBarInjector: true,
          loadFeature: ''
      }
      areVariablesSet = true;

      const script = document.createElement('script');
      script.src = 'https://consentmo-dev.com/webroot/js/solidjs/dist/bundle.js';
      document.body.appendChild(script);

      //asd();
    }
  }, [consent]);

  /*const consentmoConsentCallback = useCallback(() => {
    console.log('333');
    console.log(consent);

    if (!consent || !consent?.setTrackingConsent) {
      console.log('not loaded');
      return;
    }

    console.log('4444');

    const trackingConsent = {
      "marketing": true,
      "analytics": true,
      "preferences": true,
      "headlessStorefront": true,
      "checkoutRootDomain": "shoesforuse.myshopify.com",
      "storefrontRootDomain": "shoesforuse.myshopify.com",
      "storefrontAccessToken": "dc6c137b650c389574b3303ffb96f66c"
    }

    consent.setTrackingConsent(
      trackingConsent,
      (result) => {
        if (result?.error) {
          console.error(
            'Error syncing Consentmo with Shopify customer privacy',
            result,
          );
          return;
        }

        ready();
      },
    );
  }, [consent, ready]);*/

  /*useEffect(() => {
    if (consentmoConsentSdkStatus !== 'done') {
      return;
    }

    //window.ConsentmoConsent.onChange = consentmoConsentCallback;
    consentmoConsentCallback();
  }, [consentmoConsentCallback, consentmoConsentSdkStatus]);*/

  return null;
}

export function getThirdPartyConsentStatus(type) {
  try {
    return true;
  } catch (e) {
    return false;
  }
}
