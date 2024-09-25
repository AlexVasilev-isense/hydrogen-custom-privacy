import {
    useAnalytics,
    getCustomerPrivacy,
    useLoadScript,
  } from '@shopify/hydrogen';
  import { useEffect, useCallback } from 'react';
  
  const thirdPartyConsentSdkUrl = `https://gdprstorage.b-cdn.net/hydrogen-test/third-party-consent-test.js`;
  
  export function ThirdPartyConsent() {
    const consent = getCustomerPrivacy();
    const { register } = useAnalytics();
    const { ready } = register('ThirdPartyConsent');
    const thirdPartyConsentSdkStatus = useLoadScript(thirdPartyConsentSdkUrl);
  
    const thirdPartyConsentCallback = useCallback(() => {
      if (!consent || !consent?.setTrackingConsent) {
        return;
      }
  
      /*const trackingConsent = {
        marketing: getThirdPartyConsentStatus('marketing'),
        analytics: getThirdPartyConsentStatus('analytics'),
        preferences: getThirdPartyConsentStatus('preferences'),
        sale_of_data: getThirdPartyConsentStatus('sale_of_data'),
      }
  
      consent.setTrackingConsent(
        trackingConsent,
        (result) => {
          if (result?.error) {
            console.error(
              'Error syncing ThirdParty with Shopify customer privacy',
              result,
            );
            return;
          }
          ready();
        },
      );*/

      window.Shopify.customerPrivacy.setTrackingConsent(
        {
        "marketing": false,
        "analytics": true,
        "preferences": false,
        "headlessStorefront": true,
        "checkoutRootDomain": "shoesforuse.myshopify.com/checkouts",
        "storefrontRootDomain": "shoesforuse.myshopify.com",
        "storefrontAccessToken": "dc6c137b650c389574b3303ffb96f66c"
        }, () => console.log(window.Shopify.customerPrivacy.currentVisitorConsent())
      );
      //console.log(window.Shopify.customerPrivacy.currentVisitorConsent());
    }, [consent, ready]);
  
    useEffect(() => {
      if (thirdPartyConsentSdkStatus !== 'done') {
        return;
      }
  
      window.ThirdPartyConsent.onChange = thirdPartyConsentCallback;
      thirdPartyConsentCallback();
    }, [thirdPartyConsentCallback, thirdPartyConsentSdkStatus]);
  
    return null;
  }
  
  export function getThirdPartyConsentStatus(type) {
    try {
      return window.ThirdPartyConsent.types.includes(type);
    } catch (e) {
      return false;
    }
  }
  