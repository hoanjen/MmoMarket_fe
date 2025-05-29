import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { PayPalScriptOptions } from '@paypal/paypal-js/types/script-options';
import { PayPalButtonsComponentProps } from '@paypal/paypal-js/types/components/buttons';
import { paymentApi } from '@api/payment/payment';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const paypalScriptOptions: PayPalScriptOptions = {
  'client-id': 'AdgUiMv0rRXdLD6gmtlVLaicQiBlCnm153DVD7jDcef3eLAYqlELsgiRqEK04H611gqEbzzXajHG9aN0',
  currency: 'USD',
};
export default function Payment() {
  const [orderId, setOrderId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

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

  async function withdraw() {
    if (!amountRef.current || !emailRef.current) {
      return;
    }
    const amount = amountRef.current.value ? Number(amountRef.current.value) : 10;
    const paypal_email = emailRef.current.value;
    const res = await paymentApi.withdraw({ amount, paypal_email });

    if (res.statusCode === 200) {
      toast.success('Rút tiền thành công');
    } else {
      toast.error('Rút tiền thất bại');
    }
  }

  return (
    <div className="h-400 w-screen ">
      <div className="flex flex-col items-center">
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
      <div className="flex flex-col items-center">
        <div className="mb-4 w-400 mr-20">
          <h2 className=" block mb-2 font-medium text-black text-lg">Nhập số tiền cần rút</h2>
          <input
            ref={amountRef}
            defaultValue={300000}
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6 w-400 mr-20">
          <h2 className=" block mb-2 font-medium text-black text-lg">Email paypal</h2>
          <input
            ref={emailRef}
            defaultValue={''}
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          onClick={withdraw}
          className="mb-6 w-400 mr-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-12 border border-blue-700 rounded"
        >
          Rút
        </button>
      </div>
    </div>
  );
}
