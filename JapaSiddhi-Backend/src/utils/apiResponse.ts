import {Response} from 'express';

class ApiResponse {
  success(
    res: Response,
    message: string,
    data: any = null,
    status = 200,
  ) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  error(
    res: Response,
    message: string,
    status = 500,
    errors: any = null,
  ) {
    return res.status(status).json({
      success: false,
      message,
      errors,
    });
  }
}

export default new ApiResponse();