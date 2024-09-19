import {
    useAnalytics,
    getCustomerPrivacy,
    useLoadScript,
  } from '@shopify/hydrogen';
  import { useEffect, useCallback } from 'react';
  
  const consentmoConsentSdkUrl = `https://gdpr.apps.isenselabs.com/webroot/js/solidjs/dist/bundle.js`;
  
  export default function ConsentmoConsent() {
    const consent = getCustomerPrivacy();
    const { register } = useAnalytics();
    const { ready } = register('ConsentmoConsent');
    const consentmoConsentSdkStatus = 'done';
  
    const consentmoConsentCallback = useCallback(() => {
        console.log(consent);

      if (!consent || !consent?.setTrackingConsent) {
        console.log('not loaded');
        return;
      }
  
      const trackingConsent = {
        marketing: true,
        analytics: true,
        preferences: true,
        sale_of_data: true,
      }
  
      consent.setTrackingConsent(
        trackingConsent,
        (result) => {
          if (result?.error) {
            setTimeout(() => {
                consentmoConsentCallback();
            }, 2000);
            console.error(
              'Error syncing ThirdParty with Shopify customer privacy',
              result,
            );
            return;
          }
  
          ready();
        },
      );
    }, [consent, ready]);
  
    useEffect(() => {
      if (consentmoConsentSdkStatus !== 'done') {
        return;
      }
  
      //window.ConsentmoConsent.onChange = consentmoConsentCallback;
      consentmoConsentCallback();
    }, [consentmoConsentCallback, consentmoConsentSdkStatus]);
  
    return null;
  }
  
  export function getThirdPartyConsentStatus(type) {
    try {
      return true;
    } catch (e) {
      return false;
    }
  }
  