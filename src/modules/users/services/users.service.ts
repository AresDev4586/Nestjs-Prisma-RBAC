import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: "joe",
            email: "joe@gmail.com"
        },
        {
            id: 2,
            name: "Ares",
            email: "ares@gmail.com"
        },
        {
            id: 3,
            name: "say",
            email: "say@gmail.com"
        }
    ]

    
}
