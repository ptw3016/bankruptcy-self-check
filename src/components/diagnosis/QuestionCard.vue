<script setup>
import { ref } from 'vue'
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
  <Card variant="glass" class="mx-auto w-full max-w-2xl px-4 py-4 md:max-w-3xl md:px-12 md:py-10 animate-scale-in h-full flex flex-col bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl">
    <div class="mb-2 md:mb-8 shrink-0">
      <slot name="header" />
    </div>
    <div class="flex-1 flex flex-col min-h-0">
      <div class="shrink-0 space-y-1 text-center md:text-left md:space-y-4 mb-4 md:mb-8">
        <h2 class="text-lg font-serif font-bold leading-snug text-white md:text-3xl lg:text-4xl text-balance break-keep tracking-wide">
          {{ question }}
        </h2>
        <p class="text-xs text-slate-300 font-light pb-1 md:text-lg md:pb-2">가장 적절한 항목을 선택해 주세요</p>
      </div>

      <div class="flex-1 flex flex-col justify-center overflow-y-auto min-h-0 space-y-2 md:space-y-5 px-1 py-2 custom-scrollbar">
        <button
          v-for="(option, index) in options"
          :key="index"
          class="group relative w-full shrink-0 overflow-hidden rounded-xl border p-3 text-left transition-all duration-300 md:p-6 md:rounded-2xl"
          :class="[
            selectedOption === option.value
              ? 'border-accent-400 bg-accent-500/10 shadow-[0_0_20px_rgba(198,167,98,0.15)] ring-1 ring-accent-400/50 z-10'
              : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
          ]"
          @click="selectOption(option.value)"
        >
          <div class="flex items-center gap-3 md:gap-6">
            <div 
              class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 md:h-8 md:w-8 md:border-[2px]"
              :class="[
                selectedOption === option.value
                  ? 'border-accent-400 bg-accent-400 scale-110'
                  : 'border-slate-400 bg-transparent group-hover:border-slate-300'
              ]"
            >
              <div 
                class="h-2 w-2 rounded-full bg-[#0f1216] transition-transform duration-300 md:h-3 md:w-3"
                :class="selectedOption === option.value ? 'scale-100' : 'scale-0'"
              />
            </div>
            <div class="flex-1">
              <div 
                class="text-sm font-medium transition-colors md:text-xl leading-tight"
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
                class="mt-1 text-[11px] transition-colors duration-300 leading-tight md:text-base md:mt-2"
                :class="[
                  selectedOption === option.value
                    ? 'text-accent-200/80'
                    : 'text-slate-400 group-hover:text-slate-300'
                ]"
              >
                {{ option.description }}
              </div>
            </div>
          </div>
        </button>
      </div>

      <div class="pt-4 md:pt-10 shrink-0 mt-auto">
        <Button
          size="lg"
          class="w-full h-12 text-base font-bold bg-accent-600 hover:bg-accent-500 text-white border-none shadow-[0_0_20px_rgba(198,167,98,0.2)] hover:shadow-[0_0_30px_rgba(198,167,98,0.4)] transition-all duration-300 md:h-16 md:text-xl md:rounded-2xl"
          :disabled="!selectedOption"
          @click="handleNext"
        >
          다음으로 진행하기
          <span class="ml-2 text-lg md:text-2xl font-serif">→</span>
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
