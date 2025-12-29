<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'
import gsap from 'gsap'

const router = useRouter()
const titleRef = ref(null)
const descRef = ref(null)
const btnRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline()
  
  tl.from(titleRef.value, {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  })
  .from(descRef.value, {
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  }, '-=0.7')
  .from(btnRef.value, {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)'
  }, '-=0.6')
})

function startDiagnosis() {
  router.push('/personal/diagnosis')
}
</script>

<template>
  <section class="flex min-h-[calc(100dvh-5rem)] items-center justify-center px-6 py-8 md:py-12">
    <div class="w-full max-w-2xl space-y-12 text-center">
      <div class="space-y-6">
        <h1 ref="titleRef" class="font-serif text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl tracking-tight text-balance">
          빚 탕감, <br />
          <span class="text-gradient-gold italic pr-2">나도 가능할까?</span>
        </h1>
        <p ref="descRef" class="text-lg font-light text-slate-300 md:text-2xl leading-relaxed max-w-lg mx-auto break-keep">
          30초 만에 자격 요건을 확인해보세요.<br />
          <span class="text-sm text-slate-500 mt-3 block font-medium tracking-wide">(익명 보장 · 기록 안 남음)</span>
        </p>
      </div>

      <div ref="btnRef" class="pt-8">
        <button
          class="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-accent-600 px-6 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(198,167,98,0.3)] transition-all duration-300 hover:scale-105 hover:bg-accent-500 hover:shadow-[0_0_50px_rgba(198,167,98,0.5)] active:scale-95 md:gap-4 md:px-16 md:py-8 md:text-3xl"
          @click="startDiagnosis"
        >
          <span class="relative z-10 font-serif whitespace-nowrap">무료 자가진단 시작</span>
          <div class="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-accent-600">
            <ChevronRight class="h-6 w-6" stroke-width="3" />
          </div>
          
          <!-- Shine Effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine-infinite pointer-events-none z-20 w-[150%]" />
        </button>
      </div>
    </div>
  </section>
</template>
