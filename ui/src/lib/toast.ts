import toast, {
  type DefaultToastOptions,
  type Renderable,
  type ToastOptions,
  type ValueOrFunction
} from 'svelte-french-toast'

export const toastTheme = '!bg-base-200 !text-neutral-content'

export function success(message: string, options?: ToastOptions): string {
  return toast.success(message, {
    className: toastTheme,
    ...options
  })
}

export function error(message: string, options?: ToastOptions): string {
  return toast.error(message, {
    className: toastTheme,
    ...options
  })
}

export function loading(message: string, options?: ToastOptions): string {
  return toast.loading(message, {
    className: toastTheme,
    ...options
  })
}

export function promise(
  promise: Promise<unknown>,
  msgs: {
    loading: Renderable
    success: ValueOrFunction<Renderable, unknown>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: ValueOrFunction<Renderable, any>
  },
  opts?: DefaultToastOptions
) {
  return toast.promise(promise, msgs, opts)
}
