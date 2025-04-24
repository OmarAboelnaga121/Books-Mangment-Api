import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class updateStatusDto {
    @ApiProperty({ 
        description: 'The Status Of The Book',
        type: Boolean 
    })
    @IsBoolean()
    status: boolean;
}