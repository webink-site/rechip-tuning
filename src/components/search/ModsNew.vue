<template>
  <section class="py-6">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid grid-cols-12 gap-8">
        <div
          v-for="(row, rowIndex) in Object.keys(mods)"
          v-show="mods[row].length"
          :key="rowIndex"
          class="col-span-12"
        >
          <h3 class="text-lg font-semibold mb-6 capitalize flex items-center">
            <!-- <img :src="sortedMods(mods)[row as keyof Sortedmod].img" class="h-6 mr-2"> -->
            {{ row }}
          </h3>
          <div class="flex justify-start items-center gap-4 flex-wrap">
            <nuxt-link
              v-for="(item, index) in mods[row]"
              :key="index"
              :to="`${route.fullPath}/${item.id}`"
              class="px-2 py-1.5 text-sm h-full transition-all bg-gray-3 rounded cursor-pointer text-center hover:bg-[#DADADA] hover:text-black "
            >
              {{ item.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
interface Props{
  mods: any
}
const { mods } = defineProps<Props>()

</script>

<style scoped>

</style>
