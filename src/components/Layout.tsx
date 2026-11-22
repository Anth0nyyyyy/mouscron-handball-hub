import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useReveal } from '@/hooks/use-reveal';

const Layout = ({ children }: { children: ReactNode }) => {
  useReveal();
  return (
    <>
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      <Header />
      <main id="contenu">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
