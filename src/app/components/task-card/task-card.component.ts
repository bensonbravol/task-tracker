import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {

  @Input() task!: Task;

  @Output() completed = new EventEmitter<Task>();

  @Output() reopened = new EventEmitter<Task>();

  @Output() deleted = new EventEmitter<Task>();


  markCompleted() {
    this.completed.emit(this.task);
  }


  reopenTask() {
    this.reopened.emit(this.task);
  }


  deleteTask() {
    this.deleted.emit(this.task);
  }

}
