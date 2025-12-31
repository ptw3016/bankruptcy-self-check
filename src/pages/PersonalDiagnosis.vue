<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, ChevronDown, Check } from 'lucide-vue-next'
import Button from '../components/ui/button/Button.vue'
import ProgressBar from '../components/diagnosis/ProgressBar.vue'
import IntroScreen from '../components/diagnosis/IntroScreen.vue'
import QuestionCard from '../components/diagnosis/QuestionCard.vue'
import ResultCard from '../components/diagnosis/ResultCard.vue'
import ActionButtons from '../components/diagnosis/ActionButtons.vue'

const router = useRouter()

const currentStep = ref(1)
const isSubmitted = ref(false)
const openSelectId = ref(null)

const answers = ref({
  region: '',
  debtAmount: '',
  employment: '',
  income: '',
  assetComparison: ''
})

const questions = [
  {
    id: 'region',
    question: '현재 거주하시는 지역이 어디신가요?',
    options: [
      { label: '부산', value: 'busan' },
      { label: '양산/김해/울산', value: 'yangsan' },
      { label: '창원/경남', value: 'changwon' },
      { label: '서울', value: 'seoul' },
      { label: '그 외 지역', value: 'other' }
    ]
  },
  {
    id: 'debtAmount',
    question: '갚으셔야 할 총 채무(빚) 규모는 어느 정도인가요?',
    options: [
      { label: '1,500만 원 미만', value: 'under_15m' },
      { label: '1,500만 원 ~ 5,000만 원', value: '15m_50m' },
      { label: '5,000만 원 ~ 1억', value: '50m_100m' },
      { label: '1억 이상', value: 'over_100m' }
    ]
  },
  {
    id: 'employment',
    question: '현재 직업이나 소득 활동을 하고 계신가요?',
    options: [
      { label: '직장인(4대보험 O)', value: 'employee_insured' },
      { label: '직장인(4대보험 X)', value: 'employee_uninsured' },
      { label: '사업자/프리랜서', value: 'self_employed' },
      { label: '아르바이트/일용직', value: 'part_time' },
      { label: '소득 없음/주부', value: 'no_income' }
    ]
  },
  {
    id: 'income',
    question: '월 평균 순수입(실수령액)은 대략 얼마인가요?',
    options: [
      { label: '100만 원 미만', value: 'under_1m' },
      { label: '100만 원 ~ 200만 원', value: '1m_2m' },
      { label: '200만 원 ~ 300만 원', value: '2m_3m' },
      { label: '300만 원 이상', value: 'over_3m' }
    ]
  },
  {
    id: 'assetComparison',
    question: '본인 명의의 재산(집, 차, 보증금 등)이 빚보다 많으신가요?',
    options: [
      { label: '아니요, 빚이 재산보다 훨씬 많습니다', value: 'debt_more' },
      { label: '비슷하거나 재산이 더 많습니다', value: 'asset_more' },
      { label: '잘 모르겠습니다 (상담으로 파악)', value: 'unknown' }
    ]
  }
]

const totalSteps = computed(() => questions.length)

const currentQuestion = computed(() => {
  if (currentStep.value === 0 || currentStep.value > questions.length) {
    return null
  }
  return questions[currentStep.value - 1]
})

const result = computed(() => {
  const hasIncome = ['employee_insured', 'employee_uninsured', 'self_employed', 'part_time'].includes(answers.value.employment)
  const noIncome = answers.value.employment === 'no_income'
  const debtMore = answers.value.assetComparison === 'debt_more'
  const assetMore = answers.value.assetComparison === 'asset_more'
  const unknown = answers.value.assetComparison === 'unknown'

  if (hasIncome && debtMore) {
    return {
      type: 'success',
      caseType: 'A',
      headline: '고객님은 [개인회생] 신청 자격이 매우 높습니다!',
      solution: '이자는 100%, 원금은 최대 90%까지 탕감받을 수 있는 조건입니다. 정확한 탕감액을 지금 확인해보세요.',
      details: [
        '현재 소득이 있어 변제 계획 수립이 가능합니다',
        '채무가 재산보다 많아 회생 절차가 유리합니다',
        '이자 전액 면제 및 원금 대폭 감면 가능',
        '3~5년 분할 상환으로 경제적 재기 지원'
      ]
    }
  } else if (noIncome && debtMore) {
    return {
      type: 'warning',
      caseType: 'B',
      headline: '고객님은 [개인파산 및 면책] 검토가 가능합니다.',
      solution: '현재 소득 활동이 어려우시다면, 모든 빚을 탕감받는 파산 제도를 통해 새 출발이 가능할 수 있습니다.',
      details: [
        '소득이 없어 변제 능력이 제한적인 상황',
        '파산 면책을 통한 채무 전액 소멸 가능',
        '법원의 면책 결정 후 경제적 재기 시작',
        '신용회복까지 약 5~7년 소요'
      ]
    }
  } else {
    return {
      type: 'info',
      caseType: 'C',
      headline: '변호사의 정밀한 진단이 필요한 상황입니다.',
      solution: '현재 조건만으로는 판단이 어렵지만, 전문가와 상담하면 해결책을 찾을 수도 있습니다.',
      details: [
        '재산과 채무의 정확한 평가가 필요합니다',
        '개인회생 또는 임의조정 등 다양한 방법 검토 가능',
        '전문가 상담을 통한 맞춤형 솔루션 제공',
        '상황에 따라 최적의 채무조정 방법 선택'
      ]
    }
  }
})

function nextQuestion() {
  if (currentStep.value <= questions.length) {
    currentStep.value++
  }
}

function submitDiagnosis() {
  isSubmitted.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goHome() {
  router.push({ name: 'home' })
}
function goBack() {
  if (isSubmitted.value) {
    isSubmitted.value = false
    return
  }
  
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    router.push('/personal')
  }
}

function goToStep(step) {
  currentStep.value = step
  isSubmitted.value = false
}

function toggleSelect(id) {
  if (openSelectId.value === id) {
    openSelectId.value = null
  } else {
    openSelectId.value = id
  }
}

function selectOption(id, value) {
  answers.value[id] = value
  openSelectId.value = null
}

function getSelectedLabel(q) {
  return q.options.find(opt => opt.value === answers.value[q.id])?.label || '선택해주세요'
}

// Close select when clicking outside
function handleClickOutside(event) {
  if (openSelectId.value && !event.target.closest('.custom-select-container')) {
    openSelectId.value = null
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div>
    <div class="fixed inset-x-0 bottom-0 pointer-events-none z-[50] flex flex-col justify-end p-4 md:hidden">
      <div class="absolute inset-0 bg-[#0f1216]/60 backdrop-blur-md border-t border-white/10" />
      <div class="relative w-full max-w-2xl mx-auto pointer-events-auto px-5 pb-safe-offset-2">
        <Button
          v-if="currentStep <= questions.length"
          class="w-full h-auto text-lg font-bold leading-tight bg-gradient-to-r from-accent-700 via-accent-600 to-accent-700 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.3)] border-[0.5px] border-accent-400/30 rounded-none py-5"
          :disabled="!answers[currentQuestion?.id]"
          @click="nextQuestion"
        >
          다음
        </Button>
        <Button
          v-else-if="!isSubmitted"
          class="w-full h-auto text-lg font-bold leading-tight bg-gradient-to-r from-accent-700 via-accent-600 to-accent-700 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.3)] border-[0.5px] border-accent-400/30 rounded-none py-5"
          @click="submitDiagnosis"
        >
          최종 결과 확인하기
        </Button>
      </div>
    </div>

    <section class="flex min-h-[calc(100dvh-3rem)] md:min-h-[calc(100dvh-4rem)] flex-col pt-0 pb-24 md:pb-4 md:justify-center">
    <QuestionCard
      v-if="currentStep <= questions.length"
      class="flex-1"
      :question="currentQuestion.question"
      :options="currentQuestion.options"
      v-model="answers[currentQuestion.id]"
      @next="nextQuestion"
    >
      <template #header>
        <div class="mb-6 md:mb-0">
          <ProgressBar 
            :current-step="currentStep" 
            :total-steps="totalSteps" 
            :show-back-button="true"
            @back="goBack"
          />
        </div>
      </template>
    </QuestionCard>

    <!-- Review Step -->
    <div v-else-if="!isSubmitted" class="mx-auto flex max-w-2xl flex-col space-y-4 px-4 py-4 md:max-w-3xl md:px-12 md:py-10 w-full animate-fade-in">
      <div class="mb-2 md:mb-8">
        <div class="w-full">
          <div class="flex items-center text-xs md:text-lg">
            <button 
              class="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium px-2 -ml-2 py-1 rounded-md hover:bg-white/5 md:gap-2"
              @click="goBack"
            >
              <ArrowLeft class="h-3.5 w-3.5 md:h-5 md:w-5" />
              <span>이전</span>
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-4 text-center">
        <div class="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-500/10 px-4 py-1.5 text-xs font-semibold text-accent-300">
          진단 내용 확인
        </div>
        <h1 class="text-3xl font-serif font-bold text-white md:text-4xl tracking-tight break-keep">
          선택하신 내역을 확인해주세요
        </h1>
        <p class="text-slate-400 text-sm md:text-base break-keep mx-auto max-w-[280px] md:max-w-none">
          내용을 수정하시려면 항목을 클릭하여 다시 선택할 수 있습니다.
        </p>
      </div>

      <div class="space-y-4">
        <div 
          v-for="(q, index) in questions" 
          :key="q.id"
          class="group relative rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-accent-400/30 hover:bg-white/10 custom-select-container"
        >
          <div class="flex flex-col space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-accent-400/80 uppercase tracking-widest">Question 0{{ index + 1 }}</span>
            </div>
            <h3 class="text-sm font-medium text-slate-300 md:text-base">{{ q.question }}</h3>
            
            <!-- Custom Select -->
            <div class="relative mt-2">
              <button
                @click.stop="toggleSelect(q.id)"
                class="w-full flex items-center justify-between rounded-lg border border-white/10 bg-slate-900/50 px-4 py-3.5 text-sm text-white transition-all hover:border-accent-400/30 focus:border-accent-400/50 outline-none min-h-[52px]"
                :class="{ 'ring-1 ring-accent-400/50 border-accent-400/50': openSelectId === q.id }"
              >
                <span class="font-medium text-left break-keep pr-2">{{ getSelectedLabel(q) }}</span>
                <ChevronDown 
                  class="h-4 w-4 text-slate-400 transition-transform duration-300 shrink-0" 
                  :class="{ 'rotate-180 text-accent-400': openSelectId === q.id }"
                />
              </button>

              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-1 opacity-0"
              >
                <div 
                  v-if="openSelectId === q.id"
                  class="absolute left-0 right-0 z-[80] mt-2 max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-[#1a1f26] p-1 shadow-2xl backdrop-blur-xl custom-scrollbar"
                >
                  <button
                    v-for="opt in q.options"
                    :key="opt.value"
                    @click.stop="selectOption(q.id, opt.value)"
                    class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition-all hover:bg-white/5 group/opt"
                    :class="[
                      answers[q.id] === opt.value 
                        ? 'bg-accent-500/10 text-accent-300' 
                        : 'text-slate-300 hover:text-white'
                    ]"
                  >
                    <span class="break-keep pr-4">{{ opt.label }}</span>
                    <Check 
                      v-if="answers[q.id] === opt.value" 
                      class="h-4 w-4 text-accent-400 shrink-0" 
                    />
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-6 hidden md:block">
        <Button
          class="w-full h-auto text-lg font-bold bg-gradient-to-r from-accent-700 via-accent-600 to-accent-700 hover:from-accent-600 hover:via-accent-500 hover:to-accent-600 text-white border-[0.5px] border-accent-400/30 shadow-[0_0_20px_rgba(198,167,98,0.2)] hover:shadow-[0_0_30px_rgba(198,167,98,0.4)] transition-all duration-500 rounded-none py-5"
          @click="submitDiagnosis"
        >
          최종 결과 확인하기
        </Button>
      </div>
    </div>

    <!-- Result Step -->
    <div v-else class="mx-auto flex max-w-2xl flex-col space-y-4 px-4 py-4 md:max-w-3xl md:px-12 md:py-10 w-full animate-fade-in">
      <div class="mb-2 md:mb-8">
        <div class="w-full">
          <div class="flex items-center text-xs md:text-lg">
            <button 
              class="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium px-2 -ml-2 py-1 rounded-md hover:bg-white/5 md:gap-2"
              @click="goBack"
            >
              <ArrowLeft class="h-3.5 w-3.5 md:h-5 md:w-5" />
              <span>다시 검토하기</span>
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-4 text-center">
        <div class="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-500/10 px-4 py-1.5 text-xs font-semibold text-accent-300">
          <span class="h-2 w-2 rounded-full bg-accent-400 animate-pulse" />
          진단 완료
        </div>
        <h1 class="text-3xl font-serif font-bold text-white md:text-4xl tracking-tight">
          자가진단 결과
        </h1>
      </div>

      <ResultCard
        :type="result.type"
        :headline="result.headline"
        :solution="result.solution"
        :details="result.details"
      />

      <ActionButtons
        phone-number="051-123-4567"
        kakao-url="https://pf.kakao.com/"
        :show-schedule="true"
        region-note=""
      />

      <div class="text-center pt-6">
        <Button
          variant="ghost"
          class="text-slate-500 hover:text-slate-300 hover:bg-white/5 text-sm gap-2"
          @click="goHome"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          처음으로 돌아가기
        </Button>
      </div>
    </div>
    </section>
  </div>
</template>
