// Global error handling middleware.

export const errorHandler = (error, request, response, next) => {
  console.error(`[${new Date().toISOString()}] ${error.stack}`);
  response.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status || 500,
    },
  });
};
