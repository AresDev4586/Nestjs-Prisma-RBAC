import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    private APP_ROUTES = [
        {
            API: "Running!!",
            description: "Go to User route"
        }
    ]

    getAppIndex(){
        return this.APP_ROUTES
    }
}