<script setup>
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

const props = defineProps({
  as: { type: String, default: 'div' },
  variant: { type: String, default: 'glass' },
  hoverable: { type: Boolean, default: false },
  class: { type: String, default: '' },
})

const cardVariants = cva(
  'rounded-2xl transition-all duration-500',
  {
    variants: {
      variant: {
        glass: 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-glass hover:bg-white/10 hover:border-white/20 transition-colors',
        solid: 'bg-[#1e293b] border border-white/5 shadow-xl',
        gradient: 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-lg',
        glow: 'bg-white/5 backdrop-blur-2xl border border-accent-400/30 shadow-[0_0_30px_rgba(198,167,98,0.15)]',
      },
      hoverable: {
        true: 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:border-accent-400/30 active:scale-[0.98] active:translate-y-0',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'glass',
      hoverable: false,
    },
  },
)

const classes = computed(() => cn(cardVariants({ variant: props.variant, hoverable: props.hoverable }), props.class))
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
