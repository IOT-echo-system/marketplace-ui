import type {TRootActions} from '../../typing/store'

export const SiteAction = {
  SITE_UPDATE_STATE: 'SITE_UPDATE_STATE'
} as const

export type SiteInfo = { title: string; subtitle?: string; }
export type MenuLink = { link: string; label: string }
export type Section = { title: string; navLinks: MenuLink[] }
export type Social = { icon: string; link: string; name: string }
export type FooterInfo = { sections: Section[]; copyrights: string; social: { title: string; socials: Social[] } }

export type SiteStateType = { siteInfo: SiteInfo; header: { menus: MenuLink[] }; footer: FooterInfo }

export const initSiteState: SiteStateType = {
  footer: {
    copyrights: '',
    sections: [],
    social: {socials: [], title: ''}
  },
  header: {menus: []},
  siteInfo: {
    title: '',
    subtitle: '',
  }
}

const siteReducer = (state: SiteStateType, action: TRootActions): SiteStateType => {
  switch (action.type) {
    case SiteAction.SITE_UPDATE_STATE:
      return {...state, ...action.payload.site}
    default:
      return state
  }
}

export default siteReducer
