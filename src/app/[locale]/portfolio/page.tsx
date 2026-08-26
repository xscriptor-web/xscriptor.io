"use client";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { PortfolioTimeline } from "@/app/components/timeline/timelinePortfolio";
import { FlowFieldBg } from "@/app/components/xcomponents/FlowFieldBg";
import { XTitle } from "@/app/components/Xtexts";
import Footer from "@/app/components/footer/footer";

export default function Portfolio() {
  const t = useT("PortfolioPage");
  usePageMeta(t("title"));

  return (
    <>
      <FlowFieldBg />
      <div className="relative" style={{ zIndex: 1 }}>
      <XTitle em={t("titleEm")}>{t("title")}</XTitle>
      <p className='pb-10'>
        <span className="inline lg:block text-xl text-right">{t("subtitle1")} <em>{t("subtitle1Em")} </em></span>
        <span className="inline lg:block text-xl text-right"> {t("subtitle2")} <em>{t("subtitle2Em")}</em></span>
      </p>
      <div className="animate-fade-in-up">
        <PortfolioTimeline />
      </div>
      <Footer />
    </div>
    </>
  );
}
