import type { Photo } from "../domains";

export class PhotoService {
  private static readonly STORAGE_KEY = "photos";

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

  /**
   * Сохраняет фотографии в localStorage
   * @param photos Массив фотографий для сохранения
   */
  public static savePhotos(photos: Photo[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(photos));
    } catch (error) {
      console.error("Ошибка при сохранении в localStorage:", error);
    }
  }
}
