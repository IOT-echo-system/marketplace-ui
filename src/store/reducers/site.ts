import type {TRootActions} from '../../typing/store'
import type {MainMenuResponse} from '../../services/typing/CMSService'
import type {CTAPropsType} from '../../components/atoms'

export const SiteAction = {
  SITE_UPDATE_STATE: 'SITE_UPDATE_STATE'
} as const

export type SiteInfo = { title: string; subtitle?: string }
export type MenuLink = { link: string; name: string }
export type Section = { title: string; ctas: CTAPropsType[] }
export type Social = { icon: string; cta: CTAPropsType }
export type FooterInfo = { sections: Section[]; copyright: string; socials: Social[] }

export type SiteStateType = { siteInfo: SiteInfo; header: { menus: MainMenuResponse[] }; footer: FooterInfo }

export const initSiteState: SiteStateType = {
  footer: {
    copyright: '',
    sections: [],
    socials: [],
  },
  header: {menus: []},
  siteInfo: {
    title: '',
    subtitle: ''
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
