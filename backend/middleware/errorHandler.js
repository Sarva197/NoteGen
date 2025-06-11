const errorHandler = (err, req, res, next) => {
  console.error("Handled Error:", err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ success: false, message });
};

export default errorHandler;
