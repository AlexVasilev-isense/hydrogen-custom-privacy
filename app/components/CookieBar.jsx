import React, { useEffect } from 'react';
import {useNonce, Script} from '@shopify/hydrogen';
import {
    Scripts,
    ScrollRestoration,
  } from '@remix-run/react';

export default function CookieBar({ store, customer_id = 0, trackingConsent = () => {}}) {
    const nonce = useNonce();


    return (
        <>
            <Script waitForHydration src="https://consentmo-dev.com/webroot/js/solidjs/dist/bundle.js" />
            <ScrollRestoration nonce={nonce} />
            <Scripts nonce={nonce} />
        </>
        )
    ; 
}