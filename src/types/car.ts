export interface Brand {
  id: string
  name: string
  'cyrillic-name': string
  popular: boolean
  country: string
}
export interface Model {
  id: string
  name: string
  'cyrillic-name': string
  class: string
  'year-from': number
  'year-to': number | null
  generations: number
}

export interface Generation {
  id: string
  'is-restyle': string
  model_id: string
  name: string
  'year-start': string
  'year-stop': string | null
  generation_id: string
}

export interface Modification {
  id?: string
  name?: string
  'complectation-id': string
  'configuration_id': string
  'group-name': string | null
  'offers-price-from': string | null
  'offers-price-to': string | null
  specifications: {
    'engine-type': string
  }
}
export interface Bodytype {
  name?: string
  'body-type': string
  'doors-count': string
  generation_id: string
  id: string
  modifications: Modification[]
  notice: string
}
export interface Complectation {
  'complectation-id': string
  'offers-price-from': number
  'offers-price-to': number
  'group-name': string
  specifications: any
  options: any
  'option-packages': any
}
