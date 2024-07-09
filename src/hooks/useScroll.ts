export const useScroll = (selector?: string): { scroll: (currentSelector?: string) => void } => {
  const scroll = (currentSelector?: string) => {
    const querySelector = currentSelector ?? selector
    if (querySelector) {
      const anchor = document.querySelector(querySelector)
      anchor?.scrollIntoView({behavior: 'smooth', block: 'start'})
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }
  return {scroll}
}

