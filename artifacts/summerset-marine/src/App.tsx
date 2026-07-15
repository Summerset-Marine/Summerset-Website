import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import HomePage from "@/pages/index";
import AboutPage from "@/pages/about";
import LocationsPage from "@/pages/locations";
import CareersPage from "@/pages/careers";
import ConsultationPage from "@/pages/consultation";
import ContactPage from "@/pages/contact";
import ServiceRequestPage from "@/pages/service-request";

import PermanentPiersPage from "@/pages/products/permanent-piers/index";
import AllSeasonsHDPage from "@/pages/products/permanent-piers/all-seasons-hd";
import AllSeasonsPage from "@/pages/products/permanent-piers/all-seasons";
import ClassicPierPage from "@/pages/products/permanent-piers/classic";
import MinimalistPierPage from "@/pages/products/permanent-piers/minimalist";
import CommercialPierPage from "@/pages/products/permanent-piers/commercial";

import SeasonalSystemsPage from "@/pages/products/seasonal";
import AccessoriesPage from "@/pages/products/accessories";

import LiftsPage from "@/pages/products/lifts/index";
import BuiltInLiftsPage from "@/pages/products/lifts/built-in";
import StandaloneLiftsPage from "@/pages/products/lifts/standalone";
import PwcLiftsPage from "@/pages/products/lifts/pwc";
import LiftInventoryPage from "@/pages/products/lifts/inventory";

import MarineContractingPage from "@/pages/services/marine-contracting";
import ResidentialServicesPage from "@/pages/services/residential";
import RepairsPage from "@/pages/services/repairs";

import PermanentVsSeasonalPage from "@/pages/resources/permanent-vs-seasonal";
import PierCostPage from "@/pages/resources/what-does-a-pier-cost";
import InstallationProcessPage from "@/pages/resources/installation-process";
import WhatToExpectPage from "@/pages/resources/what-to-expect";
import FaqPage from "@/pages/resources/faq";

import BlogIndexPage from "@/pages/blog/index";
import BlogPostPage from "@/pages/blog/post";

import LakeGenevaPage from "@/pages/markets/lake-geneva/index";
import GenevaLakePage from "@/pages/markets/lake-geneva/geneva-lake";
import LakeGenevaProjectsPage from "@/pages/markets/lake-geneva/projects";
import LakeGenevaTestimonialsPage from "@/pages/markets/lake-geneva/testimonials";
import LakeGenevaContactPage from "@/pages/markets/lake-geneva/contact";

import OconomowocPage from "@/pages/markets/oconomowoc/index";
import OkaucheeLakePage from "@/pages/markets/oconomowoc/okauchee-lake";
import LacLaBellePage from "@/pages/markets/oconomowoc/lac-la-belle";
import NagawickaLakePage from "@/pages/markets/oconomowoc/nagawicka-lake";
import BeaverLakePage from "@/pages/markets/oconomowoc/beaver-lake";
import OconomowocProjectsPage from "@/pages/markets/oconomowoc/projects";
import OconomowocTestimonialsPage from "@/pages/markets/oconomowoc/testimonials";
import OconomowocContactPage from "@/pages/markets/oconomowoc/contact";

import DoorCountyPage from "@/pages/markets/door-county/index";
import GreenBayPage from "@/pages/markets/door-county/green-bay";
import SturgeonBayPage from "@/pages/markets/door-county/sturgeon-bay";
import LakeMichiganPage from "@/pages/markets/door-county/lake-michigan";
import DoorCountyProjectsPage from "@/pages/markets/door-county/projects";
import DoorCountyTestimonialsPage from "@/pages/markets/door-county/testimonials";
import DoorCountyContactPage from "@/pages/markets/door-county/contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/locations" component={LocationsPage} />
      <Route path="/careers" component={CareersPage} />
      <Route path="/consultation" component={ConsultationPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/service-request" component={ServiceRequestPage} />

      <Route path="/products/permanent-piers" component={PermanentPiersPage} />
      <Route path="/products/permanent-piers/all-seasons-hd" component={AllSeasonsHDPage} />
      <Route path="/products/permanent-piers/all-seasons" component={AllSeasonsPage} />
      <Route path="/products/permanent-piers/classic" component={ClassicPierPage} />
      <Route path="/products/permanent-piers/minimalist" component={MinimalistPierPage} />
      <Route path="/products/permanent-piers/commercial" component={CommercialPierPage} />

      <Route path="/products/seasonal" component={SeasonalSystemsPage} />
      <Route path="/products/accessories" component={AccessoriesPage} />

      <Route path="/products/lifts" component={LiftsPage} />
      <Route path="/products/lifts/built-in" component={BuiltInLiftsPage} />
      <Route path="/products/lifts/standalone" component={StandaloneLiftsPage} />
      <Route path="/products/lifts/pwc" component={PwcLiftsPage} />
      <Route path="/products/lifts/inventory" component={LiftInventoryPage} />

      <Route path="/services/marine-contracting" component={MarineContractingPage} />
      <Route path="/services/residential" component={ResidentialServicesPage} />
      <Route path="/services/repairs" component={RepairsPage} />

      <Route path="/resources/permanent-vs-seasonal" component={PermanentVsSeasonalPage} />
      <Route path="/resources/what-does-a-pier-cost" component={PierCostPage} />
      <Route path="/resources/installation-process" component={InstallationProcessPage} />
      <Route path="/resources/what-to-expect" component={WhatToExpectPage} />
      <Route path="/resources/faq" component={FaqPage} />

      <Route path="/blog" component={BlogIndexPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />

      <Route path="/markets/lake-geneva" component={LakeGenevaPage} />
      <Route path="/markets/lake-geneva/geneva-lake" component={GenevaLakePage} />
      <Route path="/markets/lake-geneva/projects" component={LakeGenevaProjectsPage} />
      <Route path="/markets/lake-geneva/testimonials" component={LakeGenevaTestimonialsPage} />
      <Route path="/markets/lake-geneva/contact" component={LakeGenevaContactPage} />

      <Route path="/markets/oconomowoc" component={OconomowocPage} />
      <Route path="/markets/oconomowoc/okauchee-lake" component={OkaucheeLakePage} />
      <Route path="/markets/oconomowoc/lac-la-belle" component={LacLaBellePage} />
      <Route path="/markets/oconomowoc/nagawicka-lake" component={NagawickaLakePage} />
      <Route path="/markets/oconomowoc/beaver-lake" component={BeaverLakePage} />
      <Route path="/markets/oconomowoc/projects" component={OconomowocProjectsPage} />
      <Route path="/markets/oconomowoc/testimonials" component={OconomowocTestimonialsPage} />
      <Route path="/markets/oconomowoc/contact" component={OconomowocContactPage} />

      <Route path="/markets/door-county" component={DoorCountyPage} />
      <Route path="/markets/door-county/green-bay" component={GreenBayPage} />
      <Route path="/markets/door-county/sturgeon-bay" component={SturgeonBayPage} />
      <Route path="/markets/door-county/lake-michigan" component={LakeMichiganPage} />
      <Route path="/markets/door-county/projects" component={DoorCountyProjectsPage} />
      <Route path="/markets/door-county/testimonials" component={DoorCountyTestimonialsPage} />
      <Route path="/markets/door-county/contact" component={DoorCountyContactPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
