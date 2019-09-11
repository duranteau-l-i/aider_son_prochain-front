import { expect } from 'chai';
import beneficiaryReducer, {
  initialState,
  RECIEVE_BENEFICIARY,
} from '../../../src/store/reducers/beneficiary';
import { beneficiary } from '../../__mocks__/beneficiary';

describe('Beneficiary reducer', () => {
  it('should return the initial state', () => {
    expect(beneficiaryReducer(undefined, {})).to.equal(initialState);
  });

  it('should handle RECIEVE_BENEFICIARY', () => {
    expect(
      beneficiaryReducer(initialState, {
        type: RECIEVE_BENEFICIARY,
        data: {
          beneficiary,
        },
      }),
    ).to.deep.equal({
      ...initialState,
      beneficiary: {
        firstname: 'Marcel',
        lastname: 'Dupond',
        email: '',
        description: '',
        location: {
          address: '22-24 Rue Maurice Berteaux, 95870 Bezons, France',
          latitude: 48.924537,
          longitude: 2.215072,
        },
        distance: 0,
        active: false,
        _id: '5d6b86d5e5f50f2f3c63b774',
        username: 'Beneficiary_3',
        updated_at: '2019-09-01T08:52:38.639Z',
        created_at: '2019-09-01T08:52:38.668Z',
        __v: 0,
      },
    });
  });
});
