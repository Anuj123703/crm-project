export const sendResponse = (
    res: any,
    status: number,
    message: string,
    data: any = null
) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};