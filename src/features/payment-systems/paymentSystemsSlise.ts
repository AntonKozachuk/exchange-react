import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../common/status/types';
import { PaymentSystem } from './types';
import { IDLE, LOADING, FAILED } from '../../common/status/values';
import { fetchPaymentSystems } from './paymentSystemsApi';
import { RootState } from '../../app/store';
import exp from 'constants';


const name: string = 'paymentSystems';

type PaymentsSystemsState = {
  status: Status;
  data: PaymentSystem[];
}

const initialState: PaymentsSystemsState = {
  status: IDLE,
  data: [],
};

export const fetchSourceMethods = createAsyncThunk(
  `${name}/fetchSourceMethods`,
  () => fetchPaymentSystems()
);


export const selectPaymentSystems = (rootState: RootState): PaymentSystem[] => rootState.paymentSystems.data;

export const paymentSystemsSlice = createSlice({
  name,
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSourceMethods.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchSourceMethods.fulfilled, (state, action) => {
        state.status = IDLE;
        state.data = action.payload;
      })
      .addCase(fetchSourceMethods.rejected, (state) => {
        state.status = FAILED;
      });
  },
});

export default paymentSystemsSlice.reducer;
