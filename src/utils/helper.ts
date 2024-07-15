export const createResponse = (
    message: string,
    httpStatus: number,
    error: string,
    data: any
) => {
    return {
        message,
        httpStatus,
        error,
        data,
    };
};
