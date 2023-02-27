export const responseInterceptors = () => {
  const onResponse = (res: any) => {
    if (res?.status === 200) {
      return res?.data;
    }
  };

  const onRejected = () => {};

  return {onResponse, onRejected};
};
