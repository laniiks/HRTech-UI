import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ICommentModel} from '../models/comment/comment-model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private ROOT_URL = `api/Comment`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8;'
    })
  };

  constructor(private readonly http: HttpClient) {
  }

  getAllCommentByEvaluation(id: Guid){
    return this.http.get<ICommentModel[]>(`${this.ROOT_URL}/List/${id}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  create(evaluationId: Guid, textComment: string): Observable<ICommentModel> {
    return this.http.post<ICommentModel>(`${this.ROOT_URL}?evaluationId=${evaluationId}`,
      {'textComment' : textComment}, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  edit(commentId: number, textComment: string) {
    return this.http.put(`${this.ROOT_URL}`, {'id':commentId, 'text':textComment})
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  delete(commentId: number) {
    return this.http.delete<ICommentModel>(`${this.ROOT_URL}/${commentId}`)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(e) {
    let errorMessage = '';
    if (e.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = e.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${e.status}\nMessage: ${e.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
