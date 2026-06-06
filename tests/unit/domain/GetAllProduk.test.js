import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { GetAllProduk } from '../../../src/domain/usecases/produk/GetAllProduk.js';

describe('GetAllProduk Use Case', () => {
  let mockProdukRepository;
  let useCase;

  beforeEach(() => {
    mockProdukRepository = {
      findAll: jest.fn(),
    };
    useCase = new GetAllProduk(mockProdukRepository);
  });

  it('should return paginated list of produk from repository with default values', async () => {
    const mockProducts = [
      { id_produk: 1, nama_produk: 'Produk A', harga: 10000, stok: 5 },
      { id_produk: 2, nama_produk: 'Produk B', harga: 20000, stok: 10 }
    ];
    mockProdukRepository.findAll.mockResolvedValue(mockProducts);

    const result = await useCase.execute();

    expect(mockProdukRepository.findAll).toHaveBeenCalledWith({ page: 1, limit: 12 });
    expect(result).toEqual(mockProducts);
  });

  it('should pass custom page and limit parameters to repository', async () => {
    mockProdukRepository.findAll.mockResolvedValue([]);

    await useCase.execute({ page: 2, limit: 5 });

    expect(mockProdukRepository.findAll).toHaveBeenCalledWith({ page: 2, limit: 5 });
  });
});
