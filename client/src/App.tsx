import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function Router() {
  return (
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
      
      {/* These routes will show the NotFound page until we implement them */}
      <Route path="/personal-funding" component={NotFound} />
      <Route path="/business-funding" component={NotFound} />
      <Route path="/reviews" component={NotFound} />
      <Route path="/guides" component={NotFound} />
      <Route path="/contact" component={NotFound} />
      
      {/* Catch-all route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
