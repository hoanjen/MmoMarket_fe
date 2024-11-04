import axios from '../index';
import { valiQuery } from '../../utils/validator';
import { ResponseMessageChat, ResponseSideBarChat } from './types';

export class ChatBoxApi {
  public static async getSideBarByToken(limit: string | number, cursor: string): Promise<ResponseSideBarChat> {
    return axios.get(`/chat/sidebar-chat?limit=${limit}&cursor=${cursor}`).then((_) => _.data);
  }
  public static async getMessageByGroupId(
    limit: string | number,
    cursor: string,
    group_id: string,
  ): Promise<ResponseMessageChat> {
    return axios.get(`/chat/messages?limit=${limit}&cursor=${cursor}&group_id=${group_id}`).then((_) => _.data);
  }

  public static async sendMessage({
    text,
    file,
    file_name,
    group_id,
  }: {
    text: string;
    file: string;
    file_name: string;
    group_id: string | null;
  }): Promise<ResponseMessageChat> {
    return axios.post(`/chat`, { text, file, file_name, group_id }).then((_) => _.data);
  }
}
