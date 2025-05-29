import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { PayPalScriptOptions } from '@paypal/paypal-js/types/script-options';
import { PayPalButtonsComponentProps } from '@paypal/paypal-js/types/components/buttons';
import { Payment } from '@mui/icons-material';
import { paymentApi } from '@api/payment/payment';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

export default function DepositHistory() {
  const [page, setPage] = useState<number>(1);
  const [values, setValues] = useState<any>({
    transactions: [
      {
        id: '',
        action: '',
        paypal_id: '',
        amount: 0,
        status: '',
        user_id: '',
        created_at: '',
        updated_at: '',
      },
    ],
    previousPage: 0,
    totalPages: 0,
    nextPage: 0,
    currentPage: 0,
    totalDocs: 0,
  });

  useEffect(() => {
    const getPaymentHistory = async () => {
      try {
        if (page) {
          const res = await paymentApi.getHistoryPayment({ limit: 10, page: page });
          setValues(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    getPaymentHistory();
  }, [page]);

  return (
    <div className="bg-white p-8 rounded-md w-2/3 mx-auto">
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mã thanh toán
                  </th>
                  <th className="flex justify-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kiểu thanh toán
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Số Tiền
                  </th>
                  <th className="flex justify-center  px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {values.transactions.map((value: any) => {
                  return (
                    <tr key={value.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{value.id}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-center">
                        <p
                          className={
                            value.action === 'DEPOSIT'
                              ? 'text-gray-900 whitespace-no-wrap bg-[#2dcc3a] p-2 px-5 rounded-md'
                              : 'text-gray-900 whitespace-no-wrap bg-yellow-300 p-2 px-5 rounded-md'
                          }
                        >
                          {value.action === 'DEPOSIT' ? 'Nạp tiền' : 'Rút tiền'}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {dayjs(value.created_at).format('DD/MM/YYYY HH:mm')}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{value.amount + ' VND'}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-center">
                        <p
                          className={
                            value.status === 'SUCCESS'
                              ? 'text-gray-900 whitespace-no-wrap bg-[#2dcc3a] p-2 px-5 rounded-md'
                              : 'text-gray-900 whitespace-no-wrap bg-yellow-300 p-2 px-5 rounded-md'
                          }
                        >
                          {value.status === 'SUCCESS' ? 'Thành công' : 'Đang xử lý'}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Trang {values.currentPage} của tổng số {values.totalPages} Trang
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  disabled={values.previousPage === null}
                  onClick={() => {
                    if (values.previousPage !== null) {
                      setPage(page - 1);
                    }
                  }}
                  className="text-sm text-indigo-50 transition duration-150 min-w-16 hover:bg-[#54be4b] bg-[#47991f] font-semibold py-2 px-4 rounded-l"
                >
                  Trước
                </button>
                &nbsp; &nbsp;
                <button
                  disabled={values.nextPage === null}
                  onClick={() => {
                    if (values.nextPage !== null) {
                      setPage(page + 1);
                    }
                  }}
                  className="text-sm text-indigo-50 transition duration-150 min-w-16 hover:bg-[#54be4b] bg-[#47991f] font-semibold py-2 px-4 rounded-r"
                >
                  Tiếp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
