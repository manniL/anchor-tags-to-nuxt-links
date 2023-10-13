import type { ObjectDirective } from 'vue'

type InterpolationElement = HTMLElement & {
  $componentUpdated?: () => void
  $destroy?: () => void
}

export const vInterpolate: ObjectDirective<InterpolationElement> = {
  mounted(el) {
    const links = Array.from(el.getElementsByTagName('a')).filter((linkEl) => {
      const href = linkEl.getAttribute('href')
      if (!href) {
        return false
      }

      return isInternalLink(href)
    })

    addListeners(links)
    // cleanup
    el.$componentUpdated = () => {
      removeListeners(links)
      nextTick(() => addListeners(links))
    }
    el.$destroy = () => removeListeners(links)
  },
  updated: (el) => el.$componentUpdated?.(),
  beforeUnmount: (el) => el.$destroy?.()
}


function navigate(event: Event) {
  const target = event.target as HTMLElement
  const href = target.getAttribute('href')
  event.preventDefault()
  return navigateTo(href)
}

function addListeners(links: HTMLAnchorElement[]) {
  links.forEach((link) => {
    link.addEventListener('click', navigate, false)
  })
}

function removeListeners(links: HTMLAnchorElement[]) {
  links.forEach((link) => {
    link.removeEventListener('click', navigate, false)
  })
}

function isInternalLink(href?: string) {
  return href?.startsWith('/')
}