<script setup>
import { Sparkles, Shield, Clock } from 'lucide-vue-next'
import Button from '../ui/button/Button.vue'

defineProps({
  mainCopy: {
    type: String,
    required: true
  },
  subCopy: {
    type: String,
    required: true
  },
  features: {
    type: Array,
    default: () => ['익명 보장', '기록 안 남음', '즉시 결과 확인']
  },
  estimatedTime: {
    type: String,
    default: '30초'
  }
})

const emit = defineEmits(['start'])
</script>

<template>
  <div class="flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center px-4 py-8">
    <div class="w-full max-w-2xl space-y-8 text-center animate-fade-in">
      <div class="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-2 text-sm text-accent-300 font-medium backdrop-blur-sm">
        <Sparkles class="h-4 w-4" />
        <span>{{ estimatedTime }} 만에 확인</span>
      </div>

      <div class="space-y-4">
        <h1 class="text-3xl font-serif font-bold leading-tight text-white md:text-5xl tracking-tight">
          {{ mainCopy }}
        </h1>
        <p class="text-lg text-slate-300 md:text-xl font-light leading-relaxed">
          {{ subCopy }}
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 md:gap-6 md:text-base">
        <div class="flex items-center gap-2">
          <Shield class="h-5 w-5 text-accent-400" />
          <span>익명 보장</span>
        </div>
        <div class="h-4 w-px bg-white/10" />
        <div class="flex items-center gap-2">
          <Clock class="h-5 w-5 text-accent-400" />
          <span>기록 안 남음</span>
        </div>
        <div class="h-4 w-px bg-white/10" />
        <div class="flex items-center gap-2">
          <Sparkles class="h-5 w-5 text-accent-400" />
          <span>즉시 결과 확인</span>
        </div>
      </div>

      <div class="pt-8">
        <Button
          size="kiosk"
          variant="kioskPrimary"
          class="w-full max-w-md px-8 py-6 text-xl font-bold md:py-8 md:text-2xl"
          @click="emit('start')"
        >
          자가진단 시작하기
          <span class="ml-2 text-3xl font-serif">›</span>
        </Button>
      </div>

      <p class="text-xs text-slate-500 font-light tracking-wide">
        * 본 진단은 참고용이며, 정확한 판단은 전문가 상담이 필요합니다.
      </p>
    </div>
  </div>
</template>
