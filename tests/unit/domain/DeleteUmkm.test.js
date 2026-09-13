import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { DeleteUmkm } from '../../../src/domain/usecases/umkm/DeleteUmkm.js';

describe('DeleteUmkm Use Case', () => {
  let mockUmkmRepository;
  let useCase;

  beforeEach(() => {
    mockUmkmRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new DeleteUmkm(mockUmkmRepository);
  });

  it('should successfully delete UMKM when UMKM exists and has no products', async () => {
    const mockUmkm = {
      id_umkm: 1,
      nama_umkm: 'Marning Pak Anam',
      produk: [],
    };
    mockUmkmRepository.findById.mockResolvedValue(mockUmkm);
    mockUmkmRepository.delete.mockResolvedValue(mockUmkm);

    const result = await useCase.execute(1);

    expect(mockUmkmRepository.findById).toHaveBeenCalledWith(1);
    expect(mockUmkmRepository.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUmkm);
  });

  it('should throw 400 error when UMKM still has products linked', async () => {
    const mockUmkm = {
      id_umkm: 26,
      nama_umkm: 'Kripik Singkong Pak Rizal',
      produk: [
        { id_produk: 101, nama_produk: 'Kripik Singkong Balado' }
      ],
    };
    mockUmkmRepository.findById.mockResolvedValue(mockUmkm);

    await expect(useCase.execute(26)).rejects.toMatchObject({
      statusCode: 400,
      errorCode: 'UMKM_HAS_PRODUCTS',
    });

    expect(mockUmkmRepository.findById).toHaveBeenCalledWith(26);
    expect(mockUmkmRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw 404 error when UMKM is not found', async () => {
    mockUmkmRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(999)).rejects.toMatchObject({
      statusCode: 404,
      errorCode: 'NOT_FOUND',
    });

    expect(mockUmkmRepository.findById).toHaveBeenCalledWith(999);
    expect(mockUmkmRepository.delete).not.toHaveBeenCalled();
  });
});
