import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { CreateTransaksi } from '../../../src/domain/usecases/transaksi/CreateTransaksi.js';

describe('CreateTransaksi Use Case', () => {
  let mockTransaksiRepository;
  let useCase;

  beforeEach(() => {
    mockTransaksiRepository = {
      create: jest.fn(),
    };
    useCase = new CreateTransaksi(mockTransaksiRepository);
  });

  it('should call repository.create with data and return created transaction', async () => {
    const mockInput = {
      id_user: 1,
      total_harga: 50000,
      metode_pembayaran: 'COD',
      items: [
        { id_produk: 1, jumlah: 2, subtotal: 50000 }
      ]
    };

    const mockResponse = {
      id_transaksi: 1,
      tanggal: new Date(),
      status: 'pending',
      ...mockInput
    };

    mockTransaksiRepository.create.mockResolvedValue(mockResponse);

    const result = await useCase.execute(mockInput);

    expect(mockTransaksiRepository.create).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockResponse);
  });
});
