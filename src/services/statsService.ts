
export interface SiteStats {
  totalCourses: number;
  totalUsers: number;
  totalInstructors: number;
}

// In a real app, this would fetch from Strapi
const INITIAL_STATS: SiteStats = {
  totalCourses: 0,
  totalUsers: 0,
  totalInstructors: 0
};

export const getSiteStats = (): SiteStats => {
  return INITIAL_STATS;
};

// In a real app, this would update your Strapi database
export const incrementStat = (statType: keyof SiteStats) => {
  console.log(`Incrementing ${statType}`);
};
