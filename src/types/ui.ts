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
    name: string
    short_description: string
    description: string
    post_title: string
    page_content: string
    image: string
    image_wide: string
    minimal_prices: {
      icon: string
      price: string
      price_type: string
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
  id: 3,
  region_code: string
  region_name: string
  social_links: {
    telegram: string
    whatsapp: string
    telegram_channel: string
    youtube: string
    drive2: string
    avito: string
    vk: string
  },
  url: string
  created_at: Date
  updated_at: Date
  organization_name: string
  inn: string
  ogrnip: string
  legal_address: string
  addresses: [
    {
      id: number
      contact_id: number
      city: string,
      address: string,
      coordinates: string
      yandex_map_link: string
      phone_number: string
      work_time: string
      created_at: Date
      updated_at: Date
    },
  ]
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
