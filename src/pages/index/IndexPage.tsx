import React from 'react';
import { PageTemplate } from '../../layouts/PageTemplate/PageTemplate';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ExchangeContainer } from '../../features/exchange/ExchangeContainer';

export function IndexPage() {
  let navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.hash;
    if (!currentPath.includes('/ru/') && !currentPath.includes('/en/')) {
      navigate('/ru/');
    }
  }, [navigate]);
  

  return (
    <PageTemplate>
      <ExchangeContainer />
    </PageTemplate>
  )
}
