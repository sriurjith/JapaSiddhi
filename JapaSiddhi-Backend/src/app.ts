import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import authRoutes from './modules/auth/auth.routes';
import homeRoutes from './modules/home/home.routes';
import japaRoutes from './modules/japa/japa.routes';
import japaGoalRoutes from './modules/japaGoal/japaGoal.routes';
import personalMantraRoutes from './modules/personalMantra/personalMantra.routes';
import festivalRoutes from './modules/festival/festival.routes';
import notificationRoutes from './modules/notification/notification.routes';
import donationRoutes from './modules/donation/donation.routes';
import familyRoutes from './modules/family/family.routes';
import profileRoutes from './modules/profile/profile.routes';
import masterRoutes from './modules/master/master.routes';
import orderRoutes from './modules/orders/order.routes';
import banaLingamRoutes from './modules/banaLingam/banaLingam.routes';
import customerCareRoutes from './modules/customerCare/customerCare.routes';
import feedbackRoutes from './modules/feedback/feedback.routes';
import challengeRoutes from './modules/challenge/challenge.routes';
import reportRoutes from './modules/report/report.routes';
const app = express();


app.use(cors());

app.use(helmet());

app.use(compression());


app.use(
  express.json({
    limit: '20mb',
  }),
);


app.use(
  express.urlencoded({
    extended: true,
    limit: '20mb',
  }),
);


app.use(morgan('dev'));



app.get('/', (_, res) => {
  res.status(200).json({
    success: true,
    application: 'Japa Siddhi Backend',
    version: '1.0.0',
    status: 'Running',
  });
});



app.use(
  '/api/v1/auth',
  authRoutes,
);
app.use(
  '/api/v1/home',
  homeRoutes,
);
app.use(
  '/api/v1/japa',
  japaRoutes,
);
app.use(
  '/api/v1/japa-goals',
  japaGoalRoutes,
);
app.use(
  '/api/v1/personal-mantras',
  personalMantraRoutes,
);
app.use(
  '/api/v1/festivals',
  festivalRoutes,
);
app.use(
  '/api/v1/notifications',
  notificationRoutes,
);
app.use(
  '/api/v1/donations',
  donationRoutes,
);
app.use(
  '/api/v1/family',
  familyRoutes,
);
app.use(
  '/api/v1/profile',
  profileRoutes,
);
app.use(
  '/api/v1/master',
  masterRoutes,
);
app.use(
  '/api/v1/orders',
  orderRoutes,
);
app.use(
  '/api/v1/bana-lingam',
  banaLingamRoutes,
);
app.use(
  '/api/v1/customer-care',
  customerCareRoutes,
);
app.use(
  '/api/v1/feedback',
  feedbackRoutes,
);
app.use(
  '/api/v1/challenges',
  challengeRoutes,
);
app.use(
  '/api/v1/reports',
  reportRoutes,
);
export default app;