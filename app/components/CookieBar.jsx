import React, { useEffect } from 'react';
import {Script} from '@shopify/hydrogen';

export default function CookieBar({ store, customer_id = 0, trackingConsent = () => {}}) {
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
    }, []);

    return (
        <>
            <Script waitForHydration src="https://gdpr.apps.isenselabs.com/webroot/js/solidjs/dist/bundle.js" />
        </>
        )
    ; 
}