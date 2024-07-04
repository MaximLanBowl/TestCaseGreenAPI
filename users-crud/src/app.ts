// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { ColumnEntity } from './column.entity';

// @Entity('projects')
// export class ProjectEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @OneToMany(() => ColumnEntity, (column) => column.project)
//   columns: ColumnEntity[];
// }

// // column.entity.ts
// import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { ProjectEntity } from './project.entity';
// import { TaskEntity } from './task.entity';

// @Entity('columns')
// export class ColumnEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   order: number;

//   @ManyToOne(() => ProjectEntity, (project) => project.columns)
//   project: ProjectEntity;

//   @OneToMany(() => TaskEntity, (task) => task.column)
//   tasks: TaskEntity[];
// }

// // task.entity.ts
// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { ColumnEntity } from './column.entity';

// @Entity('tasks')
// export class TaskEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   status: string;

//   @ManyToOne(() => ColumnEntity, (column) => column.tasks)
//   column: ColumnEntity;
// }
// Контроллеры и сервисы:
// // project.controller.ts
// import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
// import { ProjectService } from './project.service';
// import { ProjectEntity } from './project.entity';
// import { AuthGuard } from '@nestjs/passport';
// import { OwnerGuard } from './guards/owner.guard';

// @Controller('projects')
// @UseGuards(AuthGuard('jwt'), OwnerGuard)
// export class ProjectController {
//   constructor(private projectService: ProjectService) {}

//   @Post()
//   createProject(@Body() project: ProjectEntity): Promise<ProjectEntity> {
//     return this.projectService.createProject(project);
//   }

//   @Put(':id')
//   updateProject(@Param('id') id: number, @Body() project: ProjectEntity): Promise<ProjectEntity> {
//     return this.projectService.updateProject(id, project);
//   }

//   @Delete(':id')
//   deleteProject(@Param('id') id: number): Promise<void> {
//     return this.projectService.deleteProject(id);
//   }
// }

// // column.controller.ts
// import { Body, Controller, Delete, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
// import { ColumnService } from './column.service';
// import { ColumnEntity } from './column.entity';
// import { AuthGuard } from '@nestjs/passport';
// import { OwnerGuard } from './guards/owner.guard';

// @Controller('projects/:projectId/columns')
// @UseGuards(AuthGuard('jwt'), OwnerGuard)
// export class ColumnController {
//   constructor(private columnService: ColumnService) {}

//   @Post()
//   createColumn(@Param('projectId') projectId: number, @Body() column: ColumnEntity): Promise<ColumnEntity> {
//     return this.columnService.createColumn(projectId, column);
//   }

//   @Put(':columnId')
//   updateColumn(@Param('projectId') projectId: number, @Param('columnId') columnId: number, @Body() column: ColumnEntity): Promise<ColumnEntity> {
//     return this.columnService.updateColumn(projectId, columnId, column);
//   }

//   @Delete(':columnId')
//   deleteColumn(@Param('projectId') projectId: number, @Param('columnId') columnId: number): Promise<void> {
//     return this.columnService.deleteColumn(projectId, columnId);
//   }

//   @Patch(':columnId/move')
//   moveColumn(@Param('projectId') projectId: number, @Param('columnId') columnId: number, @Body() order: number): Promise<ColumnEntity> {
//     return this.columnService.moveColumn(projectId, columnId, order);
//   }
// }

// // task.controller.ts
// import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
// import { TaskService } from './task.service';
// import { TaskEntity } from './task.entity';
// import { AuthGuard } from '@nestjs/passport';
// import { OwnerGuard } from './guards/owner.guard';

// @Controller('projects/:projectId/columns/:columnId/tasks')
// @UseGuards(AuthGuard('jwt'), OwnerGuard)
// export class TaskController {
//   constructor(private taskService: TaskService) {}

//   @Post()
//   createTask(@Param('projectId') projectId: number, @Param('columnId') columnId: number, @Body() task: TaskEntity): Promise<TaskEntity> {
//     return this.taskService.createTask(projectId, columnId, task);
//   }

//   @Put(':taskId')
//   updateTask(@Param('projectId') projectId: number, @Param('columnId') columnId: number, @Param('taskId') taskId: number, @Body() task: TaskEntity): Promise<TaskEntity> {
//     return this.taskService.updateTask(projectId, columnId, taskId, task);
//   }

//   @Delete(':taskId')
//   deleteTask(@Param('projectId') projectId: number, @Param('columnId') columnId: number, @Param('taskId') taskId: number): Promise<void> {
//     return this.taskService.deleteTask(projectId, columnId, taskId);
//   }
// }
// Сервисы:
// // project.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { ProjectEntity } from './project.entity';

// @Injectable()
// export class ProjectService {
//   constructor(
//     @InjectRepository(ProjectEntity)
//     private projectRepository: Repository<ProjectEntity>,
//   ) {}

//   createProject(project: ProjectEntity): Promise<ProjectEntity> {
//     return this.projectRepository.save(project);
//   }

//   updateProject(id: number, project: ProjectEntity): Promise<ProjectEntity> {
//     return this.projectRepository.save({ id, ...project });
//   }

//   deleteProject(id: number): Promise<void> {
//     return this.projectRepository.delete(id);
//   }
// }

// // column.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { ColumnEntity } from './column.entity';
// import { ProjectEntity } from './project.entity';

// @Injectable()
// export class ColumnService {
//   constructor(
//     @InjectRepository(ColumnEntity)
//     private columnRepository: Repository<ColumnEntity>,
//     @InjectRepository(ProjectEntity)
//     private projectRepository: Repository<ProjectEntity>,
//   ) {}

//   createColumn(projectId: number, column: ColumnEntity): Promise<ColumnEntity> {
//     const project = await this.projectRepository.findOne(projectId);
//     column.project = project;
//     return this.columnRepository.save(column);
//   }

//   updateColumn(projectId: number, columnId: number, column: ColumnEntity): Promise<ColumnEntity> {
//     const project = await this.projectRepository.findOne(projectId);
//     return this.columnRepository.save({ id: columnId, project, ...column });
//   }

//   deleteColumn(projectId: number, columnId: number): Promise<void> {
//     return this.columnRepository.delete({ id: columnId, project: { id: projectId } });
//   }

//   moveColumn(projectId: number, columnId: number, order: number): Promise<ColumnEntity> {
//     const column = await this.columnRepository.findOne({ id: columnId, project: { id: projectId } });
//     column.order = order;
//     return this.columnRepository.save(column);
//   }
// }

// // task.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TaskEntity } from './task.entity';
// import { ColumnEntity } from './column.entity';
// import { ProjectEntity } from './project.entity';

// @Injectable()
// export class TaskService {
//   constructor(
//     @InjectRepository(TaskEntity)
//     private taskRepository: Repository<TaskEntity>,
//     @InjectRepository(ColumnEntity)
//     private columnRepository: Repository<ColumnEntity>,
//     @InjectRepository(ProjectEntity)
//     private projectRepository: Repository<ProjectEntity>,
//   ) {}

//   createTask(projectId: number, columnId: number, task: TaskEntity): Promise<TaskEntity> {
//     const column = await this.columnRepository.findOne({ id: columnId, project: { id: projectId } });
//     task.column = column;
//     return this.taskRepository.save(task);
//   }

//   updateTask(projectId: number, columnId: number, taskId: number, task: TaskEntity): Promise<TaskEntity> {
//     const column = await this.columnRepository.findOne({ id: columnId, project: { id: projectId } });
//     return this.taskRepository.save({ id: taskId, column, ...task });
//   }

//   deleteTask(projectId: number, columnId: number, taskId: number): Promise<void> {
//     return this.taskRepository.delete({ id: taskId, column: { id: columnId, project: { id: projectId } } });
//   }
// }
// Guards:
// // owner.guard.ts
// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { ProjectEntity } from './project.entity';

// @Injectable()
// export class OwnerGuard implements CanActivate {
//   constructor(
//     @InjectRepository(ProjectEntity)
//     private projectRepository: Repository<ProjectEntity>,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const projectId = request.params.projectId;

//     if (!projectId) {
//       return true;
//     }

//     const project = await this.projectRepository.findOne(projectId);
//     return project && project.userId === request.user.id;
//   }
// }
// Авторизация и права доступа:
// Для реализации аутентификации и авторизации можно использовать Nest.js модуль @nestjs/passport. Например, можно использовать JWT-based аутентификацию.

// // auth.module.ts
// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { AuthService } from './auth.service';
// import { JwtStrategy } from './jwt.strategy';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '60s' },
//     }),
//   ],
//   providers: [AuthService, JwtStrategy],
//   exports: [AuthService],
// })
// export class AuthModule {}