import { RankingResponse } from '../../modules/battle-statistics/models/ranking';
import { BattleResult } from '../../modules/battle/models/battle';

export interface DashboardDTO {
  totalSpecies: number;
  top3Ranking: RankingResponse[];
  lastBattle: BattleResult;
}
