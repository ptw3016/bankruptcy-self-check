import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/Home.vue'
import PersonalPage from '../pages/Personal.vue'
import CorporatePage from '../pages/Corporate.vue'
import ConsultPage from '../pages/Consult.vue'
import PersonalDiagnosisPage from '../pages/PersonalDiagnosis.vue'
import CorporateDiagnosisPage from '../pages/CorporateDiagnosis.vue'
import NotFoundPage from '../pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/personal', name: 'personal', component: PersonalPage },
    { path: '/personal/diagnosis', name: 'personal-diagnosis', component: PersonalDiagnosisPage },
    { path: '/corporate', name: 'corporate', component: CorporatePage },
    { path: '/corporate/diagnosis', name: 'corporate-diagnosis', component: CorporateDiagnosisPage },
    { path: '/consult', name: 'consult', component: ConsultPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
