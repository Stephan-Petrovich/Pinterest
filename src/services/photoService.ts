import type { Photo } from "../domains";

export class PhotoService {
  private static readonly STORAGE_KEY = "photos"; // Это ключи для сохранения/загрузки фотографий из локального хранилища.

  /**
   * Сохраняет фотографии в localStorage
   * @param photos Массив фотографий для сохранения
   */
  public static savePhotos(photos: Photo[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(photos)); // Как работает связка this с STORAGE_KEY?
    } catch (error) {
      console.error("Ошибка при сохранении в localStorage:", error);
    }
  }

  /**
   * Получает сохранённые фотографии из localStorage
   * @returns Массив фотографий или null, если данных нет
   */
  public static getSavedPhotos(): Photo[] | null {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error("Ошибка при чтении из localStorage:", error);
      return null;
    }
  }

  static getPhotoById(photoId: number): Photo | undefined {
    const photos = this.getSavedPhotos();
    return photos?.find((p) => p.id === photoId);
  }
}
