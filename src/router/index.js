import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import HomeView from "../views/landing/HomeView.vue";
import AboutView from "../views/landing/AboutView.vue";
import DestinationsView from "../views/landing/DestinationsView.vue";
import DestinationDetailView from "../views/landing/DestinationsDetailView.vue";
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
import DashboardHomeView from "../views/dashboard/DashboardHomeView.vue";
import TourDestinationAdminView from "../views/dashboard/admin/TourDestinationAdminView.vue";
import TourDestinationUpdateAdminView from "../views/dashboard/admin/TourDestinationUpdateAdminView.vue";
import TourPackageCategoriesAdminView from "../views/dashboard/admin/TourPackageCategoriesAdminView.vue";
import TourPackageCategoriesUpdateAdminView from "../views/dashboard/admin/TourPackageCategoriesUpdateAdminView.vue";
import PaymentMethodsAdminView from "../views/dashboard/admin/PaymentMethodsAdminView.vue";
import PaymentMethodsUpdateAdminView from "../views/dashboard/admin/PaymentMethodsUpdateAdminView.vue";
import TourAgentAdminView from "../views/dashboard/admin/TourAgentAdminView.vue";
import TourDestinationRequestAdminView from "../views/dashboard/admin/TourDestinationRequestAdminView.vue";

import TourAgentProfileAgentView from "../views/dashboard/touragent/TourAgentProfileAgentView.vue";
import TourDestinationRequestAgentView from "../views/dashboard/touragent/TourDestinationRequestAgentView.vue";
import TourPackageAgentView from "../views/dashboard/touragent/TourPackageAgentView.vue";
import TourPackageDetailPriceAgentView from "../views/dashboard/touragent/TourPackageDetailPriceAgentView.vue";
import TourPackagePriceUpdateAgentView from "../views/dashboard/touragent/TourPackagePriceUpdateAgentView.vue";
import TourPackageFacilitiesActivitiesAgentView from "../views/dashboard/touragent/TourPackageFacilitiesActivitiesAgentView.vue";
import TourFacilitiesAgentView from "../views/dashboard/touragent/TourPackageFacilitiesUpdateAgentView.vue";
import TourActivitiesAgentView from "../views/dashboard/touragent/TourPackageActivitiesUpdateAgentView.vue";
import TourGuideAgentView from "../views/dashboard/touragent/TourGuideAgentView.vue";
import GuideJobApprovalAgentView from "../views/dashboard/touragent/GuideJobApprovalAgentView.vue";
import GuideJobDetailAgentView from "../views/dashboard/touragent/GuideJobDetailAgentView.vue";
import TransactionAgentView from "../views/dashboard/touragent/TransactionAgentView.vue";
import PickupFeeAgentView from "../views/dashboard/touragent/PickupFeeAgentView.vue";
import PickupFeeUpdateAgentView from "../views/dashboard/touragent/PickupFeeUpdateAgentView.vue";
import PaymentMethodDetailAgentView from "../views/dashboard/touragent/PaymentMethodDetailsAgentView.vue";
import PaymentMethodDetailsUpdateAgentView from "../views/dashboard/touragent/PaymentMethodDetailsUpdateAgentView.vue";
import TransactionDetailAgentView from "../views/dashboard/touragent/TransactionDetailAgentView.vue";

import GuideProfileGuideView from "../views/dashboard/tourguide/GuideProfileGuideView.vue";
import GuideJobApprovalGuideView from "../views/dashboard/tourguide/GuideJobApprovalGuideView.vue";
import GuideDestinationGuideView from "../views/dashboard/tourguide/GuideDestinationGuideView.vue";
import GuideJobDetailGuideView from "../views/dashboard/tourguide/GuideJobDetailGuideView.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "about",
        name: "about",
        component: AboutView,
      },
      {
        path: "destinations",
        name: "destinations",
        component: DestinationsView,
      },
      {
        path: "destinations/:id_tourist_destinations",
        name: "destinations-see",
        component: DestinationDetailView,
      },
      {
        path: "packages",
        name: "packages",
        component: TourPackageView,
      },
      {
        path: "packages-detail/:id_tour_packages",
        name: "packages-detail-see",
        component: TourPackageDetailView,
      },
      {
        path: "register",
        name: "register",
        component: RegisterView,
      },
      {
        path: "login",
        name: "login",
        component: LoginView,
      },
      {
        path: "register-agent",
        name: "register-agent",
        component: AgentProfileCreateView,
      },
      {
        path: "register-guide",
        name: "register-guide",
        component: GuideProfileCreateView,
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
        path: "transactions/:id_orders",
        name: "transactions-see",
        component: TransactionDetailView,
      },
    ],
  },
  {
    path: "/dashboard/",
    component: DashboardMainView,
    name: "dashboard-main",
    children: [

      //Admin
      {
        path: "",
        name: "dashboard",
        component: DashboardHomeView,
      },

      {
        path: "tour-destination",
        name: "tour-destination",
        component: TourDestinationAdminView,
      },
      {
        path: "tour-destination/:id_tourist_destinations",
        name: "tour-destination-update",
        component: TourDestinationUpdateAdminView,
      },
      {
        path: "tour-category",
        name: "tour-category",
        component: TourPackageCategoriesAdminView,
      },
      {
        path: "tour-category/:id_package_categories",
        name: "tour-category-detail",
        component: TourPackageCategoriesUpdateAdminView,
      },
      {
        path: "payment-method",
        name: "payment-method",
        component: PaymentMethodsAdminView,
      },
      {
        path: "payment-method/:id_payment_methods",
        name: "payment-method-detail",
        component: PaymentMethodsUpdateAdminView,
      },
      {
        path: "verify-agent",
        name: "verify-agent",
        component: TourAgentAdminView,
      },
      {
        path: "verify-tour-destination",
        name: "verify-tour-destination",
        component: TourDestinationRequestAdminView,
      },

      //Tour Agent
      {
        path: "tour-agent-profile",
        name: "tour-agent-profile",
        component: TourAgentProfileAgentView,
      },
      {
        path: "tour-destination-request",
        name: "tour-destination-request",
        component: TourDestinationRequestAgentView,
      },
      {
        path: "tour-package",
        name: "tour-package",
        component: TourPackageAgentView,
      },
      {
        path: "tour-package/:id_tour_packages",
        name: "tour-package-see",
        component: TourPackageDetailPriceAgentView,
      },
      {
        path: "tour-package-price/:id_package_prices",
        name: "tour-package-price-see",
        component: TourPackagePriceUpdateAgentView,
      },
      {
        path: "tour-package-detail/:id_package_details",
        name: "tour-package-detail-see",
        component: TourPackageFacilitiesActivitiesAgentView,
      },
      {
        path: "tour-activity-detail/:id_tour_activities",
        name: "tour-activity-detail-see",
        component: TourActivitiesAgentView,
      },
      {
        path: "tour-facility-detail/:id_package_facilities",
        name: "tour-facility-detail-see",
        component: TourFacilitiesAgentView,
      },
      {
        path: "manage-tour-guide",
        name: "manage-tour-guide",
        component: TourGuideAgentView,
      },
      {
        path: "guide-job-approval",
        name: "guide-job-approval",
        component: GuideJobApprovalAgentView,
      },
      {
        path: "guide-job-detail/:id_guide_selections/:id_guides",
        name: "guide-job-detail",
        component: GuideJobDetailAgentView,
      },
      {
        path: "verify-transactions",
        name: "verify-transactions",
        component: TransactionAgentView,
      },
      {
        path: "transactions/:id_orders",
        name: "transactions-see-agent",
        component: TransactionDetailAgentView,
      },
      {
        path: "pickup-fee",
        name: "pickup-fee",
        component: PickupFeeAgentView,
      },
      {
        path: "pickup-fee/:id_pickup_fees",
        name: "pickup-fee-detail",
        component: PickupFeeUpdateAgentView,
      },
      {
        path: "payment-detail",
        name: "payment-detail",
        component: PaymentMethodDetailAgentView,
      },
      {
        path: "payment-detail/:id_payment_method_details",
        name: "payment-detail-detail",
        component: PaymentMethodDetailsUpdateAgentView,
      },

      //Tour Guide
      {
        path: "tour-guide-profile",
        name: "tour-guide-profile",
        component: GuideProfileGuideView,
      },
      {
        path: "job-offer",
        name: "job-offer",
        component: GuideJobApprovalGuideView,
      },
      {
        path: "job-offer-detail/:id_guide_selections/:id_guides",
        name: "job-offer-detail",
        component: GuideJobDetailGuideView,
      },
      {
        path: "guide-destination",
        name: "guide-destination",
        component: GuideDestinationGuideView,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: PageNotFoundView,
  },
];

const scrollBehavior = (to, from, savedPosition) => {
  return savedPosition || to.meta?.scrollPos || { top: 0, left: 0 }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
  linkExactActiveClass: "active",
})

router.beforeEach((to, from, next) => {
  console.log('window.scrollY:', window.scrollY)
  from.meta?.scrollPos && (from.meta.scrollPos.top = window.scrollY)
  console.log('from:\t', from.name, '\t', from.meta?.scrollPos)
  console.log('to:\t\t', to.name, '\t', to.meta?.scrollPos)
  return next()
})

export default router;
