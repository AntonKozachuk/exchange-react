import React from 'react';
import classNames from 'classnames';
import { PageTemplate } from '../../layouts/PageTemplate/PageTemplate';

import { ExchangeContainer } from '../../features/exchange/ExchangeContainer';

export function IndexPage() {
  return (
    <PageTemplate>
      <ExchangeContainer />
    </PageTemplate>
  )
}
