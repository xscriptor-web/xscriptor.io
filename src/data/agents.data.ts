export type AgentDef = {
  nameKey: string;
  descKey: string;
  featured?: boolean;
};

export type AgentGroup = {
  id: string;
  name: string;
  color: string;
  agents: AgentDef[];
  featured?: boolean;
};

export const AGENT_GROUPS: AgentGroup[] = [
  {
    id: "mega",
    name: "Mega Agents",
    color: "#FFD700",
    featured: true,
    agents: [
      { nameKey: "agents.groups.mega.names.0", descKey: "agents.groups.mega.agents.0", featured: true },
      { nameKey: "agents.groups.mega.names.1", descKey: "agents.groups.mega.agents.1", featured: true },
      { nameKey: "agents.groups.mega.names.2", descKey: "agents.groups.mega.agents.2", featured: true },
      { nameKey: "agents.groups.mega.names.3", descKey: "agents.groups.mega.agents.3", featured: true },
    ],
  },
  {
    id: "general",
    name: "General",
    color: "#4328a8",
    agents: [
      { nameKey: "agents.groups.general.names.0", descKey: "agents.groups.general.agents.0" },
      { nameKey: "agents.groups.general.names.1", descKey: "agents.groups.general.agents.1" },
      { nameKey: "agents.groups.general.names.2", descKey: "agents.groups.general.agents.2" },
      { nameKey: "agents.groups.general.names.3", descKey: "agents.groups.general.agents.3" },
      { nameKey: "agents.groups.general.names.4", descKey: "agents.groups.general.agents.4" },
      { nameKey: "agents.groups.general.names.5", descKey: "agents.groups.general.agents.5" },
      { nameKey: "agents.groups.general.names.6", descKey: "agents.groups.general.agents.6" },
      { nameKey: "agents.groups.general.names.7", descKey: "agents.groups.general.agents.7" },
      { nameKey: "agents.groups.general.names.8", descKey: "agents.groups.general.agents.8" },
      { nameKey: "agents.groups.general.names.9", descKey: "agents.groups.general.agents.9" },
      { nameKey: "agents.groups.general.names.10", descKey: "agents.groups.general.agents.10" },
      { nameKey: "agents.groups.general.names.11", descKey: "agents.groups.general.agents.11" },
    ],
  },
  {
    id: "web-security",
    name: "Web / Security",
    color: "#ef4444",
    agents: [
      { nameKey: "agents.groups.web-security.names.0", descKey: "agents.groups.web-security.agents.0" },
      { nameKey: "agents.groups.web-security.names.1", descKey: "agents.groups.web-security.agents.1" },
      { nameKey: "agents.groups.web-security.names.2", descKey: "agents.groups.web-security.agents.2" },
      { nameKey: "agents.groups.web-security.names.3", descKey: "agents.groups.web-security.agents.3" },
      { nameKey: "agents.groups.web-security.names.4", descKey: "agents.groups.web-security.agents.4" },
      { nameKey: "agents.groups.web-security.names.5", descKey: "agents.groups.web-security.agents.5" },
      { nameKey: "agents.groups.web-security.names.6", descKey: "agents.groups.web-security.agents.6" },
    ],
  },
  {
    id: "web-architecture",
    name: "Web / Architecture",
    color: "#8b5cf6",
    agents: [
      { nameKey: "agents.groups.web-architecture.names.0", descKey: "agents.groups.web-architecture.agents.0" },
      { nameKey: "agents.groups.web-architecture.names.1", descKey: "agents.groups.web-architecture.agents.1" },
      { nameKey: "agents.groups.web-architecture.names.2", descKey: "agents.groups.web-architecture.agents.2" },
      { nameKey: "agents.groups.web-architecture.names.3", descKey: "agents.groups.web-architecture.agents.3" },
      { nameKey: "agents.groups.web-architecture.names.4", descKey: "agents.groups.web-architecture.agents.4" },
    ],
  },
  {
    id: "web-frontend",
    name: "Web / Frontend",
    color: "#10b981",
    agents: [
      { nameKey: "agents.groups.web-frontend.names.0", descKey: "agents.groups.web-frontend.agents.0" },
      { nameKey: "agents.groups.web-frontend.names.1", descKey: "agents.groups.web-frontend.agents.1" },
      { nameKey: "agents.groups.web-frontend.names.2", descKey: "agents.groups.web-frontend.agents.2" },
      { nameKey: "agents.groups.web-frontend.names.3", descKey: "agents.groups.web-frontend.agents.3" },
      { nameKey: "agents.groups.web-frontend.names.4", descKey: "agents.groups.web-frontend.agents.4" },
      { nameKey: "agents.groups.web-frontend.names.5", descKey: "agents.groups.web-frontend.agents.5" },
      { nameKey: "agents.groups.web-frontend.names.6", descKey: "agents.groups.web-frontend.agents.6" },
    ],
  },
  {
    id: "web-backend",
    name: "Web / Backend",
    color: "#f59e0b",
    agents: [
      { nameKey: "agents.groups.web-backend.names.0", descKey: "agents.groups.web-backend.agents.0" },
      { nameKey: "agents.groups.web-backend.names.1", descKey: "agents.groups.web-backend.agents.1" },
      { nameKey: "agents.groups.web-backend.names.2", descKey: "agents.groups.web-backend.agents.2" },
      { nameKey: "agents.groups.web-backend.names.3", descKey: "agents.groups.web-backend.agents.3" },
      { nameKey: "agents.groups.web-backend.names.4", descKey: "agents.groups.web-backend.agents.4" },
      { nameKey: "agents.groups.web-backend.names.5", descKey: "agents.groups.web-backend.agents.5" },
      { nameKey: "agents.groups.web-backend.names.6", descKey: "agents.groups.web-backend.agents.6" },
    ],
  },
  {
    id: "languages",
    name: "Languages",
    color: "#3b82f6",
    agents: [
      { nameKey: "agents.groups.languages.names.0", descKey: "agents.groups.languages.agents.0" },
      { nameKey: "agents.groups.languages.names.1", descKey: "agents.groups.languages.agents.1" },
      { nameKey: "agents.groups.languages.names.2", descKey: "agents.groups.languages.agents.2" },
      { nameKey: "agents.groups.languages.names.3", descKey: "agents.groups.languages.agents.3" },
      { nameKey: "agents.groups.languages.names.4", descKey: "agents.groups.languages.agents.4" },
      { nameKey: "agents.groups.languages.names.5", descKey: "agents.groups.languages.agents.5" },
    ],
  },
  {
    id: "mobile",
    name: "Mobile",
    color: "#0891b2",
    agents: [
      { nameKey: "agents.groups.mobile.names.0", descKey: "agents.groups.mobile.agents.0" },
      { nameKey: "agents.groups.mobile.names.1", descKey: "agents.groups.mobile.agents.1" },
      { nameKey: "agents.groups.mobile.names.2", descKey: "agents.groups.mobile.agents.2" },
      { nameKey: "agents.groups.mobile.names.3", descKey: "agents.groups.mobile.agents.3" },
      { nameKey: "agents.groups.mobile.names.4", descKey: "agents.groups.mobile.agents.4" },
      { nameKey: "agents.groups.mobile.names.5", descKey: "agents.groups.mobile.agents.5" },
    ],
  },
  {
    id: "data-ml",
    name: "Data & ML",
    color: "#7c3aed",
    agents: [
      { nameKey: "agents.groups.data-ml.names.0", descKey: "agents.groups.data-ml.agents.0" },
      { nameKey: "agents.groups.data-ml.names.1", descKey: "agents.groups.data-ml.agents.1" },
      { nameKey: "agents.groups.data-ml.names.2", descKey: "agents.groups.data-ml.agents.2" },
      { nameKey: "agents.groups.data-ml.names.3", descKey: "agents.groups.data-ml.agents.3" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud",
    color: "#0284c7",
    agents: [
      { nameKey: "agents.groups.cloud.names.0", descKey: "agents.groups.cloud.agents.0" },
      { nameKey: "agents.groups.cloud.names.1", descKey: "agents.groups.cloud.agents.1" },
      { nameKey: "agents.groups.cloud.names.2", descKey: "agents.groups.cloud.agents.2" },
      { nameKey: "agents.groups.cloud.names.3", descKey: "agents.groups.cloud.agents.3" },
      { nameKey: "agents.groups.cloud.names.4", descKey: "agents.groups.cloud.agents.4" },
      { nameKey: "agents.groups.cloud.names.5", descKey: "agents.groups.cloud.agents.5" },
      { nameKey: "agents.groups.cloud.names.6", descKey: "agents.groups.cloud.agents.6" },
    ],
  },
  {
    id: "testing",
    name: "Testing",
    color: "#059669",
    agents: [
      { nameKey: "agents.groups.testing.names.0", descKey: "agents.groups.testing.agents.0" },
      { nameKey: "agents.groups.testing.names.1", descKey: "agents.groups.testing.agents.1" },
      { nameKey: "agents.groups.testing.names.2", descKey: "agents.groups.testing.agents.2" },
      { nameKey: "agents.groups.testing.names.3", descKey: "agents.groups.testing.agents.3" },
      { nameKey: "agents.groups.testing.names.4", descKey: "agents.groups.testing.agents.4" },
    ],
  },
  {
    id: "graphql",
    name: "GraphQL",
    color: "#9333ea",
    agents: [
      { nameKey: "agents.groups.graphql.names.0", descKey: "agents.groups.graphql.agents.0" },
    ],
  },
  {
    id: "embedded",
    name: "Embedded",
    color: "#dc2626",
    agents: [
      { nameKey: "agents.groups.embedded.names.0", descKey: "agents.groups.embedded.agents.0" },
      { nameKey: "agents.groups.embedded.names.1", descKey: "agents.groups.embedded.agents.1" },
      { nameKey: "agents.groups.embedded.names.2", descKey: "agents.groups.embedded.agents.2" },
    ],
  },
  {
    id: "game-dev",
    name: "Game Dev",
    color: "#d97706",
    agents: [
      { nameKey: "agents.groups.game-dev.names.0", descKey: "agents.groups.game-dev.agents.0" },
      { nameKey: "agents.groups.game-dev.names.1", descKey: "agents.groups.game-dev.agents.1" },
    ],
  },
  {
    id: "security-recon",
    name: "Security / Recon",
    color: "#b91c1c",
    agents: [
      { nameKey: "agents.groups.security-recon.names.0", descKey: "agents.groups.security-recon.agents.0" },
      { nameKey: "agents.groups.security-recon.names.1", descKey: "agents.groups.security-recon.agents.1" },
      { nameKey: "agents.groups.security-recon.names.2", descKey: "agents.groups.security-recon.agents.2" },
    ],
  },
  {
    id: "web-pentest",
    name: "Security / Web Pentest",
    color: "#dc2626",
    agents: [
      { nameKey: "agents.groups.web-pentest.names.0", descKey: "agents.groups.web-pentest.agents.0" },
      { nameKey: "agents.groups.web-pentest.names.1", descKey: "agents.groups.web-pentest.agents.1" },
      { nameKey: "agents.groups.web-pentest.names.2", descKey: "agents.groups.web-pentest.agents.2" },
      { nameKey: "agents.groups.web-pentest.names.3", descKey: "agents.groups.web-pentest.agents.3" },
      { nameKey: "agents.groups.web-pentest.names.4", descKey: "agents.groups.web-pentest.agents.4" },
      { nameKey: "agents.groups.web-pentest.names.5", descKey: "agents.groups.web-pentest.agents.5" },
      { nameKey: "agents.groups.web-pentest.names.6", descKey: "agents.groups.web-pentest.agents.6" },
      { nameKey: "agents.groups.web-pentest.names.7", descKey: "agents.groups.web-pentest.agents.7" },
      { nameKey: "agents.groups.web-pentest.names.8", descKey: "agents.groups.web-pentest.agents.8" },
      { nameKey: "agents.groups.web-pentest.names.9", descKey: "agents.groups.web-pentest.agents.9" },
      { nameKey: "agents.groups.web-pentest.names.10", descKey: "agents.groups.web-pentest.agents.10" },
      { nameKey: "agents.groups.web-pentest.names.11", descKey: "agents.groups.web-pentest.agents.11" },
      { nameKey: "agents.groups.web-pentest.names.12", descKey: "agents.groups.web-pentest.agents.12" },
    ],
  },
  {
    id: "mobile-pentest",
    name: "Security / Mobile Pentest",
    color: "#991b1b",
    agents: [
      { nameKey: "agents.groups.mobile-pentest.names.0", descKey: "agents.groups.mobile-pentest.agents.0" },
      { nameKey: "agents.groups.mobile-pentest.names.1", descKey: "agents.groups.mobile-pentest.agents.1" },
      { nameKey: "agents.groups.mobile-pentest.names.2", descKey: "agents.groups.mobile-pentest.agents.2" },
    ],
  },
  {
    id: "desktop-exploitation",
    name: "Security / Desktop Exploitation",
    color: "#7f1d1d",
    agents: [
      { nameKey: "agents.groups.desktop-exploitation.names.0", descKey: "agents.groups.desktop-exploitation.agents.0" },
      { nameKey: "agents.groups.desktop-exploitation.names.1", descKey: "agents.groups.desktop-exploitation.agents.1" },
      { nameKey: "agents.groups.desktop-exploitation.names.2", descKey: "agents.groups.desktop-exploitation.agents.2" },
      { nameKey: "agents.groups.desktop-exploitation.names.3", descKey: "agents.groups.desktop-exploitation.agents.3" },
      { nameKey: "agents.groups.desktop-exploitation.names.4", descKey: "agents.groups.desktop-exploitation.agents.4" },
      { nameKey: "agents.groups.desktop-exploitation.names.5", descKey: "agents.groups.desktop-exploitation.agents.5" },
      { nameKey: "agents.groups.desktop-exploitation.names.6", descKey: "agents.groups.desktop-exploitation.agents.6" },
      { nameKey: "agents.groups.desktop-exploitation.names.7", descKey: "agents.groups.desktop-exploitation.agents.7" },
      { nameKey: "agents.groups.desktop-exploitation.names.8", descKey: "agents.groups.desktop-exploitation.agents.8" },
    ],
  },
  {
    id: "red-team",
    name: "Security / Red Team",
    color: "#b91c1c",
    agents: [
      { nameKey: "agents.groups.red-team.names.0", descKey: "agents.groups.red-team.agents.0" },
      { nameKey: "agents.groups.red-team.names.1", descKey: "agents.groups.red-team.agents.1" },
      { nameKey: "agents.groups.red-team.names.2", descKey: "agents.groups.red-team.agents.2" },
      { nameKey: "agents.groups.red-team.names.3", descKey: "agents.groups.red-team.agents.3" },
      { nameKey: "agents.groups.red-team.names.4", descKey: "agents.groups.red-team.agents.4" },
      { nameKey: "agents.groups.red-team.names.5", descKey: "agents.groups.red-team.agents.5" },
    ],
  },
  {
    id: "blue-team",
    name: "Security / Blue Team",
    color: "#1d4ed8",
    agents: [
      { nameKey: "agents.groups.blue-team.names.0", descKey: "agents.groups.blue-team.agents.0" },
      { nameKey: "agents.groups.blue-team.names.1", descKey: "agents.groups.blue-team.agents.1" },
      { nameKey: "agents.groups.blue-team.names.2", descKey: "agents.groups.blue-team.agents.2" },
      { nameKey: "agents.groups.blue-team.names.3", descKey: "agents.groups.blue-team.agents.3" },
      { nameKey: "agents.groups.blue-team.names.4", descKey: "agents.groups.blue-team.agents.4" },
      { nameKey: "agents.groups.blue-team.names.5", descKey: "agents.groups.blue-team.agents.5" },
      { nameKey: "agents.groups.blue-team.names.6", descKey: "agents.groups.blue-team.agents.6" },
      { nameKey: "agents.groups.blue-team.names.7", descKey: "agents.groups.blue-team.agents.7" },
    ],
  },
  {
    id: "purple-team",
    name: "Security / Purple Team",
    color: "#6b21a8",
    agents: [
      { nameKey: "agents.groups.purple-team.names.0", descKey: "agents.groups.purple-team.agents.0" },
      { nameKey: "agents.groups.purple-team.names.1", descKey: "agents.groups.purple-team.agents.1" },
    ],
  },
  {
    id: "ai-ml-security",
    name: "Security / AI & ML Security",
    color: "#7c3aed",
    agents: [
      { nameKey: "agents.groups.ai-ml-security.names.0", descKey: "agents.groups.ai-ml-security.agents.0" },
    ],
  },
  {
    id: "content",
    name: "Content",
    color: "#d97706",
    agents: [
      { nameKey: "agents.groups.content.names.0", descKey: "agents.groups.content.agents.0" },
      { nameKey: "agents.groups.content.names.1", descKey: "agents.groups.content.agents.1" },
      { nameKey: "agents.groups.content.names.2", descKey: "agents.groups.content.agents.2" },
      { nameKey: "agents.groups.content.names.3", descKey: "agents.groups.content.agents.3" },
      { nameKey: "agents.groups.content.names.4", descKey: "agents.groups.content.agents.4" },
      { nameKey: "agents.groups.content.names.5", descKey: "agents.groups.content.agents.5" },
      { nameKey: "agents.groups.content.names.6", descKey: "agents.groups.content.agents.6" },
    ],
  },
  {
    id: "observability",
    name: "Observability",
    color: "#0891b2",
    agents: [
      { nameKey: "agents.groups.observability.names.0", descKey: "agents.groups.observability.agents.0" },
      { nameKey: "agents.groups.observability.names.1", descKey: "agents.groups.observability.agents.1" },
      { nameKey: "agents.groups.observability.names.2", descKey: "agents.groups.observability.agents.2" },
    ],
  },
  {
    id: "compliance",
    name: "Compliance",
    color: "#059669",
    agents: [
      { nameKey: "agents.groups.compliance.names.0", descKey: "agents.groups.compliance.agents.0" },
      { nameKey: "agents.groups.compliance.names.1", descKey: "agents.groups.compliance.agents.1" },
      { nameKey: "agents.groups.compliance.names.2", descKey: "agents.groups.compliance.agents.2" },
      { nameKey: "agents.groups.compliance.names.3", descKey: "agents.groups.compliance.agents.3" },
      { nameKey: "agents.groups.compliance.names.4", descKey: "agents.groups.compliance.agents.4" },
      { nameKey: "agents.groups.compliance.names.5", descKey: "agents.groups.compliance.agents.5" },
      { nameKey: "agents.groups.compliance.names.6", descKey: "agents.groups.compliance.agents.6" },
    ],
  },
  {
    id: "systems",
    name: "Systems",
    color: "#6366f1",
    agents: [
      { nameKey: "agents.groups.systems.names.0", descKey: "agents.groups.systems.agents.0" },
      { nameKey: "agents.groups.systems.names.1", descKey: "agents.groups.systems.agents.1" },
      { nameKey: "agents.groups.systems.names.2", descKey: "agents.groups.systems.agents.2" },
      { nameKey: "agents.groups.systems.names.3", descKey: "agents.groups.systems.agents.3" },
      { nameKey: "agents.groups.systems.names.4", descKey: "agents.groups.systems.agents.4" },
      { nameKey: "agents.groups.systems.names.5", descKey: "agents.groups.systems.agents.5" },
      { nameKey: "agents.groups.systems.names.6", descKey: "agents.groups.systems.agents.6" },
      { nameKey: "agents.groups.systems.names.7", descKey: "agents.groups.systems.agents.7" },
      { nameKey: "agents.groups.systems.names.8", descKey: "agents.groups.systems.agents.8" },
      { nameKey: "agents.groups.systems.names.9", descKey: "agents.groups.systems.agents.9" },
      { nameKey: "agents.groups.systems.names.10", descKey: "agents.groups.systems.agents.10" },
    ],
  },
  {
    id: "privacy-engineering",
    name: "Privacy Engineering",
    color: "#0d9488",
    agents: [
      { nameKey: "agents.groups.privacy-engineering.names.0", descKey: "agents.groups.privacy-engineering.agents.0" },
      { nameKey: "agents.groups.privacy-engineering.names.1", descKey: "agents.groups.privacy-engineering.agents.1" },
      { nameKey: "agents.groups.privacy-engineering.names.2", descKey: "agents.groups.privacy-engineering.agents.2" },
    ],
  },
  {
    id: "blockchain-web3",
    name: "Blockchain / Web3 Security",
    color: "#f59e0b",
    agents: [
      { nameKey: "agents.groups.blockchain-web3.names.0", descKey: "agents.groups.blockchain-web3.agents.0" },
      { nameKey: "agents.groups.blockchain-web3.names.1", descKey: "agents.groups.blockchain-web3.agents.1" },
    ],
  },
  {
    id: "telecom",
    name: "Telecom Security",
    color: "#dc2626",
    agents: [
      { nameKey: "agents.groups.telecom.names.0", descKey: "agents.groups.telecom.agents.0" },
    ],
  },
  {
    id: "automotive",
    name: "Automotive Security",
    color: "#b91c1c",
    agents: [
      { nameKey: "agents.groups.automotive.names.0", descKey: "agents.groups.automotive.agents.0" },
    ],
  },
  {
    id: "hardware",
    name: "Hardware Security",
    color: "#7f1d1d",
    agents: [
      { nameKey: "agents.groups.hardware.names.0", descKey: "agents.groups.hardware.agents.0" },
    ],
  },
  {
    id: "medical",
    name: "Medical Device Security",
    color: "#991b1b",
    agents: [
      { nameKey: "agents.groups.medical.names.0", descKey: "agents.groups.medical.agents.0" },
    ],
  },
  {
    id: "aviation-maritime-energy",
    name: "Aviation / Maritime / Energy",
    color: "#92400e",
    agents: [
      { nameKey: "agents.groups.aviation-maritime-energy.names.0", descKey: "agents.groups.aviation-maritime-energy.agents.0" },
    ],
  },
  {
    id: "physical-mainframe",
    name: "Physical / Mainframe Security",
    color: "#78350f",
    agents: [
      { nameKey: "agents.groups.physical-mainframe.names.0", descKey: "agents.groups.physical-mainframe.agents.0" },
    ],
  },
];

export const ALL_COLORS = [...new Set(AGENT_GROUPS.map((g) => g.color))];
