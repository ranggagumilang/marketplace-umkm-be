import { NewsRepository } from '../../data/repositories/NewsRepository.js';
import { GetAllNews } from '../../domain/usecases/news/GetAllNews.js';
import { GetNewsById } from '../../domain/usecases/news/GetNewsById.js';
import { CreateNews } from '../../domain/usecases/news/CreateNews.js';
import { UpdateNews } from '../../domain/usecases/news/UpdateNews.js';
import { DeleteNews } from '../../domain/usecases/news/DeleteNews.js';

const newsRepository = new NewsRepository();
const getAllNews = new GetAllNews(newsRepository);
const getNewsById = new GetNewsById(newsRepository);
const createNews = new CreateNews(newsRepository);
const updateNews = new UpdateNews(newsRepository);
const deleteNews = new DeleteNews(newsRepository);

export const index = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllNews.execute({ page: page ? +page : undefined, limit: limit ? +limit : undefined });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const show = async (req, res, next) => {
  try {
    const result = await getNewsById.execute(parseInt(req.params.id));
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const store = async (req, res, next) => {
  try {
    const data = { ...req.body, id_admin: req.user.id };
    const result = await createNews.execute(data);
    res.json({ success: true, message: 'Berita ditambahkan', data: result });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const result = await updateNews.execute(parseInt(req.params.id), req.body);
    res.json({ success: true, message: 'Berita diupdate', data: result });
  } catch (err) { next(err); }
};

export const destroy = async (req, res, next) => {
  try {
    await deleteNews.execute(parseInt(req.params.id));
    res.json({ success: true, message: 'Berita dihapus' });
  } catch (err) { next(err); }
};