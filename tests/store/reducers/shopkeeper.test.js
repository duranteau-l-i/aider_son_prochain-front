import { expect } from 'chai';
import shopkeeperReducer, {
  initialState,
  RECIEVE_SHOP,
} from '../../../src/store/reducers/shopkeeper';
import { shopkeeper } from '../../__mocks__/shopkeeper';

describe('Shopkeeper reducer', () => {
  it('should return the initial state', () => {
    expect(shopkeeperReducer(undefined, {})).to.equal(initialState);
  });

  it('should handle RECIEVE_SHOP', () => {
    expect(
      shopkeeperReducer(initialState, {
        type: RECIEVE_SHOP,
        data: {
          shopkeeper,
        },
      }),
    ).to.deep.equal({
      ...initialState,
      shopkeeper: {
        opening_hours: {
          monday: {
            morning_open: 8,
            morning_close: 12.15,
            afternoon_open: 14,
            afternoon_close: 17.3,
          },
          tuesday: {
            morning_open: 8,
            morning_close: 12.15,
            afternoon_open: 14,
            afternoon_close: 17.3,
          },
          thursday: {
            morning_open: 8,
            morning_close: 12.15,
            afternoon_open: 14,
            afternoon_close: 17.3,
          },
          wednesday: {
            morning_open: 8,
            morning_close: 12.15,
            afternoon_open: 14,
            afternoon_close: 17.3,
          },
          friday: {
            morning_open: 8,
            morning_close: 12.15,
            afternoon_open: 14,
            afternoon_close: 17.3,
          },
          saturday: {
            morning_open: 8,
            morning_close: 12.15,
            afternoon_open: 14,
            afternoon_close: 17.3,
          },
          sunday: {
            morning_open: 0,
            morning_close: 0,
            afternoon_open: 0,
            afternoon_close: 0,
          },
        },
        phone: 600000000,
        categories: ['restauration'],
        description: '',
        location: {
          address: '110-120 D11, 92250 La Garenne-Colombes, France',
          latitude: 48.902709,
          longitude: 2.244565,
        },
        distance: 0,
        active: false,
        _id: '5d6b86d5e5f50f2f3c63b775',
        username: 'Shopkeeper_1',
        firstname: 'shopkeeper1',
        lastname: 'test1',
        email: 'shopkeeper1@gmail.com',
        shopkeeper_name: 'Café du coin 1',
        updated_at: '2019-09-01T08:52:39.050Z',
        created_at: '2019-09-01T08:52:39.086Z',
        __v: 0,
        avatar:
          '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',
      },
    });
  });
});
