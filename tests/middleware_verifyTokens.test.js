import { verifyToken } from '../middlewares/verifyToken';
import auth from '../config/firebase-config';

describe('verifyToken Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: ''
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test('should return 401 if no token is provided', async () => {
    await verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Empty Token' });
  });

  test('should return 401 if token is invalid', async () => {
    req.headers.authorization = 'Bearer invalid_token';
    auth.verifyIdToken = jest.fn().mockRejectedValue(new Error('Invalid token'));

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  test('should return 200 and call next if token is valid', async () => {
    const decodedValue = { uid: '12345' };
    req.headers.authorization = 'Bearer valid_token';
    auth.verifyIdToken = jest.fn().mockResolvedValue(decodedValue);

    await verifyToken(req, res, next);

    expect(req.user).toBe(decodedValue);
    expect(next).toHaveBeenCalled();
  });

  test('should return 500 if there is an internal error', async () => {
    req.headers.authorization = 'Bearer some_token';
    auth.verifyIdToken = jest.fn().mockImplementation(() => {
      throw new Error('Internal error');
    });

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Error' });
  });
});
