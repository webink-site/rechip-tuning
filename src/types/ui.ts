export interface Service {
  // id: number
  // slug: string
  // name: string
  // sub: string
  // img: string
  // width: number
  // high?: boolean
    id: number
    slug: string
    service_name: string
    short_description: string
    description: string
    post_title: string
    page_content: string
    image: string
    image_wide: string
    minimal_prices: {
      icon: string
      price: string
      description: string
    }[]
    created_at: Date
    updated_at: Date
    seo_settings: {
      id: 17,
      service_id: 6199,
      level: string
      title: string
      description: string
      created_at: Date
      updated_at: Date
  }[]
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
  }[]
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
