import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { TaskStatuses } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRespository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRespository)
    private readonly taskRepository: TaskRespository,
  ) {}

  async getTasks(filterDto: SearchTaskDto, user: User): Promise<Task[]> {
    // const { status, search } = filterDto;

    const tasks = await this.taskRepository.getTasks(filterDto, user);

    return tasks;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ id: id, userId: user.id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = await this.taskRepository.createTask(createTaskDto, user);

    return task;
  }

  async deleteTask(id: number, user) {
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task With ID ${id} not found`);
    }
    return result;
  }
  async updateTaskStatus(
    id: number,
    status: TaskStatuses,
    user: User,
  ): Promise<Task> {
    const taskFound = await this.getTaskById(id, user);

    taskFound.status = status;
    await taskFound.save();
    return taskFound;
  }
}
