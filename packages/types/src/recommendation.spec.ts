import { Recommendation } from './recommendation';

describe('Recommendation type', () => {
  it('accepts minimal required fields', () => {
    const rec: Recommendation = {
      id: 'r1',
      movieId: 'm1',
      fromUserId: 'u1',
      toUserId: 'u2',
      note: 'Because it blends genres you love',
      createdAt: new Date().toISOString()
    };
    expect(rec.movieId).toBe('m1');
  });
});
