<script setup>
import { CheckCircle2, AlertCircle, Info } from 'lucide-vue-next'
import Card from '../ui/card/Card.vue'

defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['success', 'warning', 'info'].includes(value)
  },
  headline: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  details: {
    type: Array,
    default: () => []
  }
})

const iconMap = {
  success: CheckCircle2,
  warning: AlertCircle,
  info: Info
}

const colorMap = {
  success: {
    bg: 'bg-emerald-950/30',
    icon: 'text-emerald-400',
    border: 'border-emerald-500/20',
    badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    gradient: 'from-emerald-600/50 to-teal-600/50'
  },
  warning: {
    bg: 'bg-amber-950/30',
    icon: 'text-amber-400',
    border: 'border-amber-500/20',
    badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    gradient: 'from-amber-600/50 to-orange-600/50'
  },
  info: {
    bg: 'bg-blue-950/30',
    icon: 'text-blue-400',
    border: 'border-blue-500/20',
    badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    gradient: 'from-blue-600/50 to-indigo-600/50'
  }
}
</script>

<template>
  <Card variant="glass" class="overflow-hidden relative border border-white/10 ring-0 bg-white/5 backdrop-blur-xl">
    <!-- Top Gradient Accent -->
    <div 
      class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-70"
      :class="colorMap[type].gradient"
    />

    <div class="space-y-6 p-6 md:p-10">
      <div class="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
        <div 
          class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 shadow-inner ring-1 ring-white/10 md:h-20 md:w-20"
        >
          <component 
            :is="iconMap[type]" 
            class="h-8 w-8 md:h-10 md:w-10"
            :class="colorMap[type].icon"
          />
        </div>
        <div class="flex-1 space-y-3">
          <div 
            class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide shadow-sm backdrop-blur-sm"
            :class="[colorMap[type].badge]"
          >
            진단 결과
          </div>
          <h2 class="text-xl font-serif font-bold leading-tight text-white md:text-3xl lg:text-4xl text-balance">
            {{ headline }}
          </h2>
        </div>
      </div>

      <div class="h-px w-full bg-white/10" />

      <div class="space-y-6">
        <p class="text-base leading-relaxed text-slate-200 md:text-xl font-light">
          {{ solution }}
        </p>

        <div v-if="details.length > 0" class="rounded-2xl p-6 md:p-8" :class="[colorMap[type].bg, colorMap[type].border, 'border']">
          <div class="text-sm font-bold text-slate-100 md:text-lg mb-4 flex items-center gap-2">
            <span class="text-accent-400">💡</span> 핵심 포인트
          </div>
          <ul class="space-y-3">
            <li 
              v-for="(detail, index) in details"
              :key="index"
              class="flex items-start gap-3 text-sm text-slate-200 font-medium md:text-lg"
            >
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full opacity-80" :class="colorMap[type].icon.replace('text-', 'bg-')" />
              <span class="flex-1">{{ detail }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Card>
</template>
