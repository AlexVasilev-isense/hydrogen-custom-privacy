import React, { useEffect } from 'react';
import {Script,getCustomerPrivacy} from '@shopify/hydrogen';

export default function CookieBar({ store, customer_id = 0, trackingConsent = () => {}}) {
    
    const consent = getCustomerPrivacy();

    useEffect(() => {
        window.Shopify = {};
        window.iSenseAppSettings = {
            shop: store,
            customer_id: customer_id || 0,
            AdminBarInjector: true,
            setTrackingConsent: (value) => {
                if (value) {
                    console.log('valid consent');
                } else {
                    console.log('invalid consent')
                }
            }
        }

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
                console.log('asd');
                console.log(result);
              if (result?.error) {
                console.error(
                  'Error syncing ThirdParty with Shopify customer privacy',
                  result,
                );
                return;
              }
            },
          );
    }, []);

    return (
        <>
            <Script waitForHydration src="https://gdpr.apps.isenselabs.com/webroot/js/solidjs/dist/bundle.js" />
        </>
        )
    ; 
}