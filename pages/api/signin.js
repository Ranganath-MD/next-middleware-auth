export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username } = req.body;
      if (username) {
        res.send({
          success: true,
          data: { username }
        });
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}
