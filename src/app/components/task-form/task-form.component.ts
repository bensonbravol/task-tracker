import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {

  @Output() taskCreated = new EventEmitter<Omit<Task, 'id'>>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.taskForm = this.fb.group({

      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],

      description: [
        '',
        [
          Validators.maxLength(200),
        ],
      ],

      priority: [
        'Medium',
        Validators.required,
      ],

    });
  }

  submitTask() {

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const newTask: Omit<Task, 'id'> = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      priority: this.taskForm.value.priority,
      completed: false,
      createdAt: new Date(),
    };

    console.log('New task:', newTask);

    this.taskCreated.emit(newTask);

    this.taskForm.reset({
      title: '',
      description: '',
      priority: 'Medium',
    });
  }
}
