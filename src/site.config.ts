// Site-wide settings. Change values here, not in components.
// Everything marked PLACEHOLDER must be replaced before launch.

export const site = {
  // The domain is a placeholder until the real one is registered.
  // Override per deploy with NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://skills.com",
  name: "skills",

  // PLACEHOLDER: real TikTok handle.
  tiktokHandle: "@skills",
  tiktokUrl: "https://www.tiktok.com/@skills",

  // PLACEHOLDER: fill in when the accounts exist. Empty values are hidden.
  socials: {
    instagram: "",
    youtube: "",
    linkedin: "",
  },

  // PLACEHOLDER: contact details. Empty values are hidden on the site.
  email: "",
  whatsappBusinessUrl: "",

  // PLACEHOLDER: Cal.com booking link for the free intro call.
  bookingUrl: "",
} as const;
