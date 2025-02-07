import jwt from "jsonwebtoken";

const verifyToken = async (req:any, res:any, next:any) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({success: false, message: "Unauthorized"});
    }

    try {
      const secret : any = process.env.JWT_SECRET;
      const verified : any = jwt.verify(token, secret);

      const {id} = req.params;
      const requestedId = parseInt(id, 10);
      const tokenUserId = parseInt(verified.id, 10);
      if (requestedId && requestedId !== tokenUserId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      req.user = verified;
      next();
    } catch (error) {
      return res.status(401).json({success: false, message: "Unauthorized"});
    }
  } catch (err:any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default verifyToken;