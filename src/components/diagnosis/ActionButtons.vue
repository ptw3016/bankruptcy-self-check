<script setup>
import { Phone, MessageCircle, Calendar } from 'lucide-vue-next'
import Button from '../ui/button/Button.vue'

defineProps({
  phoneNumber: {
    type: String,
    default: '051-123-4567'
  },
  kakaoUrl: {
    type: String,
    default: '#'
  },
  showSchedule: {
    type: Boolean,
    default: true
  },
  regionNote: {
    type: String,
    default: ''
  }
})

function handleCall(phoneNumber) {
  window.location.href = `tel:${phoneNumber}`
}

function handleKakao(url) {
  window.open(url, '_blank')
}

function handleSchedule() {
  alert('상담 예약 기능은 준비 중입니다.')
}
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <Button
        size="kiosk"
        class="w-full justify-between gap-3 px-4 py-5 text-base font-bold md:px-8 md:py-6 md:text-xl bg-accent-600 hover:bg-accent-500 text-white shadow-[0_0_20px_rgba(198,167,98,0.3)] hover:shadow-[0_0_30px_rgba(198,167,98,0.5)] border-none transition-all duration-300 rounded-2xl h-auto"
        @click="handleCall(phoneNumber)"
      >
        <span class="flex items-center gap-2 md:gap-3 overflow-hidden">
          <Phone class="h-5 w-5 shrink-0 md:h-7 md:w-7" stroke-width="2.5" />
          <span class="truncate">지금 바로 무료 전화상담</span>
        </span>
        <span class="opacity-90 text-sm font-medium hidden md:inline-block bg-white/20 px-3 py-1 rounded-full">24시간 가능</span>
      </Button>

      <Button
        size="kiosk"
        variant="outline"
        class="w-full justify-between gap-3 px-4 py-5 text-base font-bold md:px-8 md:py-6 md:text-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 h-auto rounded-2xl"
        @click="handleKakao(kakaoUrl)"
      >
        <span class="flex items-center gap-2 md:gap-3 overflow-hidden">
          <MessageCircle class="h-5 w-5 shrink-0 md:h-7 md:w-7" stroke-width="2.5" />
          <span class="truncate">카카오톡으로 편하게 물어보기</span>
        </span>
      </Button>

      <Button
        v-if="showSchedule"
        size="kiosk"
        variant="outline"
        class="w-full justify-between gap-3 px-4 py-5 text-base font-bold md:px-8 md:py-6 md:text-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 h-auto rounded-2xl"
        @click="handleSchedule"
      >
        <span class="flex items-center gap-2 md:gap-3 overflow-hidden">
          <Calendar class="h-5 w-5 shrink-0 md:h-7 md:w-7" stroke-width="2.5" />
          <span class="truncate">원하는 시간에 상담 예약하기</span>
        </span>
      </Button>
    </div>

    <div v-if="regionNote" class="rounded-2xl bg-white/5 border border-white/10 p-4 text-center backdrop-blur-sm">
      <p class="text-sm leading-relaxed text-slate-200 md:text-base font-medium">
        {{ regionNote }}
      </p>
    </div>

    <div class="text-center">
      <p class="text-xs text-slate-400 font-light tracking-wide">
        * 상담은 무료이며, 모든 내용은 비밀이 철저히 보장됩니다.
      </p>
    </div>
  </div>
</template>
