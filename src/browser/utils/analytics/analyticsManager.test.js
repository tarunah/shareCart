import { eventsConfig } from './analyticsManager';
import forEach from 'lodash/forEach';

describe('analytics manager', () => {
  it('ga payload should be in proper format', () => {
    forEach(eventsConfig, (config, event) => {
      if (config.ga) {
        const args = { event, data: { gaLabel: '' } };
        const expectedPayloadKeys = [
          'eventType',
          'category',
          'action',
          'label'
        ];
        const gaConfig = eventsConfig[args.event].ga;
        const testPayloadKeys = Object.keys(gaConfig(args.data));

        const eventType = gaConfig(args.data).eventType;
        if (eventType !== 'pageView' && eventType !== 'ec') {
          expect(testPayloadKeys).toEqual(expectedPayloadKeys);
        }
      }
    });
  });

  it('ma payload should be in proper format', () => {
    forEach(eventsConfig, (config, event) => {
      if (config.ma) {
        const args = { event, data: { maData: {}, custom: {} } };
        const expectedPayloadKeys = ['event', 'data', 'custom', 'immediate'];

        const maConfig = eventsConfig[args.event].ma;
        const testPayloadKeys = Object.keys(maConfig(args.data));

        expect(testPayloadKeys).toEqual(expectedPayloadKeys);
      }
    });
  });
});
