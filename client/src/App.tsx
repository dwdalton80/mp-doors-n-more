/*
 * App.tsx — MP Doors & More
 * Routes: Home, About, Products, Contact
 * Layout: Navbar (fixed) + page content + Footer
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDoors from "./pages/ProductDoors";
import ProductWindows from "./pages/ProductWindows";
import ProductFlooring from "./pages/ProductFlooring";
import ProductSiding from "./pages/ProductSiding";
import ProductTrim from "./pages/ProductTrim";
import InteriorDoorsInStock from "./pages/InteriorDoorsInStock";
import ExteriorDoorsInStock from "./pages/ExteriorDoorsInStock";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        <Route path="/products/doors" component={ProductDoors} />
        <Route path="/products/windows" component={ProductWindows} />
        <Route path="/products/flooring" component={ProductFlooring} />
        <Route path="/products/siding" component={ProductSiding} />
        <Route path="/products/trim" component={ProductTrim} />
        <Route path="/interior-doors-in-stock" component={InteriorDoorsInStock} />
        <Route path="/exterior-doors-in-stock" component={ExteriorDoorsInStock} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
