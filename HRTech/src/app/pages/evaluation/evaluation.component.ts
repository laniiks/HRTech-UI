import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { pluck, take } from 'rxjs/operators';
import { ICommentModel } from 'src/app/models/comment/comment-model';
import { IEvaluationModel, IEvaluationModelGetById } from 'src/app/models/evaluation/evaluation-model';
import { CommentService } from 'src/app/services/comment.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  evaluationsForUser$: Observable<IEvaluationModel>;
  evaluation: IEvaluationModelGetById;
  comments$: Observable<ICommentModel[]>;
  commentForm: FormGroup;


  constructor(private readonly evaluationService: EvaluationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly commentService: CommentService,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.loadEvaluation();
    this.commentForm = this.formBuilder.group(
      {
        id: 0,
        textComment: ['']
      }
    );
  }

  loadEvaluation(){
    this.activatedRoute.params.pipe(pluck('id')).subscribe(evaluationId => {
      this.evaluationService.getByIdEvaluation(evaluationId).subscribe(evaluation => {
        this.evaluation = evaluation;
        this.comments$ = this.commentService.getAllCommentByEvaluation(evaluation.id);
      })
    })
  }
  addComment() {
    const textComment = this.commentForm.get('textComment').value;
    if (textComment) {
      this.commentService.create(this.evaluation.id, textComment)
        .pipe(take(1))
        .subscribe(() => {
          this.toastService.show(`Комментарий добавлен`,
            {classname: 'bg-success text-light'});
          location.reload();
        });
    } else {
      this.toastService.show(`Текст комментария не может быть пустым`,
        {classname: 'bg-danger text-light'});
    }
  }
  softSkill(evaluationId: Guid, skillSuccess: number){
    return this.evaluationService.successEvaluationSoftSkill(evaluationId, skillSuccess).subscribe(() => location.reload())
  }
  hardSkill(evaluationId: Guid, skillSuccess: number){
    return this.evaluationService.successEvaluationHardSkill(evaluationId, skillSuccess).subscribe(() => location.reload())
  }
  englishSkill(evaluationId: Guid, skillSuccess: number){
    return this.evaluationService.successEvaluationEnglishSkill(evaluationId, skillSuccess).subscribe(() => location.reload())
  }
}
