module.exports = {
  checkAPI: (req, res, next) => {
    const apiKey = req.body.api_key; // Assuming the API key is passed in the "x-api-key" header
    // console.log(req.body);
    // console.log(process.env.API_KEY);
    // Check if the API key is valid
    if (apiKey === process.env.API_KEY) {
      // API key is valid
      next();
    } else {
      // API key is invalid
      return res.status(401).json({
        error: "Invalid API key",
        data: req.body,
        file_api_key: process.env.API_KEY,
      });
    }
  },
};
