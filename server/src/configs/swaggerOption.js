const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Documentation - batdongsanvn',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/api/*.js'], // Đường dẫn tới các tệp chứa chú thích Swagger
};

export default swaggerOptions;
