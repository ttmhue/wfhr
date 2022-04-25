import { IsNotEmpty } from 'class-validator'

export class RequestDto {  
    @IsNotEmpty()      
    reason: string;

    @IsNotEmpty()
    requested_date_start: Date
    requested_date_end: Date
    is_allday: boolean
    status: string
}
