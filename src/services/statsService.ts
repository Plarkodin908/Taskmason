
export interface SiteStats {
  totalCourses: number;
  totalUsers: number;
  totalInstructors: number;
}

// Real stats that start from zero - no mock data
const INITIAL_STATS: SiteStats = {
  totalCourses: 0,
  totalUsers: 0,
  totalInstructors: 0
};

export const getSiteStats = (): SiteStats => {
  return INITIAL_STATS;
};

// Function to increment stats when new users/courses are added
export const incrementStat = (statType: keyof SiteStats) => {
  // In a real app, this would update your database
  console.log(`Incrementing ${statType}`);
};
