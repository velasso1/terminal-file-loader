interface IErrorBody {
  ERROR: {
    code: number;
    message: string;
  };
}

export const EmptyPayload: IErrorBody = {
  ERROR: {
    code: 400,
    message: 'Empty content in payload or incorrect data type. Check payload',
  },
};
