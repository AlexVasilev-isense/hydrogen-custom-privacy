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
      console.log('124566');
      console.log(consent);
      if (!consent || !consent?.setTrackingConsent) {
        return;
      }
      console.log('124567');
  
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

      console.log('set tracking:');
      console.log(window.Shopify.customerPrivacy.setTrackingConsent);
      let x = consent.setTrackingConsent(
        {
        "marketing": true,
        "analytics": true,
        "preferences": true,
        "headlessStorefront": true,
        "checkoutRootDomain": "shoesforuse.myshopify.com",
        "storefrontRootDomain": "shoesforuse.myshopify.com",
        "storefrontAccessToken": "dc6c137b650c389574b3303ffb96f66c"
        }, (message) => {
          console.log(window.Shopify.customerPrivacy.currentVisitorConsent());console.log(message);
          ready();
          console.log(window.Shopify.customerPrivacy.currentVisitorConsent());
          console.log(window.Shopify.customerPrivacy.currentVisitorConsent);
        }
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
  