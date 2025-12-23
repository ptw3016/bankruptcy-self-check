<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import Button from '../components/ui/button/Button.vue'
import ProgressBar from '../components/diagnosis/ProgressBar.vue'
import IntroScreen from '../components/diagnosis/IntroScreen.vue'
import QuestionCard from '../components/diagnosis/QuestionCard.vue'
import ResultCard from '../components/diagnosis/ResultCard.vue'
import ActionButtons from '../components/diagnosis/ActionButtons.vue'

const router = useRouter()

const currentStep = ref(1)
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
  if (currentStep.value < questions.length) {
    currentStep.value++
  } else {
    currentStep.value = questions.length + 1
  }
}

function goBack() {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    router.push('/personal')
  }
}
</script>

<template>
  <section class="flex min-h-[calc(100dvh-3rem)] md:min-h-[calc(100dvh-4rem)] flex-col pt-0 pb-4 md:justify-center">
    <QuestionCard
      v-if="currentStep <= questions.length"
      class="flex-1"
      :question="currentQuestion.question"
      :options="currentQuestion.options"
      v-model="answers[currentQuestion.id]"
      @next="nextQuestion"
    >
      <template #header>
        <ProgressBar 
          :current-step="currentStep" 
          :total-steps="totalSteps" 
          :show-back-button="true"
          @back="goBack"
        />
      </template>
    </QuestionCard>

    <div v-else class="mx-auto flex max-w-2xl flex-col justify-center space-y-8 px-4 py-10 w-full animate-fade-in">
      <div class="mb-4">
        <Button
          variant="ghost"
          class="group -ml-2 gap-2 text-slate-400 hover:text-white hover:bg-white/5"
          @click="goBack"
        >
          <ArrowLeft class="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          다시 진단하기
        </Button>
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
          class="text-slate-500 hover:text-slate-300 hover:bg-transparent text-sm"
          @click="router.push('/personal')"
        >
          개인회생/파산 안내로 돌아가기
        </Button>
      </div>
    </div>
  </section>
</template>
