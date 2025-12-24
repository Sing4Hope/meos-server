export default function handler(req, res) {
  global.records = global.records || [];
  res.json(global.records);
}
