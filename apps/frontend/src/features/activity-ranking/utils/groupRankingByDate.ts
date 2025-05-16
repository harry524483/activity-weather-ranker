import { ActivityRanking } from '@activity-weather-ranker/shared';

export const groupRankingByDate = (rankings: ActivityRanking[]) => {
  return rankings.reduce<Record<string, ActivityRanking[]>>((acc, curr) => {
    acc[curr.date] = acc[curr.date] || [];
    acc[curr.date].push(curr);
    return acc;
  }, {});
};
