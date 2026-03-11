import { type RefObject, useEffect, useRef } from "react"

export const useDialogLifecycle = (
  dialogRef: RefObject<HTMLDialogElement | null>,
  onClose: () => void,
) => {
  const onCloseRef = useRef(onClose)
  const suppressCloseRef = useRef(false)

  onCloseRef.current = onClose

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    let frameId = 0
    const htmlOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow

    const restoreScrollLock = () => {
      document.documentElement.style.overflow = htmlOverflow
      document.body.style.overflow = bodyOverflow
    }

    const applyScrollLock = () => {
      document.documentElement.style.overflow = "hidden"
      document.body.style.overflow = "hidden"
    }

    const openDialog = () => {
      if (!dialog.isConnected || dialog.open) return
      applyScrollLock()

      try {
        dialog.showModal()
      } catch {
        restoreScrollLock()
      }
    }

    const handleClose = () => {
      restoreScrollLock()
      if (!suppressCloseRef.current) onCloseRef.current()
    }

    dialog.addEventListener("close", handleClose)

    // Wait until the dialog is fully connected so Strict Mode remounts
    // do not race against showModal() in local dev.
    frameId = window.requestAnimationFrame(openDialog)

    return () => {
      suppressCloseRef.current = true
      window.cancelAnimationFrame(frameId)
      dialog.removeEventListener("close", handleClose)
      if (dialog.open) dialog.close()
      restoreScrollLock()
      suppressCloseRef.current = false
    }
  }, [dialogRef])

  return () => {
    dialogRef.current?.close()
  }
}
