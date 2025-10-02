import MainHeader from "@/components/partials/header/MainHeader";
import AppDownload from "@/components/pages/home/AppDownload";
import AnimatedCarousel from "@/components/partials/carousel/AnimatedCarousel";
import Partners from "@/components/pages/home/Partners";
import Skins from "@/components/pages/home/Skins";
import RoadMap from "@/components/pages/home/RoadMap";
import FAQ from "@/components/pages/home/FAQ";
import ExchangeListings from "@/components/pages/home/ExchangeListings";
import MainLayout from "@/components/layouts/MainLayout";
import Page from "@/components/layouts/Page";
import ScrollAnimatedCircle from "@/components/animation/FloatingCircle";

export default function Home() {
  const pcPositions = [
    { x: 75, y: 55, size: 100 },
    { x: 100, y: 100, size: 80 },
    { x: 15, y: 50, size: 100 },
    { x: 50, y: 60, size: 80 },
    { x: 50, y: 55, size: 170 },
    { x: 0, y: 30, size: 80 },
    { x: 0, y: 100, size: 80 },
    { x: 85, y: 45, size: 90 },
  ];

  const mobilePositions = [
    { x: 100, y: 60, size: 100 },
    { x: 80, y: 100, size: 100 },
    { x: 50, y: 150, size: 100 },
    { x: 53, y: 50, size: 200 },
    { x: 40, y: 60, size: 100 },
    { x: 100, y: 100, size: 100 },
    { x: 110, y: 80, size: 100 },
    { x: 90, y: 120, size: 100 },
  ];

  return (
    <MainLayout>
      <ScrollAnimatedCircle
        pcPositions={pcPositions}
        mobilePositions={mobilePositions}
      />
      <Page
        circlePosition={pcPositions[0]}
        id="home"
        className={`overflow-visible`}
      >
        <MainHeader />
      </Page>
      <Page circlePosition={pcPositions[1]}>
        <ExchangeListings />
      </Page>
      <Page circlePosition={pcPositions[2]}>
        <AppDownload />
      </Page>
      <Page circlePosition={pcPositions[3]}>
        <AnimatedCarousel />
      </Page>
      <Page circlePosition={pcPositions[4]}>
        <Partners />
      </Page>
      <Page circlePosition={pcPositions[5]}>
        <Skins />
      </Page>
      <Page circlePosition={pcPositions[6]}>
        <RoadMap />
      </Page>
      <Page id="faq" circlePosition={pcPositions[7]}>
        <FAQ />
      </Page>
    </MainLayout>
  );
}
