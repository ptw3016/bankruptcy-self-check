<script setup>
import { useRouter } from 'vue-router'
import { AlertCircle, Home } from 'lucide-vue-next'
import Button from '../components/ui/button/Button.vue'
import Card from '../components/ui/card/Card.vue'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <section class="flex min-h-[60vh] flex-col items-center justify-center py-20 animate-fade-in">
    <Card variant="glass" class="max-w-2xl p-8 text-center md:p-12">
      <div class="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-orange-100 shadow-sm md:h-24 md:w-24">
        <AlertCircle class="h-10 w-10 text-red-500 md:h-12 md:w-12" />
      </div>
      
      <h1 class="text-4xl font-extrabold text-slate-900 md:text-6xl">404</h1>
      <p class="mt-4 text-xl font-bold text-slate-800 md:text-2xl">페이지를 찾을 수 없습니다</p>
      <p class="mt-3 text-base font-medium text-slate-500 md:text-lg">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.<br />
        홈으로 돌아가서 다시 선택해 주세요.
      </p>

      <Button 
        variant="kioskPrimary" 
        class="mt-10 h-14 w-full gap-2 px-8 text-lg font-bold shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 md:h-16 md:max-w-md md:text-xl" 
        @click="goHome"
      >
        <Home class="h-6 w-6" />
        홈으로 돌아가기
      </Button>
    </Card>
  </section>
</template>
