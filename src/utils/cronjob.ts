import * as cron from 'node-cron'
import { wishEmployeesBirthday, wishWorkAnniversary } from '../controllers/Mailer';

cron.schedule('0 0 * * *', () => {
  wishEmployeesBirthday()
});

cron.schedule('59 7 * * *', () => {
  wishWorkAnniversary()
});
