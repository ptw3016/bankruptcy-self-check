<script setup>
import { computed } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'

const props = defineProps({
  currentStep: {
    type: Number,
    required: true
  },
  totalSteps: {
    type: Number,
    required: true
  },
  showBackButton: {
    type: Boolean,
    default: false
  }
})

defineEmits(['back'])

const progress = computed(() => {
  return (props.currentStep / props.totalSteps) * 100
})
</script>

<template>
  <div class="w-full">
    <div class="mb-2 flex items-center justify-between text-xs md:text-lg md:mb-4">
      <button 
        v-if="showBackButton"
        class="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium px-2 -ml-2 py-1 rounded-md hover:bg-white/5 md:gap-2"
        @click="$emit('back')"
      >
        <ArrowLeft class="h-3.5 w-3.5 md:h-5 md:w-5" />
        <span>이전</span>
      </button>
      <span v-else class="text-slate-400 font-medium tracking-wide">Progress</span>
      
      <div class="font-mono bg-accent-400/10 px-2 py-0.5 rounded-md md:px-3 md:py-1 border border-accent-400/20">
        <span class="font-bold text-accent-400">{{ currentStep }}</span>
        <span class="text-slate-400"> / {{ totalSteps }}</span>
      </div>
    </div>
    <div class="h-1.5 w-full overflow-hidden rounded-full bg-white/10 backdrop-blur-sm md:h-2 border border-white/5">
      <div 
        class="h-full rounded-full bg-gradient-to-r from-accent-600 via-accent-400 to-accent-300 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(198,167,98,0.5)] relative overflow-hidden"
        :style="{ width: `${progress}%` }"
      >
        <div class="absolute inset-0 bg-white/30 animate-pulse-subtle" />
      </div>
    </div>
  </div>
</template>
