import { writable, type Writable } from 'svelte/store'

/* Instructions for adding a new setting:
 * 1. Add a new key to the SettingsKeys enum
 * 2. Add a new key-value pair to the defaultSettings object (The value is the default value of the setting)
 * 3. (Sometimes) Add a new key-value pair to the initSettings function (If the setting is dependent on a DOM attribute)
 *
 * Now you can use the setting
 */

const settingsPrefix = 'setting-'

export enum SettingsKeys {
    KEEP_AWAKE = 'keepAwake',
}

let defaultSettings: {
  [key: string]: unknown
} = {
    [SettingsKeys.KEEP_AWAKE]: false,
}

export function initSettings() {
//   defaultSettings = {
//     ...defaultSettings,
//     [SettingsKeys.THEME]:
//       document.documentElement.getAttribute('data-theme') ?? 'dark',
//     [SettingsKeys.LANGUAGE]: document.documentElement.getAttribute('lang') ?? ''
//   }
}

export function saveSetting<T>(settingName: SettingsKeys, settingValue: T) {
  localStorage.setItem(
    `${settingsPrefix}${settingName}`,
    JSON.stringify({ value: settingValue })
  )
}

export function getSetting<T>(settingName: SettingsKeys): T {
  const item = localStorage.getItem(`${settingsPrefix}${settingName}`)
  if (typeof localStorage === 'undefined' || item == null)
    return defaultSettings[settingName] as T
  return (JSON.parse(item)['value'] ?? defaultSettings[settingName]) as T
}

export function getSettingFallback<T>(
  settingName: SettingsKeys,
  fallback: T
): T {
  const item = localStorage.getItem(`${settingsPrefix}${settingName}`)
  if (typeof localStorage === 'undefined' || item == null) return fallback
  return (JSON.parse(item)['value'] ?? fallback) as T
}

export function getSettingWritable<T>(settingName: SettingsKeys): Writable<T> {
  const data = getSetting<T>(settingName)
  const write = writable<T>(data)
  write.subscribe(value => {
    saveSetting<T>(settingName, value)
  })

  return write
}
