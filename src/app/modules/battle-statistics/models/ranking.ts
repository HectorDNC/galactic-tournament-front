import { Specie } from "../../species/models/specie";

export interface RankingResponse {
  specieId: number;
  species: Specie;
  victories: number;
}
