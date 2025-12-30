<script setup>
import { ref } from 'vue'
import { Phone, MessageCircle, Calendar } from 'lucide-vue-next'
import Button from '../ui/button/Button.vue'
import AlertDialog from '../ui/AlertDialog.vue'

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

const isAlertOpen = ref(false)

function showAlert() {
  isAlertOpen.value = true
}

function handleCall(phoneNumber) {
  showAlert()
}

function handleKakao(url) {
  showAlert()
}

function handleSchedule() {
  showAlert()
}
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <Button
        size="kiosk"
        class="group w-full flex items-center gap-3 px-3 py-5 text-base font-bold md:px-5 md:py-7 md:text-xl bg-gradient-to-br from-accent-600 to-accent-700 hover:from-accent-500 hover:to-accent-600 text-white shadow-[0_10px_30px_-10px_rgba(198,167,98,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(198,167,98,0.6)] hover:-translate-y-1 border-none transition-all duration-300 rounded-2xl h-auto relative overflow-hidden"
        @click="handleCall(phoneNumber)"
      >
        <div class="flex items-center gap-4 md:gap-7 min-w-0">
          <div class="flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors">
            <Phone class="h-5 w-5 md:h-7 md:w-7" stroke-width="2.5" />
          </div>
          <div class="flex flex-col items-start gap-0.5 md:gap-1.5">
            <span class="break-keep md:whitespace-nowrap">지금 바로 전화상담</span>
            <span class="text-[10px] md:text-xs font-medium opacity-70">클릭 시 바로 연결됩니다</span>
          </div>
        </div>
      </Button>

      <Button
        size="kiosk"
        variant="outline"
        class="group w-full flex items-center gap-3 px-3 py-5 text-base font-bold md:px-5 md:py-7 md:text-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 h-auto rounded-2xl transition-all duration-300 shadow-xl"
        @click="handleKakao(kakaoUrl)"
      >
        <div class="flex items-center gap-4 md:gap-7 min-w-0">
          <div class="flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-[#FEE500]/10 group-hover:bg-[#FEE500]/20 transition-colors">
            <MessageCircle class="h-5 w-5 md:h-7 md:w-7 text-[#FEE500]" stroke-width="2.5" />
          </div>
          <div class="flex flex-col items-start gap-0.5 md:gap-1.5">
            <span class="break-keep md:whitespace-nowrap">카카오톡 채팅문의</span>
            <span class="text-[10px] md:text-xs font-medium text-slate-400">실시간 채팅 대기 중</span>
          </div>
        </div>
      </Button>

      <Button
        v-if="showSchedule"
        size="kiosk"
        variant="outline"
        class="group w-full flex items-center gap-3 px-3 py-5 text-base font-bold md:px-5 md:py-7 md:text-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 h-auto rounded-2xl transition-all duration-300 shadow-xl"
        @click="handleSchedule"
      >
        <div class="flex items-center gap-4 md:gap-7 min-w-0">
          <div class="flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 group-hover:bg-accent-500/20 transition-colors">
            <Calendar class="h-5 w-5 md:h-7 md:w-7 text-accent-400" stroke-width="2.5" />
          </div>
          <div class="flex flex-col items-start gap-0.5 md:gap-1.5">
            <span class="break-keep md:whitespace-nowrap">방문 상담 예약하기</span>
            <span class="text-[10px] md:text-xs font-medium text-slate-400">변호사가 직접 연락드립니다</span>
          </div>
        </div>
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

    <AlertDialog
      :is-open="isAlertOpen"
      message="해당 서비스는 현재 준비 중이며, 추후 구현될 예정입니다. 빠른 시일 내에 찾아뵙겠습니다."
      @close="isAlertOpen = false"
    />
  </div>
</template>
