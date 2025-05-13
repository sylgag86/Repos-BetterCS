import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import FundingRecommendation from "@/pages/FundingRecommendation";
import FundingApplication from "@/pages/FundingApplication";
import ApplicationSuccess from "@/pages/ApplicationSuccess";
import SitemapFooter from "@/components/SitemapFooter";

function AppRoutes() {
  // Only used to conditionally display footer
  const isHomePage = window.location.pathname === "/";
  
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        
        {/* Static HTML pages are served directly from public folder */}
        <Route path="/betterlist-100">
          {() => {
            window.location.href = "/betterlist-100.html";
            return null;
          }}
        </Route>
        
        {/* Lender profile pages */}
        <Route path="/lenders/fundgrow">
          {() => {
            window.location.href = "/lenders/fundgrow.html";
            return null;
          }}
        </Route>
        <Route path="/lenders/capitalprime">
          {() => {
            window.location.href = "/lenders/fundgrow.html"; // Using fundgrow as a template for now
            return null;
          }}
        </Route>
        <Route path="/lenders/lendingcircle">
          {() => {
            window.location.href = "/lenders/fundgrow.html"; // Using fundgrow as a template for now
            return null;
          }}
        </Route>
        <Route path="/lenders/rewardone">
          {() => {
            window.location.href = "/lenders/fundgrow.html"; // Using fundgrow as a template for now
            return null;
          }}
        </Route>
        
        {/* Resource pages */}
        <Route path="/resources">
          {() => {
            window.location.href = "/resources/index.html";
            return null;
          }}
        </Route>
        <Route path="/guides">
          {() => {
            window.location.href = "/resources/blog.html";
            return null;
          }}
        </Route>
        <Route path="/blog">
          {() => {
            window.location.href = "/resources/blog.html";
            return null;
          }}
        </Route>
        <Route path="/lenders">
          {() => {
            window.location.href = "/betterlist-100.html"; // Using betterlist as our lenders directory for now
            return null;
          }}
        </Route>

        {/* Funding Funnel */}
        <Route path="/funding-funnel">
          {() => {
            window.location.href = "/funding-funnel/index.html";
            return null;
          }}
        </Route>
        
        {/* Funding category pages */}
        <Route path="/sba-loans" component={NotFound} />
        <Route path="/credit-cards" component={NotFound} />
        <Route path="/bad-credit" component={NotFound} />
        <Route path="/fast-approval" component={NotFound} />
        
        {/* Funding funnel result pages */}
        <Route path="/apply-now">
          {() => {
            window.location.href = "/apply-now.html";
            return null;
          }}
        </Route>
        
        <Route path="/credit-repair">
          {() => {
            window.location.href = "/credit-repair/index.html";
            return null;
          }}
        </Route>
        
        <Route path="/credit-repair/join">
          {() => {
            window.location.href = "/credit-repair/join.html";
            return null;
          }}
        </Route>
        
        <Route path="/credit-repair/signup">
          {() => {
            window.location.href = "/credit-repair/signup.html";
            return null;
          }}
        </Route>
        
        <Route path="/ebook-offer">
          {() => {
            window.location.href = "/ebook-offer.html";
            return null;
          }}
        </Route>
        
        {/* DIY Credit Repair Pages */}
        <Route path="/diy-credit/start">
          {() => {
            window.location.href = "/diy-credit/start.html";
            return null;
          }}
        </Route>
        
        <Route path="/diy-credit/checkout">
          {() => {
            window.location.href = "/diy-credit/checkout.html";
            return null;
          }}
        </Route>
        
        <Route path="/diy-credit/confirmation">
          {() => {
            window.location.href = "/diy-credit/confirmation.html";
            return null;
          }}
        </Route>
        
        {/* AI Funding Recommendation Tool */}
        <Route path="/funding-recommendation" component={FundingRecommendation} />
        
        {/* Gamified Funding Application Process */}
        <Route path="/apply" component={FundingApplication} />
        <Route path="/application-success" component={ApplicationSuccess} />

        {/* Personal & Business Funding pages */}
        <Route path="/personal-funding">
          {() => {
            window.location.href = "/personal-funding/index.html";
            return null;
          }}
        </Route>
        <Route path="/business-funding">
          {() => {
            window.location.href = "/business-funding/index.html";
            return null;
          }}
        </Route>
        <Route path="/reviews">
          {() => {
            window.location.href = "/#testimonials";
            return null;
          }}
        </Route>
        
        <Route path="/success-stories">
          {() => {
            window.location.href = "/#testimonials";
            return null;
          }}
        </Route>
        <Route path="/contact">
          {() => {
            window.location.href = "/contact/index.html";
            return null;
          }}
        </Route>
        
        <Route path="/privacy-policy">
          {() => {
            window.location.href = "/privacy-policy.html";
            return null;
          }}
        </Route>

        <Route path="/calculator">
          {() => {
            window.location.href = "/resources/financial-calculator.html";
            return null;
          }}
        </Route>
        
        {/* Catch-all route */}
        <Route component={NotFound} />
      </Switch>
      
      {/* Footer on all pages except home (home already has one) */}
      {!isHomePage && <SitemapFooter />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRoutes />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
