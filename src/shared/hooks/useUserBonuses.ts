import plural from 'plural-ru';
import { useProfile } from '../api';

// '1 бонус', '2 бонуса', '10 бонусов'
const BONUSES_TEXT = ['бонус', 'бонуса', 'бонусов'] as const;

export const useUserBonuses = () => {
  const { data } = useProfile();
  const bonuses = data?.bonuses;

  return {
    bonuses,
    bonusesText:
      bonuses === undefined ? undefined : plural(bonuses, ...BONUSES_TEXT),
  };
};
