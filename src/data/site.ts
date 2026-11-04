export const PHONES = ["06 32 68 59 55", "07 74 08 78 49"];
export const WHATSAPP_NUMBER = "212632685955";
export const TEL = ["+212632685955", "+212774087849"];

export const CITY_IDS = ["agadir", "darbouazza"] as const;
export type CityId = (typeof CITY_IDS)[number];

export const SERVICE_IDS = [{ id: "cleaner" }, { id: "nanny" }, { id: "cook" }, { id: "driver" }] as const;
export type ServiceId = (typeof SERVICE_IDS)[number]["id"];
export type PlanId = "full" | "part";

// INDICATIVE monthly rates in MAD. Placeholders: replace with 2TG's confirmed price list.
export const INDICATIVE_MAD: Record<ServiceId, Record<PlanId, number>> = {
  cleaner: { full: 3000, part: 1500 },
  nanny: { full: 3500, part: 1800 },
  cook: { full: 4000, part: 2000 },
  driver: { full: 4500, part: 2200 },
};
