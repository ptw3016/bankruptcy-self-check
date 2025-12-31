<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Building2, User, ChevronRight, ChevronDown } from 'lucide-vue-next'
import gsap from 'gsap'

const router = useRouter()

// Refs for animation targets
const headerSection = ref(null)
const personalCard = ref(null)
const corporateCard = ref(null)
const footerSection = ref(null)
const mainContainer = ref(null)
const showScrollBadge = ref(true)

const handleScroll = () => {
  if (window.scrollY > 50) {
    showScrollBadge.value = false
  } else {
    showScrollBadge.value = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Animation Logic
function handleTransition(targetCard, otherCard, routePath, isLeftCardSelected) {
  // Prevent double clicks
  if (mainContainer.value) {
    mainContainer.value.style.pointerEvents = 'none'
  }

  const tl = gsap.timeline({
    onComplete: () => {
      router.push(routePath)
    }
  })

  // 1. Header slides up
  tl.to(headerSection.value, {
    y: -100,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.in',
  }, 0)

  // 2. Footer slides down
  tl.to(footerSection.value, {
    y: 100,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.in',
  }, 0)

  // 3. Other card slides away (Left card goes left, Right card goes right)
  // If Left(Personal) is selected, Right(Corporate) moves Right (+100%)
  // If Right(Corporate) is selected, Left(Personal) moves Left (-100%)
  const xMove = isLeftCardSelected ? '50%' : '-50%'
  
  tl.to(otherCard, {
    x: xMove,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.in',
  }, 0)

  // 4. Selected card highlights
  tl.to(targetCard, {
    scale: 1.1,
    boxShadow: '0 0 100px rgba(198,167,98,0.5)',
    duration: 0.8,
    ease: 'elastic.out(1, 0.5)',
    zIndex: 50
  }, 0)

  // 5. Final transition
  tl.to(targetCard, {
    opacity: 0,
    scale: 1.2,
    duration: 0.3,
    ease: 'power2.in'
  }, '-=0.2')
}

function scrollToCorporate() {
  corporateCard.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function goPersonal() {
  handleTransition(personalCard.value, corporateCard.value, '/personal', true)
}

function goCorporate() {
  handleTransition(corporateCard.value, personalCard.value, '/corporate', false)
}
</script>

<template>
  <section ref="mainContainer" class="flex flex-col items-center justify-center gap-4 md:gap-8 py-4 md:py-8 min-h-[calc(100vh-80px)]">
    <!-- 헤더 섹션 -->
    <div ref="headerSection" class="text-center space-y-3 md:space-y-4 max-w-5xl mx-auto px-4 relative">
      <!-- 장식 요소 -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div class="inline-flex items-center rounded-full border border-accent-400/30 bg-primary-900/40 backdrop-blur-md px-3 py-1 text-[10px] md:text-xs font-medium text-accent-200 shadow-[0_0_20px_rgba(198,167,98,0.1)] animate-fade-in" style="animation-delay: 0.1s;">
        <span class="mr-2 h-1 w-1 rounded-full bg-accent-400 animate-pulse"></span>
        <span class="tracking-wide uppercase">Free Diagnosis System</span>
      </div>
      
      <div class="space-y-1 md:space-y-2 relative">
        <h1 class="font-serif text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight text-balance animate-fade-in" style="animation-delay: 0.2s;">
          새로운 시작을 위한<br class="md:hidden" /> <span class="italic text-gradient-gold font-semibold pr-2">현명한 선택</span>
        </h1>
        <p class="text-xs font-light text-slate-300 md:text-base max-w-2xl md:max-w-4xl mx-auto leading-relaxed animate-fade-in break-keep" style="animation-delay: 0.3s;">
          법률 전문가가 설계한 정밀 진단 시스템으로<br class="md:hidden" /> 최적의 해결책을 제시합니다.
        </p>
      </div>
    </div>

    <!-- 카드 섹션 -->
    <div class="relative grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 animate-fade-in max-w-6xl mx-auto px-4" style="animation-delay: 0.4s;">
      <!-- 개인회생/파산 카드 -->
      <div class="relative group">
        <button
          ref="personalCard"
          class="w-full relative overflow-hidden rounded-[2.5rem] bg-slate-900/60 p-8 md:p-10 text-left border-2 border-accent-400/30 transition-all duration-500 hover:border-accent-400 hover:shadow-[0_0_60px_rgba(198,167,98,0.35)] hover:-translate-y-2 h-auto min-h-[280px] md:min-h-[360px] flex flex-col justify-between backdrop-blur-xl ring-1 ring-accent-400/20 shadow-2xl"
          @click="goPersonal"
        >
          <!-- 배경 효과 -->
          <div class="absolute inset-0 bg-gradient-to-br from-accent-500/[0.15] via-transparent to-transparent opacity-100 transition-opacity duration-700" />
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-accent-500/30 blur-[60px] rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-accent-500/40" />
          
          <div class="relative z-10 flex flex-col gap-6">
            <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500/20 backdrop-blur-md border border-accent-400/50 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-accent-500/30 group-hover:border-accent-400 group-hover:shadow-accent-500/30">
              <User class="h-8 w-8 text-accent-200 transition-colors duration-500 group-hover:text-white" stroke-width="2.5" />
            </div>
            
            <div class="space-y-3">
              <h2 class="font-serif tracking-tight leading-[1.2] drop-shadow-sm flex flex-col items-start">
                <span class="text-gradient-gold text-5xl md:text-5xl font-extrabold block mb-1">개인</span>
                <span class="text-gradient-gold text-3xl md:text-4xl font-semibold opacity-90 block">회생/파산</span>
              </h2>
              <p class="text-sm md:text-lg font-light text-slate-100 leading-relaxed group-hover:text-white transition-colors duration-500">
                막막한 채무 고민, <span class="text-accent-300 font-bold relative inline-block">합법적인 해결책<span class="absolute bottom-0 left-0 w-full h-[3px] bg-accent-400"></span></span>을<br class="hidden md:block" />
                지금 바로 확인해보세요.
              </p>
            </div>
          </div>
          
          <div class="relative z-10 flex items-center justify-between border-t border-accent-400/30 pt-6 mt-6 group-hover:border-accent-400 transition-colors duration-500">
            <span class="font-serif text-lg md:text-xl text-accent-100 font-semibold group-hover:text-white transition-all duration-300 group-hover:translate-x-2">
              무료 진단 시작하기
            </span>
            <div class="grid h-12 w-12 place-items-center rounded-full bg-accent-500 border border-accent-400 shadow-lg transition-all duration-500 group-hover:bg-accent-400 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(198,167,98,0.6)] text-white">
              <ChevronRight class="h-6 w-6" stroke-width="3.5" />
            </div>
          </div>
        </button>

        <!-- 모바일 하단 유도 화살표 -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-4"
        >
          <button 
            v-if="showScrollBadge"
            @click="scrollToCorporate"
            class="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:hidden animate-bounce z-20 cursor-pointer"
          >
            <div class="px-4 py-2 rounded-full bg-[#1e293b] border border-primary-300 shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center">
              <span class="text-[11px] font-bold tracking-tight text-primary-200 whitespace-nowrap leading-none">법인(기업) 회생/파산</span>
            </div>
            <ChevronDown class="h-5 w-5 text-primary-400" />
          </button>
        </transition>
      </div>

      <!-- 법인회생/파산 카드 -->
      <button
        ref="corporateCard"
        class="group relative overflow-hidden rounded-[2.5rem] bg-slate-900/60 p-8 md:p-10 text-left border-2 border-primary-400/30 transition-all duration-500 hover:border-primary-400 hover:shadow-[0_0_60px_rgba(56,189,248,0.35)] hover:-translate-y-2 h-auto min-h-[280px] md:min-h-[360px] flex flex-col justify-between backdrop-blur-xl ring-1 ring-primary-400/20 shadow-2xl"
        @click="goCorporate"
      >
        <!-- 배경 효과 -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/[0.15] via-transparent to-transparent opacity-100 transition-opacity duration-700" />
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-primary-500/30 blur-[60px] rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-primary-500/40" />
        
        <div class="relative z-10 flex flex-col gap-6">
          <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/20 backdrop-blur-md border border-primary-400/50 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-primary-500/30 group-hover:border-primary-400 group-hover:shadow-primary-500/30">
            <Building2 class="h-8 w-8 text-primary-200 transition-colors duration-500 group-hover:text-white" stroke-width="2.5" />
          </div>
          
          <div class="space-y-3">
            <h2 class="font-serif tracking-tight leading-[1.2] drop-shadow-sm flex flex-col items-start">
              <span class="text-gradient-blue text-5xl md:text-5xl font-extrabold block mb-1">
                법인<span class="text-[0.6em] font-black text-white ml-1">(기업)</span>
              </span>
              <span class="text-gradient-blue text-3xl md:text-4xl font-semibold opacity-90 block">회생/파산</span>
            </h2>
            <p class="text-sm md:text-lg font-light text-slate-100 leading-relaxed group-hover:text-white transition-colors duration-500">
              기업의 재도약을 위한 <span class="text-primary-300 font-bold relative inline-block">맞춤형 솔루션<span class="absolute bottom-0 left-0 w-full h-[3px] bg-primary-400"></span></span>을<br class="hidden md:block" />
              전문가와 함께 설계하세요.
            </p>
          </div>
        </div>
        
        <div class="relative z-10 flex items-center justify-between border-t border-primary-400/30 pt-6 mt-6 group-hover:border-primary-400 transition-colors duration-500">
          <span class="font-serif text-lg md:text-xl text-primary-100 font-semibold group-hover:text-white transition-all duration-300 group-hover:translate-x-2">
            기업 진단 시작하기
          </span>
          <div class="grid h-12 w-12 place-items-center rounded-full bg-primary-500 border border-primary-400 shadow-lg transition-all duration-500 group-hover:bg-primary-400 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] text-white">
            <ChevronRight class="h-6 w-6" stroke-width="3.5" />
          </div>
        </div>
      </button>
    </div>

    <div ref="footerSection" class="w-full text-center pb-4 animate-fade-in" style="animation-delay: 0.5s;">
      <p class="text-[10px] md:text-xs font-light text-slate-500 tracking-wider">
        ※ 모든 상담 내용은 철저하게 <span class="text-slate-400 font-medium border-b border-slate-600 pb-0.5">비밀이 보장</span>됩니다.
      </p>
    </div>
  </section>
</template>
