import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { SendNotifikasi } from '../../../src/domain/usecases/notifikasi/SendNotifikasi.js';

describe('SendNotifikasi Use Case', () => {
  let mockNotifikasiRepository;
  let useCase;

  beforeEach(() => {
    mockNotifikasiRepository = {
      create: jest.fn(),
    };
    useCase = new SendNotifikasi(mockNotifikasiRepository);
  });

  it('should call repository.create with notification data and return created notification', async () => {
    const mockInput = {
      id_user: 1,
      pesan: 'Pesanan Anda sedang diproses'
    };

    const mockResponse = {
      id_notifikasi: 1,
      status_baca: false,
      tanggal: new Date(),
      ...mockInput
    };

    mockNotifikasiRepository.create.mockResolvedValue(mockResponse);

    const result = await useCase.execute(mockInput);

    expect(mockNotifikasiRepository.create).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockResponse);
  });
});
