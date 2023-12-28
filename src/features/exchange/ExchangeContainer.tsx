import React, { useEffect, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { selectPaymentSystems } from '../payment-systems/paymentSystemsSlise';
import { PaymentSystem } from '../payment-systems/types';
import { ExchangeList } from './components/ExchangeList';
import { ExchangeLayout } from './layouts/ExchangeLayout';
import layoutStyles from './layouts/ExchangeLayout.module.scss'
import { StartTradeBanner } from './components/StartTradeBanner';
import { TransactionSetup } from './components/TransactionSetup';
import { TransactionPayment } from './components/TransactionPayment';
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
import { TransactionDone } from './components/TransactionDone';

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

const findPaymentSystemById = (id: number, paymentSystems: PaymentSystem[]) => {
  return paymentSystems.find(system => system.id === id);
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ExchangeContainer({ className = ''}: SourcePaymentsContainerProps) {
  const paymentSystems: PaymentSystem[] = useAppSelector<PaymentSystem[]>(selectPaymentSystems, shallowEqual);
  const [sourceSystem, setSourceSystem] = useState<PaymentSystem | null>(null);
  const [targetSystem, setTargetSystem] = useState<PaymentSystem | null>(null);
  const [transactionPair, setTransactionPair] = useState<[PaymentSystem, PaymentSystem] | []>([])

  const filterOptions: FilterOption[] = getFilterOptions();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

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

  const [sourceAmount, setSourceAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  // Helper function to go to the next step
  const goToNextStep = (values: any, targetAmount: string) => {
    const currentStepIndex = steps.findIndex((step) => step.id === activeStepId);
    if (currentStepIndex < steps.length - 1) {
      setActiveStepId(steps[currentStepIndex + 1].id);
    }

    setSourceAmount(values.sourceAmount);
    setTargetAmount(targetAmount);
  };

  useEffect(() => {
    if (sourceSystem === null && paymentSystems.length && isLargeScreen) {
      setSourceSystem(paymentSystems[0]);
    }
  }, [paymentSystems, sourceSystem, isLargeScreen])

  useEffect(() => {
    if (transactionPair.length === 2) {
      const sourceId = transactionPair[0].id; // Assuming .id is the property you want
      const targetId = transactionPair[1].id;
      const newPath = `/${i18n.language}/?source=${sourceId}&target=${targetId}`;
      navigate(newPath, { replace: true });
    }
  }, [transactionPair, navigate, i18n.language]);

  useEffect(() => {
    const sourceId = query.get('source');
    const targetId = query.get('target');
  
    if (sourceId && targetId && paymentSystems) {
      // Assuming you have a way to find payment systems by their ID
      const foundSourceSystem = findPaymentSystemById(Number(sourceId), paymentSystems);
      const foundTargetSystem = findPaymentSystemById(Number(targetId), paymentSystems);
  
      if (foundSourceSystem && foundTargetSystem && paymentSystems) {
        setSourceSystem(foundSourceSystem);
        setTargetSystem(foundTargetSystem);
        setTransactionPair([foundSourceSystem, foundTargetSystem]);
      }
    }
  }, [paymentSystems]);  
  

  if (!paymentSystems.length) return null;

  const sideBar = !transactionPair.length ? (
    <div>
      {i18n.language !== 'en' && (
        <StartTradeBanner />
      )}
      <NewsContainer />
      <TransactionsContainer />
      <StatisticContainer />
    </div>
  ) : (
    <div onClick={onFormClick}>
      {/* Conditionally render the appropriate step based on activeStepId */}
      {activeStepId === steps[0].id && (
        // Step 1: Data Entry
        <TransactionSetup
          isShortView={!areCompactDirections}
          onStepBack={onStepBack}
          steps={steps}
          activeStepId={activeStepId}
          sourceSystem={transactionPair[0]}
          targetSystem={transactionPair[1]}
          goToNextStep={goToNextStep}
          setSourceAmount={setSourceAmount}
          setTargetAmount={setTargetAmount}
        />
      )}
      {activeStepId === steps[1].id && (
        // Step 2: Payment
        <TransactionPayment
          isShortView={!areCompactDirections}
          onStepBack={onStepBack}
          steps={steps}
          activeStepId={activeStepId}
          sourceSystem={transactionPair[0]}
          targetSystem={transactionPair[1]}
          goToNextStep={goToNextStep}
          sourceAmount={sourceAmount} // Pass the sourceAmount
            targetAmount={targetAmount} // Pass the targetAmount
          // Add necessary props for the PaymentStep component
        />
      )}
      {activeStepId === steps[2].id && (
        // Step 3: Done
        <TransactionDone
          isShortView={!areCompactDirections}
          onStepBack={onStepBack}
          steps={steps}
          activeStepId={activeStepId}
          sourceSystem={transactionPair[0]}
          targetSystem={transactionPair[1]}
          sourceAmount={sourceAmount}
          targetAmount={targetAmount}
          // Add necessary props for the DoneStep component
        />
      )}
    </div>
  );

  return (
    <ExchangeLayout
      areCompactDirections={areCompactDirections}
      isTargetSelected={Boolean(targetSystem)}
      sideBar={sideBar}
    >
      <ExchangeShortTitle
        title={'Нажмите для <br> выбора валют'}
        visible={areCompactDirections}
      />

      <ExchangeList
        title={t('give')}
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
          title={t('receive')}
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
