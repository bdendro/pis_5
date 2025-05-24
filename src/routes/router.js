import { Router } from 'express';
import createApiClient from '../utils/createApiClient.js';
import { BadRequestError, NotFoundError } from '../utils/customErrors.js';

const router = Router();

const client = createApiClient(
  process.env.WEATHER_BASE_URL,
  { key: process.env.WEATHER_API_KEY, lang: 'uk' },
  'WeatherAPI'
);

router.get('/', (req, res) => {
  return res.render('index');
});

router.get('/weather', async (req, res) => {
  if (req.query && Object.keys(req.query).length === 0) {
    return res.render('weather');
  }

  const city = req.query.city?.trim();
  if (!city) {
    return res.render('weather', { error: new BadRequestError(`Invalid city: '${city}'`) });
  }

  try {
    const { data } = await client.get('/current.json', {
      params: { q: city },
    });
    console.log({
      city,
      temperature: data.current?.temp_c,
      humidity: data.current?.humidity,
      description: data.current?.condition?.text,
      date: data.current?.last_updated,
    });
    return res.render('weather', {
      weather: {
        city,
        temperature: data.current?.temp_c,
        humidity: data.current?.humidity,
        description: data.current?.condition?.text,
        date: data.current?.last_updated,
      },
    });
  } catch (err) {
    if (err.response?.data?.error?.code === 1006) {
      return res.render('weather', { error: new NotFoundError(`City '${city}' not found`) });
    }
    return res.render('weather', { error: err });
  }
});

router.get('/login', (req, res) => {
  return res.render('login');
});

router.get('/api/weather', async (req, res) => {});

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.render('login', { error: new BadRequestError('Invalid body') });
  }
  if (login !== process.env.USER_LOGIN || password !== process.env.USER_PASSWORD) {
    return res.render('login', { error: new BadRequestError('Invalid login or password') });
  }
  return res.render('login-info', {
    user: {
      name: process.env.USER_NAME,
      course: process.env.USER_COURSE,
      group: process.env.USER_GROUP,
    },
  });
});

export default router;
