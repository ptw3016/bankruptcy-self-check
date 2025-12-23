<script setup>
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

const props = defineProps({
  as: { type: String, default: 'button' },
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'default' },
  class: { type: String, default: '' },
  type: { type: String, default: 'button' },
})

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-[#0f1216]',
  {
    variants: {
      variant: {
        default: 'bg-slate-800 text-white shadow-lg shadow-slate-900/40 hover:bg-slate-700 active:scale-[0.98] hover:shadow-xl transition-all duration-300 border border-white/5',
        outline: 'border border-white/20 bg-white/5 backdrop-blur-sm text-slate-200 shadow-sm hover:bg-white/10 hover:text-white hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all duration-300',
        kioskPrimary:
          'bg-gradient-to-br from-accent-600 via-accent-500 to-accent-400 text-white shadow-[0_0_20px_rgba(198,167,98,0.2)] hover:shadow-[0_0_40px_rgba(198,167,98,0.4)] hover:-translate-y-1 hover:brightness-110 transition-all duration-300 active:scale-[0.97] active:translate-y-0 border border-white/10',
        kioskSecondary:
          'bg-white/5 backdrop-blur-md text-slate-100 border border-white/10 shadow-glass hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 active:scale-[0.97] active:translate-y-0',
        ghost: 'hover:bg-white/10 text-slate-400 hover:text-white',
      },
      size: {
        default: 'h-11 px-5 py-2 text-base rounded-xl',
        sm: 'h-9 px-3 text-sm rounded-lg',
        lg: 'h-14 px-8 text-lg rounded-2xl',
        kiosk: 'min-h-24 px-8 text-2xl md:min-h-32 md:px-12 md:text-3xl lg:min-h-40 lg:px-16 lg:text-4xl rounded-[2rem] font-bold tracking-tight',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const classes = computed(() => cn(buttonVariants({ variant: props.variant, size: props.size }), props.class))
</script>

<template>
  <component
    :is="as"
    :type="as === 'button' ? type : undefined"
    :class="cn('select-none', classes)"
  >
    <slot />
  </component>
</template>
