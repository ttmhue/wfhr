import { IsNotEmpty } from 'class-validator'

export class CreateRequestDto {  
    @IsNotEmpty()      
    reason: string;

    @IsNotEmpty()
    requested_date_start: Date

    requested_date_end: Date
    created_by: number
}
