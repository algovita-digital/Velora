import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import TrustStrip from "@/components/TrustStrip";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Page() {
  return (
    <>
      <span id="top" />
      <Header />
      <main>
        <Hero />
        <Categories />
        <ProductGrid />
        <TrustStrip />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
