import { Specie } from '../../species/models/specie';

export interface BattleResult {
  id: number;
  leftFighter: Specie;
  rightFighter: Specie;
  winner: Specie;
  battleDate: Date;
}

export interface BattleRequest {
  fighterLeftId: number;
  fighterRightId: number;
}
