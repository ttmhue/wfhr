import { SetMetadata } from '@nestjs/common';

export const accessibility = (
  hasRole: string,
  hasPermission: string,
  hasAction: string,
) => {
  SetMetadata('role', hasRole);
  SetMetadata('permission', hasPermission);
  SetMetadata('action', hasAction);
};
