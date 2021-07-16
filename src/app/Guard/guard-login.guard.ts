import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root'})
export class GuardLoginGuard implements CanActivate {
constructor(private authServi: AuthService) { }

canActivate(): Observable<boolean>{
    return this.authServi.IsLoggeg.pipe(
take(1),
map((islogged: boolean) => !islogged)
);
}
}
