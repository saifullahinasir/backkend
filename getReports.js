const fs = require('fs').promises;
const path = require('path');

export default async function handler(req, res) {
  const reportsPath = path.join(__dirname, 'reports.json');

  try {
    const data = await fs.readFile(reportsPath, 'utf8');
    const reports = JSON.parse(data);
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reports.' });
  }
}
