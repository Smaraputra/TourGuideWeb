import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import HomeView from '../views/landing/HomeView.vue'
import DestinationsView from "../views/landing/DestinationsView.vue";
import TourPackageView from "../views/landing/TourPackagesView.vue";
import TourPackageDetailView from "../views/landing/TourPackageDetailView.vue";
import ProfileView from "../views/landing/ProfileInformationView.vue";
import TransactionView from "../views/landing/TransactionView.vue";
import TransactionDetailView from "../views/landing/TransactionDetailView.vue";

import RegisterView from "../views/auth/RegisterView.vue";
import LoginView from "../views/auth/LoginView.vue";
import AgentProfileCreateView from "../views/touragent/AgentProfileCreateView.vue";
import GuideProfileCreateView from "../views/tourguide/GuideProfileCreateView.vue";

import PageNotFoundView from "../views/error/PageNotFoundView.vue";

import DashboardMainView from "../views/DashboardMainView.vue";
import DashboardHomeView from "../views/dashboard/DashboardHomeView.vue"
import TourDestinationAdminView from "../views/dashboard/admin/TourDestinationAdminView.vue"
import TourPackageCategoriesAdminView from "../views/dashboard/admin/TourPackageCategoriesAdminView.vue"
import PaymentMethodsAdminView from "../views/dashboard/admin/PaymentMethodsAdminView.vue"
import TourAgentAdminView from "../views/dashboard/admin/TourAgentAdminView.vue"

import TourPackageAgentView from "../views/dashboard/touragent/TourPackageAgentView.vue"
import TourPackageDetailPriceAgentView from "../views/dashboard/touragent/TourPackageDetailPriceAgentView.vue"
import TourPackageFacilitiesActivitiesAgentView from "../views/dashboard/touragent/TourPackageFacilitiesActivitiesAgentView.vue"
import TourGuideAgentView from "../views/dashboard/touragent/TourGuideAgentView.vue"
import GuideJobApprovalAgentView from "../views/dashboard/touragent/GuideJobApprovalAgentView.vue"
import TransactionAgentView from "../views/dashboard/touragent/TransactionAgentView.vue"
import PickupFeeAgentView from "../views/dashboard/touragent/PickupFeeAgentView.vue"
import PaymentMethodDetailAgentView from "../views/dashboard/touragent/PaymentMethodDetailsAgentView.vue"
import TransactionDetailAgentView from "../views/dashboard/touragent/TransactionDetailAgentView.vue"

import GuideJobApprovalGuideView from "../views/dashboard/tourguide/GuideJobApprovalGuideView.vue"

const routes = [
  {
    path: '/',
    name: "main",
    component: MainView,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView
      },
      {
        path: "destinations",
        name: "destinations",
        component: DestinationsView
      },
      {
        path: "packages",
        name: "packages",
        component: TourPackageView
      },
      {
        path: "packages-detail/:id_tour_packages",
        name: "packages-detail-see",
        component: TourPackageDetailView
      },
      {
        path: "register",
        name: "register",
        component: RegisterView
      },
      {
        path: "login",
        name: "login",
        component: LoginView
      },
      {
        path: "register-agent",
        name: "register-agent",
        component: AgentProfileCreateView
      },
      {
        path: "register-guide",
        name: "register-guide",
        component: GuideProfileCreateView
      },
      {
        path: "profile",
        name: "profile",
        component: ProfileView,
      },
      {
        path: "transactions",
        name: "transactions",
        component: TransactionView,
      },
      {
        path: 'transactions/:id_orders',
        name: "transactions-see",
        component: TransactionDetailView,
      },
    ],
  },
  {
    path: '/dashboard/',
    component: DashboardMainView,
    name: "dashboard-main",
    children: [
      {
        path: '',
        name: "dashboard",
        component: DashboardHomeView,
      },
      
      {
        path: 'tour-destination',
        name: "tour-destination",
        component: TourDestinationAdminView,
      },
      {
        path: 'tour-category',
        name: "tour-category",
        component: TourPackageCategoriesAdminView,
      },
      {
        path: 'payment-method',
        name: "payment-method",
        component: PaymentMethodsAdminView,
      },
      {
        path: 'verify-agent',
        name: "verify-agent",
        component: TourAgentAdminView,
      },

      {
        path: 'tour-package',
        name: "tour-package",
        component: TourPackageAgentView,
      },
      {
        path: 'tour-package/:id_tour_packages',
        name: "tour-package-see",
        component: TourPackageDetailPriceAgentView,
      },
      {
        path: 'tour-package-detail/:id_package_details',
        name: "tour-package-detail-see",
        component: TourPackageFacilitiesActivitiesAgentView,
      },
      {
        path: 'manage-tour-guide',
        name: "manage-tour-guide",
        component: TourGuideAgentView,
      },
      {
        path: 'guide-job-approval',
        name: "guide-job-approval",
        component: GuideJobApprovalAgentView,
      },
      {
        path: 'verify-transactions',
        name: "verify-transactions",
        component: TransactionAgentView,
      },
      {
        path: 'transactions/:id_orders',
        name: "transactions-see-agent",
        component: TransactionDetailAgentView,
      },
      {
        path: 'pickup-fee',
        name: "pickup-fee",
        component: PickupFeeAgentView,
      },
      {
        path: 'payment-detail',
        name: "payment-detail",
        component: PaymentMethodDetailAgentView,
      },

      {
        path: 'job-offer',
        name: "job-offer",
        component: GuideJobApprovalGuideView,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: PageNotFoundView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({behavior:'smooth'});
 }
})

export default router
