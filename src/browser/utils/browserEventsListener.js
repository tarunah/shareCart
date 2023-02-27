import { browserStatsdCleanup } from 'commonBrowserUtils/browserStatsdMiddleware';

window.onbeforeunload = () => {
  browserStatsdCleanup();
};
