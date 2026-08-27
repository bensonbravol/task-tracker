import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '../../models/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task!: Task;

  @Input() showActions = false;

  @Output() completed = new EventEmitter<Task>();

  @Output() reopened = new EventEmitter<Task>();

  @Output() deleted = new EventEmitter<Task>();

  markCompleted(): void {
    this.completed.emit(this.task);
  }

  reopenTask(): void {
    this.reopened.emit(this.task);
  }

  deleteTask(): void {
    this.deleted.emit(this.task);
  }
}
