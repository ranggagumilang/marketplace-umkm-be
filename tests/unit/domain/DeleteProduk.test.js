import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { DeleteProduk } from '../../../src/domain/usecases/produk/DeleteProduk.js';

describe('DeleteProduk Use Case', () => {
  let mockProdukRepository;
  let useCase;

  beforeEach(() => {
    mockProdukRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new DeleteProduk(mockProdukRepository);
  });

  it('should successfully delete product when it has no transactions', async () => {
    const mockProduk = {
      id_produk: 10,
      nama_produk: 'Produk Baru Tanpa Transaksi',
      detail_transaksi: [],
    };
    mockProdukRepository.findById.mockResolvedValue(mockProduk);
    mockProdukRepository.delete.mockResolvedValue(mockProduk);

    const result = await useCase.execute(10);

    expect(mockProdukRepository.findById).toHaveBeenCalledWith(10);
    expect(mockProdukRepository.delete).toHaveBeenCalledWith(10);
    expect(result).toEqual(mockProduk);
  });

  it('should throw 400 error when product has order history in detail_transaksi', async () => {
    const mockProduk = {
      id_produk: 35,
      nama_produk: 'Rengginang Ketan',
      detail_transaksi: [
        { id_detail: 1, id_transaksi: 4, jumlah: 1 }
      ],
    };
    mockProdukRepository.findById.mockResolvedValue(mockProduk);

    await expect(useCase.execute(35)).rejects.toMatchObject({
      statusCode: 400,
      errorCode: 'PRODUK_HAS_TRANSACTIONS',
    });

    expect(mockProdukRepository.findById).toHaveBeenCalledWith(35);
    expect(mockProdukRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw 404 error when product is not found', async () => {
    mockProdukRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(999)).rejects.toMatchObject({
      statusCode: 404,
      errorCode: 'NOT_FOUND',
    });

    expect(mockProdukRepository.findById).toHaveBeenCalledWith(999);
    expect(mockProdukRepository.delete).not.toHaveBeenCalled();
  });
});
