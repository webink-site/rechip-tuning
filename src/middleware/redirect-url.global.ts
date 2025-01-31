export default defineNuxtRouteMiddleware((to) => {
  let newPath = to.path

  // Убираем слеш в конце
  if (newPath !== '/' && newPath.endsWith('/')) {
    newPath = newPath.slice(0, -1)
  }

  // Приводим к нижнему регистру
  if (/[A-Z]/.test(newPath)) {
    newPath = newPath.toLowerCase()
  }

  // Если путь изменился — делаем редирект
  if (newPath !== to.path) {
    return navigateTo(newPath + (to.query ? '?' + new URLSearchParams(to.query as Record<string, string>).toString() : ''), { redirectCode: 301 })
  }
})
