import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { PayPalScriptOptions } from '@paypal/paypal-js/types/script-options';
import { PayPalButtonsComponentProps } from '@paypal/paypal-js/types/components/buttons';
import { Payment } from '@mui/icons-material';
import { paymentApi } from '@api/payment/payment';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const paypalScriptOptions: PayPalScriptOptions = {
  'client-id': 'AdgUiMv0rRXdLD6gmtlVLaicQiBlCnm153DVD7jDcef3eLAYqlELsgiRqEK04H611gqEbzzXajHG9aN0',
  currency: 'USD',
};
export default function Deposit() {
  const [orderId, setOrderId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  function Button() {
    /**
     * usePayPalScriptReducer use within PayPalScriptProvider
     * isPending: not finished loading(default state)
     * isResolved: successfully loaded
     * isRejected: failed to load
     */
    const [{ isPending }] = usePayPalScriptReducer();
    const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
      style: { layout: 'vertical' },
      async createOrder() {
        if (!inputRef.current) {
          return '';
        }
        const amount = inputRef.current.value ? Number(inputRef.current.value) / 25600 : 10;

        const response = await paymentApi.createOrder({
          amount,
          intent: 'CAPTURE',
        });

        if (!(response.statusCode === 201)) {
          return Promise.reject('');
        }
        return Promise.resolve(response.data.id);
      },
      async onApprove(data: any) {
        const response = await paymentApi.captureOrder({
          order_id: data.orderID,
        });
        toast.success('Thanh toán thành công');
      },
    };
    return (
      <>
        {isPending ? <h2>Load Smart Payment Button...</h2> : null}
        <PayPalButtons {...paypalbuttonTransactionProps} />
      </>
    );
  }
  return (
    <div className="h-400 w-screen flex flex-col items-center">
      <div>
        <div className="mb-6 w-400 mr-20">
          <h2 className=" block mb-2 font-medium text-black text-lg">Nhập số tiền cần nạp</h2>
          <input
            ref={inputRef}
            defaultValue={300000}
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div className="w-1/2">
        <PayPalScriptProvider options={paypalScriptOptions}>
          <Button />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
