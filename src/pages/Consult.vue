<script setup>
import { Phone, Mail, Clock, MapPin } from 'lucide-vue-next'
import Card from '../components/ui/card/Card.vue'
</script>

<template>
  <section class="space-y-8 animate-fade-in py-8 md:py-12 pb-10">
    <header class="space-y-4">
      <div class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        전문가 상담
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">상담 / 문의</h1>
      <p class="text-lg font-medium text-slate-600 md:text-xl">
        전문 변호사와 1:1 상담을 통해 최적의 솔루션을 제공받으세요.
      </p>
    </header>

    <div class="grid gap-5 md:grid-cols-2 md:gap-6">
      <Card variant="glass" class="p-6 md:p-8 animate-slide-up" style="animation-delay: 0.1s">
        <div class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 shadow-sm md:h-16 md:w-16">
          <Phone class="h-7 w-7 text-emerald-600 md:h-8 md:w-8" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 md:text-2xl">전화 상담</h3>
        <p class="mt-3 text-base leading-relaxed text-slate-600 font-medium">
          평일 오전 9시부터 오후 6시까지 전화 상담이 가능합니다.
        </p>
        <div class="mt-5 text-xl font-bold text-emerald-600">
          02-1234-5678
        </div>
      </Card>

      <Card variant="glass" class="p-6 md:p-8 animate-slide-up" style="animation-delay: 0.2s">
        <div class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 shadow-sm md:h-16 md:w-16">
          <Mail class="h-7 w-7 text-teal-600 md:h-8 md:w-8" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 md:text-2xl">이메일 문의</h3>
        <p class="mt-3 text-base leading-relaxed text-slate-600 font-medium">
          24시간 이메일 접수 가능하며, 영업일 기준 1~2일 내 답변드립니다.
        </p>
        <div class="mt-5 text-lg font-bold text-teal-600">
          contact@lawfirm.com
        </div>
      </Card>

      <Card variant="glass" class="p-6 md:p-8 animate-slide-up" style="animation-delay: 0.3s">
        <div class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 shadow-sm md:h-16 md:w-16">
          <Clock class="h-7 w-7 text-cyan-600 md:h-8 md:w-8" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 md:text-2xl">운영 시간</h3>
        <div class="mt-4 space-y-2 text-base text-slate-600 font-medium">
          <div class="flex justify-between border-b border-slate-100 pb-2">
            <span>평일</span>
            <span class="font-bold text-slate-800">09:00 - 18:00</span>
          </div>
          <div class="flex justify-between border-b border-slate-100 pb-2">
            <span>토요일</span>
            <span class="font-bold text-slate-800">09:00 - 13:00</span>
          </div>
          <div class="flex justify-between pt-1">
            <span>일요일/공휴일</span>
            <span class="font-bold text-slate-500">휴무</span>
          </div>
        </div>
      </Card>

      <Card variant="glass" class="p-6 md:p-8 animate-slide-up" style="animation-delay: 0.4s">
        <div class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 shadow-sm md:h-16 md:w-16">
          <MapPin class="h-7 w-7 text-blue-600 md:h-8 md:w-8" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 md:text-2xl">방문 상담</h3>
        <p class="mt-3 text-base leading-relaxed text-slate-600 font-medium">
          서울특별시 강남구 테헤란로 123<br />
          법률빌딩 5층
        </p>
        <p class="mt-3 text-sm font-semibold text-blue-500 bg-blue-50 inline-block px-3 py-1 rounded-full">
          * 방문 상담은 사전 예약 필수
        </p>
      </Card>
    </div>

    <Card variant="glow" class="p-6 md:p-10 animate-slide-up bg-white/60" style="animation-delay: 0.5s">
      <div class="text-center">
        <h3 class="text-2xl font-bold text-slate-900 md:text-3xl">온라인 상담 신청</h3>
        <p class="mt-3 text-base text-slate-500 md:text-lg font-medium">
          아래 정보가 포함된 상담 폼이 추후 구현될 예정입니다.
        </p>
        
        <div class="mt-8 grid gap-4 text-left md:grid-cols-2">
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-sm font-semibold text-slate-500">이름</div>
            <div class="mt-1 text-slate-800 font-medium">홍길동</div>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-sm font-semibold text-slate-500">연락처</div>
            <div class="mt-1 text-slate-800 font-medium">010-1234-5678</div>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-sm font-semibold text-slate-500">이메일</div>
            <div class="mt-1 text-slate-800 font-medium">example@email.com</div>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-sm font-semibold text-slate-500">상담 유형</div>
            <div class="mt-1 text-slate-800 font-medium">개인회생 / 법인회생 / 파산</div>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white p-4 md:col-span-2 shadow-sm">
            <div class="text-sm font-semibold text-slate-500">상담 내용</div>
            <div class="mt-1 text-slate-800 font-medium">상세한 상담 내용을 입력해주세요...</div>
          </div>
        </div>

        <div class="mt-6 rounded-lg bg-slate-50 border border-slate-100 p-4 text-sm text-slate-500">
          <p class="font-semibold text-slate-700 mb-2">📋 실제 폼 구현 시 포함될 기능:</p>
          <ul class="space-y-1 text-left inline-block">
            <li>• 실시간 입력 검증</li>
            <li>• 개인정보 처리방침 동의</li>
            <li>• 파일 첨부 (선택사항)</li>
            <li>• 자동 접수 확인 이메일 발송</li>
          </ul>
        </div>
      </div>
    </Card>
  </section>
</template>
