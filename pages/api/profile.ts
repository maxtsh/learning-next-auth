import { getSession } from "next-auth/react";
import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";

// Protecting APIs with session
const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  // If user is not authorized then response with 401
  if (!session) res.status(401).json({ message: "User unauthorized!" });

  res.status(200).json({ message: "THIS IS OK" });
};

export default handler;
