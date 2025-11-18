// Special Offer Modal Configuration
export const OFFER_CONFIG = {
  // Frequency options:
  // 'always' - Show every time user visits (ignores dismissal)
  // 'daily' - Show once per day (24 hours)
  // 'weekly' - Show once per week (7 days)
  // 'session' - Show once per browser session
  // Number (in seconds) - Show every X seconds (e.g., 60 for every 60 seconds)
  FREQUENCY: 60, // Show every 60 seconds
  
  // Delay before showing the modal (in milliseconds)
  SHOW_DELAY: 1000,
  
  // Whether to show the modal automatically
  AUTO_SHOW: true,
};

export default OFFER_CONFIG;

