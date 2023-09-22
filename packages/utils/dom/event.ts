export const composeEventHandlers = <E>(
  theirsHandler?:(event: E) => boolean | void,
  oursHandler?:(event: E) => void
  ) => {
    const handleEvent = (event: E) => {
      const shouldPrevent = theirsHandler?.(event)
      if (!shouldPrevent) {
        oursHandler?.(event)
      }
    }
    return handleEvent
}