import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';


const appRoutes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: 'memory', loadChildren: './memory/memory.module#MemoryModule' },
  { path: 'snake', loadChildren: './snake/snake.module#SnakeModule' },
  { path: 'noughts_and_crosses', loadChildren: './oAndX/o-and-x.module#OAndXModule'},
  { path: 'not-found', loadChildren: './pageNotFound/page-not-found.module#PageNotFoundModule' },
  { path: 'login', component: LoginComponent  },
  { path: '**', redirectTo: '/not-found'  }
];

// gdy nie chcemy uzywac lazy loading routing uzywamy importow
@NgModule({
  imports: [
    // HomeModule,
    // AboutModule,
    // CourseModule,
    // AuthModule,
    // SecretModule,
    // PageNotFoundModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
