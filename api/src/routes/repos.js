import { Router, Request, Response } from 'express';
import axios from 'axios';

export const repos = Router();

repos.get('/', async (_, res) => {
  res.header('Cache-Control', 'no-store');

  const silverOrangeRepos = await axios
    .get('https://api.github.com/users/silverorange/repos')
    .catch(({ response: { status, statusText } }) => {
      res.status(status).send(`${status}: ${statusText}`);
    });

  const unforkedRepos = silverOrangeRepos.data.filter(
    (repo) => repo.fork === false
  );

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json(unforkedRepos);
});
