import { error, success } from './toast';

let wakeLock: WakeLockSentinel | null = null;

export async function disableScreenSleep(enabled: boolean) {
    if(enabled == false && wakeLock == null) {
        return
    }

	if (!('wakeLock' in navigator)) {
		error('WakeLock not supported in this browser');
		return;
	}

	if (enabled) {
		try {
			wakeLock = await navigator.wakeLock.request('screen');
            success('The screen will stay on');
		} catch (err) {
			error('Error requesting screen wake lock: ' + err);
		}
	} else {
		if (wakeLock) {
			wakeLock.release().then(() => {
                wakeLock = null;
            });
		}
	}
}
