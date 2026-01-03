<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Button from '../components/ui/button/Button.vue'

const router = useRouter()
const route = useRoute()

const canGoBack = computed(() => window.history.length > 1 && route.path !== '/')

function goHome() {
  window.location.href = '/'
}

function goBack() {
  if (canGoBack.value) {
    router.back()
    return
  }
  goHome()
}
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-[#0f1216] text-slate-50 font-sans selection:bg-accent-900 selection:text-white relative">
    <!-- 노이즈 텍스처 오버레이 -->
    <div class="noise-overlay" />

    <!-- 배경 장식 (Deep & Luxury Ambient) -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary-900/80 to-transparent opacity-60" />
      <div class="absolute -left-[10%] -top-[10%] h-[50rem] w-[50rem] rounded-full bg-primary-800/30 mix-blend-screen blur-[120px] animate-float opacity-40" />
      <div class="absolute -right-[10%] top-[20%] h-[40rem] w-[40rem] rounded-full bg-accent-900/20 mix-blend-screen blur-[100px] animate-float opacity-30" style="animation-delay: -3s;" />
      <div class="absolute left-[20%] bottom-[-10%] h-[45rem] w-[45rem] rounded-full bg-primary-900/40 mix-blend-screen blur-[120px] animate-float opacity-30" style="animation-delay: -5s;" />
    </div>

    <header class="sticky top-0 z-50 border-b border-white/5 bg-[#0f1216]/80 backdrop-blur-xl shadow-lg transition-all duration-300">
      <div class="mx-auto flex flex-col max-w-7xl px-6 md:px-8">
        <!-- 상단 행: 로고 및 우측 버튼 -->
        <div class="flex h-16 md:h-20 items-center justify-between">
          <div class="flex items-center gap-2 md:gap-3 group cursor-pointer" @click="goHome">
            <span class="grid h-8 w-8 md:h-10 md:w-10 place-items-center rounded-lg md:rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 text-[#0f1216] shadow-[0_0_20px_rgba(198,167,98,0.3)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 border border-accent-300/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scale md:w-5 md:h-5"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
            </span>
            <div class="flex flex-col">
              <span class="font-serif text-base md:text-lg font-bold tracking-wide text-white leading-none mb-0.5 md:mb-1">법률 키오스크</span>
              <span class="text-[8px] md:text-[10px] tracking-[0.2em] text-accent-300 font-medium uppercase opacity-80">Legal Diagnosis System</span>
            </div>
          </div>

          <!-- 데스크탑 버전 배너 (로고 우측 상단 유지) -->
          <div class="hidden md:flex items-center gap-3 ml-6">
            <a 
              href="https://www.example.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-400/50 transition-all duration-300"
              title="공식 홈페이지"
            >
              <div class="flex h-6 w-6 items-center justify-center rounded-full bg-accent-400/10 text-accent-400 group-hover:bg-accent-400 group-hover:text-[#0f1216] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
              <span class="text-xs font-bold text-slate-300 group-hover:text-white transition-colors leading-none">홈페이지</span>
            </a>
            
            <a 
              href="https://blog.naver.com/example" 
              target="_blank" 
              rel="noopener noreferrer"
              class="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#2DB400]/50 transition-all duration-300"
              title="공식 블로그"
            >
              <div class="flex h-6 w-6 items-center justify-center rounded-full bg-[#2DB400]/10 text-[#2DB400] group-hover:bg-[#2DB400] group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h20v18H2z"/><path d="M7 15V9h2.5L12 12.5V9h2.5v6H12L9.5 11.5V15z"/></svg>
              </div>
              <span class="text-xs font-bold text-slate-300 group-hover:text-white transition-colors leading-none">블로그</span>
            </a>
          </div>

          <div class="flex items-center gap-4 ml-auto">
            <div v-if="route.path !== '/'" class="flex items-center gap-2">
              <Button variant="outline" class="h-9 px-4 text-xs border-white/10 text-slate-300 hover:bg-white/5 hover:text-white transition-colors" @click="goHome">
                처음으로
              </Button>
            </div>
          </div>
        </div>

        <!-- 모바일 버전 배너 (하단 행으로 분리) -->
        <div class="md:hidden border-t border-white/5">
          <div class="flex items-center justify-center gap-2 pb-2 pt-1.5 px-0">
            <a 
              href="https://www.example.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="group flex flex-1 items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-white/5 border border-white/10"
            >
              <div class="flex h-4 w-4 items-center justify-center rounded-full bg-accent-400/10 text-accent-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
              <span class="text-[10px] font-bold text-slate-300">공식 홈페이지</span>
            </a>
            
            <a 
              href="https://blog.naver.com/example" 
              target="_blank" 
              rel="noopener noreferrer"
              class="group flex flex-1 items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-white/5 border border-white/10"
            >
              <div class="flex h-4 w-4 items-center justify-center rounded-full bg-[#2DB400]/10 text-[#2DB400]">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h20v18H2z"/><path d="M7 15V9h2.5L12 12.5V9h2.5v6H12L9.5 11.5V15z"/></svg>
              </div>
              <span class="text-[10px] font-bold text-slate-300">공식 블로그</span>
            </a>
          </div>
        </div>
      </div>
    </header>

    <main class="relative z-0 mx-auto w-full max-w-7xl flex-1 px-4 md:px-8 min-h-0 flex flex-col">
      <slot />
    </main>
  </div>
</template>
