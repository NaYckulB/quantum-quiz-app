import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'questions.json'); // Calea către fișierul JSON
  let jsonData;

  try {
    jsonData = fs.readFileSync(filePath, 'utf-8'); // Citim fișierul JSON
  } catch (error) {
    console.error('Error reading file:', error);
    return res.status(500).json({ error: 'Failed to read questions file' });
  }

  const questionsData = JSON.parse(jsonData);
  res.status(200).json(questionsData);
}
