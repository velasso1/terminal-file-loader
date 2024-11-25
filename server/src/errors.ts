interface IErrorBody {
  ERROR: {
    emptyPayload: {
      code: 400;
      message: string;
    };
    noSuchFile: {
      code: 400;
      message: string;
    };
  };
}

export const EmptyPayload: IErrorBody = {
  ERROR: {
    emptyPayload: {
      code: 400,
      message: 'Empty content in payload or incorrect data type. Check payload',
    },

    noSuchFile: {
      code: 400,
      message: 'No such file or directory for deleting file. Check path',
    },
  },
};
