import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import Footer from './Footer';
import MobileHeader from '@/components/mobile/MobileHeader';
import MobileBottomTabs from '@/components/mobile/MobileBottomTabs';
import WaveAnimation from '../effects/WaveAnimation';

interface PageLayoutProps {
  children: ReactNode;
  waveIntensity?: 'low' | 'medium' | 'high';
}

const PageLayout = ({ 
  children, 
  waveIntensity = 'medium',
}: PageLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Golden Wave Background Effect */}
      <WaveAnimation intensity={waveIntensity} />
      
      {isMobile ? <MobileHeader /> : <Header />}

      {/* pt-14 for mobile (56px header), pt-24 for desktop */}
      <main className={`flex-1 relative z-10 ${isMobile ? 'pt-14 pb-16' : 'pt-24'}`}>
        {children}
      </main>

      <Footer />

      {isMobile && <MobileBottomTabs />}
    </div>
  );
};

export default PageLayout;
