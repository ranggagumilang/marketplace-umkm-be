import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { RegisterUser } from '../../../src/domain/usecases/auth/RegisterUser.js';

describe('RegisterUser Use Case', () => {
  let mockUserRepository;
  let useCase;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test_secret_key';
    process.env.JWT_EXPIRES_IN = '1d';
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    useCase = new RegisterUser(mockUserRepository);
  });

  it('should throw an error if email is already registered', async () => {
    mockUserRepository.findByEmail.mockResolvedValue({ id_user: 1, email: 'test@example.com' });

    await expect(useCase.execute({ email: 'test@example.com', password: 'password123', nama: 'Fahri' }))
      .rejects.toEqual({
        statusCode: 400,
        message: 'Email sudah terdaftar',
        errorCode: 'DUPLICATE_EMAIL'
      });

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });

  it('should hash password, create user and return a token with user data', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue({
      id_user: 2,
      nama: 'Fahri',
      email: 'test@example.com',
      password: 'hashed_password123'
    });

    const result = await useCase.execute({
      nama: 'Fahri',
      email: 'test@example.com',
      password: 'password123'
    });

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(result).toHaveProperty('token');
    expect(result.user).toEqual({
      id_user: 2,
      nama: 'Fahri',
      email: 'test@example.com',
      role: 'user'
    });
  });
});
