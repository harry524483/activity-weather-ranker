import { ActivityRanking } from '@activity-weather-ranker/shared';
import { groupRankingByDate } from '../utils/groupRankingByDate';

type ActivityRankingsListProps = {
  rankings: ActivityRanking[];
  loading?: boolean;
};

const ActivityRankingsList = ({
  rankings,
  loading,
}: ActivityRankingsListProps) => {
  const grouped = groupRankingByDate(rankings);

  Object.values(grouped).forEach((arr) =>
    arr.sort((a, b) => b.score - a.score)
  );

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(grouped).map(([date, activities]) => (
        <div
          key={date}
          className="bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto border border-cyan-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-cyan-300">{date}</h2>
          </div>
          {loading ? (
            <div className="text-cyan-300 text-lg font-medium text-center mt-6">
              Loading...
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {activities.map((act) => (
                <span
                  key={act.activity}
                  className="bg-cyan-600/80 hover:bg-cyan-400/90 text-white px-5 py-2 rounded-full text-base font-semibold shadow transition-colors duration-200 capitalize"
                >
                  {act.activity.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityRankingsList;
