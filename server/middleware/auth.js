import jwt from "jsonwebtoken";

// User wants to like a post
// User click the like button => auth middleware (NEXT) => like Controller...

const auth = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustumAuth = token.length < 500;

    let decodedData;

    if (token && isCustumAuth) {
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
