import jwt from "jsonwebtoken";

const verifyToken = async (req:any, res:any, next:any) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const secret : any = process.env.JWT_SECRET;
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

export default verifyToken;