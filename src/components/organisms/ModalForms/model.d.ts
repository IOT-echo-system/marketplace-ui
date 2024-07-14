import type {FormPropsType} from '../../atoms'

export type GetFormPropsTypeFunction<T extends Record<string, unknown> = Record<string, unknown>> = (
  handleClose: () => void,
  props: T
) => FormPropsType
