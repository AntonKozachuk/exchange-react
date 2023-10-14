import { FilterOption } from '../types';
import { FilterType } from '../constants';
import { useTranslation } from 'react-i18next';

export function getFilterOptions(): FilterOption[] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();

  return [
    {
      id: FilterType.ALL,
      label: t('filter.all'),
    },
    {
      id: FilterType.CRYPTO,
      label: t('filter.crypto'),
    },
    {
      id:  FilterType.FIAT,
      label: t('filter.fiat'),
    }
  ]
}
