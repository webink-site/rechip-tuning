<template>
  <div>
    <section class="py-12 bg-gray-2">
      <div v-if="data" class="container mx-auto px-4 md:px-0">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 text-center">
            <h2 class="text-dark text-4xl font-bold mb-2">Отзывы о нас</h2>
          </div>
          <ReviewsRating title="Яндекс" />
          <div class="col-span-12 md:col-span-6 md:col-start-4">
            <div style="width:100%;height:1200px;overflow:hidden;position:relative;">
              <iframe style="width:100%;height:100%;border:1px solid #e6e6e6;border-radius:8px;box-sizing:border-box" src="https://yandex.ru/maps-reviews-widget/204587782481?comments" />
              <a href="https://yandex.ru/maps/org/chip_tyuning/204587782481/" target="_blank" style="box-sizing:border-box;text-decoration:none;color:#b3b3b3;font-size:10px;font-family:YS Text,sans-serif;padding:0 20px;position:absolute;bottom:8px;width:100%;text-align:center;left:0">reChip-tuning на карте Москвы — Яндекс.Карты</a>
            </div>

            <div class="mt-12 mb-6">
              <ReviewsRating title="Авито" />
            </div>
          </div>
          <ReviewsCard v-for="(item, i) in reviews" :key="i" class="col-span-12 md:col-span-6" :item="item" />
          <div class="col-span-12 text-center">
            <UiButton :load="load" text="Показать еще" class="w-full" blue @click="showMore" />
          </div>
        </div>
      </div>
    </section>
    <HomeProjects home-page />
    <HomeAdvant />
    <UiFormsFeedback />
  </div>
</template>

<script setup lang="ts">
import type { ReviewsRes, ReviewItem } from '@/src/types/ui'

const itemsPerPage = ref(20)
const offset = ref(0)
const reviews = ref<ReviewItem[]>([])
const load = ref(false)

const { data, refresh, error } = await useAsyncData<ReviewsRes>('reviews', () => $fetch(`https://api.rechip-tuning.ru/api/avito/reviews?limit=${itemsPerPage.value}&offset=${offset.value}`))

if (error) {
  console.log('Ловимс ошибочку в запросе')
}

if (data.value) {
  reviews.value = [...data.value.reviews]
}

async function showMore () {
  offset.value += itemsPerPage.value
  load.value = true
  await refresh()
  if (data.value) {
    reviews.value = [...reviews.value, ...data.value.reviews]
  }
  load.value = false
}

// const reviews = ref([
//   {
//     name: 'Лидия Захарова',
//     date: '15 декабря 2022',
//     text: `Очень понравилось отношение сотрудников салона. Проверили и приобрели авто за приемлемую цену.
//     Оформление быстрое, профессиональное. Нареканий нет! Большое спасибо нашему менеджеру за помощь. Отличный салон!
//     Посетив другие автосалоны, остановили свой выбор именно на Favorit motors, благодаря профессиональной консультации
//     менеджера Игнатова Василия. Все обстоятельно рассказал, предложил выгодную цену без навязывания ненужных дополнительных
//     опций. Купили автомобиль Hyundai Tucson. Василий провел сделку от начала и до конца,
//     получили огромное удовольствие от общения и покупки. Все честно и без обмана.`
//   },
//   {
//     name: 'Михаил Григорьев',
//     date: '15 декабря 2022',
//     text: `Хороший автосалон. Машины новые, состояние отличное. Купил авто, менеджеры молодцы, большое спасибо!
//     Сделали скидку, подготовили машину, всё супер! В салоне чисто, есть кафе. Рекомендую.`
//   },
//   {
//     name: 'Георгий Петров',
//     date: '15 декабря 2022',
//     text: `Приезжал на сервис, автомобиль Хёндэ Крета. Остался всем доволен, работа выполнена качественно,
//     по времени ждать долго не пришлось, комфортные условия пребывания, приятная атмосфера. Свой автомобиль
//     приобретал здесь же, поэтому рекомендую. Персонал приветливый, ориентированный на клиента. Отдельное
//     спасибо мастеру по приёмке, Сергею! Компании всех благ и процветания.`
//   },
//   {
//     name: 'Федор Иванов',
//     date: '15 декабря 2022',
//     text: `Отличный салон, всё чётко, грамотно и пунктуально! Выражаю благодарность нашему менеджеру Шелия
//      Мушни за индивидуальный подход , учёт всех нюансов и оперативность! С Вами такое радостное событие
//      как покупка машины стало вдвойне приятнее. Спасибо большое!`
//   },
//   {
//     name: 'Анастасия Т.',
//     date: '15 декабря 2022',
//     text: `Отличный салон, всё чётко, грамотно и пунктуально! Выражаю благодарность нашему менеджеру
//     Шелия Мушни за индивидуальный подход , учёт всех нюансов и оперативность! С Вами такое радостное
//     событие как покупка машины стало вдвойне приятнее. Спасибо большое!`
//   },
//   {
//     name: 'Александр',
//     date: '15 декабря 2022',
//     text: `Хороший автосалон. Машины новые, состояние отличное. Купил авто, менеджеры молодцы, большое
//     спасибо! Сделали скидку, подготовили машину, всё супер! В салоне чисто, есть кафе. Рекомендую.`
//   },
//   {
//     name: 'Илья Владимиров',
//     date: '15 декабря 2022',
//     text: `Хороший автосалон. Машины новые, состояние отличное. Купил авто, менеджеры молодцы, большое
//     спасибо! Сделали скидку, подготовили машину, всё супер! В салоне чисто, есть кафе. Рекомендую.`
//   },
//   {
//     name: 'Георгий Петров',
//     date: '15 декабря 2022',
//     text: `Приезжал на сервис, автомобиль Хёндэ Крета. Остался всем доволен, работа выполнена качественно,
//     по времени ждать долго не пришлось, комфортные условия пребывания, приятная атмосфера. Свой автомобиль
//     приобретал здесь же, поэтому рекомендую. Персонал приветливый, ориентированный на клиента. Отдельное
//     спасибо мастеру по приёмке, Сергею! Компании всех благ и процветания`
//   },
//   {
//     name: 'Федор Иванов',
//     date: '15 декабря 2022',
//     text: `Отличный салон, всё чётко, грамотно и пунктуально! Выражаю благодарность нашему менеджеру
//     Шелия Мушни за индивидуальный подход , учёт всех нюансов и оперативность! С Вами такое радостное
//     событие как покупка машины стало вдвойне приятнее. Спасибо большое!`
//   }
// ])

</script>

<style scoped>

</style>
