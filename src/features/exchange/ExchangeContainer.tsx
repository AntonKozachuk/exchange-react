import React, { useEffect, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';
import classNames from 'classnames';

import { useAppSelector } from '../../app/hooks';
import { selectPaymentSystems } from '../payment-systems/paymentSystemsSlise';
import { PaymentSystem } from '../payment-systems/types';
import { ExchangeList } from './components/ExchangeList';
import { ExchangeLayout } from './layouts/ExchangeLayout';
import layoutStyles from './layouts/ExchangeLayout.module.scss'
import { StartTradeBanner } from './components/StartTradeBanner';
import { TransactionSetup } from './components/TransactionSetup';
import { NewsContainer } from '../news/NewsContainer';
import { TransactionsContainer } from '../transactions/TransactionsContainer';
import { StatisticContainer } from '../statistic/StatisticContainer';
import { ExchangeShortTitle } from './components/ExchangeShortTitle';
import { useMediaQuery } from '../../common/hooks/use-media-query';
import { FilterOption } from './types';
import { FilterType } from './constants';
import { getFilterOptions } from './helpers/get-filter-options';
import { useTransactionSteps } from './hooks/use-transaction-steps';
import { SwitcherOption } from '../../common/components/Switcher';

type SourcePaymentsContainerProps = {
  className?: string;
}

const useFilteredPayments = (paymentSystems: PaymentSystem[], filterType: string) => {
  return useMemo<PaymentSystem[]>((): PaymentSystem[] => {
    return paymentSystems.filter((paymentSystem: PaymentSystem) => {
      if (filterType === FilterType.ALL) return true;

      return filterType === paymentSystem.type;
    })
  }, [paymentSystems, filterType])
}

export function ExchangeContainer({ className = ''}: SourcePaymentsContainerProps) {
  const paymentSystems: PaymentSystem[] = useAppSelector<PaymentSystem[]>(selectPaymentSystems, shallowEqual);
  const [sourceSystem, setSourceSystem] = useState<PaymentSystem | null>(null);
  const [targetSystem, setTargetSystem] = useState<PaymentSystem | null>(null);
  const [transactionPair, setTransactionPair] = useState<[PaymentSystem, PaymentSystem] | []>([])

  const filterOptions: FilterOption[] = getFilterOptions();

  const [sourceFilter, setSourceFilter] = useState<string>(FilterType.ALL);
  const [targetFilter, setTargetFilter] = useState<string>(FilterType.ALL);
  const [areCompactDirections, setAreCompactDirections] = useState<boolean>(false);

  const sourcePaymentMethods: PaymentSystem[] = useFilteredPayments(paymentSystems, sourceFilter);
  const targetPaymentMethods: PaymentSystem[] = useFilteredPayments(paymentSystems, targetFilter);
  const isLargeScreen: boolean = useMediaQuery('(min-width: 767px)');
  const [steps, activeStepId, setActiveStepId] = useTransactionSteps({
    sourcePaymentSystem: sourceSystem,
    targetPaymentSystem: targetSystem,
  });

  function setSource(paymentSystem: PaymentSystem): void {
    setSourceSystem(paymentSystem);
    setTargetSystem(null);
  }

  function setTarget(paymentSystem: PaymentSystem): void {
    setTargetSystem(paymentSystem);
    setAreCompactDirections(true);

    if (sourceSystem) {
      setTransactionPair([sourceSystem, paymentSystem])
    }
  }

  function onCoverClick(): void {
    setAreCompactDirections(false);
  }

  function resetSource(): void {
    setSourceSystem(null);
    setTargetSystem(null);
  }

  function onFormClick(): void {
    if (!areCompactDirections && targetSystem) {
      setAreCompactDirections(true);
    }
  }

  function onStepBack(): void {
    setTargetSystem(null);
    setAreCompactDirections(false)
  }

  useEffect(() => {
    if (sourceSystem === null && paymentSystems.length && isLargeScreen) {
      setSourceSystem(paymentSystems[0]);
    }
  }, [paymentSystems, sourceSystem, isLargeScreen])

  if (!paymentSystems.length) return null;

  const sideBaer = !transactionPair.length ? (
      <div>
        <StartTradeBanner />
        <NewsContainer />
        <TransactionsContainer />
        <StatisticContainer />
      </div>
    ) : (
      <div onClick={onFormClick}>
        <TransactionSetup
          isShortView={!areCompactDirections}
          onStepBack={onStepBack}
          steps={steps}
          activeStepId={activeStepId}
          sourceSystem={transactionPair[0]}
          targetSystem={transactionPair[1]}
        />
      </div>
    );

  return (
    <ExchangeLayout
      areCompactDirections={areCompactDirections}
      isTargetSelected={Boolean(targetSystem)}
      sideBar={sideBaer}
    >
      <ExchangeShortTitle
        title={'Нажмите для <br> выбора валют'}
        visible={areCompactDirections}
      />

      <ExchangeList
        title={'Отдаете'}
        className={classNames(
          layoutStyles['e-exchange-layout__direction-section'],
          layoutStyles['e-exchange-layout__direction-section--source']
        )}
        filterOptions={filterOptions}
        onFilterChange={(filterOption: SwitcherOption): void => setSourceFilter(filterOption.id)}
        selectedFilter={sourceFilter}
        paymentSystems={sourcePaymentMethods}
        onItemClick={setSource}
        onCoverClick={onCoverClick}
        onItemChange={resetSource}
        changeText={'Изменить'}
        activeId={sourceSystem?.id}
        compactView={areCompactDirections}
      />

      {(isLargeScreen || Boolean(sourceSystem)) && (
        <ExchangeList
          title={'Получаете'}
          className={classNames(
            layoutStyles['e-exchange-layout__direction-section'],
            layoutStyles['e-exchange-layout__direction-section--target']
          )}
          filterOptions={filterOptions}
          onFilterChange={(filterOption: SwitcherOption) => setTargetFilter(filterOption.id)}
          selectedFilter={targetFilter}
          paymentSystems={targetPaymentMethods}
          onItemClick={setTarget}
          onCoverClick={onCoverClick}
          activeId={targetSystem?.id}
          additionalInfo={true}
          compactView={areCompactDirections}
        />
      )}
    </ExchangeLayout>
  );
}
