import { Timeline } from "@/app/components/timeline/timeline";
import styles from "./timelinePortfolio.module.css";
import { useT } from "@/app/i18n-provider";

export function PortfolioTimeline() {
  const t = useT("PortfolioTimeline");
  const data = [
    {
      title: "2014",
      content: (
        <div key="timeline-2014">
          <p className="text-neutral-300 mb-4">{t("2014_title")}</p>
          <ul className="list-disc pl-5 text-sm text-neutral-400">
            <li key="2014-servers">
              ✔ {t("2014_servers")}
              <ul className={`${styles.ulStyles}`}>
                <li key="2014-credentials">
                    ▲ {t("2014_credentials")}
                  <ul className={`${styles.ulStyles}`}>
                    <li key="2014-cred-1">{t("2014_cred_1")}</li>
                    <li key="2014-cred-2">{t("2014_cred_2")}</li>
                    <li key="2014-cred-3">{t("2014_cred_3")}</li>
                    <li key="2014-cred-4">{t("2014_cred_4")}</li>
                  </ul>
                </li>
                <li key="2014-security">
                  ▲ {t("2014_security")}
                  <ul className={`${styles.ulStyles}`}>
                    <li key="2014-sec-1">{t("2014_sec_1")}</li>
                    <li key="2014-sec-2">{t("2014_sec_2")}</li>
                    <li key="2014-sec-3">{t("2014_sec_3")}</li>
                  </ul>
                </li>
                <li key="2014-networking">
                  ▲ {t("2014_networking")}
                  <ul className={`${styles.ulStyles}`}>
                    <li key="2014-net-1">{t("2014_net_1")}</li>
                    <li key="2014-net-2">{t("2014_net_2")}</li>
                    <li key="2014-net-3">{t("2014_net_3")}</li>
                    <li key="2014-net-4">{t("2014_net_4")}</li>
                    <li key="2014-net-5">{t("2014_net_5")}</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="list-disc pl-5 text-sm text-neutral-400">
            <li key="2014-database">
              ✔ {t("2014_database")}
              <ul className={`${styles.ulStyles}`}>
                <li key="2014-legacy">
                  ▲ {t("2014_legacy")}
                  <ul className={`${styles.ulStyles}`}>
                    <li key="2014-leg-1">{t("2014_leg_1")}</li>
                    <li key="2014-leg-2">{t("2014_leg_2")}</li>
                    <li key="2014-leg-3">{t("2014_leg_3")}</li>
                  </ul>
                </li>
                <li key="2014-migration">
                  ▲ {t("2014_migration")}
                  <ul className={`${styles.ulStyles}`}>
                    <li key="2014-mig-1">{t("2014_mig_1")}</li>
                    <li key="2014-mig-2">{t("2014_mig_2")}</li>
                    <li key="2014-mig-3">{t("2014_mig_3")}</li>
                  </ul>
                </li>
                <li key="2014-odoo">
                  ▲ {t("2014_odoo")}
                  <ul className={`${styles.ulStyles}`}>
                    <li key="2014-odoo-1">{t("2014_odoo_1")}</li>
                    <li key="2014-odoo-2">{t("2014_odoo_2")}</li>
                    <li key="2014-odoo-3">{t("2014_odoo_3")}</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "2017",
      content: (
        <div key="timeline-2017">
          <p className="text-neutral-300 mb-4">{t("2017_title")}</p>
          <ul className="list-disc pl-5 mt-1 text-sm text-neutral-400">
            <li key="2017-bigdata">
              ▲ {t("2017_bigdata")}
              <ul className={`${styles.ulStyles}`}>
                <li key="2017-bd-1">{t("2017_bd_1")}</li>
                <li key="2017-bd-2">{t("2017_bd_2")}</li>
                <li key="2017-bd-3">{t("2017_bd_3")}</li>
                <li key="2017-bd-4">{t("2017_bd_4")}</li>
              </ul>
            </li>
            <li key="2017-graphical">
              ▲ {t("2017_graphical")}
              <ul className={`${styles.ulStyles}`}>
                <li key="2017-gr-1">{t("2017_gr_1")}</li>
                <li key="2017-gr-2">{t("2017_gr_2")}</li>
                <li key="2017-gr-3">{t("2017_gr_3")}</li>
              </ul>
            </li>
            <li key="2017-market">
              ▲ {t("2017_market")}
              <ul className={`${styles.ulStyles}`}>
                <li key="2017-mk-1">{t("2017_mk_1")}</li>
                <li key="2017-mk-2">{t("2017_mk_2")}</li>
                <li key="2017-mk-3">{t("2017_mk_3")}</li>
              </ul>
            </li>
            <li key="2017-governance">
              ▲ {t("2017_governance")}
              <ul className={`${styles.ulStyles}`}>
                <li key="2017-gov-1">{t("2017_gov_1")}</li>
                <li key="2017-gov-2">{t("2017_gov_2")}</li>
                <li key="2017-gov-3">{t("2017_gov_3")}</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "2018",
      content: (
        <div key="timeline-2018">
          <p className="text-neutral-300 mb-4">{t("2018_title")}</p>
          <ul className="list-disc pl-5 text-sm text-neutral-400">
            <li key="2018-troubleshooting">
              ▲ {t("2018_troubleshooting")}
              <ul className={`${styles.ulStyles}`}>
                <li key="2018-tr-1">{t("2018_tr_1")}</li>
                <li key="2018-tr-2">{t("2018_tr_2")}</li>
                <li key="2018-tr-3">{t("2018_tr_3")}</li>
              </ul>
            </li>
            <li key="2018-customer">
              ▲ {t("2018_customer")}
              <ul className={`${styles.ulStyles}`}>
                <li key="2018-cust-1">{t("2018_cust_1")}</li>
                <li key="2018-cust-2">{t("2018_cust_2")}</li>
                <li key="2018-cust-3">{t("2018_cust_3")}</li>
              </ul>
            </li>
            <li key="2018-routing">
              ▲ {t("2018_routing")}
              <ul className={`${styles.ulStyles}`}>
                <li key="2018-rt-1">{t("2018_rt_1")}</li>
                <li key="2018-rt-2">{t("2018_rt_2")}</li>
                <li key="2018-rt-3">{t("2018_rt_3")}</li>
              </ul>
            </li>
            <li key="2018-security">
              ▲ {t("2018_security")}
              <ul className={`${styles.ulStyles}`}>
                <li key="2018-sec-1">{t("2018_sec_1")}</li>
                <li key="2018-sec-2">{t("2018_sec_2")}</li>
                <li key="2018-sec-3">{t("2018_sec_3")}</li>
              </ul>
            </li>
            <li key="2018-testing">
              ▲ {t("2018_testing")}
              <ul className={`${styles.ulStyles}`}>
                <li key="2018-test-1">{t("2018_test_1")}</li>
                <li key="2018-test-2">{t("2018_test_2")}</li>
                <li key="2018-test-3">{t("2018_test_3")}</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
    },

    {
      title: "Present",
      content: (
        <div key="timeline-present" style={{ color: 'var(--foreground)' }}>
          <h3 style={{ color: 'var(--primary)' }}>{t("present_title")}</h3>
          <ul className="list-disc pl-5 text-sm md:text-base space-y-2" style={{ color: 'var(--foreground)' }}>
            <li key="present-degree">
              {t("present_degree_pre")}<strong>{t("present_degree_bold")}</strong>{t("present_degree_post")}
            </li>
            <li key="present-uab">
              {t("present_uab_pre")}<strong>{t("present_uab_bold")}</strong>{t("present_uab_post")}
            </li>
            <li key="present-google">
              {t("present_google_pre")}<strong>{t("present_google_bold")}</strong>{t("present_google_post")}
            </li>
            <li key="present-openwebinars">
              {t("present_openwebinars_pre")}<strong>{t("present_openwebinars_bold")}</strong>{t("present_openwebinars_post")}
            </li>
            <li key="present-freelance">
              {t("present_freelance_pre")}<strong>{t("present_freelance_bold")}</strong>{t("present_freelance_post")}
            </li>
            <li key="present-projects">
              {t("present_projects_pre")}<strong>{t("present_projects_bold")}</strong>{t("present_projects_post")}
            </li>
            <li key="present-taller-agencia">
              {t("present_taller_pre")}<strong>{t("present_taller_bold")}</strong>{t("present_taller_post")}
            </li>
            <li key="present-ecosystem">
              {t("present_ecosystem_pre")}<strong>{t("present_ecosystem_bold1")}</strong>{t("present_ecosystem_mid1")}<strong>{t("present_ecosystem_bold2")}</strong>{t("present_ecosystem_mid2")}<strong>{t("present_ecosystem_bold3")}</strong>{t("present_ecosystem_post")}
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
