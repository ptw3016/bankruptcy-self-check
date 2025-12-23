<script setup>
import { useRouter } from 'vue-router'
import { Building2, User, ChevronRight } from 'lucide-vue-next'
import Button from '../components/ui/button/Button.vue'

const router = useRouter()

function goPersonal() {
  router.push('/personal')
}

function goCorporate() {
  router.push('/corporate')
}
</script>

<template>
  <section class="flex flex-col items-center justify-center gap-6 md:gap-10 py-8 md:py-12">
    <!-- 헤더 섹션 -->
    <div class="text-center space-y-4 md:space-y-6 max-w-5xl mx-auto px-4 relative">
      <!-- 장식 요소 -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div class="inline-flex items-center rounded-full border border-accent-400/30 bg-primary-900/40 backdrop-blur-md px-4 py-1.5 text-xs md:text-sm font-medium text-accent-200 shadow-[0_0_20px_rgba(198,167,98,0.1)] animate-fade-in" style="animation-delay: 0.1s;">
        <span class="mr-2 h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse"></span>
        <span class="tracking-wide">개인/법인 회생·파산 무료 진단</span>
      </div>
      
      <div class="space-y-2 md:space-y-3 relative">
        <h1 class="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight text-balance animate-fade-in" style="animation-delay: 0.2s;">
          새로운 시작을 위한 <span class="italic text-gradient-gold font-semibold pr-2">가장 현명한 선택</span>
        </h1>
        <p class="text-sm font-light text-slate-300 md:text-lg max-w-2xl md:max-w-5xl mx-auto leading-relaxed animate-fade-in break-keep" style="animation-delay: 0.3s;">
          법률 전문가가 설계한 정밀 진단 시스템으로 귀하에게 최적화된 해결책을 제시해 드립니다.
        </p>
      </div>
    </div>

    <!-- 카드 섹션 -->
    <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 animate-fade-in" style="animation-delay: 0.4s;">
      <!-- 개인회생/파산 카드 -->
      <button
        class="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 md:p-12 text-left border border-white/5 transition-all duration-700 hover:border-accent-400/30 hover:shadow-[0_20px_80px_-20px_rgba(198,167,98,0.15)] hover:-translate-y-2 h-auto min-h-[380px] md:min-h-[520px] flex flex-col justify-between"
        @click="goPersonal"
      >
        <!-- 배경 효과 -->
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
        <div class="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 blur-[80px] rounded-full group-hover:bg-accent-500/20 transition-all duration-700" />
        
        <div class="relative z-10 space-y-8 md:space-y-10">
          <div class="inline-flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg transition-transform duration-700 group-hover:rotate-6 group-hover:bg-accent-500/20 group-hover:border-accent-400/30">
            <User class="h-10 w-10 md:h-12 md:w-12 text-accent-200 transition-colors duration-500 group-hover:text-accent-100" stroke-width="1.5" />
          </div>
          
          <div class="space-y-3 md:space-y-4">
            <h2 class="font-serif text-3xl md:text-5xl text-white tracking-wide leading-tight">개인회생 / 파산</h2>
            <p class="text-lg md:text-xl font-light text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors duration-500">
              과도한 빚으로 고통받는 분들을 위한<br />
              <span class="text-accent-300 font-medium">합법적 채무 탕감</span> 제도입니다.
            </p>
          </div>
        </div>
        
        <div class="relative z-10 flex items-center justify-between border-t border-white/10 pt-8 mt-8 md:pt-10 md:mt-auto group-hover:border-accent-400/30 transition-colors duration-500">
          <span class="font-serif text-lg md:text-xl text-slate-300 group-hover:text-accent-200 transition-colors duration-300">자가진단 시작하기</span>
          <div class="grid h-12 w-12 md:h-14 md:w-14 place-items-center rounded-full bg-white/5 border border-white/10 transition-all duration-500 group-hover:bg-accent-500 group-hover:text-white group-hover:border-transparent group-hover:scale-110">
            <ChevronRight class="h-6 w-6 md:h-7 md:w-7" stroke-width="2" />
          </div>
        </div>
      </button>

      <!-- 법인회생/파산 카드 -->
      <button
        class="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 md:p-12 text-left border border-white/5 transition-all duration-700 hover:border-primary-400/30 hover:shadow-[0_20px_80px_-20px_rgba(56,189,248,0.15)] hover:-translate-y-2 h-auto min-h-[380px] md:min-h-[520px] flex flex-col justify-between"
        @click="goCorporate"
      >
        <!-- 배경 효과 -->
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full group-hover:bg-primary-500/20 transition-all duration-700" />
        
        <div class="relative z-10 space-y-8 md:space-y-10">
          <div class="inline-flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg transition-transform duration-700 group-hover:-rotate-6 group-hover:bg-primary-500/20 group-hover:border-primary-400/30">
            <Building2 class="h-10 w-10 md:h-12 md:w-12 text-primary-200 transition-colors duration-500 group-hover:text-primary-100" stroke-width="1.5" />
          </div>
          
          <div class="space-y-3 md:space-y-4">
            <h2 class="font-serif text-3xl md:text-5xl text-white tracking-wide leading-tight">법인(기업)회생 / 파산</h2>
            <p class="text-lg md:text-xl font-light text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors duration-500">
              위기의 기업을 위한<br />
              <span class="text-primary-300 font-medium">경영 정상화</span> 및 재무 구조조정 솔루션.
            </p>
          </div>
        </div>
        
        <div class="relative z-10 flex items-center justify-between border-t border-white/10 pt-8 mt-8 md:pt-10 md:mt-auto group-hover:border-primary-500/30 transition-colors duration-500">
          <span class="font-serif text-lg md:text-xl text-slate-300 group-hover:text-primary-200 transition-colors duration-300">기업진단 시작하기</span>
          <div class="grid h-12 w-12 md:h-14 md:w-14 place-items-center rounded-full bg-white/5 border border-white/10 transition-all duration-500 group-hover:bg-primary-500 group-hover:text-white group-hover:border-transparent group-hover:scale-110">
            <ChevronRight class="h-6 w-6 md:h-7 md:w-7" stroke-width="2" />
          </div>
        </div>
      </button>
    </div>

    <div class="w-full text-center pb-8 animate-fade-in" style="animation-delay: 0.5s;">
      <p class="text-sm font-light text-slate-500 tracking-wider">
        ※ 모든 상담 내용은 철저하게 <span class="text-slate-400 font-medium border-b border-slate-600 pb-0.5">비밀이 보장</span>됩니다.
      </p>
    </div>
  </section>
</template>
