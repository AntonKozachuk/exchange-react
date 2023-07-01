import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import styles from './ExchangeList.module.scss';
import { Switcher, SwitcherOption } from '../../../common/components/Switcher';
import { ExchangeListItem } from './ExchangeListItem';

import { PaymentSystem } from '../../payment-systems/types';
import { useMediaQuery } from '../../../common/hooks/use-media-query';
import { getImageSource } from '../helpers/get-image-source';

type ExchangeListProps = {
  title: string;
  className?: string;
  filterOptions?: SwitcherOption[];
  selectedFilter?: string;
  onFilterChange?: (data: SwitcherOption) => void;
  paymentSystems?: PaymentSystem[];
  activeId?: string;
  additionalInfo?: boolean;
  onItemClick?: (data: PaymentSystem) => void;
  onItemChange?: (data: PaymentSystem) => void;
  changeText?: string;
  onCoverClick?: () => void;
  compactView?: boolean;
}

enum AdditionalDataView {
  COURSE = 'course',
  RESERVE = 'reserve',
}

function getAdditionalInfo(shouldBeShown: boolean, dataType: string, paymentSystem: PaymentSystem) {
  if (shouldBeShown) {
    if (dataType === AdditionalDataView.COURSE) return paymentSystem.course;
    if (dataType === AdditionalDataView.RESERVE) return paymentSystem.reserve;
  }

  return '';
}

function shouldRenderFilter(compactView: boolean, isLargeScreen: boolean, activeId?: string): boolean {
  if (isLargeScreen) {
    return !compactView
  } else {
    if (activeId) {
      return false;
    }
  }

  return true;
}

export function ExchangeList(props: ExchangeListProps) {
  const {
    title,
    className,
    filterOptions = [],
    selectedFilter = '',
    onFilterChange = Function.prototype,
    paymentSystems = [],
    activeId,
    changeText = '',
    additionalInfo = false,
    onItemClick = Function.prototype,
    onCoverClick = Function.prototype,
    onItemChange = Function.prototype,
    compactView = false,
  } = props;


  const isLargeScreen: boolean = useMediaQuery('(min-width: 767px)');
  const additionalDataType = useMemo<SwitcherOption[]>(() =>[
    {
      id: AdditionalDataView.COURSE,
      label: 'Курс',
    },
    {
      id: AdditionalDataView.RESERVE,
      label: 'Резервы',
    },
  ], []);

  const [extraInfoType, setExtraInfoType] = useState<SwitcherOption>(() => additionalDataType[0]);

  return (
    <section className={classNames(styles['e-exchange-list'], className)}>
      <div className={classNames(styles['e-exchange-list__title'], {
          [styles['e-exchange-list__title--compact-view']]: compactView
        })}
      >
        <span>{title}</span>

        {additionalInfo && (
          <Switcher
            className={styles['e-exchange-list__course-reserve-switcher']}
            options={additionalDataType}
            onSelect={setExtraInfoType}
            size="small"
            appearance="simple"
            selectedId={extraInfoType.id}
            inline={true}
          />
        )}
      </div>

      {Boolean(filterOptions.length) && shouldRenderFilter(compactView, isLargeScreen, activeId) && (
        <Switcher
          options={filterOptions}
          onSelect={(filterData: SwitcherOption) => onFilterChange(filterData)}
          selectedId={selectedFilter}
        />
      )}

      {paymentSystems.map((paymentSystem: PaymentSystem) => (
        <ExchangeListItem
          key={paymentSystem.id}
          logoSrc={getImageSource(paymentSystem.logoPrefix, paymentSystem.id === activeId)}
          title={paymentSystem.name}
          info={getAdditionalInfo(additionalInfo, extraInfoType.id, paymentSystem)}
          active={paymentSystem.id === activeId}
          onClick={() => onItemClick(paymentSystem)}
          disabled={paymentSystem.disabled}
          invisible={Boolean(activeId) && paymentSystem.id !== activeId}
          compactView={compactView}
          changeText={changeText}
          onItemChange={() => onItemChange(paymentSystem)}
        />
      ))}

      <div
        onClick={() => onCoverClick()}
        className={classNames(styles['e-exchange-list__cover-section'], {
          [styles['e-exchange-list__cover-section--cover']]: compactView
        })}
      />
    </section>
  );
}
