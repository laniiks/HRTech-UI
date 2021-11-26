export interface ICommentModel {
  id: number;
  textComment: string;
  createdDateTime: Date;
  advertisementId: number;
  applicationUserId: string;
  userName: string;
}
