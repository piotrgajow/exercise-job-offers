import { LocalDateTime } from 'js-joda';

export class User {
    id: number;
    login: string;
    password: string;
    creationDate: LocalDateTime;
}
