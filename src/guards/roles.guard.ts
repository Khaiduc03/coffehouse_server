// import {
//     type CanActivate,
//     type ExecutionContext,
//     Injectable,
//   } from '@nestjs/common';
//   import { Reflector } from '@nestjs/core';
//   import _ from 'lodash';
// import { CustomerEntity } from 'src/entity/customer.entity';

// import { RoleType } from 'src/types/role-type';

//   @Injectable()
//   export class RolesGuard implements CanActivate {
//     constructor(private readonly reflector: Reflector) {}

//     canActivate(context: ExecutionContext): boolean {
//       const roles = this.reflector.get<RoleType[]>('roles', context.getHandler());

//       if (_.isEmpty(roles)) {
//         return true;
//       }

//       const request = context.switchToHttp().getRequest();
//       const user = <CustomerEntity>request.user;

//       return roles.includes(user.role);
//     }
//   }
