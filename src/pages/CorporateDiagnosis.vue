<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, ChevronDown, Check, Home } from 'lucide-vue-next'
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
  debtScale: '',
  assetDebtRatio: '',
  businessStatus: '',
  profitStructure: '',
  mainRisk: ''
})

const questions = [
  {
    id: 'debtScale',
    question: '현재 법인의 총 채무(금융권, 상거래채무, 세금 등) 규모는 얼마인가요?',
    options: [
      { label: '30억 원 미만', value: 'under_3b' },
      { label: '30억 원 ~ 50억 원', value: '3b_5b' },
      { label: '50억 원 ~ 100억 원', value: '5b_10b' },
      { label: '100억 원 이상', value: 'over_10b' }
    ]
  },
  {
    id: 'assetDebtRatio',
    question: '현재 법인의 자산(부동산, 설비, 미수금 등)과 부채의 비율은 어떤가요?',
    options: [
      { 
        label: '부채가 자산보다 많습니다', 
        value: 'debt_excess',
        description: '자본 잠식 상태'
      },
      { 
        label: '자산이 더 많지만, 현금 유동성이 막혔습니다', 
        value: 'liquidity_crisis',
        description: '흑자 부도 위기'
      },
      { 
        label: '자산이 부채보다 훨씬 많습니다', 
        value: 'asset_excess'
      }
    ]
  },
  {
    id: 'businessStatus',
    question: '현재 사업장은 정상적으로 가동 중인가요?',
    options: [
      { 
        label: '정상 영업 중이며, 매출이 발생하고 있습니다', 
        value: 'operating',
        description: '회생 긍정적'
      },
      { 
        label: '영업은 하고 있으나, 매출이 거의 없습니다', 
        value: 'low_sales'
      },
      { 
        label: '현재 휴업/폐업 상태이거나 중단을 고려 중입니다', 
        value: 'closed',
        description: '파산 고려'
      }
    ]
  },
  {
    id: 'profitStructure',
    question: '금융비용(이자, 원금상환)을 제외하면 영업 이익이 나는 구조인가요?',
    options: [
      { 
        label: '네, 빚 상환만 유예되면 이익이 납니다', 
        value: 'profitable',
        description: '회생 골든타임'
      },
      { 
        label: '아니요, 적자가 지속되고 있습니다', 
        value: 'deficit'
      },
      { 
        label: '잘 모르겠습니다 / 판단이 어렵습니다', 
        value: 'unknown'
      }
    ]
  },
  {
    id: 'mainRisk',
    question: '현재 대표님이 가장 우려하시는 리스크는 무엇인가요?',
    options: [
      { label: '직원 임금/퇴직금 체불', value: 'wage_arrears' },
      { label: '대표이사 연대보증 채무', value: 'joint_guarantee' },
      { label: '수표 부도 및 강제집행(경매, 압류)', value: 'enforcement' },
      { label: '세금(국세/지방세) 체납', value: 'tax_arrears' },
      { label: '기타', value: 'other' }
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
  const isOperating = answers.value.businessStatus === 'operating'
  const isProfitable = answers.value.profitStructure === 'profitable'
  const isClosed = answers.value.businessStatus === 'closed'
  const isDeficit = answers.value.profitStructure === 'deficit'
  const debtUnder5B = ['under_3b', '3b_5b'].includes(answers.value.debtScale)

  if (isOperating && isProfitable) {
    return {
      type: 'success',
      caseType: 'A',
      headline: '[법인회생]을 통해 경영권을 방어하고 빚을 탕감받을 수 있습니다.',
      solution: '현재 영업이익이 발생하고 있으므로, 법원의 포괄적 금지명령을 통해 모든 빚 상환을 동결하고, 10년에 걸쳐 분할 상환하는 계획안 인가가 유력해 보입니다.',
      details: [
        '정상 영업 중이며 수익 구조 보유',
        '채무 상환 동결 및 분할 상환 계획 수립',
        '경영권 유지하며 기업 재건 가능',
        '채권자 동의 없이 법원 주도로 진행',
        '이자 감면 및 원금 조정 가능'
      ]
    }
  } else if (debtUnder5B && isOperating) {
    return {
      type: 'success',
      caseType: 'B',
      headline: '비용과 기간을 줄이는 [간이회생] 절차 진행이 유력합니다.',
      solution: '부채 50억 원 이하의 기업을 위한 약식 절차로, 일반 회생보다 신속하고 저렴한 비용으로 기업 재건이 가능합니다. 골든타임을 놓치지 마세요.',
      details: [
        '부채 50억 원 이하 중소기업 대상',
        '일반 회생보다 절차 간소화',
        '비용 절감 및 신속한 처리 (약 6개월)',
        '경영권 유지 가능',
        '채무 조정 및 분할 상환 계획 수립'
      ]
    }
  } else {
    return {
      type: 'warning',
      caseType: 'C',
      headline: '[법인파산]을 통해 법률적 리스크를 깨끗하게 정리해야 할 때입니다.',
      solution: '무리한 사업 지속보다는, 법원을 통해 투명하게 자산을 매각하고 채무를 소멸시켜 대표님의 민/형사상 책임(부정수표단속법, 근로기준법 위반 등)을 최소화하는 것이 유리합니다.',
      details: [
        '사업 지속이 어려운 상황',
        '법원 주도로 투명한 자산 정리',
        '채무 소멸 및 법적 책임 최소화',
        '대표이사 연대보증 채무 정리 가능',
        '임금 체불 등 형사 책임 방어'
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
  window.location.href = '/'
}

function goBack() {
  if (isSubmitted.value) {
    isSubmitted.value = false
    return
  }
  
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    router.push('/corporate')
  }
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
  <div class="fixed inset-0 pointer-events-none z-[60] flex flex-col justify-end p-4 md:hidden">
    <div class="w-full max-w-2xl mx-auto pointer-events-auto px-1">
      <Button
        v-if="currentStep <= questions.length"
        class="w-full h-auto text-lg font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.3)] border-[0.5px] border-primary-400/30 py-5 px-3"
        :disabled="!answers[currentQuestion?.id]"
        @click="nextQuestion"
      >
        다음
      </Button>
      <Button
        v-else-if="!isSubmitted"
        class="w-full h-auto text-lg font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.3)] border-[0.5px] border-primary-400/30 py-5 px-3"
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
        <div class="inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-300">
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
          class="group relative rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-primary-400/30 hover:bg-white/10 custom-select-container"
        >
          <div class="flex flex-col space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-primary-400/80 uppercase tracking-widest">Question 0{{ index + 1 }}</span>
            </div>
            <h3 class="text-sm font-medium text-slate-300 md:text-base">{{ q.question }}</h3>
            
            <div class="relative mt-2">
              <button
                @click.stop="toggleSelect(q.id)"
                class="w-full flex items-center justify-between rounded-lg border border-white/10 bg-slate-900/50 px-4 py-3.5 text-sm text-white transition-all hover:border-primary-400/30 focus:border-primary-400/50 outline-none min-h-[52px]"
                :class="{ 'ring-1 ring-primary-400/50 border-primary-400/50': openSelectId === q.id }"
              >
                <span class="font-medium text-left break-keep pr-2">{{ getSelectedLabel(q) }}</span>
                <ChevronDown 
                  class="h-4 w-4 text-slate-400 transition-transform duration-300 shrink-0" 
                  :class="{ 'rotate-180 text-primary-400': openSelectId === q.id }"
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
                        ? 'bg-primary-500/10 text-primary-300' 
                        : 'text-slate-300 hover:text-white'
                    ]"
                  >
                    <span class="break-keep pr-4">{{ opt.label }}</span>
                    <Check 
                      v-if="answers[q.id] === opt.value" 
                      class="h-4 w-4 text-primary-400 shrink-0" 
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
          class="w-full h-auto text-lg font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 hover:from-primary-600 hover:via-primary-500 hover:to-primary-600 text-white border-[0.5px] border-primary-400/30 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-500 rounded-none py-5"
          @click="submitDiagnosis"
        >
          최종 결과 확인하기
        </Button>
      </div>
    </div>

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
        <div class="inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-300">
          <span class="h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
          진단 완료
        </div>
        <h1 class="text-3xl font-serif font-bold text-white md:text-4xl tracking-tight">
          법인 자가진단 결과
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
        region-note="부산/울산/창원 지역 제조업/조선기자재/유통업 회생 성공 노하우 보유"
      />

      <div class="flex flex-col items-center gap-4 pt-8 text-center">
        <Button
          variant="ghost"
          class="text-slate-500 hover:text-slate-300 hover:bg-white/5 text-sm gap-2"
          @click="goHome"
        >
          <Home class="h-4 w-4" />
          처음으로 돌아가기
        </Button>
        
        <Button
          variant="ghost"
          class="text-slate-600 hover:text-slate-400 hover:bg-transparent text-xs"
          @click="router.push('/corporate')"
        >
          법인회생/파산 안내로 돌아가기
        </Button>
      </div>
    </div>
  </section>
</template>
