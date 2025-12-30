<script setup>
import { X, Info } from 'lucide-vue-next'
import Button from './button/Button.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: '알림'
  },
  message: {
    type: String,
    required: true
  }
})

defineEmits(['close'])
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        class="w-full max-w-sm bg-[#1a1f26] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
        @click.stop
      >
        <div class="p-6 text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/10 mb-4">
            <Info class="h-6 w-6 text-accent-400" />
          </div>
          
          <h3 class="text-lg font-bold text-white mb-2">{{ title }}</h3>
          <p class="text-slate-400 text-sm break-keep">
            {{ message }}
          </p>
        </div>
        
        <div class="p-4 border-t border-white/5 bg-white/5 flex gap-3">
          <Button 
            class="w-full bg-accent-600 hover:bg-accent-500 text-white border-none rounded-xl py-4 h-auto font-bold"
            @click="$emit('close')"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  </Transition>
</template>
