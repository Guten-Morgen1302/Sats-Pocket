import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./pages/Landing";
import Wallet from "./pages/Wallet";
import Split from "./pages/Split";
import Insights from "./pages/Insights";
import HowItWorks from "./pages/HowItWorks";
import Dashboard from "./pages/Dashboard";
import Particles from "./components/shared/Particles";
import { ThemeProvider } from "./context/ThemeContext";
import { WalletProvider } from "./context/WalletContext";
import { TooltipProvider } from "@/components/ui/tooltip";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/split" component={Split} />
      <Route path="/insights" component={Insights} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

const AppContent = () => {
  return (
    <>
      <Toaster />
      <div className="min-h-screen relative dark hexagon-bg">
        <Particles />
        <Navbar />
        <Router />
        <Footer />
      </div>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <WalletProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </WalletProvider>
    </ThemeProvider>
  );
};

export default App;
