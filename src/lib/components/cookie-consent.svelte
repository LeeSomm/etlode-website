<script lang="ts">
	import { onMount } from 'svelte';
	import * as CookieConsent from 'vanilla-cookieconsent';
	import 'vanilla-cookieconsent/dist/cookieconsent.css';
	import { t } from '$lib/i18n';
	import { base } from '$app/paths';

	

	// Define dataLayer and the gtag function.
	// if (typeof window !== 'undefined') {
	// 	window.dataLayer = window.dataLayer || [];
	// 	function gtag(){window.dataLayer.push(arguments);}
	// }
    /** 
	 * Update gtag consent according to the users choices made in CookieConsent UI
	 */
	function updateGtagConsent() {
		if (typeof window !== 'undefined' && window.gtag) {
			window.gtag('consent', 'update', {
				['analytics_storage']: CookieConsent.acceptedService('analytics_storage', 'analytics') ? 'granted' : 'denied',
			});
		}
	}

	const config: CookieConsent.CookieConsentConfig = {
		categories: {
			necessary: {
				enabled: true,
				readOnly: true
			},
			analytics: {
				autoClear: {
					cookies: [
						{
							name: /^_ga/ // regex: match all cookies starting with '_ga'
						},
						{
							name: '_gid' // string: exact cookie name
						}
					]
				},

				// https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
				services: {
					ga: {
						label: 'Google Analytics',
						onAccept: () => {},
						onReject: () => {}
					},
					// another: {
					// 	label: 'Another service',
					// 	onAccept: () => {},
					// 	onReject: () => {}
					// }
				}
			},
			ads: {}
		},

		onFirstConsent: ({ cookie }) => {
			console.log('onFirstConsent fired', cookie);
            updateGtagConsent();
		},

		onConsent: ({ cookie }) => {
			console.log('onConsent fired!', cookie, CookieConsent.getUserPreferences());
            updateGtagConsent();
		},

		onChange: ({ changedCategories, changedServices }) => {
			console.log('onChange fired!', changedCategories, changedServices);
            updateGtagConsent();
		},

		onModalReady: ({ modalName }) => {
			console.log('ready:', modalName);
		},

		onModalShow: ({ modalName }) => {
			console.log('visible:', modalName);
		},

		onModalHide: ({ modalName }) => {
			console.log('hidden:', modalName);
		},

		guiOptions: {
			consentModal: {
				layout: 'box inline',
				position: 'bottom left',
				equalWeightButtons: true,
				flipButtons: false
			},
			preferencesModal: {
				layout: 'box',
				equalWeightButtons: true,
				flipButtons: false
			}
		},

		language: {
			default: 'en',
			translations: {
				en: {
					consentModal: {
						title: $t.cookieConsent.consentModal.title,
						description:    $t.cookieConsent.consentModal.description,
						acceptAllBtn: $t.cookieConsent.consentModal.acceptAllBtn,
						acceptNecessaryBtn: $t.cookieConsent.consentModal.acceptNecessaryBtn,
						showPreferencesBtn: $t.cookieConsent.consentModal.showPreferencesBtn,
						// closeIconLabel: 'Reject all and close modal',
						footer: `
								<a href="${base}/privacy" target="_blank">${$t.cookieConsent.consentModal.footer}</a>
						`
					},
					preferencesModal: {
						title: $t.cookieConsent.preferencesModal.title,
						acceptAllBtn: $t.cookieConsent.preferencesModal.acceptAllBtn,
						acceptNecessaryBtn: $t.cookieConsent.preferencesModal.acceptNecessaryBtn,
						savePreferencesBtn: $t.cookieConsent.preferencesModal.savePreferencesBtn,
						closeIconLabel: $t.cookieConsent.preferencesModal.closeIconLabel,
						serviceCounterLabel: $t.cookieConsent.preferencesModal.serviceCounterLabel,
						sections: [
							{
								title: $t.cookieConsent.preferencesModal.sections[0].title,
								description: $t.cookieConsent.preferencesModal.sections[0].description
							},
							{
								title: $t.cookieConsent.preferencesModal.sections[1].title,
								description: $t.cookieConsent.preferencesModal.sections[1].description,

								//this field will generate a toggle linked to the 'necessary' category
								linkedCategory: $t.cookieConsent.preferencesModal.sections[1].linkedCategory
							},
							{
								title: $t.cookieConsent.preferencesModal.sections[2].title,
								description: $t.cookieConsent.preferencesModal.sections[2].description,
								linkedCategory: $t.cookieConsent.preferencesModal.sections[2].linkedCategory,
								cookieTable: {
									caption: 'Cookie table',
									headers: {
										name: 'Cookie',
                                        service: 'Service',
										desc: 'Description',
                                        expire: 'Expiration'
									},
									body: [
										{
											name: '_ga',
											service: 'Google Analytics',
											desc: 'Cookie set by Google Analytics.',
                                            expire: 'Expires after 2 years.'
										},
										{
											name: '_gid',
											service: 'Google Analytics',
											desc: 'Cookie set by Google Analytics.',
                                            expire: 'Expires after 24 hours.'
										}
									]
								}
							},
							// {
							// 	title: 'Targeting and Advertising',
							// 	description:
							// 		'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
							// 	linkedCategory: 'ads'
							// },
							{
								title: $t.cookieConsent.preferencesModal.sections[3].title,
								description: $t.cookieConsent.preferencesModal.sections[3].description
							}
						]
					}
				}
			}
		}
	};

	/**
	 * Only run plugin on the client side
	 */
	onMount(() => {
		CookieConsent.run(config);
	});
</script>

<button on:click={CookieConsent.showPreferences} class="cursor-pointer">{$t.cookieConsent.preferences}</button>