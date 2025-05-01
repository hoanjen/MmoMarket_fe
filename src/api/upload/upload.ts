import axios from '../index';
import { ResponseFileImage } from './type';

export class UploadApi {
  public static async uploadImage(file: File | string): Promise<ResponseFileImage | any> {
    const formData = new FormData();
    formData.append('files', file);
    return axios
      .post(`/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((_) => _.data);
  }
}
