export type ResponseCreateOrder = {
  status: string;
  statusCode: number;
  data: {
    id: string;
  };
  message: [];
};

export type ResponseCaptureOrder = {
  status: string;
  statusCode: number;
  data: {};
  message: [];
};
