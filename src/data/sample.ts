export const mockToolActions = [
  { action: "diagnostic_start", data: {} },
  { action: "diagnostic_complete", data: {} },
  {
    action: "purchase_mobile_start",
    data: { planName: "Prepaid 50GB", type: "Data" },
  },
  {
    action: "purchase_mobile_complete",
    data: { planName: "Prepaid 50GB", type: "Data" },
  },
  {
    action: "purchase_fibre_start",
    data: { planName: "Home Fibre 100Mbps", speed: "100Mbps" },
  },
  {
    action: "purchase_fibre_complete",
    data: { planName: "Home Fibre 100Mbps", speed: "100Mbps" },
  },
  {
    action: "purchase_roaming_start",
    data: { country: "Japan", duration: "7 Days" },
  },
  {
    action: "purchase_roaming_complete",
    data: { country: "Japan", duration: "7 Days" },
  },
];
