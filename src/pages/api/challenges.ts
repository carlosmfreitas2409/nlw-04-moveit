import { NextApiRequest, NextApiResponse } from 'next';
import { Client, QueryResult, QueryResultRow } from 'pg';

let cachedDb: Client;

export async function connectToPostgresDatabase(uri: string): Promise<Client> {
  if(cachedDb) return cachedDb;

  const client = new Client({
    connectionString: uri
  });

  await client.connect();
  cachedDb = client;

  return client;
}

export default async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const client = await connectToPostgresDatabase(process.env.DATABASE_URL);

  if(request.method === 'PUT') {
    const { email, level, currentExperience, challengesCompleted } = request.body;
    let pgResponse: QueryResult<any>;

    const query = {
      name: 'update-user',
      text: 'UPDATE users SET level=$1, current_experience=$2, challenges_completed=$3 WHERE email=$4',
      values: [level, currentExperience, challengesCompleted, email]
    }

    try {
      const res = await client.query(query);
      pgResponse = res.rows[0];
    } catch(err) {
      pgResponse = err;
    }

    if(pgResponse instanceof Error)
      return response.status(400).json({ error: pgResponse })

    return response.status(200).json(pgResponse);
  }

  if(request.method === 'GET') {
    let pgResponse: QueryResultRow[] | Error;

    if(request.query.users === 'all') {
      const queryResponse = await client.query('SELECT * FROM users ORDER BY level');
      pgResponse = queryResponse.rows;
    } else if(request.query.users) {
      const { users: email } = request.query as { users: string };
  
      const query = {
        name: 'fetch-user',
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
      };

      try {
        const res = await client.query(query); 
        pgResponse = res.rows[0];
      } catch(err) {
        pgResponse = err;
      }
    }

    if(pgResponse instanceof Error)
      return response.status(400).json({ error: pgResponse });

    if(!pgResponse)
      return response.status(404).json({ status: 'error', message: 'User not found' })

    return response.status(200).json(pgResponse);
  }

  return response.status(400).json({ message: 'Invalid method' });
}