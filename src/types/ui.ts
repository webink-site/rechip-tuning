export interface Service {
  id: number
  slug: string
  name: string
  sub: string
  img: string
  width: number
  high?: boolean
}

export interface Contact {
  region_code: string
  region_name: string
  address: string
  phone_number: string
  work_time: string
  coordinates: string
  social_links: {
    telegram: string | null
    whatsapp: string | null
    telegram_channel: string | null
    youtube: string | null
    drive2: string | null
    avito: string | null
  },
  legal_info: {
    inn: string | null
    kpp: string | null
    ogrn: string | null
    legal_address: string | null
    phisical_address: string | null
    general_director: string | null
    footer_tiny_text: string | null
  }
}

export interface Homepage {
  advantages: {
    icon: string
    header: string
    description: string
  }[]
  form_text: {
    header: string
    subheader: string
    near_button_text: string
  }
}

export interface ReviewItem{
  id: number
  score: number
  stage: string
  text: string
  item: {
      id: number
      title: string
  },
  usedInScore: boolean
  sender: {
      name: string
  },
  canAnswer: boolean
  extraParams: any
  createdAt: number
}
export interface ReviewsRes{
  total: number
  reviews: ReviewItem[]
}
