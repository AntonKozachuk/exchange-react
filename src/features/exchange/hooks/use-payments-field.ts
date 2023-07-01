import { useState } from 'react';

type FieldProps = {
  name?: string;
  id?: string;
  value: string | number;
  validate: (value: string | number) => boolean;
}

export function usePaymentField(props: FieldProps) {
  const fieldData = useState(() => {

  })
}
