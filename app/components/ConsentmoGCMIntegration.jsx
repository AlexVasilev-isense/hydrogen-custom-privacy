import React, { useEffect } from 'react';

let isDefaultConsentRegistered = false;

export default function ConsentmoGCMIntegration() {

    useEffect(() => {

        console.log('CONSENT DEF');
        if(isDefaultConsentRegistered){
            return;
        }


        window.isenseRules = {};
        window.isenseRules.gcm = {
            gcmVersion: 2,
            integrationVersion: 3,
            customChanges: false,
            consentUpdated: false,
            initialState: 7,
            isCustomizationEnabled: false,
            adsDataRedaction: true,
            urlPassthrough: false,
            dataLayer: 'dataLayer',
            categories: { ad_personalization: "marketing", ad_storage: "marketing", ad_user_data: "marketing", analytics_storage: "analytics", functionality_storage: "functionality", personalization_storage: "functionality", security_storage: "strict"},
            storage: { ad_personalization: "false", ad_storage: "false", ad_user_data: "false", analytics_storage: "false", functionality_storage: "false", personalization_storage: "false", security_storage: "false", wait_for_update: 2000 }
        };
        window.isenseRules.initializeGcm = function (rules) {
            if(window.isenseRules.gcm.isCustomizationEnabled) {
            rules.initialState = window.isenseRules.gcm.initialState;
            rules.urlPassthrough = window.isenseRules.gcm.urlPassthrough === true || window.isenseRules.gcm.urlPassthrough === 'true';
            rules.adsDataRedaction = window.isenseRules.gcm.adsDataRedaction === true || window.isenseRules.gcm.adsDataRedaction === 'true';
            }
            
            let initialState = parseInt(rules.initialState);
            let marketingBlocked = initialState === 0 || initialState === 2 || initialState === 5 || initialState === 7;
            let analyticsBlocked = initialState === 0 || initialState === 3 || initialState === 6 || initialState === 7;
            let functionalityBlocked = initialState === 4 || initialState === 5 || initialState === 6 || initialState === 7;

            let gdprCache = localStorage.getItem('gdprCache') ? JSON.parse(localStorage.getItem('gdprCache')) : null;
            if (gdprCache && typeof gdprCache.updatedPreferences !== "undefined") {
            let updatedPreferences = gdprCache.updatedPreferences;
            marketingBlocked = parseInt(updatedPreferences.indexOf('marketing')) > -1;
            analyticsBlocked = parseInt(updatedPreferences.indexOf('analytics')) > -1;
            functionalityBlocked = parseInt(updatedPreferences.indexOf('functionality')) > -1;
            }

            Object.entries(rules.categories).forEach(category => {
            if(rules.storage.hasOwnProperty(category[0])) {
                switch(category[1]) {
                case 'strict':
                    rules.storage[category[0]] = "granted";
                    break;
                case 'marketing':
                    rules.storage[category[0]] = marketingBlocked ? "denied" : "granted";
                    break;
                case 'analytics':
                    rules.storage[category[0]] = analyticsBlocked ? "denied" : "granted";
                    break;
                case 'functionality':
                    rules.storage[category[0]] = functionalityBlocked ? "denied" : "granted";
                    break;
                }
            }
            });
            rules.consentUpdated = true;
            isenseRules.gcm = rules;
        }

        // Google Consent Mode - initialization start
        window.isenseRules.initializeGcm({
            ...window.isenseRules.gcm,
            adsDataRedaction: true,
            urlPassthrough: false,
            initialState: 7
        });

        /*
        * initialState acceptable values:
        * 0 - Set both ad_storage and analytics_storage to denied
        * 1 - Set all categories to granted
        * 2 - Set only ad_storage to denied
        * 3 - Set only analytics_storage to denied
        * 4 - Set only functionality_storage to denied
        * 5 - Set both ad_storage and functionality_storage to denied
        * 6 - Set both analytics_storage and functionality_storage to denied
        * 7 - Set all categories to denied
        */

        window[window.isenseRules.gcm.dataLayer] = window[window.isenseRules.gcm.dataLayer] || [];
        function gtag() { window[window.isenseRules.gcm.dataLayer].push(arguments); }
        gtag("consent", "default", isenseRules.gcm.storage);
        isenseRules.gcm.adsDataRedaction && gtag("set", "ads_data_redaction", isenseRules.gcm.adsDataRedaction);
        isenseRules.gcm.urlPassthrough && gtag("set", "url_passthrough", isenseRules.gcm.urlPassthrough);
        isDefaultConsentRegistered = true;
        
        console.log(window.dataLayer);
    }, []);

    return (
        <>
        </>
        )
    ; 
}