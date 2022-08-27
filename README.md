# Angular 14 and NGRX Tutorial

### Building a scalable app/dashboard with Angular 14 & NGRX

```console
ng new ng

cli output:
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
✔ Packages installed successfully.
Successfully initialized git.
```

#### Move into new app directory

```console
cd ng
```

#### Open project in vsCode

```console
code .
```

#### Install ngrx and save as dependencies in package.json

```console
npm install @ngrx/{store,effects,entity,store-devtools} --save
```

#### Add ngrx schematics to ng cli

```console
ng add @ngrx/schematics

cli output:
ℹ Using package manager: npm
✔ Found compatible package version: @ngrx/schematics@14.2.0.
✔ Package information loaded.
The package @ngrx/schematics@14.2.0 will be installed and executed.
Would you like to proceed? Yes
✔ Packages successfully installed.
UPDATE angular.json
```

#### Use ngrx schematics to scaffold store for app

```console
ng generate store State --root --module app.module.ts

cli output:
CREATE src/app/reducers/index.ts
UPDATE src/app/app.module.ts
```

#### Create first angular feature module for authentication

```console
ng g module auth --module app --routing true

cli output:
CREATE src/app/auth/auth-routing.module.ts
CREATE src/app/auth/auth.module.ts
UPDATE src/app/app.module.ts
```

#### Add default route to src/app/app-routing.module.ts

```typescript
const routes: Routes = [{ path: "**", redirectTo: "/" }];
```

#### Remove Everything from boilerplate app.component.html except the router-outlet

#### Create Login Component for Auth feature module

```console
ng g component auth/login
```

#### Add route to src/app/auth/auth-routing.module.ts

```typescript
import { LoginComponent } from "./login/login.component";

const routes: Routes = [{ path: "", component: LoginComponent }];
```

#### Add auth state to auth feature module

```console
ng g store auth/Auth --module auth.module.ts

cli output:
CREATE src/app/auth/reducers/index.ts (398 bytes)
UPDATE src/app/auth/auth.module.ts (548 bytes)
```

#### Remove Meta Reducers from src/app/auth/auth.module.ts

```typescript
StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
```

#### Remove the following lines from src/app/auth/reducers/index.ts

```typescript
import { environment } from "../../environments/environment";

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
```

#### Install Json Server to Mock Backed API

```console
npm install -g json-server
```

#### Create db.json in root directory

```json
{
  "users": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "you@yourdomain.com"
    }
  ]
}
```

#### Add to scripts in package.json

```json
"server": "json-server --watch db.json"
```

#### Create user model

```console
ng g interface auth/model/user model
```

#### Add to src/app/auth/model/user.model.ts

```typescript
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
```

#### Import and add Reactive Forms Module to the Auth Module

```typescript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        ReactiveFormsModule,
    ],
)}
```

#### Add imports to login.component.ts

```typescript
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AppState } from "../../reducers";
```

#### Inject form builder router and store in login.component.ts constructor and create form.

```typescript
constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
) {
    this.form = fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });
}
```

#### Add method stub for handeling login submissions src/app/auth/login/login.component.ts

```typescript
  login() {
    const val = this.form.value;
    console.log('form val: ', val);
  }
```

#### Add form elements to login.component.html

```html
<form [formGroup]="form" class="login-form">
  <input type="email" placeholder="Email" formControlName="email" />
  <input type="password" placeholder="Password" formControlName="password" />
  <button (click)="login()">Login</button>
</form>
```

#### Create an http interceptor so we can mock a backend request/response

```console
ng generate interceptor auth/interceptors/mock-api --skip-tests
```

#### Add imports to app/auth/auth.module.ts & update @NgModule imports and providers

```typescript
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockApiInterceptor } from './interceptors/mock-api.interceptor';

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true },
  ],

```

#### Create an auth service to handle http requests

```console
ng g service auth/auth
```

#### Import Auth Service and add to providers in src/app/auth/auth.module.ts

```typescript
import { AuthService } from './auth.service';

providers: [ AuthService ],
```

#### Inject Auth Service into login component & pass login request to auth service src/app/auth/login/login.component.ts

```typescript
import { AuthService } from '../auth.service';

constructor( private auth: AuthService )

login() {
    const val = this.form.value;

    this.auth
      .login(val.email, val.password)
      .pipe(
        tap((user) => {
          console.log(user);
        })
      )
      .subscribe(noop, () => alert('Login Failed'));
}
```
