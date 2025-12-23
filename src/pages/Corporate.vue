<script setup>
import { useRouter } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'

const router = useRouter()

function startDiagnosis() {
  router.push('/corporate/diagnosis')
}
</script>

<template>
  <section class="flex min-h-[calc(100dvh-5rem)] items-center justify-center px-6 py-8 md:py-12">
    <div class="w-full max-w-3xl space-y-12 text-center">
      <div class="space-y-6">
        <h1 class="font-serif text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl tracking-tight text-balance">
          대표님, 회사를<br class="hidden md:block" />
          <span class="text-gradient-gold italic pr-2">살릴 수 있을까요?</span>
        </h1>
        <p class="text-xl font-light text-slate-300 md:text-2xl leading-relaxed max-w-xl mx-auto">
          간이회생 · 일반회생 · 법인파산 판별<br />
          <span class="text-sm text-slate-500 mt-3 block font-medium tracking-wide">(1분 소요 · 비밀 보장)</span>
        </p>
      </div>

      <div class="pt-8">
        <button
          class="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full bg-white/10 px-12 py-6 text-xl font-bold text-white shadow-glass border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 md:px-16 md:py-8 md:text-3xl"
          @click="startDiagnosis"
        >
          <span class="relative z-10 font-serif">기업진단 시작하기</span>
          <div class="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#0f1216]">
            <ChevronRight class="h-6 w-6" stroke-width="3" />
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
