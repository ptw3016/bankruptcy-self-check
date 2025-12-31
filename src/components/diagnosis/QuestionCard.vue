<script setup>
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'
import Button from '../ui/button/Button.vue'
import Card from '../ui/card/Card.vue'

const props = defineProps({
  question: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'next'])

const selectedOption = ref(props.modelValue)

function selectOption(value) {
  selectedOption.value = value
  emit('update:modelValue', value)
}

function handleNext() {
  if (selectedOption.value) {
    emit('next')
  }
}
</script>

<template>
  <Card variant="none" class="mx-auto w-full max-w-2xl px-4 py-4 md:max-w-3xl md:px-12 md:py-10 animate-scale-in h-[calc(100dvh-100px)] md:h-full flex flex-col bg-transparent border-none shadow-none backdrop-blur-none">
    <div class="mb-2 md:mb-8 shrink-0">
      <slot name="header" />
    </div>
    <div class="flex-1 flex flex-col min-h-0">
      <div class="shrink-0 space-y-1 text-center md:text-left md:space-y-4 mb-4 md:mb-8">
        <h2 class="text-2xl font-serif font-bold leading-snug text-white md:text-3xl lg:text-4xl text-balance break-keep tracking-wide">
          {{ question }}
        </h2>
        <p class="text-base text-slate-300 font-light pb-1 md:text-lg md:pb-2">가장 적절한 항목을 선택해 주세요</p>
      </div>

      <div class="flex-1 flex flex-col justify-start overflow-y-auto min-h-0 space-y-2 md:space-y-5 px-1 py-2 custom-scrollbar">
        <button
          v-for="(option, index) in options"
          :key="index"
          class="group relative w-full shrink-0 overflow-hidden rounded-none border-[0.5px] p-5 text-left transition-all duration-300 md:p-6 md:rounded-none"
          :class="[
            selectedOption === option.value
              ? 'border-accent-400/60 bg-accent-500/5 shadow-[0_0_15px_rgba(198,167,98,0.1)] ring-[0.5px] ring-accent-400/30 z-10'
              : 'border-white/20 bg-transparent hover:border-white/50 hover:bg-transparent'
          ]"
          @click="selectOption(option.value)"
        >
          <div class="flex items-center justify-between gap-3 md:gap-6 w-full">
            <div class="flex-1 text-left">
              <div 
                class="text-lg font-medium transition-colors md:text-xl leading-tight"
                :class="[
                  selectedOption === option.value
                    ? 'text-accent-100 font-bold'
                    : 'text-slate-200 group-hover:text-white'
                ]"
              >
                {{ option.label }}
              </div>
              <div 
                v-if="option.description"
                class="mt-2 text-sm transition-colors duration-300 leading-tight md:text-base md:mt-2"
                :class="[
                  selectedOption === option.value
                    ? 'text-accent-200/80'
                    : 'text-slate-400 group-hover:text-slate-300'
                ]"
              >
                {{ option.description }}
              </div>
            </div>
            
            <div 
              class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-300 md:h-5 md:w-5 md:border-[2px]"
              :class="[
                selectedOption === option.value
                  ? 'border-accent-400 bg-accent-400 scale-110'
                  : 'border-white/20 bg-transparent group-hover:border-white/30'
              ]"
            >
              <Check 
                class="h-2.5 w-2.5 transition-all duration-300 md:h-3.5 md:w-3.5"
                :class="[
                  selectedOption === option.value 
                    ? 'text-[#0f1216] opacity-100 scale-100' 
                    : 'text-white/20 opacity-40 scale-90 group-hover:opacity-60'
                ]"
                stroke-width="4.5"
              />
            </div>
          </div>
        </button>
      </div>

      <div class="pt-4 md:pt-10 shrink-0 mt-auto hidden md:block px-1">
        <Button
          class="w-full h-auto text-sm font-bold bg-gradient-to-r from-accent-700 via-accent-600 to-accent-700 hover:from-accent-600 hover:via-accent-500 hover:to-accent-600 text-white border-[0.5px] border-accent-400/30 shadow-[0_0_20px_rgba(198,167,98,0.2)] hover:shadow-[0_0_30px_rgba(198,167,98,0.4)] transition-all duration-500 rounded-none py-3 md:py-6 md:text-xl md:rounded-none"
          :disabled="!selectedOption"
          @click="handleNext"
        >
          다음
        </Button>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
