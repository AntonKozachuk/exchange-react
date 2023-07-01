import { FilterOption } from '../types';
import { FilterType } from '../constants';

export function getFilterOptions(): FilterOption[] {
  return [
    {
      id: FilterType.ALL,
      label: 'Все',
    },
    {
      id: FilterType.CRYPTO,
      label: 'Крипто',
    },
    {
      id:  FilterType.FIAT,
      label: 'Фиат',
    }
  ]
}
