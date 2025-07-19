import { SetMetadata } from '@nestjs/common';

export const Permission = (type: string) => SetMetadata('permission', type);