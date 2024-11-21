import { getSettingFallback, SettingsKeys } from '$lib/settingsHelper';
import { disableScreenSleep } from '$lib/wakelock';

export const prerender = true
export const ssr = false

export async function load({ fetch }) {
    disableScreenSleep(getSettingFallback<boolean>(SettingsKeys.KEEP_AWAKE, false));
}